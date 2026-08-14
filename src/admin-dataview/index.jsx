/**
 * WordPress Dependencies
 */
import { createSlotFill } from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';
import { addFilter } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';

/**
 * Internal Dependencies
 */
import getDatasetFields, { getDefaultVisibleFields } from './fields';
import DatasetStatsModal from './dataset-stats-modal';
import './style.scss';

const { Fill: PageExtrasFill } = createSlotFill(
	'prcWpAdminDataview.PageExtras'
);
const PAGE_EXTRA_EVENT = 'prcWpAdminDataview.pageExtra';

function isDatasetList() {
	return 'dataset' === window?.prcWpAdminDataview?.postType;
}

function emitPageExtra(type, payload) {
	window.dispatchEvent(
		new CustomEvent(PAGE_EXTRA_EVENT, {
			detail: { type, payload },
		})
	);
}

function DatasetPageExtras() {
	const [dataset, setDataset] = useState(null);

	useEffect(() => {
		const handlePageExtra = (event) => {
			if ('dataset-stats' === event.detail?.type) {
				setDataset(event.detail.payload);
			}
		};
		window.addEventListener(PAGE_EXTRA_EVENT, handlePageExtra);
		return () =>
			window.removeEventListener(PAGE_EXTRA_EVENT, handlePageExtra);
	}, []);

	return (
		<DatasetStatsModal dataset={dataset} onClose={() => setDataset(null)} />
	);
}

function DatasetFills() {
	return (
		<>
			<span>{__('Browse and manage datasets.', 'prc-datasets')}</span>
			<PageExtrasFill>
				<DatasetPageExtras />
			</PageExtrasFill>
		</>
	);
}

addFilter('prcWpAdminDataview.fields', 'prc-datasets/fields', (fields) => {
	if (!isDatasetList()) {
		return fields;
	}
	return [
		...fields,
		...getDatasetFields({
			onOpenStats: (item) => emitPageExtra('dataset-stats', item),
		}),
	];
});

addFilter(
	'prcWpAdminDataview.defaultVisibleFields',
	'prc-datasets/default-fields',
	(fields) => (isDatasetList() ? getDefaultVisibleFields() : fields)
);

addFilter(
	'prcWpAdminDataview.pageDescription',
	'prc-datasets/page-description',
	(description) => (isDatasetList() ? <DatasetFills /> : description)
);
