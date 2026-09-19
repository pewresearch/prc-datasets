/**
 * External Dependencies
 */
import { WPEntitySearch } from '@prc/components';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';

const DATASET_STATUSES = ['publish', 'draft', 'future'];

/**
 * Map a WPEntitySearch result to a dataset CPT post ID.
 *
 * Keyword search returns a dataset post. URL paste shapes the related
 * `datasets` term and exposes the original post as `entityPostId`. Never
 * persist a term ID as `datasetId`: term IDs and post IDs can collide.
 *
 * @param {Object} item WPEntitySearch result.
 * @return {number} Dataset post ID, or 0.
 */
export function datasetIdFromSearchItem(item) {
	const isDatasetsTerm =
		'taxonomy' === item?.entityType || 'datasets' === item?.entitySubType;
	const datasetId = parseInt(
		isDatasetsTerm ? item?.entityPostId : item?.entityId,
		10
	);
	if (!Number.isFinite(datasetId) || datasetId <= 0) {
		return 0;
	}
	return datasetId;
}

export default function DatasetSearch({ setAttributes, entityId }) {
	return (
		<WPEntitySearch
			placeholder={__('Search for a dataset', 'dataset-download-button')}
			entityType="postType"
			entitySubType="dataset"
			entityStatus={DATASET_STATUSES}
			entityId={entityId}
			onSelect={(item) => {
				const datasetId = datasetIdFromSearchItem(item);
				if (datasetId <= 0) {
					return;
				}
				setAttributes({ datasetId });
			}}
			perPage={10}
			showType={false}
			showFeaturedImage={false}
			clearOnSelect={true}
		/>
	);
}
