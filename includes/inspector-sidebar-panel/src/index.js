/**
 * External Dependencies
 */
import { Icon, download as icon } from '@wordpress/icons';
import { MediaDropZone } from '@prc/components';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { useMemo } from '@wordpress/element';
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
import { CardDivider, PanelBody, ToggleControl } from '@wordpress/components';

/**
 * Internal Dependencies
 */
import StatsPanel from './stats-panel';

const PLUGIN_NAME = 'prc-platform-datasets-panel';
const ALLOWED_TYPES = ['application/zip', 'application/pdf'];

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

	const { attachmentId, isAtp } = useMemo(() => {
		return {
			attachmentId: meta._download_attachment_id || false,
			isAtp: meta.is_atp || false,
		};
	}, [meta]);

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
					<MediaDropZone
						{...{
							attachmentId,
							disabled: false,
							onUpdate: (attachment) => {
								setMeta({
									...meta,
									_download_attachment_id: attachment.id,
								});
							},
							editButtonLabel: __('Edit Dataset File'),
							onClear: false,
							allowedTypes: ALLOWED_TYPES,
							label: __('Upload Dataset File (zip or pdf)'),
							singularLabel: __('dataset'),
						}}
					/>
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
				</PanelBody>
				<StatsPanel postId={postId} />
			</PluginSidebar>
			<PluginPrePublishPanel>
				<PanelBody title="Review Dataset Options">
					<MediaDropZone
						{...{
							attachmentId,
							disabled: false,
							onUpdate: (attachment) => {
								setMeta({
									...meta,
									_download_attachment_id: attachment.id,
								});
							},
							editButtonLabel: __('Edit Dataset File'),
							onClear: false,
							allowedTypes: ALLOWED_TYPES,
							label: __('Upload Dataset File (zip or pdf)'),
							singularLabel: __('dataset'),
						}}
					/>
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
				</PanelBody>
			</PluginPrePublishPanel>
		</>
	);
}

registerPlugin(PLUGIN_NAME, {
	render: DatasetOptionsPanel,
});
