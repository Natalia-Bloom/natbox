// ₊˚ ‿︵‿︵‿︵୨୧ · · ♡ · · ୨୧‿︵‿︵‿︵ ˚₊
// Create Markup
// ₊˚ ‿︵‿︵‿︵୨୧ · · ♡ · · ୨୧‿︵‿︵‿︵ ˚₊

import { attachEditableEventListeners, attachSelectOnlyEventListeners } from './attach-event-listeners.js';

export function createSelectOnlyMarkup( select, label, options, params ) {
	const index = document.querySelectorAll( '.js-combobox' ).length;

	const combobox = document.createElement( 'div' );
	combobox.classList.add( 'combobox', 'combobox--select-only', 'js-combobox' );

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
	comboboxInput.setAttribute( 'aria-labelledby', comboboxLabel.id );
	comboboxInput.setAttribute( 'aria-expanded', 'false' );
	comboboxInput.setAttribute( 'aria-haspopup', 'listbox' );
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
	
	attachSelectOnlyEventListeners( combobox, comboboxInput, comboboxOptions, hiddenInput );

	return combobox;
}

export function createEditableMarkup( select, label, options, params ) {
	const index = document.querySelectorAll( '.js-combobox' ).length;

	const combobox = document.createElement( 'div' );
	combobox.classList.add( 'combobox', 'combobox--editable', 'js-combobox' );

	const comboboxLabel = document.createElement( 'label' );
	comboboxLabel.classList.add( 'combobox__label' );
	comboboxLabel.setAttribute( 'id', 'combobox-' + index + '-label' );
	comboboxLabel.setAttribute( 'for', select.id );
	comboboxLabel.innerText = label;

	if ( params.labelVisibility === false ) {
		comboboxLabel.classList.add( 'is-screen-reader-only' );
	}

	const comboboxListbox = document.createElement( 'ul' );
	comboboxListbox.classList.add( 'combobox__popup' );
	comboboxListbox.setAttribute( 'id', 'combobox-' + index + '-popup' );
	comboboxListbox.setAttribute( 'role', 'listbox' );
	comboboxListbox.setAttribute( 'aria-labelledby', comboboxLabel.id );
	comboboxListbox.setAttribute( 'tabindex', '-1' );

	let comboboxOptions = [];
	options.forEach( ( option, optionIndex ) => {
		const comboboxOption = document.createElement( 'li' );
		comboboxOption.classList.add( 'combobox__option' );
		comboboxOption.setAttribute( 'id', 'combobox-' + index + '-option-' + ( optionIndex + 1 ) );
		comboboxOption.setAttribute( 'data-value', option.value );
		comboboxOption.setAttribute( 'role', 'option' );
		comboboxOption.setAttribute( 'aria-selected', optionIndex === 0 ? 'true' : 'false' );
		comboboxOption.innerText = option.innerText;
		comboboxOptions.push( comboboxOption );
	} );

	const comboboxInput = document.createElement( 'input' );
	comboboxInput.classList.add( 'combobox__input' );
	comboboxInput.setAttribute( 'role', 'combobox' );
	comboboxInput.setAttribute( 'type', 'text' );
	comboboxInput.setAttribute( 'id', select.id );
	comboboxInput.setAttribute( 'name', select.name );
	comboboxInput.setAttribute( 'aria-expanded', 'false' );
	comboboxInput.setAttribute( 'aria-haspopup', 'listbox' );
	comboboxInput.setAttribute( 'aria-autocomplete', 'none' );
	comboboxInput.setAttribute( 'aria-controls', comboboxListbox.id );
	comboboxInput.setAttribute( 'aria-activedescendant', comboboxOptions[0].id );
	comboboxInput.value = comboboxOptions[0].innerText;

	const comboboxFlex = document.createElement( 'div' );
	comboboxFlex.classList.add( 'combobox__flex' );

	const comboboxButton = document.createElement( 'button' );
	comboboxButton.classList.add( 'combobox__btn' );
	comboboxButton.setAttribute( 'tabindex', '-1' );
	comboboxButton.setAttribute( 'aria-label', 'Open Listbox' );
	comboboxButton.setAttribute( 'aria-expanded', 'false' );
	comboboxButton.setAttribute( 'aria-controls', comboboxListbox.id );
	comboboxButton.setAttribute( 'type', 'button' );
	comboboxButton.innerHTML = '<svg width="18" height="16" aria-hidden="true" focusable="false" style="forced-color-adjust: auto"> <polygon class="arrow" stroke-width="0" fill-opacity="0.75" fill="currentcolor" points="3,6 15,6 9,14"></polygon></svg>';

	comboboxOptions.forEach( option => {
		comboboxListbox.appendChild( option );
	} );

	combobox.appendChild( comboboxLabel );
	combobox.appendChild( comboboxFlex );
	comboboxFlex.appendChild( comboboxInput );
	comboboxFlex.appendChild( comboboxButton );
	combobox.appendChild( comboboxListbox );
	
	attachEditableEventListeners( combobox, comboboxInput, comboboxButton, comboboxOptions );

	return combobox;
}