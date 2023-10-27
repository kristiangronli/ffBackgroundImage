import {
	useBlockProps,
	MediaUpload,
	InspectorControls,
} from '@wordpress/block-editor';
import {
	Button,
	PanelBody,
	TextControl,
	TextareaControl,
} from '@wordpress/components';
import { Fragment } from '@wordpress/element';

import './editor.scss';

export default function Edit( { attributes, setAttributes } ) {
	const { bilde, height, width, mycss } = attributes;

	// Function to convert CSS string to object
	const parseCSS = ( cssString ) => {
		const cssObject = {};
		const cssArray = cssString
			.split( ';' )
			.filter( ( style ) => style.trim() !== '' );
		cssArray.forEach( ( style ) => {
			const [ property, value ] = style.split( ':' );
			if ( property && value ) {
				cssObject[ property.trim() ] = value.trim();
			}
		} );
		return cssObject;
	};

	const style = {
		backgroundImage: `url(${ bilde })`,
		...( height && { height: `${ height }` } ),
		...( width && { width: `${ width }` } ),
		...( mycss && parseCSS( mycss ) ),
	};

	// ,
	// 	...(height && { height: `${height}`}),
	// 	...Button(width && { width: `${width}`}),
	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title="Bilde settings" initialOpen={ true }>
					<TextControl
						label="Høyde"
						value={ height }
						onChange={ ( value ) =>
							setAttributes( { height: value } )
						}
					/>
					<TextControl
						label="Bredde"
						value={ width }
						onChange={ ( value ) =>
							setAttributes( { width: value } )
						}
					/>
					<TextareaControl
						label="Custom css"
						value={ mycss }
						help="background-size: cover;"
						onChange={ ( value ) =>
							setAttributes( { mycss: value } )
						}
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...useBlockProps() }>
				<div style={ style } className="ff-image-controller">
					<MediaUpload
						onSelect={ ( media ) =>
							setAttributes( { bilde: media.url } )
						}
						allowedTypes={ [ 'image' ] }
						render={ ( { open } ) => (
							<Button onClick={ open }>
								{ bilde ? 'Bytt bilde' : 'Velg bilde' }
							</Button>
						) }
					/>
				</div>
			</div>
		</Fragment>
	);
}
