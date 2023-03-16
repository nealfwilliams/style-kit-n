# Introduction
`style-kit-n` is a library for managing styles on the web.

`style-kit-n` originated as a way to manage styles in React Native in leiu of CSS. After developing
the library and using it, going back to CSS-centered approaches seemed like a regression in terms
of developer experience, so the library was adapted for use on the web.

`style-kit-n` takes inspiration from two of the most popular approaches to styling:
- css-in-js like styled-components and emotion
- utility-first frameworks like tailwind.css

The creator of Tailwind wrote a compelling blog post about the pitfalls of the most common strategies for 
managing CSS. Tailwind was developed as a way to use CSS without having to write any CSS. What Tailwind exposes
is a set of CSS classes to use.

The guiding philosophy of `style-kit-n` is that writing CSS is never a good developer experience. Tailwind 
exposes utility CSS classes that can be used instead of custom CSS. `style-kit-n` goes a step further by
providing a React component architecture for managing utility styles.

## Why so bad about CSS?
The creator of Tailwind wrote a compelling blog post about the pitfalls of the most common strategies for 
managing CSS.

Here are some more reasons working with CSS is less than ideal.

### Lack of tooling
Typescript has some amazing tooling to help devs understand and modify codebases quickly without careless mistakes.

### Hard to maintain
Connecting HTML to CSS using class names is prone to code rot, technical debt, and human error. The lack of good 
tooling exacerbates this problem.

### Managing scope and sharing logic
Names in CSS go to the same namespace. This becomes a pain to manage with large teams. CSS's specificity system
provides a way to manage this, but creates its own headaches that can lead to unexpected regressions. For example,
refactoring a component's styles in such a way changes their specificity may break a downstream usage of that
component that is attempting those styles. 

### Explainability and Documentation
React components provide a clear model for documenting usage and properties. Tools like storybook help with this.

### Usability with React
React's component-based architecture provides an intuitive and natural way to encapsulate the 
behavior and structure of DOM elements in your app.

Using CSS direcly within a React component requires mapping that component's properties and
state to various CSS class names, and modifying them as the component updates. This creates
an additional layer of complexity that makes application harder to maintain and easier to break.

CSS-in-JS libraries improve DX by providing a way to tie styles directly into a components props.
However, this requires messy string interpolation that is also not an ideal DX.

## Isn't using direct styles on html considered bad practice
The primary reason developers are warned against using direct styles is because they are
virtually possible to maintain if the developer is applying them to the HTML themselves.
A framework that abstracts that management of styles away from the developer entirely avoids
this problem. Moreover, `react-kit-n` was created with optimizing developer experience as its
primary goal, so the 

There are other potential secondary problems of using direct styles, such as increasing the 
document size of server-rendered pages. To address these, an adaptor for `style-kit-n` that
uses `tailwind` to generate CSS classes under the hood is actively under development.

### So how does it work?
#### Creating components
Components are declared in a way similar to `styled-component`, with a function that takes in a base element
and the styles to apply to it. Styles can be either specified directly or using the utility props to automatically
pull values from your app's theme (recommended).

`
import styled from '@style-kit-n/web';

const Card = styled('div', {
  // utility props
  py: 4,

  // direct styles
  styles: {
    border: 'solid black 1px`  
  }
})

const MyComponent = () => (
  <Card>Hello World</Card>
);
`

All utility props can be applied to components directly. `style-kit-n` exports some base components that can be used 
easily that have access to all utility props.

`
import {Box} from '@style-kit-n/web'

const MyComponent = () => (
  <Box py={4} bordered>
    Hello World
  </Box>
)
`

#### Extensibility
Extend any `react-kit-n` component can be easily extended by passing it as the base component to the styled function.
The new component will retain all static and dynamic styles from its parent.

`
const SubmitButton = styled(Button, {
  bg: 'primary',
  fontColor: 'textOnPrimary'
});
` 

Any component can also easy be customized by added utility props when it is used.

`
const MyComponent = () => (
  <SubmitButton mt={1}>Click Me!</SubmitButton>
)
`

#### Dynamic Styles
`style-kit-n` binds dynamic styles to React props in clean and intuitive way.

A function can be provided as the style parameters to specify styles that respond to props.

`
type ButtonProps = {
  size: 'small' | 'large'
}

const Button = styled<ButtonProps>(
  'button',
  ({size}) => ({
    px: size === 'small' ? 2 : 3,
    font: size === 'small' ? 'controlSmall' : 'controlLarge'
  });
);
`

#### Pseudo-selectors
`css` pseudo-selectors are not currently supported, but `style-kit-n` offers an alternative to
handle hover and focus states. Hover and focus styles can be specified as properties of the style
object passed to the styled function. These are managed under the hood with Javascript events.

`
const Button = styled(
  'button',
  {
    hover: {
      bg: 'primaryTint'
    },
    focus: {
      bordered: true
      borderColor: 'focus'
    }
  }
);
`
