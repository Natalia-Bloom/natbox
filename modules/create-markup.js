// ₊˚ ‿︵‿︵‿︵୨୧ · · ♡ · · ୨୧‿︵‿︵‿︵ ˚₊
// Create Markup
// ₊˚ ‿︵‿︵‿︵୨୧ · · ♡ · · ୨୧‿︵‿︵‿︵ ˚₊

import { attachListeners } from './attach-event-listeners.js';

export function createMarkup( select, label, options, params ) {
	const index = document.querySelectorAll( '.js-combobox' ).length;

	const combobox = document.createElement( 'div' );
	combobox.classList.add( 'combobox', 'js-combobox' );

	const comboboxLabel = document.createElement( 'div' );
	comboboxLabel.classList.add( 'combobox__label' );
	comboboxLabel.setAttribute( 'id', 'combobox-' + index + '-label' );
	comboboxLabel.innerText = label;

	if ( params.labelVisibility === false ) {
		comboboxLabel.classList.add( 'is-screen-reader-only' );
	}

	const comboboxListbox = document.createElement( 'div' );
	comboboxListbox.classList.add( 'combobox__popup' );
	comboboxListbox.setAttribute( 'id', 'combobox-' + index + '-popup' );
	comboboxListbox.setAttribute( 'role', 'listbox' );
	comboboxListbox.setAttribute( 'aria-labelledby', comboboxLabel.id );
	comboboxListbox.setAttribute( 'tabindex', '-1' );

	let comboboxOptions = [];
	options.forEach( ( option, optionIndex ) => {
		const comboboxOption = document.createElement( 'div' );
		comboboxOption.classList.add( 'combobox__option' );
		comboboxOption.setAttribute( 'id', 'combobox-' + index + '-option-' + ( optionIndex + 1 ) );
		comboboxOption.setAttribute( 'data-value', option.value );
		comboboxOption.setAttribute( 'role', 'option' );
		comboboxOption.setAttribute( 'aria-selected', optionIndex === 0 ? 'true' : 'false' );
		comboboxOption.innerText = option.innerText;
		comboboxOptions.push( comboboxOption );
	} );

	const comboboxInput = document.createElement( 'div' );
	comboboxInput.classList.add( 'combobox__input' );
	comboboxInput.setAttribute( 'role', 'combobox' );
	comboboxInput.setAttribute( 'tabindex', '0' );
	comboboxInput.setAttribute( 'aria-expanded', 'false' );
	comboboxInput.setAttribute( 'aria-haspopup', 'listbox' );
	comboboxInput.setAttribute( 'aria-labelledby', comboboxLabel.id );
	comboboxInput.setAttribute( 'aria-controls', comboboxListbox.id );
	comboboxInput.setAttribute( 'aria-activedescendant', comboboxOptions[0].id );
	comboboxInput.innerText = comboboxOptions[0].innerText;

	const hiddenInput = document.createElement( 'input' );
	hiddenInput.setAttribute( 'type', 'hidden' );
	hiddenInput.setAttribute( 'name', select.name );
	hiddenInput.setAttribute( 'id', select.id );
	hiddenInput.setAttribute( 'value', options[0].value );

	comboboxOptions.forEach( option => {
		comboboxListbox.appendChild( option );
	} );

	combobox.appendChild( comboboxLabel );
	combobox.appendChild( comboboxInput );
	combobox.appendChild( comboboxListbox );
	combobox.appendChild( hiddenInput );

	attachListeners( combobox, comboboxInput, comboboxOptions, hiddenInput );

	return combobox;
}