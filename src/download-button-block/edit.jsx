/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { Placeholder } from '@wordpress/components';
import { download as icon } from '@wordpress/icons';

/**
 * Internal Dependencies
 */
import Controls from './controls';
import DatasetSearch from './dataset-search';

const ALLOWED_BLOCKS = ['core/button'];

const TEMPLATE = [
	[
		'core/button',
		{
			text: 'Download Dataset',
			interactiveNamespace: 'prc-platform/dataset-download',
		},
	],
];

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @param {Object}   props               Properties passed to the function.
 * @param {Object}   props.attributes    Available block attributes.
 * @param {Function} props.setAttributes Function that updates individual attributes.
 */
export default function Edit({ attributes, setAttributes }) {
	const { datasetId } = attributes;

	const blockProps = useBlockProps();
	const innerBlocksProps = useInnerBlocksProps(
		{},
		{
			allowedBlocks: ALLOWED_BLOCKS,
			templateLock: 'insert',
			template: TEMPLATE,
		}
	);

	if (!datasetId) {
		return (
			<div {...blockProps}>
				<Placeholder
					icon={icon}
					label={__(
						'Dataset Download Button',
						'dataset-download-button'
					)}
					instructions={__(
						'Search for a dataset this button will download.',
						'dataset-download-button'
					)}
				>
					<DatasetSearch setAttributes={setAttributes} />
				</Placeholder>
			</div>
		);
	}

	return (
		<>
			<Controls datasetId={datasetId} setAttributes={setAttributes} />
			<div {...blockProps}>
				<div {...innerBlocksProps} />
			</div>
		</>
	);
}
