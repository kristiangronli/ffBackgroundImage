//import { useBlockProps } from '@wordpress/block-editor';

export default function save( { attributes } ) {
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

	return <div style={ style } className="image-background"></div>;
}
