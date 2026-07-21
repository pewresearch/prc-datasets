/**
 * WordPress Dependencies
 */

import { useMemo, useState, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { PanelBody, BaseControl, SelectControl } from '@wordpress/components';
import { __, sprintf } from '@wordpress/i18n';

import './stats-panel.scss';

const MONTH_LABELS = [
	'Jan',
	'Feb',
	'Mar',
	'Apr',
	'May',
	'Jun',
	'Jul',
	'Aug',
	'Sep',
	'Oct',
	'Nov',
	'Dec',
];

function useDatasetStats(postId) {
	const [stats, setStats] = useState(null);

	useEffect(() => {
		apiFetch({
			path: `/prc-api/v3/datasets/download-stats?dataset_id=${postId}`,
			method: 'GET',
		})
			.then((response) => {
				setStats({
					success: true,
					...response,
				});
			})
			.catch((error) => {
				// eslint-disable-next-line no-console
				console.error({ error });
			});
	}, [postId]);

	return stats;
}

function getHeatLevel(value, values) {
	const max = Math.max(...values, 0);
	const percentage = max > 0 ? (value / max) * 100 : 0;
	if (value === 0) return 'none';
	if (percentage <= 25) return 'low';
	if (percentage <= 50) return 'medium';
	if (percentage <= 75) return 'high';
	return 'very-high';
}

function CalendarChart({
	values = [],
	labels = MONTH_LABELS,
	renderValue,
	highlightIndex = null,
}) {
	return (
		<div className="calendar-chart">
			{values.map((value, index) => (
				<div
					key={labels[index] || index}
					className={`calendar-chart-item${
						highlightIndex === index
							? ' calendar-chart-item--highlight'
							: ''
					}`}
					data-month={labels[index]}
					data-heat={getHeatLevel(
						typeof value === 'number' ? value : value?.total || 0,
						values.map((v) =>
							typeof v === 'number' ? v : v?.total || 0
						)
					)}
				>
					<span className="value">
						{renderValue ? renderValue(value, index) : value}
					</span>
				</div>
			))}
		</div>
	);
}

function daysInMonth(year, month) {
	return new Date(year, month, 0).getDate();
}

export default function StatsPanel({ postId }) {
	const datasetStats = useDatasetStats(postId);
	const currentYear = new Date().getFullYear();

	const years = useMemo(() => {
		if (!datasetStats?.log) return [];
		return Object.keys(datasetStats.log);
	}, [datasetStats]);

	const [selectedYear, setSelectedYear] = useState(String(currentYear));
	const [selectedMonth, setSelectedMonth] = useState('');

	const monthData = useMemo(() => {
		if (!datasetStats?.log) return [];
		const dataForYear = { ...(datasetStats.log[selectedYear] || {}) };
		for (let i = 1; i <= 12; i++) {
			const monthKey = i.toString().padStart(2, '0');
			if (!(monthKey in dataForYear)) {
				dataForYear[monthKey] = 0;
			}
		}
		const sortedKeys = Object.keys(dataForYear)
			.filter((key) => /^\d{2}$/.test(key))
			.sort((a, b) => a - b);

		return sortedKeys.map((key) => {
			const total = Number(dataForYear[key]) || 0;
			const splitKey = `${selectedYear}-${key}`;
			const split = datasetStats.splits?.[splitKey] || null;
			return { month: key, total, split };
		});
	}, [datasetStats, selectedYear]);

	const monthTotal = useMemo(() => {
		return monthData.reduce((acc, curr) => acc + curr.total, 0);
	}, [monthData]);

	const dayData = useMemo(() => {
		if (!selectedMonth || !datasetStats?.daily) return [];
		const yearDaily = datasetStats.daily[selectedYear] || {};
		const monthDays = yearDaily[selectedMonth] || {};
		const count = daysInMonth(Number(selectedYear), Number(selectedMonth));
		const values = [];
		for (let d = 1; d <= count; d++) {
			const dayKey = String(d).padStart(2, '0');
			values.push(Number(monthDays[dayKey] || monthDays[String(d)] || 0));
		}
		return values;
	}, [datasetStats, selectedYear, selectedMonth]);

	const dayLabels = useMemo(() => {
		return dayData.map((_, i) => String(i + 1).padStart(2, '0'));
	}, [dayData]);

	const uploadDayIndex = useMemo(() => {
		if (!selectedMonth || !datasetStats?.new_data_uploaded) return null;
		const split = datasetStats.splits?.[`${selectedYear}-${selectedMonth}`];
		if (!split?.upload_day) return null;
		return Number(split.upload_day) - 1;
	}, [datasetStats, selectedYear, selectedMonth]);

	const dayTotal = useMemo(() => {
		return dayData.reduce((acc, curr) => acc + curr, 0);
	}, [dayData]);

	const monthOptions = useMemo(() => {
		return [
			{ label: __('All months', 'prc-datasets'), value: '' },
			...MONTH_LABELS.map((label, index) => ({
				label,
				value: String(index + 1).padStart(2, '0'),
			})),
		];
	}, []);

	useEffect(() => {
		if (years.length > 0 && !years.includes(String(selectedYear))) {
			setSelectedYear(years[years.length - 1]);
		}
	}, [years, selectedYear]);

	return (
		<PanelBody title="Dataset Download Stats">
			{datasetStats?.total !== null &&
				datasetStats?.total !== undefined && (
					<p className="dataset-stats-all-time">
						{sprintf(
							/* translators: %s: total download count */
							__('All-time downloads: %s', 'prc-datasets'),
							Number(datasetStats.total).toLocaleString()
						)}
					</p>
				)}
			<SelectControl
				label={__('Select Year', 'prc-datasets')}
				value={selectedYear}
				options={years.map((year) => ({
					label: year,
					value: year,
				}))}
				onChange={(value) => {
					setSelectedYear(value);
					setSelectedMonth('');
				}}
			/>
			<SelectControl
				label={__('Select Month', 'prc-datasets')}
				value={selectedMonth}
				options={monthOptions}
				onChange={setSelectedMonth}
			/>
			{!selectedMonth && (
				<BaseControl
					id="dataset-download-stats"
					help={sprintf(
						/* translators: %s: yearly total */
						__('Year total: %s', 'prc-datasets'),
						monthTotal.toLocaleString()
					)}
				>
					<CalendarChart
						values={monthData}
						renderValue={(item) => {
							if (item.split) {
								return `${item.split.before}|${item.split.after}`;
							}
							return item.total;
						}}
					/>
				</BaseControl>
			)}
			{selectedMonth && (
				<BaseControl
					id="dataset-download-stats-daily"
					help={sprintf(
						/* translators: 1: month label 2: day total */
						__('Daily total for %1$s: %2$s', 'prc-datasets'),
						MONTH_LABELS[Number(selectedMonth) - 1],
						dayTotal.toLocaleString()
					)}
				>
					{datasetStats?.splits?.[
						`${selectedYear}-${selectedMonth}`
					] && (
						<p className="dataset-stats-split">
							{sprintf(
								/* translators: 1: before count 2: after count 3: upload day */
								__(
									'New data split (day %3$s): %1$s before · %2$s after',
									'prc-datasets'
								),
								datasetStats.splits[
									`${selectedYear}-${selectedMonth}`
								].before.toLocaleString(),
								datasetStats.splits[
									`${selectedYear}-${selectedMonth}`
								].after.toLocaleString(),
								datasetStats.splits[
									`${selectedYear}-${selectedMonth}`
								].upload_day
							)}
						</p>
					)}
					{dayData.length === 0 || dayTotal === 0 ? (
						<p>
							{__(
								'No daily download data for this month yet.',
								'prc-datasets'
							)}
						</p>
					) : (
						<CalendarChart
							values={dayData}
							labels={dayLabels}
							highlightIndex={uploadDayIndex}
						/>
					)}
				</BaseControl>
			)}
		</PanelBody>
	);
}
