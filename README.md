# Natbox

## Description

Natbox is an accessible Combobox pattern creator deleloped by Natalia Bloom according to the guidelines provided by [ARIA Authoring Practices Guide (APG)](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/).

The goal of this project is to provide an accessible, easy to use, easy to restyle, mobile-friendly, and up-to-date combobox, more commonly known as a select.

## Usage

Natbox requires a select element with label to create its elements. You need to provide either a node element or a selector for the target element(s). That's it! The next step is to restyle the elements should you want to.

## Guide & Example

The first step is to install the package. This is achieved with the following command:

`npm i natbox`

Next you need to import the library's styles. In the preferred stylehseet file paste the following code:

`@import 'natbox/styles.css';`

After that you need to import the main function of the library. In any `.js` file of `type="module"` paste the following import statement:

`import { Natbox } from "natbox";`

The final step is to initialize the combobox. Here's an example HTML select element:

```html
<div class="js-select">
	<label for="field-fruit">Choose a fruit:</label>

	<select name="field-fruit" id="field-fruit" class="js-select-element">
		<option value="apple">Apple</option>
		<option value="orange">Orange</option>
		<option value="pineapple">Pineapple</option>
		<option value="tomato">Tomato</option>
		<option value="watermelon">Watermelon</option>
	</select><!-- /#field-fruit.js-select-element -->
</div><!-- /.js-select -->
```

You can initialize the pattern with:

- a node: `Natbox( document.querySelector( '#field-fruit' ) );`
- an ID: `Natbox( '#field-fruit' );`
- a class: `Natbox( '.js-select-element' );`
- an element: `Natbox( 'select' );`

## Features

Currently, Natbox has the following accessibility featured described in [Select-Only Combobox Example](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/):

### 1. Closed Combobox

| Key | Function |
| ------------- | ------------- |
| Enter | Opens the listbox. |
| Space | Opens the listbox. |
| Down Arrow | Opens the listbox. |
| Up Arrow | Opens the listbox and moves visual focus to the first option. |
| Home | Opens the listbox and moves visual focus to the first option. |
| End | Opens the listbox and moves visual focus to the last option. |

### 2. Open Combox

| Key | Function |
| ------------- | ------------- |
| Enter | Sets the value to the content of the focused option in the listbox and closes the listbox. |
| Space | Sets the value to the content of the focused option in the listbox and closes the listbox. |
| Tab | Sets the value to the content of the focused option in the listbox, closes the listbox and performs the default action, moving focus to the next focusable element. |
| Escape | Closes the listbox. |
| Down Arrow | Moves visual focus to the next option. |
| Up Arrow | Moves visual focus to the previous option. |
| Alt + Up Arrow | Sets the value to the content of the focused option in the listbox and closes the listbox. |
| Home | Moves visual focus to the first option. |
| End | Moves visual focus to the last option. |
| PageUp | Jumps visual focus up 10 options (or to first option). |
| PageDown | Jumps visual focus down 10 options (or to last option). |

### What still needs to be implemented?

Support for *Printable Characters* is missing but will be added as soon as possible.

## FAQ

1. Is Natbox accessible?

Yes, that's the reason it exists.

2. Does Natbox work on mobile?

Yes. Unlike other, inaccessible, libraries Natbox works on mobile as well.

3. Will there be more featured add in the future?

Yes! There are many features planned for future updates like the ability to visually hide the label, search, autocomplete, popups, etc. The idea is to implement all pattern examples from the [Combobox Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/) and give delevelopers the full freedom to easily add accessible and mobile-friendly comboboxes to their projects.

4. Can I restyle the elements?

Yes. Only classes and attribute selectors have been used to style them following the BEM naming convention. **Remember not to break the accessibility of the pattern with your styles.** There is no point in using the library otherwise.