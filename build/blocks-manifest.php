<?php
// This file is generated. Do not modify it manually.
return array(
	'dataset-atp-legal-acceptance-block' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-platform/dataset-atp-legal-acceptance',
		'version' => '1.0.0',
		'title' => 'Dataset ATP Legal Acceptance',
		'category' => 'theme',
		'description' => 'Provides an ATP Legal Acceptance form for users.',
		'attributes' => array(
			'datasetId' => array(
				'type' => 'string'
			),
			'nonce' => array(
				'type' => 'string'
			)
		),
		'supports' => array(
			'interactivity' => true,
			'html' => false,
			'inserter' => false
		),
		'textdomain' => 'dataset-atp-legal-acceptance',
		'editorScript' => 'file:./index.js',
		'render' => 'file:./render.php',
		'style' => 'file:./style-index.css',
		'viewScriptModule' => 'file:./view.js'
	),
	'dataset-description-block' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-platform/dataset-description',
		'version' => '1.0.0',
		'title' => 'Dataset Description',
		'category' => 'theme',
		'description' => 'Displays the description for the dataset.',
		'textdomain' => 'dataset-description',
		'editorScript' => 'file:./index.js'
	),
	'download-block' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-platform/dataset-download',
		'version' => '1.0.0',
		'title' => 'Dataset Download',
		'category' => 'theme',
		'description' => 'This block allows you to download the specified dataset.',
		'attributes' => array(
			
		),
		'supports' => array(
			'anchor' => true,
			'html' => false,
			'spacing' => array(
				'blockGap' => true,
				'margin' => true,
				'padding' => true,
				'__experimentalDefaultControls' => array(
					'padding' => true,
					'margin' => true
				)
			),
			'interactivity' => true
		),
		'textdomain' => 'dataset-download',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php',
		'viewScriptModule' => 'file:./view.js'
	)
);
