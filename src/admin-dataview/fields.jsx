/**
 * WordPress Dependencies
 */
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { chartBar } from '@wordpress/icons';

function getDatasetData() {
	return window?.prcWpAdminDataview?.dataset || {};
}

function getZipElements() {
	return (getDatasetData().zipStatuses || []).map((option) => ({
		value: option.value,
		label: option.label,
	}));
}

function getZipLabel(value) {
	const match = (getDatasetData().zipStatuses || []).find(
		(option) => option.value === value
	);
	if (match) {
		return match.label;
	}
	return '1' === value
		? __('Has ZIP file', 'prc-datasets')
		: __('Missing ZIP file', 'prc-datasets');
}

function getDownloadUnavailableElements() {
	return (getDatasetData().downloadUnavailableStatuses || []).map(
		(option) => ({
			value: option.value,
			label: option.label,
		})
	);
}

function getDownloadUnavailableLabel(value) {
	const match = (getDatasetData().downloadUnavailableStatuses || []).find(
		(option) => option.value === value
	);
	if (match) {
		return match.label;
	}
	return '1' === value
		? __('Download unavailable', 'prc-datasets')
		: __('Download available', 'prc-datasets');
}

export function getDefaultVisibleFields() {
	return [
		'zipStatus',
		'downloadUnavailable',
		'totalDownloads',
		'stats',
		'status',
		'date',
	];
}

export default function getDatasetFields({ onOpenStats }) {
	return [
		{
			id: 'zipStatus',
			label: __('ZIP file', 'prc-datasets'),
			getValue: ({ item }) => item?.hasZip || '0',
			render: ({ item }) => (
				<span>{getZipLabel(item?.hasZip || '0')}</span>
			),
			elements: getZipElements(),
			filterBy: {
				operators: ['is'],
				isPrimary: true,
			},
			enableSorting: false,
		},
		{
			id: 'downloadUnavailable',
			label: __('Download', 'prc-datasets'),
			getValue: ({ item }) => item?.downloadUnavailable || '0',
			render: ({ item }) => (
				<span>
					{getDownloadUnavailableLabel(
						item?.downloadUnavailable || '0'
					)}
				</span>
			),
			elements: getDownloadUnavailableElements(),
			filterBy: {
				operators: ['is'],
				isPrimary: true,
			},
			enableSorting: false,
		},
		{
			id: 'totalDownloads',
			label: __('Downloads', 'prc-datasets'),
			getValue: ({ item }) => item?.totalDownloads ?? 0,
			render: ({ item }) => (
				<span>{(item?.totalDownloads ?? 0).toLocaleString()}</span>
			),
			enableSorting: false,
		},
		{
			id: 'stats',
			label: __('Stats', 'prc-datasets'),
			getValue: ({ item }) =>
				(item?.totalDownloads ?? 0) > 0
					? __('Available', 'prc-datasets')
					: __('Unavailable', 'prc-datasets'),
			render: ({ item }) => {
				const hasStats = (item?.totalDownloads ?? 0) > 0;
				return (
					<Button
						icon={chartBar}
						label={__('View download analytics', 'prc-datasets')}
						size="compact"
						disabled={!hasStats}
						onClick={(event) => {
							event.stopPropagation();
							if (hasStats) {
								onOpenStats(item);
							}
						}}
					/>
				);
			},
			enableSorting: false,
			enableHiding: true,
		},
		{
			id: 'isAtp',
			label: __('ATP', 'prc-datasets'),
			getValue: ({ item }) => (item?.isAtp ? '1' : '0'),
			render: ({ item }) =>
				item?.isAtp
					? __('Yes', 'prc-datasets')
					: __('No', 'prc-datasets'),
			enableSorting: false,
		},
	];
}
