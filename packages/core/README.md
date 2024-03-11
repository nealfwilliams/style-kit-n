# @style-kit-n/core
This packages includes the underlying abstractions for creating components using `styled-kit-n` that are shared across
environments.

This package exports the following abstractions and types:

## `createStyled`
A function that can be used to create the relevant `styled` function for each environment and implementation.

## `StyleEngine`
A Typescript interface to encapsulate the differences between environments and implementations. This interface exposes
the following methods:
- `generateStyles`: maps style props to direct HTML style
- `generateClasses`: maps style props to HTML class names (eg. for use with Tailwind)
- `resolveClassConflicts`: method to resolve conflicting class names due to inheritance
- `getBaseProps`: method to get the base props supported by components created by `styled` (eg. `HTML` attributes)
- `getMediaWidth`: environment-specific method to get media length
- `listenForResize`: environment-specific listener to respond to media changes
  `cleanupResizeListener`: cleanup method for above listener

## `baseTheme`, `BaseTheme`
A default theme (and corresponding type) with values that are reused across environments.

## `StyleKitNProvider`
A generic context provider used to create environment-specific packages
