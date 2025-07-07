// ₊˚ ‿︵‿︵‿︵୨୧ · · ♡ · · ୨୧‿︵‿︵‿︵ ˚₊
// Select Option
// ₊˚ ‿︵‿︵‿︵୨୧ · · ♡ · · ୨୧‿︵‿︵‿︵ ˚₊

export function selectOption( comboboxInput, targetOption, hiddenInput ) {
	const siblingOptions = option => [ ...option.parentElement.children ].filter( sibling => sibling !== option );

	siblingOptions( targetOption ).forEach( siblingOption => {
		siblingOption.setAttribute( 'aria-selected', 'false' );
		siblingOption.classList.remove( 'is-current' );
	} );

	targetOption.setAttribute( 'aria-selected', 'true' );
	targetOption.classList.remove( 'is-current' );
	comboboxInput.setAttribute( 'aria-activedescendant', targetOption.id );
	comboboxInput.ariaExpanded = 'false';

	if ( comboboxInput.nextElementSibling !== null ) {
		comboboxInput.nextElementSibling.ariaExpanded = 'false';
	}

	if ( comboboxInput.tagName === 'DIV' ) {
		comboboxInput.innerText = targetOption.innerText;
	} else {
		comboboxInput.value = targetOption.innerText;
	}
	
	if ( hiddenInput !== undefined && hiddenInput !== null ) {
		hiddenInput.value = targetOption.dataset.value;
	}
}