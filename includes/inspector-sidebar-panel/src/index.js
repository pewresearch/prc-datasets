/**
 * External Dependencies
 */
import { Icon, download as icon } from '@wordpress/icons';
import { MediaDropZone } from '@prc/components';

/**
 * WordPress Dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { useMemo, useState } from '@wordpress/element';
import { useCommand } from '@wordpress/commands';
import { useDispatch, useSelect } from '@wordpress/data';
import { store as editPostStore } from '@wordpress/edit-post';
import { registerPlugin } from '@wordpress/plugins';
import {
	PluginSidebar,
	PluginSidebarMoreMenuItem,
	PluginPrePublishPanel,
	store as editorStore,
} from '@wordpress/editor';
import { useEntityProp } from '@wordpress/core-data';
import {
	CardDivider,
	PanelBody,
	ToggleControl,
	Modal,
	Button,
} from '@wordpress/components';
import { dateI18n } from '@wordpress/date';

/**
 * Internal Dependencies
 */
import StatsPanel from './stats-panel';

const PLUGIN_NAME = 'prc-platform-datasets-panel';
const ALLOWED_TYPES = ['application/zip', 'application/pdf'];

/**
 * Format a site-local mysql datetime for new_data_uploaded meta.
 *
 * Uses the WordPress site timezone (not the browser's local clock).
 *
 * @return {string} Formatted datetime string (Y-m-d H:i:s).
 */
function formatNewDataUploadedTimestamp() {
	return dateI18n('Y-m-d H:i:s');
}

function NewDataUploadModal({ onConfirmNewData, onConfirmSameData, onCancel }) {
	return (
		<Modal
			title={__('New dataset data?', 'prc-datasets')}
			onRequestClose={onCancel}
			className="prc-datasets-new-data-modal"
		>
			<p>
				{__(
					'Does this file represent new underlying data for this dataset?',
					'prc-datasets'
				)}
			</p>
			<p>
				{__(
					'If yes, download analytics for the current month will be split into counts before and after this upload so you can compare activity against the previous file.',
					'prc-datasets'
				)}
			</p>
			<div
				style={{
					display: 'flex',
					gap: '8px',
					justifyContent: 'flex-end',
					marginTop: '16px',
				}}
			>
				<Button variant="tertiary" onClick={onCancel}>
					{__('Cancel', 'prc-datasets')}
				</Button>
				<Button variant="secondary" onClick={onConfirmSameData}>
					{__('No, keep analytics as-is', 'prc-datasets')}
				</Button>
				<Button variant="primary" onClick={onConfirmNewData}>
					{__('Yes, this is new data', 'prc-datasets')}
				</Button>
			</div>
		</Modal>
	);
}

function DatasetFileControls({ meta, setMeta }) {
	const [pendingAttachment, setPendingAttachment] = useState(null);

	const { attachmentId, isAtp } = useMemo(() => {
		return {
			attachmentId: meta._download_attachment_id || false,
			isAtp: meta.is_atp || false,
		};
	}, [meta]);

	const applyAttachment = (attachment, markAsNewData) => {
		const nextMeta = {
			...meta,
			_download_attachment_id: attachment.id,
		};
		if (markAsNewData) {
			nextMeta.new_data_uploaded = formatNewDataUploadedTimestamp();
		}
		setMeta(nextMeta);
		setPendingAttachment(null);
	};

	const handleAttachmentUpdate = (attachment) => {
		const hadPrevious = Boolean(attachmentId);
		if (hadPrevious && attachment?.id !== attachmentId) {
			setPendingAttachment(attachment);
			return;
		}
		applyAttachment(attachment, false);
	};

	return (
		<>
			<MediaDropZone
				{...{
					attachmentId,
					disabled: false,
					onUpdate: handleAttachmentUpdate,
					editButtonLabel: __('Edit Dataset File'),
					onClear: false,
					allowedTypes: ALLOWED_TYPES,
					label: __('Upload Dataset File (zip or pdf)'),
					singularLabel: __('dataset'),
				}}
			/>
			{meta.new_data_uploaded && (
				<p style={{ marginTop: '8px', opacity: 0.75 }}>
					{sprintf(
						/* translators: %s: datetime string */
						__('New data marked at: %s', 'prc-datasets'),
						meta.new_data_uploaded
					)}
				</p>
			)}
			<CardDivider />
			<ToggleControl
				label="ATP Dataset"
				help="ATP datasets are bound by an opt-in to the ATP Terms of Service."
				checked={isAtp}
				onChange={(value) => {
					setMeta({
						...meta,
						is_atp: value,
					});
				}}
			/>
			{pendingAttachment && (
				<NewDataUploadModal
					onConfirmNewData={() =>
						applyAttachment(pendingAttachment, true)
					}
					onConfirmSameData={() =>
						applyAttachment(pendingAttachment, false)
					}
					onCancel={() => setPendingAttachment(null)}
				/>
			)}
		</>
	);
}

function DatasetOptionsPanel() {
	const { openGeneralSidebar } = useDispatch(editPostStore);

	useCommand({
		name: 'prc/show-dataset-options',
		label: __('Show Dataset Options', 'prc-datasets'),
		icon,
		category: 'view',
		keywords: ['dataset', 'options', 'download', 'atp'],
		callback: ({ close }) => {
			openGeneralSidebar(`${PLUGIN_NAME}/${PLUGIN_NAME}`);
			close();
		},
	});

	const { postType, postId } = useSelect((select) => {
		const currentPostType = select(editorStore).getCurrentPostType();
		const currentPostId = select(editorStore).getCurrentPostId();
		return {
			postType: currentPostType,
			postId: currentPostId,
		};
	}, []);

	const [meta, setMeta] = useEntityProp('postType', postType, 'meta', postId);

	return (
		<>
			<PluginSidebarMoreMenuItem target={PLUGIN_NAME} icon={icon}>
				{__('Dataset Options')}
			</PluginSidebarMoreMenuItem>
			<PluginSidebar
				name={PLUGIN_NAME}
				title="Dataset Options"
				icon={<Icon icon={icon} size={16} />}
			>
				<PanelBody title="Dataset File">
					<DatasetFileControls meta={meta} setMeta={setMeta} />
				</PanelBody>
				<StatsPanel postId={postId} />
			</PluginSidebar>
			<PluginPrePublishPanel>
				<PanelBody title="Review Dataset Options">
					<DatasetFileControls meta={meta} setMeta={setMeta} />
				</PanelBody>
			</PluginPrePublishPanel>
		</>
	);
}

registerPlugin(PLUGIN_NAME, {
	render: DatasetOptionsPanel,
});
