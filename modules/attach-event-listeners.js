// ₊˚ ‿︵‿︵‿︵୨୧ · · ♡ · · ୨୧‿︵‿︵‿︵ ˚₊
// Attach Event Listeners
// ₊˚ ‿︵‿︵‿︵୨୧ · · ♡ · · ୨୧‿︵‿︵‿︵ ˚₊

import { selectOption } from './select-option.js';
import { highlightOption } from './highlight-option.js';
import { handleTypedCharacters } from './handle-typed-characters.js';

export function attachSelectOnlyEventListeners( combobox, input, options, hiddenInput ) {
	input.addEventListener( 'focus', function() {
		input.classList.add( 'is-focused' );
	} );

	input.addEventListener( 'focusout', function() {
		input.classList.remove( 'is-focused' );
	} );

	let previousKey = null;

	input.addEventListener( 'keydown', function(e) {
		const { scrollX, scrollY } = window;

		if ( input.ariaExpanded === 'false' ) { // Interactions for when the combobox is CLOSED
			e.preventDefault();
			input.ariaExpanded = 'true';

			if ( e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ' ) {
				highlightOption( input, combobox.querySelector( '[role="option"][aria-selected="true"]' ), [ scrollX, scrollY ] );
			} else if ( e.key === 'ArrowUp' || e.key === 'Home' ) {
				highlightOption( input, options[0], [ scrollX, scrollY ] );
			} else if ( e.key === 'End' ) {
				highlightOption( input, options[ options.length - 1 ], [ scrollX, scrollY ] );
			} else if ( e.key === 'Backspace' || e.key === 'Clear' || ( e.key.length === 1 && e.key !== ' ' && ! e.altKey && ! e.ctrlKey && ! e.metaKey ) ) {
				handleTypedCharacters( input, options, previousKey, e.key );
				previousKey = e.key;
			}
		} else if ( input.ariaExpanded === 'true' ) { // Interactions for when the combobox is OPEN
			if ( e.key === 'Enter' || e.key === ' ' ) {
				e.preventDefault();
				let selectedOption = combobox.querySelector( '[role="option"].is-current' );

				if ( selectedOption === null ) {
					selectedOption = combobox.querySelector( '[role="option"][aria-selected="true"]' );
				}

				selectOption( input, selectedOption, hiddenInput );
			} else if ( e.key === 'Tab' ) {
				let selectedOption = combobox.querySelector( '[role="option"].is-current' );

				if ( selectedOption === null ) {
					selectedOption = combobox.querySelector( '[role="option"][aria-selected="true"]' );
				}

				selectOption( input, selectedOption, hiddenInput );
			} else if ( e.key === 'Escape' ) {
				input.ariaExpanded = 'false';

				options.forEach( option => {
					option.classList.remove( 'is-current' );
				} );
			} else if ( e.key === 'ArrowDown' ) {
				e.preventDefault();

				let currentOption = combobox.querySelector( '[role="option"].is-current' );

				if ( currentOption === null ) {
					currentOption = combobox.querySelector( '[role="option"][aria-selected="true"]' );
				}

				const nextOption = currentOption.nextElementSibling;

				if ( nextOption !== null ) {
					currentOption.classList.remove( 'is-current' );

					highlightOption( input, nextOption, [ scrollX, scrollY ] );
				}
			} else if ( e.key === 'ArrowUp' && ! e.altKey ) {
				e.preventDefault();

				let currentOption = combobox.querySelector( '[role="option"].is-current' );

				if ( currentOption === null ) {
					currentOption = combobox.querySelector( '[role="option"][aria-selected="true"]' );
				}

				const previousOption = currentOption.previousElementSibling;

				if ( previousOption !== null ) {
					currentOption.classList.remove( 'is-current' );

					highlightOption( input, previousOption, [ scrollX, scrollY ] );
				}
			} else if ( e.key === 'ArrowUp' && e.altKey ) {
				e.preventDefault();

				let selectedOption = combobox.querySelector( '[role="option"].is-current' );

				if ( selectedOption === null ) {
					selectedOption = combobox.querySelector( '[role="option"][aria-selected="true"]' );
				}

				selectOption( input, selectedOption, hiddenInput );
			} else if ( e.key === 'Home' ) {
				e.preventDefault();

				options.forEach( option => {
					option.classList.remove( 'is-current' );
				} );

				highlightOption( input, options[0], [ scrollX, scrollY ] );
			} else if ( e.key === 'End' ) {
				e.preventDefault();

				options.forEach( option => {
					option.classList.remove( 'is-current' );
				} );

				highlightOption( input, options[ options.length - 1 ], [ scrollX, scrollY ] );
			} else if ( e.key === 'PageUp' ) {
				e.preventDefault();

				const currentIndex = Array.prototype.indexOf.call(options, combobox.querySelector( '[role="option"].is-current' ));
				let targetOption = options[ currentIndex - 10 ];

				if ( targetOption === undefined ) {
					targetOption = options[0];
				}

				options.forEach( option => {
					option.classList.remove( 'is-current' );
				} );

				highlightOption( input, targetOption, [ scrollX, scrollY ] );
			} else if ( e.key === 'PageDown' ) {
				e.preventDefault();

				const currentIndex = Array.prototype.indexOf.call( options, combobox.querySelector( '[role="option"].is-current' ) );
				let targetOption = options[ currentIndex + 10 ];

				if ( targetOption === undefined ) {
					targetOption = options[ options.length - 1 ];
				}

				options.forEach( option => {
					option.classList.remove( 'is-current' );
				} );

				highlightOption( input, targetOption, [ scrollX, scrollY ] );
			} else if ( e.key === 'Backspace' || e.key === 'Clear' || ( e.key.length === 1 && e.key !== ' ' && ! e.altKey && ! e.ctrlKey && ! e.metaKey ) ) {
				handleTypedCharacters( input, options, previousKey, e.key );
				previousKey = e.key;
			}
		}
	} );

	input.addEventListener( 'click', function() {
		input.ariaExpanded = input.ariaExpanded === 'false' ? 'true' : 'false';

		options.forEach( option => {
			option.classList.remove( 'is-current' );
		} );
	} );

	options.forEach( option => {
		option.addEventListener( 'click', function() {
			options.forEach( option => {
				option.setAttribute( 'aria-selected', 'false' );
			} );

			option.setAttribute( 'aria-selected', 'true' );

			input.setAttribute( 'aria-activedescendant', option.id );
			input.ariaExpanded = 'false';
			input.innerText = option.innerText;
		} );

		option.addEventListener( 'mouseenter', function() {
			input.setAttribute( 'aria-activedescendant', option.id );
		} );
	} );

	document.addEventListener( 'click', function(e) {
		if ( ! ( e.target.classList.contains( 'js-combobox' ) || e.target.closest( '.js-combobox' ) ) && input.ariaExpanded === 'true' ) {
			let selectedOption = combobox.querySelector( '[role="option"].is-current' );

			if ( selectedOption === null ) {
				selectedOption = combobox.querySelector( '[role="option"][aria-selected="true"]' );
			}

			selectOption( input, selectedOption, hiddenInput );
		}
	} );
}

export function attachEditableEventListeners( combobox, input, button, options ) {
	input.addEventListener( 'focus', function() {
		input.classList.add( 'is-focused' );
	} );

	input.addEventListener( 'focusout', function() {
		input.classList.remove( 'is-focused' );
	} );

	input.addEventListener( 'keydown', function(e) {
		const { scrollX, scrollY } = window;

		if ( input.ariaExpanded === 'false' ) { // Interactions for when the combobox is CLOSED
			if ( e.altKey && e.key === 'ArrowDown' ) {
				e.preventDefault();
				input.ariaExpanded = 'true';
				button.ariaExpanded = 'true';
			} else if ( ! e.altKey && e.key === 'ArrowDown' ) {
				e.preventDefault();
				input.ariaExpanded = 'true';
				button.ariaExpanded = 'true';
				highlightOption( input, options[0], [ scrollX, scrollY ] );
		 	} else if ( e.key === 'ArrowUp' ) {
				e.preventDefault();
				input.ariaExpanded = 'true';
				button.ariaExpanded = 'true';
				highlightOption( input, options[ options.length - 1 ], [ scrollX, scrollY ] );
			} else if ( e.key === 'Enter' ) {
				e.preventDefault();
				input.ariaExpanded = 'false';
				button.ariaExpanded = 'false';
			} else if ( e.key === 'Backspace' || e.key === 'Clear' || ( e.key.length === 1 && e.key !== ' ' && ! e.altKey && ! e.ctrlKey && ! e.metaKey ) ) {
				input.ariaExpanded = 'true';
				button.ariaExpanded = 'true';
				highlightOption( input, options[0], [ scrollX, scrollY ] );

				options.forEach( option => {
					option.classList.remove( 'is-current' );
				} );
			}
		} else if ( input.ariaExpanded === 'true' ) { // Interactions for when the combobox is OPEN
			if ( e.key === 'Enter' ) {
				e.preventDefault();
				let selectedOption = combobox.querySelector( '[role="option"].is-current' );

				if ( selectedOption === null ) {
					selectedOption = combobox.querySelector( '[role="option"][aria-selected="true"]' );
				}

				selectOption( input, selectedOption );
			} else if ( e.key === 'Tab' ) {
				let selectedOption = combobox.querySelector( '[role="option"].is-current' );

				if ( selectedOption === null ) {
					selectedOption = combobox.querySelector( '[role="option"][aria-selected="true"]' );
				}

				selectOption( input, selectedOption );
			} else if ( e.key === 'Escape' ) {
				input.ariaExpanded = 'false';
				button.ariaExpanded = 'false';

				options.forEach( option => {
					option.classList.remove( 'is-current' );
				} );
			} else if ( e.key === 'ArrowDown' ) {
				e.preventDefault();

				let currentOption = combobox.querySelector( '[role="option"].is-current' );

				if ( currentOption === null ) {
					currentOption = options[0];
				}

				let nextOption = currentOption.nextElementSibling;

				if ( nextOption === null ) {
					nextOption = options[0];
				}

				currentOption.classList.remove( 'is-current' );
				highlightOption( input, nextOption, [ scrollX, scrollY ] );
			} else if ( e.key === 'ArrowUp' ) {
				e.preventDefault();

				let currentOption = combobox.querySelector( '[role="option"].is-current' );

				if ( currentOption === null ) {
					currentOption = options[ options.length -1 ];
				}

				let previousOption = currentOption.previousElementSibling;

				if ( previousOption === null ) {
					previousOption = options[ options.length -1 ];
				}

				currentOption.classList.remove( 'is-current' );
				highlightOption( input, previousOption, [ scrollX, scrollY ] );
			} else if ( e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'End' || e.key === 'Home' ) {
				options.forEach( option => {
					option.classList.remove( 'is-current' );
				} );
			} else if ( e.key === 'Backspace' || e.key === 'Clear' || ( e.key.length === 1 && e.key !== ' ' && ! e.altKey && ! e.ctrlKey && ! e.metaKey ) ) {
				options.forEach( option => {
					option.classList.remove( 'is-current' );
				} );
			}
		}
	} );

	input.addEventListener( 'click', function() {
		input.ariaExpanded = input.ariaExpanded === 'false' ? 'true' : 'false';
		button.ariaExpanded = button.ariaExpanded === 'false' ? 'true' : 'false';

		options.forEach( option => {
			option.classList.remove( 'is-current' );
		} );
	} );

	button.addEventListener( 'click', function() {
		button.ariaExpanded = button.ariaExpanded === 'false' ? 'true' : 'false';
		input.ariaExpanded = input.ariaExpanded === 'false' ? 'true' : 'false';

		options.forEach( option => {
			option.classList.remove( 'is-current' );
		} );
	} );

	options.forEach( option => {
		option.addEventListener( 'click', function() {
			options.forEach( option => {
				option.setAttribute( 'aria-selected', 'false' );
			} );

			option.setAttribute( 'aria-selected', 'true' );

			input.setAttribute( 'aria-activedescendant', option.id );
			input.ariaExpanded = 'false';
			button.ariaExpanded = 'false';
			input.value = option.innerText;
		} );

		option.addEventListener( 'mouseenter', function() {
			input.setAttribute( 'aria-activedescendant', option.id );
		} );
	} );

	document.addEventListener( 'click', function(e) {
		if ( ! ( e.target.classList.contains( 'js-combobox' ) || e.target.closest( '.js-combobox' ) ) && input.ariaExpanded === 'true' ) {
			let selectedOption = combobox.querySelector( '[role="option"].is-current' );

			if ( selectedOption === null ) {
				selectedOption = combobox.querySelector( '[role="option"][aria-selected="true"]' );
			}

			selectOption( input, selectedOption );
		}
	} );
}