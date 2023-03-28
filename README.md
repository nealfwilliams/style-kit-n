![Logo](https://i.imgur.com/3cJPNGe.png)

# Introduction

`style-kit-n` is a library for managing styles in `React` and `React-Native` without writing CSS.

`style-kit-n` was originally developed as a way to style React Native in lieu of CSS. After using
the library, going back to CSS-centered approaches felt like a regression in developer experience,
so the library was adapted for use on the web.

`style-kit-n` combines the benefits of two popular approaches to styling:
- utility-first frameworks (eg. `tailwind`)
- css-in-js (eg. `styled-components`)

The guiding philosophy of `style-kit-n` is that writing CSS is never a good developer experience. 
`style-kit-n` providing a React component architecture for managing styles that takes full advantage
of developer experience (DX) benefits of Typescript and React.

## Why so bad about CSS?
### Maintainability
Using CSS is prone to code rot, technical debt, and human error. Here are some reasons why CSS is hard to 
maintain:

#### Lack of tooling
Typescript has some great tooling to help devs understand and modify codebases quickly without careless mistakes.
The tooling for CSS pales in comparison.

#### Scope management
Because CSS classes use a global scope, managing CSS becomes painful as projects grow.
CSS's specificity system provides a way to deal with this, but creates its own headaches.
For example, if a shared component refactors its styling in a way that increased its specificity,
downstream usage of that component that overrides those styles can break.

Lack of proper scoping also hurts a developer's ability to confidently make changes without unintentionally 
changing other parts of an app. This leads to regressions and code rot (legacy code that engineers are
too afraid to touch).

Modularizing CSS can avoid some scope issues, but introduces new challenges to reusability. 

#### Harmful indirection
CSS is often touted as a way to isolate styling as an independent concern.

However, the reality of most modern web applications is that styling is an essential part of an
application's usability. If an application needs styling to be used successfully, then treating 
styles as an independent silo of information is an invitation to break things.

The Tailwind creator authored a compelling article on 

### Explainability and Documentation
There aren't universal existing standards for documenting CSS classes and their usage patterns, so engineers
are often left guessing the correct context to use existing classes, creating redundant classes that violate DRY,
or copy-pasting.

In comparison, React components present a clear model for explainabilitiy. Tools like 
`storybook` and `styleguidist` provide as an easy way to document components
and their usage patterns that can be shared across an organization.

### Usability with React
React's component-based architecture provides an intuitive and natural way to encapsulate the 
behavior and structure of DOM elements.

Use CSS classes directly within a dynamic React component requires mapping that component's
properties and state to various CSS class names. This creates an additional layer of complexity that
makes application harder to maintain and easier to break.

`style-kit-n` is built with React and Typescipt DX as its first priority. The intention of `style-kit-n` 
is to build a framework that feels as natural and accessibility to developers as any other part of 
the React ecosystem.



## How does it work?
### Creating components
Components are declared in a way similar to `styled-component`, with a function that takes in a base element
and the styles to apply to it. Styles can be either specified directly or using utility props to automatically
pull values from your app's theme (recommended).

```tsx
import styled from '@style-kit-n/web';

const Card = styled('div', {
  // Use utility props to pull values from the design system
  pt: 4,

  // Include direct styles by defining them with the "styles" key
  styles: {
    border: 'solid black 1px'
  }
})

const MyComponent = () => (
  <Card>Hello World</Card>
);
```

`style-kit-n` also comes with pre-defined base components ready to import and use.
```tsx
import {Column, Row} from '@style-kit-n/web'

const MyComponent = () => (
  <Row>
    <Column>
      Hello world
    </Column>
  </Row>
)
```

All utility props can be applied to components directly. All components defined using `styled` or imported
from `style-kit-n` have access to all utility props.

```tsx
import {Box} from '@style-kit-n/web'

const MyComponent = () => (
  <Box py={4} border>
    Hello World
  </Box>
)
```

### Theming
`style-kit-n` style props works by in pulling values from your design system or "theme."

The theme contains contains standard values for colors, spacing, typography and more.

`style-kit-n` includes a default theme that can be overwritten by passing a `theme` prop to the
applicable Provider component for your environment. The provided `theme` will be merged into the
default `theme`.

More documentation on theme and prop styles in development.

```tsx
import { WebProvider } from '@style-kit-n/web';

const App = () => {
  <WebProvider theme={{
    colors: {
      primary: 'red'
    },
    fontFamilies: {
      default: 'Roboto, sans-serif'
    },
  }}>
    <MyApp />
  </WebProvider>
};
```

### Dynamic Styles
`style-kit-n` binds dynamic styles to React props in clean and intuitive way.

A function can be provided as the style parameters to specify styles that respond to props.

```tsx
type ButtonProps = {
  size: 'small' | 'large'
}

const Button = styled<ButtonProps>(
  'button',
  ({size}) => ({
    // mapping component prop to utility style prop
    px: size === 'small' ? 2 : 3,

    // mapping component prop to direct styles
    styles: {
      fontSize: size === 'small' ? '12px' : '14px'
    }
  });
);
```

### Extending components
Any `react-kit-n` component can be easily extended by passing it as the first argument of
the `styled` function. The new component will retain all static and dynamic styles from its parent.

```tsx
const Button = styled('button', {
  p: 2,
  border: true,
  clickable: true,
});

const SubmitButton = styled(Button, {
  bg: 'primary',
  color: 'textOnPrimary'
});
```

### Pseudo-selectors
All `css` pseudo-selectors are not currently supported, but `style-kit-n` offers an alternative way to
handle hover and focus states. Hover and focus styles can be specified using the `styles` parameter
of the `styled` function.

```tsx
const Button = styled(
  'button',
  {
    // Styles will only be added on hover
    hover: {
      bg: 'primaryTint'
    },

    // Styles will only be added on focus
    focus: {
      bordered: true
      borderColor: 'focus'
    }
  }
);
```

Under the hood, these are managed with Javascript events. A Tailwind adaptor is under development
that will manage these under the hood with Tailwind utility classes.

### Media queries
Supporting media queries is an important requirement when building responsive web apps.

Media queries can be implemented by passing a 'media' property in the styles parameter. This object
supports the following keys as demonstrated below.
- `sm`, `md`, `lg`, `xl`, `2xl`

```tsx
const Button = styled(
  'button',
  {
    media: {
      // Affects all screens at least as wide as the sm breakpoint
      sm: {
        p: 2,
      },
      // Affects all screens narrower than the lg breakpoint
      'max-lg': {
        p: 2
      },
      // Affects all screens at least as wide as the sm breakpoint and narrower than the lg breakpoint
      'sm,max-lg': {
        p: 2
      },
    },
  }
);
```

In order to support media queries, the `StyleKitNProvider` needs to included at the root of your app.

## FAQ

### Isn't direct styles on html bad practice?
The primary reason developers are warned against direct styles on HTML is that direct styles are
virtually possible to maintain if the developer is managing them manually.
A framework that abstracts that management of styles entirely avoids
this problem.

There are other potential problems of using direct styles, such as increasing the 
document size of server-rendered pages. An adaptor for `style-kit-n` that
uses `tailwind` under the hood is actively under development; this approach
will take the best of both worlds: the DX of `style-kit-n` without any tradeoffs.

### How is `style-kit-n` different from `styled-system`?
`styled-system` is a great React library that also makes use of utility props.

Here are some advantages that `style-kit-n` provides:
- An easy way to map custom component props to styles
- An intuitive model for inheritance and reusing logic
- A way to define default props when creating a component
- Support for specifying styles that aren't supported by utility props

### How will this affect my bundle size?
`style-kit-n` is only 11KB minified, which is roughly a third the size of `styled-components`.