// ₊˚ ‿︵‿︵‿︵୨୧ · · ♡ · · ୨୧‿︵‿︵‿︵ ˚₊
// Natbox
// ₊˚ ‿︵‿︵‿︵୨୧ · · ♡ · · ୨୧‿︵‿︵‿︵ ˚₊

import { createMarkup } from "./modules/create-markup.js";

export function Natbox( selector, options = {} ) {
	if ( typeof( selector ) === 'string' ) {
		const selectComboboxes = document.querySelectorAll( selector );

		selectComboboxes.forEach( select => {
			const label = document.querySelector( 'label[for="' + select.id + '"]' );
			const options = select.querySelectorAll( 'option' );

			if ( label === null ) {
				console.error( 'All select elements must have a label.' );

				return;
			} else if ( options === null ) {
				console.error( 'All select elements must have at least one option.' );

				return;
			}

			const combobox = createMarkup( select, label.innerText, options );
			select.insertAdjacentElement( 'afterend', combobox );

			select.remove();
			document.querySelector( 'label[for="' + select.id + '"]' ).remove();
		} );
	} else if ( typeof( selector === 'object' ) ) {
		const select = selector;
		const label = document.querySelector( 'label[for="' + select.id + '"]' );
		const options = select.querySelectorAll( 'option' );

		if ( label === null ) {
			console.error( 'All select elements must have a label.' );

			return;
		} else if ( options === null ) {
			console.error( 'All select elements must have at least one option.' );

			return;
		}

		const combobox = createMarkup( select, label.innerText, options );
		select.insertAdjacentElement( 'afterend', combobox );

		select.remove();
		document.querySelector( 'label[for="' + select.id + '"]' ).remove();
	}
}