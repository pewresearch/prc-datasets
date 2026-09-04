/**
 * WordPress Dependencies
 */
import { useMemo, useState, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import {
	PanelBody,
	BaseControl,
	__experimentalVStack as VStack,
} from '@wordpress/components';
import { __, sprintf } from '@wordpress/i18n';
import {
	AnalyticsPeriodControls,
	CalendarHeatmap,
	MONTH_LABELS,
	monthKeyFromIndex,
} from '@prc/components';

import './stats-panel.scss';

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

function daysInMonth(year, month) {
	return new Date(year, month, 0).getDate();
}

export default function StatsPanel({ postId, embedded = false }) {
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

	useEffect(() => {
		if (years.length > 0 && !years.includes(String(selectedYear))) {
			setSelectedYear(years[years.length - 1]);
		}
	}, [years, selectedYear]);

	const content = (
		<VStack spacing={4}>
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
			<AnalyticsPeriodControls
				years={years}
				selectedYear={selectedYear}
				onYearChange={setSelectedYear}
				selectedMonth={selectedMonth}
				onMonthChange={setSelectedMonth}
				yearLabel={__('Select Year', 'prc-datasets')}
				monthLabel={__('Select Month', 'prc-datasets')}
				allMonthsLabel={__('All months', 'prc-datasets')}
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
					<CalendarHeatmap
						values={monthData.map((m) => m.total)}
						onCellClick={(index) => {
							setSelectedMonth(monthKeyFromIndex(index));
						}}
						getCellAriaLabel={(_, index) =>
							sprintf(
								/* translators: %s: month abbreviation */
								__(
									'View daily downloads for %s',
									'prc-datasets'
								),
								MONTH_LABELS[index]
							)
						}
						renderValue={(_, index) => {
							const item = monthData[index];
							if (item?.split) {
								return `${item.split.before}|${item.split.after}`;
							}
							return item?.total;
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
						<CalendarHeatmap
							values={dayData}
							labels={dayLabels}
							highlightIndex={uploadDayIndex}
						/>
					)}
				</BaseControl>
			)}
		</VStack>
	);

	if (embedded) {
		return content;
	}

	return <PanelBody title="Dataset Download Stats">{content}</PanelBody>;
}
