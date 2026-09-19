/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';
import { decodeEntities } from '@wordpress/html-entities';

/**
 * Internal Dependencies
 */
import DatasetSearch from './dataset-search';

export default function Controls({ datasetId, setAttributes }) {
	const selectedTitle = useSelect(
		(select) => {
			if (!datasetId) {
				return '';
			}
			const record = select(coreStore).getEntityRecord(
				'postType',
				'dataset',
				datasetId
			);
			const title = record?.title?.rendered ?? record?.title?.raw ?? '';
			return 'string' === typeof title ? decodeEntities(title) : '';
		},
		[datasetId]
	);

	return (
		<InspectorControls>
			<PanelBody title={__('Dataset', 'dataset-download-button')}>
				{selectedTitle ? (
					<p>
						{sprintf(
							/* translators: %s: selected dataset title */
							__('Selected: %s', 'dataset-download-button'),
							selectedTitle
						)}
					</p>
				) : null}
				<DatasetSearch
					setAttributes={setAttributes}
					entityId={datasetId}
				/>
			</PanelBody>
		</InspectorControls>
	);
}
