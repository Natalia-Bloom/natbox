/**
 * Natbox
 */

function selectOption( comboboxInput, targetOption, hiddenInput ) {
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

function highlightOption( comboboxInput, targetOption, windowPosition ) {
	targetOption.classList.add( 'is-current' );
	comboboxInput.setAttribute( 'aria-activedescendant', targetOption.id );
	targetOption.scrollIntoView();
	window.scroll( windowPosition[0], windowPosition[1] );
}

// function getTypedString( key, typedString, typeTimeout ) {
// 	if ( typeof typeTimeout === 'number' ) {
// 		window.clearTimeout( typeTimeout );
// 	}

// 	typeTimeout = window.setTimeout(() => {
// 		typedString = '';
// 	}, 500);

// 	typedString += key;

// 	return typedString;
// }

function handleTypedCharacters( comboboxInput, comboboxOptions, previousKey, currentKey ) {
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

function attachListeners( combobox, input, options, hiddenInput ) {
	input.addEventListener( 'focus', function() {
		input.classList.add( 'is-focused' );
	} );

	input.addEventListener( 'focusout', function() {
		input.classList.remove( 'is-focused' );
	} );

	let previousKey = null;
	// let typeTimeout = null;
	// let typedString = '';

	input.addEventListener( 'keydown', function(e) {
		const { scrollX, scrollY } = window;

		if ( input.ariaExpanded === 'false' ) { // Interactions for when the combobox is CLOSED
			e.preventDefault();
			input.ariaExpanded = 'true';

			if ( e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
				const targetOption = combobox.querySelector( '[role="option"][aria-selected="true"]' );

				highlightOption( input, targetOption, [ scrollX, scrollY ] );
			} else if ( e.key === 'ArrowUp' || e.key === 'Home' ) {
				const targetOption = options[0];

				highlightOption( input, targetOption, [ scrollX, scrollY ] );
			} else if ( e.key === 'End' ) {
				const targetOption = options[ options.length - 1 ];

				highlightOption( input, targetOption, [ scrollX, scrollY ] );
			} else if ( e.key === 'Backspace' || e.key === 'Clear' || ( e.key.length === 1 && e.key !== ' ' && ! e.altKey && ! e.ctrlKey && ! e.metaKey ) ) {
				// typedString = getTypedString( e.key, typedString, typeTimeout );

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

				const selectedOption = combobox.querySelector( '[role="option"].is-current' );

				selectOption( input, selectedOption, hiddenInput );
			} else if ( e.key === 'Home' ) {
				e.preventDefault();

				options.forEach( option => {
					option.classList.remove( 'is-current' );
				} );

				const targetOption = options[0];

				highlightOption( input, targetOption, [ scrollX, scrollY ] );
			} else if ( e.key === 'End' ) {
				e.preventDefault();

				options.forEach( option => {
					option.classList.remove( 'is-current' );
				} );

				const targetOption = options[ options.length - 1 ];

				highlightOption( input, targetOption, [ scrollX, scrollY ] );
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
				// typedString = getTypedString( e.key, typedString, typeTimeout );

				handleTypedCharacters( input, options, previousKey, e.key );

				previousKey = e.key;
			}
		}

		// Printable Characters

		// Printable Characters
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
			input.textContent = option.textContent;
			input.ariaExpanded = 'false';
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

function createMarkup( select, label, options ) {
	const index = document.querySelectorAll( '.js-combobox' ).length;

	const combobox = document.createElement( 'div' );
	combobox.classList.add( 'combobox', 'js-combobox' );

	const comboboxLabel = document.createElement( 'div' );
	comboboxLabel.classList.add( 'combobox__label' );
	comboboxLabel.setAttribute( 'id', 'combobox-' + index + '-label' );
	comboboxLabel.innerText = label;

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

export function Natbox( selector, params = {} ) {
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