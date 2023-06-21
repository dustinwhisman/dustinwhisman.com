---
title: "WAS Notes: Form Labels, Instructions, and Validation | Writing | Dustin Whisman"
description: "What are the accessibility concerns we need to have in mind when we work with Form Labels, Instructions, and Validation?"
articleTitle: "Form Labels, Instructions, and Validation"
layout: default
date: 2023-04-12T00:00:00.000Z
tags:
  - writing
  - WAS certification
---

# WAS Notes: Form Labels, Instructions, and Validation

_I'm studying for the WAS certification. These are some of the notes I've taken recently._

{% include 'partials/published-date.njk' %}

## Labels

- The best way to label an input is with a `label`. Failing that, `aria-labelledby` is next best because its text is visible, then `aria-label`
- Explicit labeling via `for` and `id` attributes is slightly preferred over implicit labeling (wrapping the form element with the `label`)
- The `title` attribute is not meant for labels, so don’t use it for them even if it sort of technically works
- The `placeholder` attribute is not a replacement for labels, so never use `placeholder` alone to label an input
- Labels must have programmatically determinable text that is meaningful, so avoid images as labels (even if you have alt text, it’s not a best practice)
- Labels must not rely solely on sensory characteristics, like “The green button”
- Labels must be visible (sorry `aria-label`, your use is limited)
- Labels should be visually adjacent to what they’re labeling–the main layout to avoid is left-aligned label, right-aligned input on a wide screen
- Labels should be adjacent in DOM order to what they’re labeling
- The `for` and `id` relationship is one-to-one, so use `aria-labelledby` when multiple labels describe the same form element
- When one visual label applies to multiple form elements, like a split up phone number, use one of the following techniques:
  - Combine the separate fields into one (simply put, avoid the situation in the first place)
  - Use visually hidden `label` elements
  - Use a `label` for the first form element, then `aria-label` for the secondary form elements
  - Use a `fieldset` and `legend` to describe the group of fields, then `aria-label` or visually hidden `label` elements for each form element
- For groups of related inputs, most commonly radio buttons or checkboxes, the group label must be expressed semantically using either `fieldset`/`legend` or `aria-labelledby` with `role="group"`
- The same rules for labels about meaningful text, proximity, visibility, etc. apply to group labels

## Instructions & Other Helpful Info

- You can use these techniques to provide instructions for groups of fields:
  - Include the instructions in the `legend` if using a `fieldset`, although it may be repeated in full by screen readers for each form element
  - Associate the instructions with the first field in the group with `aria-describedby` (this is probably the best method)
  - Put the instructions before the form (if you put it inside the form, users may skip past it entirely since they’re going between focusable elements)
- Instructions must be meaningful, text-based, visible, adjacent to the elements they describe, and not based on sensory characteristics (red means required, for example)
- You may hide instructions until the user requests them, like in a “help” button that reveals instructions
- `aria-describedby` is the best method for associating validation instructions, error messages, and such with form elements
- `aria-required="true"` should be used on required fields, which should visually be indicated as required
- The `required` attribute functions slightly differently to `aria-required="true"` in that it prevents forms from submitting if there are errors, but screen readers will read it the same way
- Use `aria-invalid="true"` for invalid inputs (ideally after the user has tried to submit the form)
- It doesn’t hurt to include a summary of which inputs are invalid at the start of the form
- Use the `autocomplete` field with [valid values](https://www.w3.org/TR/WCAG21/#input-purposes) to make form entry easier for users

## Dynamic Forms & Custom Widgets

- For cases where future options in a form depend on previous choices, like cascading options, follow these best practices:
  - Change future options, not past options
  - Let users change previous options, and make it easy to do so
  - Limit access to steps when it makes sense to do so (this is very situational)
  - Number the steps, like 3 of 5, so users know where they are in the process
  - Manage keyboard focus, especially when the currently focused item disappears–you need to set where the focus goes next
  - Summarize the user’s choices/inputs before the final “Submit” button
- A change of context is a change to:
  - The user agent (opening a different app from the browser, for example)
  - The viewport (scrolling somewhere else or opening a new window)
  - The focus (moving to another element)
  - The content (meaning of the page, or elements being rearranged)
- Changes in context should be in response to user actions, not automatic or based on ambiguous interactions like hovering over or focusing on an element
- Don’t trigger changes in context under these circumstances, unless the user has been made aware of what would happen:
  - When an element is focused
  - When an element’s value changes
  - When an element is hovered over
- Use standard HTML form elements when possible rather than making your own
- Custom form elements should behave like native HTML form elements as much as possible, including things like keyboard events (arrow keys, using space or enter to activate, etc.)
- Use the [ARIA specification](https://www.w3.org/TR/wai-aria-1.1/) and [ARIA authoring practices](https://www.w3.org/TR/wai-aria-practices-1.1/) to ensure custom form elements have the correct names, roles, and values
- Use ARIA live messages to communicate changes in custom widgets

## Form Validation

- Use built-in constraints on inputs to limit the ability to put in the wrong type of information
- Restrict choices when necessary by using `select` instead of `input` when it makes sense
- Ask the user to verify information before submitting, then confirm after submission with information about how to undo the operation for destructive scenarios. Email confirmations don’t hurt, either
- You can use any of these strategies for handling error messages for forms with invalid fields
  - Add an error summary above the form, move focus to it and set `tabindex="-1"`, then use `aria-describedby` to connect parts of the summary to the relevant fields, which should have `aria-invalid="true"` set
  - Send focus to the first field that has an error, and make the error descriptions visible and connected to their corresponding fields with `aria-describedby`
  - Use inline validation with extreme caution and don’t validate on blur. You would need to use `aria-live` announcements, but those can get lost when there are competing events that need to be read by screen readers
- Error feedback should be immediately available after form submission for both sighted and non-sighted users
- Error feedback needs to be programmatically associated with the correct elements (`aria-describedby`, not just proximity), meaningful, and visible
- Success confirmation should be programmatically determinable and meaningful, and it must be visible

## Accessible Authentication

- Cognitive function tests (remembering passwords, solving puzzles, etc.) must not be required for any step in authentication unless:
  - There is an alternative method that doesn’t rely on cognitive function tests
  - A mechanism is available to help the user complete the cognitive function test
  - The test is to recognize common objects (this is not allowed for Level AAA)
  - The test is to identify personal content that was provided to the website (this is not allowed for Level AAA)

## Redundant Entry

Information that has previously been entered by the user must be either auto-populated or available for the user to select (such as when shipping and billing addresses are the same), with some exceptions like passwords for security or the old information being invalid

## Screen Reader Modes

- Screen readers have different modes of operation for page navigation or input/interaction
- Page navigation shortcuts are disabled when typing in a form control
- Only focusable elements will be read when tabbing in forms, so text in between will get skipped over if it’s not associated via `label`, `legend`, `aria-labelledby`, `aria-describedby`, or other focusable elements
- Document/Browse/Scan mode is the default mode, and users can usually navigate by semantic elements
