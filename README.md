![Logo](https://i.imgur.com/3cJPNGe.png)

# Introduction

`style-kit-n` is a library for managing styles in `React` and `React Native` without writing CSS.

`style-kit-n` combines the benefits of two popular approaches to styling:
- utility-first frameworks (eg. `tailwind`)
- css-in-js (eg. `styled-components`)

The guiding philosophy of `style-kit-n` is that writing CSS isn't a great developer experience. 
`style-kit-n` provides a React component architecture for managing styles that takes full advantage
of the developer experience (DX) benefits of Typescript and React.

## What's so bad about CSS?
### Maintainability
Here are some reasons why CSS is hard to maintain. (Modular CSS avoids some, but not all,
of these pitfalls.)

#### Lack of tooling
Typescript has great tooling to help devs understand and modify codebases quickly without 
careless mistakes. CSS tooling pales in comparison.

#### Difficult refactoring/cleanup
CSS classes populate one global scope. This impacts a developer's ability to confidently make changes
without unintentionally changing other parts of an app. This in turn leads to regressions and code rot.

#### Escalating specificity
CSS's specificity system is intended to help manage the global scope but has its own headaches.
For example, if a shared component refactors its styles such that their specificity increases,
downstream usage of that component that overrides those styles can break.

#### Class naming
Using CSS means linking styles to class names with strings. This is prone to careless spelling
mistakes and accidental collisions. Furthermore, maintaining an ever-growing list of class names
for every type of element that needs styling is a pain, especially because engineers are not
always great at choosing apt names.

#### Indirection
CSS is often touted as a way to isolate styling as an independent concern.

In practice, however, styling is an integral part of most web applications' usability.
Treating styles as an independent silo of information can lead to
regressions and technical debt, At the very least, coordinating code between two
distinct programming languages is a bunch of extra work.

The creator of Tailwind wrote a more detailed 
[article](https://adamwathan.me/css-utility-classes-and-separation-of-concerns/)
on why "separation of concerns" is a false promise,
and how many of the approaches for managing CSS classes can fail.

#### Documentation
There aren't existing standards for documenting reusable CSS classes and their usage patterns.
Engineers are often left guessing the correct context to use existing classes, creating
redundant classes that violate DRY, or copy-pasting.

In comparison, React components present a clear model for explainabilitiy. Tools like 
`storybook` and `styleguidist` provide as an easy way to document components
and their usage patterns that can be shared across an organization.

### Lack of synergy with React
Use CSS classes directly within a dynamic React component is a clunky process that requires:
1. creating different classes for each dynaming elements styles
2. mapping that component's properties and state to those CSS class names.

This is an additional layer of complexity that makes application harder to maintain and easier to break.

`style-kit-n` is built with React and Typescipt synergy as its top priority. Component props can be
directly tied to dynamic styles, and Typescript types just work. The intention is to feel as natural
and accessibility to developers as any other part of the React ecosystem.

### Incompatible with React Native
CSS is not directly supported in React Native, which makes a maintainable solution for styling an even
more acute need.

## How does it work?
### Creating components
Components are created with a function that takes in a base element and the styles to apply to it.
Styles can be either specified directly or using utility props to automatically pull values
from your app's theme (recommended).

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
`style-kit-n` style props works by pulling in values from your design system or "theme."

The theme contains contains standard values for colors, spacing, typography and more.

`style-kit-n` includes a default theme that can be overwritten by passing a `theme` prop to the
applicable Provider component for your environment. The provided `theme` will be merged into the
default `theme`.

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
`style-kit-n` binds dynamic styles to React props in a clean and intuitive way.

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
      border: true
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