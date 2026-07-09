/**
 * Client-side registration for prc-platform/dataset-description bindings panel discovery.
 */
import { defineBindingSource } from '@prc/functions';
import { __ } from '@wordpress/i18n';

defineBindingSource({
	name: 'prc-platform/dataset-description',
	label: __('Dataset Description', 'prc-platform'),
	fields: [
		{
			label: __('Dataset Description', 'prc-platform'),
			type: 'string',
			args: {},
		},
	],
	getValues({ bindings }) {
		const preview =
			'Displays the description for the dataset. Adipisicing fugiat veniam sunt tempor est anim laboris reprehenderit esse labore ut ea.';
		const values = {};

		for (const attributeName of Object.keys(bindings ?? {})) {
			values[attributeName] = preview;
		}

		return values;
	},
	canUserEditValue() {
		return false;
	},
});
