---
title: "Relearning Angular - Writing - Dustin Whisman"
description: "After 14 versions and more than 6 years away from Angular, I'm learning it again (for the first time). I have some first impressions about what's good, bad, or ugly about it."
articleTitle: "Relearning Angular"
layout: default
date: 2023-02-21T00:00:00.000Z
tags:
  - writing
  - learning in public
---

# Relearning Angular

{% include 'partials/published-date.njk' %}

The last time I worked professionally with Angular, it was [version 1](https://angularjs.org/), and it was a big step up from some of the other options from that time (I had been using [Knockout](https://knockoutjs.com/)). I also moved on from Angular pretty quickly, partially because a job change meant a change of stack and also because React and Vue started to gain notoriety/popularity.

Now that it's been about 8 years, I'm going to be working on a project using Angular again, so I've been taking a look at what's changed in the past 14 major version updates. I'll be looking at the big problems that frameworks try to solve and how Angular approaches those problems.

## Keeping the UI in Sync with State

This is arguably the whole point of JS frameworks because it's just plain _difficult_ to do with vanilla JS. So how does their declarative HTML approach work for common situations?

### Loops

Angular uses custom directives (essentially attributes using JS syntax) for a lot of things, including looping. The `*ngFor` directive is how they handle loops, and it looks a little something like this:

```html
<ul>
  <li *ngFor="let item of items">{% raw %}{{ item }}{% endraw %}</li>
</ul>
```

If you wanted to use the index of the `item` in the `items` array, you could do so using local variables, like so:

```html
<ul>
  <li *ngFor="let item of items; index as i">{% raw %}{{ i }}{% endraw %}: {% raw %}{{ item }}{% endraw %}</li>
</ul>
```

There are a handful of local variables made available, including `index`, `count`, `first`, `last`, `even` and `odd`, so if you needed to apply special rules to items based on any of those criteria, you could.

### Conditional Rendering

If you're familiar with Vue, then you know how nice the `v-if`, `v-else-if`, and `v-else` directives are to work with—it's nice and declarative and easy to reason about. Angular's approach, using `*ngIf`, is pretty similar but it handles `else` logic a little differently.

A standard case where you want to render an element if the condition is true looks something like this:

```html
<div *ngIf="someCondition">
  Content to render
</div>
```

Nothing too weird there, but if you want to show something else when that condition isn't true, then you'd need to do something like this:

```html
<div *ngIf="someCondition; else elseBlock">
  Content to render
</div>
<ng-template #elseBlock>
  Content to render when the condition is falsy
</ng-template>
```

It's unclear to me whether you need to use `ng-template` for the `else` content, but that's what the [documentation](https://angular.io/api/common/NgIf#description) uses for its examples. It appears that `else-if` logic isn't explicitly supported.

### Two Way Data-binding

Data-binding in Angular is super simple. For stuff that you want rendered in an element, you use the double curly brace syntax like Handlebars, and if you're binding to an attribute, you surround the attribute name with square brackets.

```html
<button type="button" [disabled]="isButtonDisabled">
  {% raw %}{{ buttonText }}{% endraw %}
</button>
```

As long as you have those variables set up in your component definition, it should _just work_.

```ts
@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class RadioGroupComponent {
  isButtonDisabled = false;
  buttonText = 'Click Me!';

  constructor() {}
}
```

### Event Handlers

For event handlers, you declare the event you're watching for with parentheses and tell it what function to call when that event happens. Using our button example from earlier, the HTML might look like this:

```html
<button type="button" [disabled]="isButtonDisabled" (click)="handleClick()">
  {% raw %}{{ buttonText }}{% endraw %}
</button>
```

Then, in the JS, we'd need to have a `handleClick` function set up.

```ts
@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class RadioGroupComponent {
  isButtonDisabled = false;
  buttonText = 'Click Me!';

  constructor() {}

  handleClick() {
    console.log('Clicked!');
  }
}
```

## Component-based Architecture

With the basic syntax out of the way, let's take a step back and look at the architecture of Angular. It's component-based, like most major frameworks, and in practice that looks like different folders for each component, each of which contains an `html`, `css`, `ts`, and `spec.ts` file.

This is a sensible approach, as it allows for separation of concerns while still keeping components organized. My favorite aspect of working with Angular so far is the generators that the CLI provides. Running `ng generate component my-component` will create all of the necessary files for you and update your `app.module.ts` file such that the component is immediately available to be used wherever you want it.

All of this enforces a minimum level of consistency and considerably speeds up the work of creating a new component. One drawback of this, though, is that the automatically generated tests aren't particularly useful, and it would be all too easy to commit them as-is rather than changing them to fit the component better. Also, shielding developers from the complexity can create a barrier to understanding what's actually going on when components are created.

## State Management

Component state is managed in the `class` that gets exported for each component. This makes for pretty simple state management, although you need to be aware of some of the pitfalls of using the `this` keyword. It's certainly nicer than `useState` in React, in my opinion.

For more global state, Angular makes use of services and providers, which I'll admit I haven't looked too deep into. There's a strong undercurrent of dependency injection in Angular, and I think that sets it apart from other frameworks more so than anything else about it. I look forward to digging into that more soon.

For parent-child communication, Angular uses the `@Input` and `@Output` decorators. You can think of `@Input` as props that are passed down from the parent to the child. To send data back up to the parent, the `@Output` property is used to emit events that the parent listens for. I won't get into the details here, since the [documentation](https://angular.io/guide/inputs-outputs) covers it well, but I like this event-based approach. Events are so underused in typical development!

## Routing

Like most frameworks, Angular is unfortunately built primarily with single-page applications (SPAs) in mind. This has implications for progressive enhancement, although if you use [Angular Universal](https://angular.io/guide/universal) for server-side rendering (SSR), that can be mitigated. It also means that there needs to be special routing logic set up.

Fortunately, routing seems pretty simple in Angular. You need an `app-routing.module.ts` file set up (which it most likely is if you set up your project from the CLI), and then you need to define your paths.

Once your paths are set up, you can link to them with standard `a` elements using the `href` attribute, which will cause the page to reload, or you can use the `routerLink` attribute for client-side routing. It looks like other helper attributes could be useful, including `queryParams` and `fragment`, but I haven't dug into those yet.

One gotcha that I ran into is that you'll need to set up redirects on your server to point every route to `index.html`, otherwise you'll see 404s for everything.

## Styling

Nothing is stopping you from having one global CSS file to handle all styling, but it seems like component-scoped styles are highly encouraged. The strategy seems similar to Vue's scoped styles, where a custom attribute is added to elements and selectors are updated accordingly. This seems to happen at runtime, so beware of possible performance implications.

## First Impressions

Overall, I think Angular does a good job of using conventions and keeping things relatively simple for developers. When I was working on a [little test project](https://conundrum.dustinwhisman.com) to familiarize myself with it, I found that the framework mostly got out of the way, and I was spending most of my time on the project-specific details instead of fighting the framework.

Some of the things that struck me as strange might just take some time to get used to. Some architectural concepts are intriguing, and I look forward to going deeper as I keep working with Angular.

Do I have qualms? Of course, but that would be true for any framework. My biggest complaint is the bundle size—for the project I was using to learn, it came out to 76.41 kB uncompressed, which is simply too much for what I built. I also don't love the SPA-centric focus, but maybe Angular Universal helps with these things? I just don't know at this point.

Anyway, I look forward to learning more as I keep working with it. At the very least, it's interesting to see how the approaches for common problems differ between the major frameworks.

{% include 'partials/article-pagination.njk' %}
