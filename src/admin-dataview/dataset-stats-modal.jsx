/**
 * WordPress Dependencies
 */
import { Modal } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal Dependencies
 */
import StatsPanel from '../../includes/inspector-sidebar-panel/src/stats-panel';

export default function DatasetStatsModal({ dataset, onClose }) {
	if (!dataset) {
		return null;
	}

	const title =
		dataset.title?.trim() || __('Untitled dataset', 'prc-datasets');

	return (
		<Modal
			title={title}
			onRequestClose={onClose}
			className="prc-datasets-library-stats-modal"
			size="medium"
		>
			<div className="prc-datasets-library-stats-modal__section">
				<h3>{__('Download Analytics', 'prc-datasets')}</h3>
				<StatsPanel postId={dataset.id} embedded />
			</div>
		</Modal>
	);
}
