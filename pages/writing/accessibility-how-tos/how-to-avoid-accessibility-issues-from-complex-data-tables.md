---
title: "How to avoid accessibility issues from complex data tables - Accessibility how-tos - Writing - Dustin Whisman"
description: "Avoid complex data tables if you can. Try other methods for representing the same content. If that's not an option, proceed with caution and test with real users if possible."
articleTitle: "How to avoid accessibility issues from complex data tables"
layout: default
date: 2024-05-25T00:00:00.000Z
tags:
  - writing
  - accessibility how-tos
---

# How to avoid accessibility issues from complex data tables

{% include 'partials/published-date.njk' %}

Even simple data tables are tricky, and if you’re not a screen reader user, you’ll probably find the experience of navigating through them to be baffling. It’s best to reserve [`table`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table) elements for tabular data, meaning data that is best represented as rows and columns like a spreadsheet. If you can represent that same data in a different way, like a list (`ul`, `ol`, or `dl`) or even headings, subheadings, and content, that will probably be easier to use than a table.

If you do need to use a `table` element, make sure you have all the correct pieces in place, such as using [`thead`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/thead) for the table’s heading row, [`tbody`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/tbody) for the other rows of content, [`tr`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/tr) for rows, [`th`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/tr) for heading cells with appropriate [`scope`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/th#scope) attributes, and [`td`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/td) for normal data cells. You may also want a [`caption`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/caption) element to describe the table as well. All that is for a simple table.

```html
<!-- even this relatively simple table may be hard to understand with a screen reader -->
<table>
	<caption>When to use different organizational elements</caption>
	<thead>
		<tr>
			<td></td>
			<th scope="col">ul</th>
			<th scope="col">ol</th>
			<th scope="col">dl</th>
			<th scope="col">table</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<th scope="row">Name</th>
			<td>Unordered list</td>
			<td>Ordered list</td>
			<td>Description list</td>
			<td>Table</td>
		</tr>
		<tr>
			<th scope="row">Implicit ARIA role</th>
			<td>list</td>
			<td>list</td>
			<td>no corresponding role</td>
			<td>table</td>
		</tr>
		<tr>
			<th scope="row">Use cases</th>
			<td>A list of items where order does not matter</td>
			<td>A list of items where order matters</td>
			<td>A list of terms that warrant definitions or descriptions</td>
			<td>A set of data best represented by columns and rows</td>
		</tr>
	</tbody>
</table>
```

Adding interactive elements within cells is likely to make it harder to understand their purpose, since the user needs to know which row and/or column the cell belongs to, as well as the label for the control itself, such as a checkbox to select the row for deletion or a link to a page for editing data in the row. [Sorting the table by column](https://adrianroselli.com/2021/04/sortable-table-columns.html) has its own challenges, let alone adding any type of filtering.

Screen readers also struggle with cells that span multiple rows and/or columns, so those are best avoided if possible. Tables are also famously difficult to make work on small screens or to implement sticky header rows/columns. Long story short, use tables as a last resort, only after exercising all other options, and when you do, test with real users to identify pain points.

{% include 'partials/article-pagination.njk' %}
