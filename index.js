// ₊˚ ‿︵‿︵‿︵୨୧ · · ♡ · · ୨୧‿︵‿︵‿︵ ˚₊
// Natbox
// ₊˚ ‿︵‿︵‿︵୨୧ · · ♡ · · ୨୧‿︵‿︵‿︵ ˚₊

import { createSelectOnlyMarkup, createEditableMarkup } from "./modules/create-markup.js";

function initCombobox( select, params ) {
	let combobox = null;
	const label = document.querySelector( 'label[for="' + select.id + '"]' );
	const options = select.querySelectorAll( 'option' );

	if ( label === null ) {
		console.error( 'All select elements must have a label.' );

		return;
	} else if ( options === null ) {
		console.error( 'All select elements must have at least one option.' );

		return;
	}

	if ( params.patternType === 'editable' ) {
		combobox = createEditableMarkup( select, label.innerText, options, params );
	} else {
		combobox = createSelectOnlyMarkup( select, label.innerText, options, params );
	}

	select.insertAdjacentElement( 'afterend', combobox );

	select.remove();
	document.querySelector( 'label[for="' + select.id + '"]' ).remove();

	return combobox;
}

export function Natbox( selector, params = {
	labelVisibility: true,
	patternType: 'select-only' // select-only, editable, editable-grid
} ) {
	let combobox = null;

	if ( typeof( selector ) === 'string' ) {
		const selectComboboxes = document.querySelectorAll( selector );

		selectComboboxes.forEach( select => {
			combobox = initCombobox( select, params );
		} );
	} else if ( typeof( selector === 'object' ) ) {
		const select = selector;
		combobox = initCombobox( select, params );
	}

	return {
		element: combobox,
		params,
	}
}