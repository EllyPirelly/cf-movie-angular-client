# MoviePool App in Angular

### What is this about?
MoviePool App in Angular, developed based on what has first been developed in [MoviePool App](https://github.com/EllyPirelly/cf-movie-client). TODO: better intro.
<br>
This MoviePool App in Angular has been built as a task for Achievement 6 in [Career Foundry's Full-Stack Web Development Program](https://careerfoundry.com/en/courses/become-a-web-developer/).

TODO: screenshot

### Technical requirements
- Angular
- [Angular CLI](https://angular.io/cli)
- TypeScript

### Features
- TODO

### Languages, Libraries, Frameworks, Tools
- Angular, Angular CLI
- TypeScript
- HTML
- SCSS

#### Global Dependencies
- `@angular/cli` - [Angular CLI](https://github.com/angular/angular-cli) version 16.0.3.

#### Dependencies
- `@angular/material`

#### Dev Dependencies
- `@angular/cli` and all packages coming with this
- `angular-cli-ghpages` - to deploy on GitHub pages branch `gh-pages`

## How to run this?
- clone the repo
- `cd` into project
- `npm install`

- `ng serve` - automatically rebuilds the application and reloads the page when you change any of the source files
- `ng serve --open` - automatically rebuilds the application and reloads the page when you change any of the source files and opens the application in a new tab in your browser `http://localhost:4200/`

## Deployment to GitHub pages
TODO: Sort this later
- commands to use with angular cli after installing `angular-cli-ghpages` do not work
- follow: https://angular.io/guide/deployment#deploy-to-github-pages and https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site#choosing-a-publishing-source
- stuff at the moment needs to be done manually
- run `ng build --output-path docs --base-href /cf-movie-angular-client/` to manually trigger build
- ALWAYS keep an eye on what's happening with `docs/404.html` do not let the build delete that file
- add, commit, push stuff
- improve this as soon as you figure out why workflow doesn't work

TODO: sort what's below

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.
