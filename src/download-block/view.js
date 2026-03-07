/**
 * WordPress Dependencies
 */

import { store, getContext, getElement } from '@wordpress/interactivity';

const { state, actions } = store('prc-platform/dataset-download', {
	actions: {
		downloadDataset: (datasetId, NONCE, context) => {
			const { getUserHeaders } = store(
				'prc-user-accounts/content-gate'
			).actions;
			const headers = getUserHeaders();
			if (!headers) {
				context.isProcessing = false;
				context.isError = true;
				return;
			}
			window?.wp
				?.apiFetch({
					path: `/prc-api/v3/datasets/get-download/?dataset_id=${datasetId}`,
					method: 'POST',
					headers,
					data: { NONCE },
				})
				.then((response) => {
					if (response?.file_url) {
						context.isProcessing = false;
						context.isSuccess = true;
						window.open(response.file_url, '_blank');
					}
				})
				.catch((error) => {
					context.isProcessing = false;
					context.isError = true;
					console.error(error);
				});
		},
		async checkATP(datasetId, NONCE) {
			const { ref } = getElement();
			const context = getContext();
			const { getUserHeaders } = store(
				'prc-user-accounts/content-gate'
			).actions;
			const headers = getUserHeaders();
			if (!headers) {
				context.isProcessing = false;
				context.isError = true;
				return;
			}

			try {
				const response = await window?.wp?.apiFetch({
					path: `/prc-api/v3/datasets/check-atp/`,
					method: 'POST',
					headers,
					data: { NONCE },
				});

				if (true === response) {
					actions.downloadDataset(datasetId, NONCE, context);
				}
				if (false === response) {
					context.isProcessing = false;
					const dialogId =
						ref.parentElement.parentElement.parentElement.getAttribute(
							'id'
						);
					const { open } = store('prc-block/dialog')?.actions;
					open(dialogId);
				}
			} catch (error) {
				context.isProcessing = false;
				context.isError = true;
				console.error(error);
			}
		},
		onButtonClick: (event) => {
			event.preventDefault();
			const context = getContext();
			const { datasetId, isATP, NONCE } = context;

			context.isProcessing = true;

			if (isATP) {
				actions.checkATP(datasetId, NONCE);
			} else {
				actions.downloadDataset(datasetId, NONCE, context);
			}
		},
	},
	callbacks: {
		isProcessing: () => {
			const context = getContext();
			const { ref } = getElement();
			const { isProcessing } = context;
			// get the id from .wp-block-button inside the ref element
			const buttonId = ref.querySelector('.wp-element-button').id;
			state[buttonId].isProcessing = isProcessing;
		},
		isError: () => {
			const context = getContext();
			const { ref } = getElement();
			const { isError } = context;
			// get the id from .wp-block-button inside the ref element
			const buttonId = ref.querySelector('.wp-element-button').id;
			state[buttonId].isError = isError;
		},
		isSuccess: () => {
			const context = getContext();
			const { ref } = getElement();
			const { isSuccess } = context;
			// get the id from .wp-block-button inside the ref element
			const buttonId = ref.querySelector('.wp-element-button').id;
			state[buttonId].isSuccess = isSuccess;
		},
	},
});
