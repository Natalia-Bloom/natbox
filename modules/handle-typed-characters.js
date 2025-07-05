// ₊˚ ‿︵‿︵‿︵୨୧ · · ♡ · · ୨୧‿︵‿︵‿︵ ˚₊
// Handle Typed Characters
// ₊˚ ‿︵‿︵‿︵୨୧ · · ♡ · · ୨୧‿︵‿︵‿︵ ˚₊

import { highlightOption } from './highlight-option.js';

export function handleTypedCharacters( comboboxInput, comboboxOptions, previousKey, currentKey ) {
	let viableOptions = [];

	comboboxOptions.forEach( option => {
		if ( currentKey === option.innerText[0].toLowerCase() ) {
			viableOptions.push( option );
		}
	} );

	let targetOption = viableOptions[0];

	if ( previousKey === currentKey ) {
		const previousIndex = Array.prototype.indexOf.call( viableOptions, comboboxInput.parentElement.querySelector( '[role="option"].is-current' ) );

		targetOption = viableOptions[ previousIndex + 1 ] ?? viableOptions[0];
	}

	if ( targetOption !== undefined ) {
		comboboxOptions.forEach( option => {
			option.classList.remove( 'is-current' );
		} );

		highlightOption( comboboxInput, targetOption, [ scrollX, scrollY ] );
	}
}