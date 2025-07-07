// ₊˚ ‿︵‿︵‿︵୨୧ · · ♡ · · ୨୧‿︵‿︵‿︵ ˚₊
// Highlight Option
// ₊˚ ‿︵‿︵‿︵୨୧ · · ♡ · · ୨୧‿︵‿︵‿︵ ˚₊

export function highlightOption( comboboxInput, targetOption, windowPosition ) {
	targetOption.parentElement.querySelectorAll( '[role="option"]' ).forEach( option => {
		option.classList.remove( 'is-current' );
	} );

	targetOption.classList.add( 'is-current' );
	comboboxInput.setAttribute( 'aria-activedescendant', targetOption.id );
	targetOption.scrollIntoView();
	window.scroll( windowPosition[0], windowPosition[1] );
}