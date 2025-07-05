// ₊˚ ‿︵‿︵‿︵୨୧ · · ♡ · · ୨୧‿︵‿︵‿︵ ˚₊
// Select Option
// ₊˚ ‿︵‿︵‿︵୨୧ · · ♡ · · ୨୧‿︵‿︵‿︵ ˚₊

export function selectOption( comboboxInput, targetOption, hiddenInput ) {
	const siblingOptions = option => [ ...option.parentElement.children ].filter( sibling => sibling !== option );

	siblingOptions( targetOption ).forEach( siblingOption => {
		siblingOption.setAttribute( 'aria-selected', 'false' );
	} );

	targetOption.setAttribute( 'aria-selected', 'true' );
	comboboxInput.setAttribute( 'aria-activedescendant', targetOption.id );
	comboboxInput.textContent = targetOption.textContent;
	comboboxInput.ariaExpanded = 'false';
	hiddenInput.value = targetOption.dataset.value;
}