/**
 * Dataset audience panel — wires AudienceBuildPanel to datasets REST.
 */

import { useCallback, useEffect, useState } from '@wordpress/element';
import { PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';
import { AudienceBuildPanel } from '@prc/components';

/**
 * Normalize a REST audience row into the shared snapshot shape.
 *
 * @param {Object} row REST audience payload.
 * @return {import('@prc/components').AudienceSnapshot} Normalized snapshot.
 */
function normalizeAudience(row) {
	return {
		key: row.key,
		label: row.label,
		count: Number(row.count) || 0,
		verification: row.verification,
		builtAt: row.builtAt ?? row.built_at ?? null,
		referencingPostIds: row.referencingPostIds ?? [],
		stats: row.stats || undefined,
	};
}

/**
 * @param {Object} props
 * @param {number} props.postId Dataset post ID.
 */
export default function AudiencePanel({ postId }) {
	const [audiences, setAudiences] = useState([]);
	const [status, setStatus] = useState(
		/** @type {'idle' | 'loading' | 'building' | 'deleting' | 'error'} */ (
			'loading'
		)
	);
	const [errorMessage, setErrorMessage] = useState(
		/** @type {string|null} */ (null)
	);

	const loadAudiences = useCallback(async () => {
		if (!postId) {
			return;
		}
		setStatus('loading');
		setErrorMessage(null);
		try {
			const response = await apiFetch({
				path: `/prc-api/v3/datasets/audiences?dataset_id=${postId}`,
				method: 'GET',
			});
			setAudiences(
				(Array.isArray(response) ? response : []).map(normalizeAudience)
			);
			setStatus('idle');
		} catch (error) {
			setErrorMessage(
				error?.message ||
					__('Could not load audiences.', 'prc-datasets')
			);
			setStatus('error');
		}
	}, [postId]);

	useEffect(() => {
		loadAudiences();
	}, [loadAudiences]);

	const runBuild = useCallback(
		async ({ verification }) => {
			setStatus('building');
			setErrorMessage(null);
			try {
				await apiFetch({
					path: '/prc-api/v3/datasets/build-audience',
					method: 'POST',
					data: {
						dataset_id: postId,
						verification,
					},
				});
				await loadAudiences();
			} catch (error) {
				setErrorMessage(
					error?.message ||
						__('Audience build failed.', 'prc-datasets')
				);
				setStatus('error');
			}
		},
		[loadAudiences, postId]
	);

	const runDelete = useCallback(
		async ({ verification, key }) => {
			setStatus('deleting');
			setErrorMessage(null);
			try {
				const params = new URLSearchParams({
					dataset_id: String(postId),
					verification,
					key,
				});
				await apiFetch({
					path: `/prc-api/v3/datasets/audiences?${params.toString()}`,
					method: 'DELETE',
				});
				await loadAudiences();
			} catch (error) {
				setErrorMessage(
					error?.message ||
						__('Audience delete failed.', 'prc-datasets')
				);
				setStatus('error');
			}
		},
		[loadAudiences, postId]
	);

	return (
		<PanelBody
			title={__('Downloader audience', 'prc-datasets')}
			initialOpen={false}
		>
			<AudienceBuildPanel
				helpText={__(
					'Build a Mandrill recipient list from users who downloaded this dataset. The list is saved for transactional email; no draft email is created here.',
					'prc-datasets'
				)}
				audiences={audiences}
				status={status}
				errorMessage={errorMessage}
				onBuild={runBuild}
				onRebuild={runBuild}
				onDelete={runDelete}
			/>
		</PanelBody>
	);
}
