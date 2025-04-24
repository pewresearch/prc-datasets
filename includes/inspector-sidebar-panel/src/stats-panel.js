import { useMemo, useState, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { PanelBody, BaseControl, SelectControl } from '@wordpress/components';

import './stats-panel.scss';

// Custom hook for fetching dataset stats
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
				console.error({ error });
			});
	}, [postId]);

	return stats;
}

function CalendarChart({
	values = [30, 60, 90, 60, 100, 50, 45, 20, 70, 80, 90, 40],
}) {
	const months = [
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

	const getHeatLevel = (value) => {
		const max = Math.max(...values);
		const percentage = (value / max) * 100;
		if (value === 0) return 'none';
		if (percentage <= 25) return 'low';
		if (percentage <= 50) return 'medium';
		if (percentage <= 75) return 'high';
		return 'very-high';
	};

	return (
		<div className="calendar-chart">
			{values.map((value, index) => (
				<div
					key={index}
					className="calendar-chart-item"
					data-month={months[index]}
					data-heat={getHeatLevel(value)}
				>
					<span className="value">{value}</span>
				</div>
			))}
		</div>
	);
}

export default function StatsPanel({ postId }) {
	const datasetStats = useDatasetStats(postId);

	const currentYear = new Date().getFullYear();

	const years = useMemo(() => {
		if (!datasetStats?.log) return [];
		return Object.keys(datasetStats.log);
	}, [datasetStats]);

	const [selectedYear, setSelectedYear] = useState(currentYear);

	const data = useMemo(() => {
		if (!datasetStats?.log) return [];
		const dataForYear = datasetStats?.log[selectedYear] || {};
		// 1. Ensure that dataForYear has properties 01 through 12, if there are any missing months add them with a value of 0
		for (let i = 1; i <= 12; i++) {
			// Zero-pad the month number to ensure it matches the '01', '02' format
			const monthKey = i.toString().padStart(2, '0');
			if (!(monthKey in dataForYear)) {
				dataForYear[monthKey] = 0;
			}
		}
		// 2. Sort the data by the keys, 01 should be first, 12 should be last, etc...
		const sortedData = Object.keys(dataForYear).sort((a, b) => a - b);
		// 3. Return the sorted data and values without the keys...
		return sortedData.map((key) => dataForYear[key]);
	}, [datasetStats, selectedYear]);

	const total = useMemo(() => {
		return data.reduce((acc, curr) => acc + curr, 0);
	}, [data]);

	return (
		<PanelBody title="Dataset Download Stats">
			<SelectControl
				label="Select Year"
				value={selectedYear}
				options={years.map((year) => ({
					label: year,
					value: year,
				}))}
				onChange={setSelectedYear}
			/>
			<BaseControl id="dataset-download-stats" help={`Total: ${total}`}>
				<CalendarChart values={data} />
			</BaseControl>
		</PanelBody>
	);
}
