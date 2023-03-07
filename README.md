# Make a Lisp Web

A browser-based Lisp implementation based on the [Make a Lisp](https://github.com/kanaka/mal) project. Instead of writing code, manipulate the syntax tree and evaluate expressions directly in the browser.

Presently, [Step 3](https://github.com/kanaka/mal/blob/master/process/guide.md#step-3-environments) of Make a Lisp is being implemented.

High level goals for the project
* Implement the Lisp defined in [Make a Lisp](https://github.com/kanaka/mal)
* Write and evaluate expressions in the browser
* Easy interop with JavaScript
* Support livecoding 2D and 3D artwork
* Create interactive UI components which allow you to manipulate the syntax tree directly
* Add rich comments on a syntax tree node and have them displayed in the browser

## Requirements

* Node 18, recommended to install with [Node Version Manager](https://github.com/nvm-sh/nvm)
* [`pnpm`](https://pnpm.io/installation)

## Quickstart

```
pnpm install && pnpm dev
```

## TODO

- [ ] Factor out tsup configuration into a separate package
- [ ] Factor out prettier configuration into a separate package
