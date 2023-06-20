# MoviePool App in Angular

### What is this about?
This responsive MoviePool App in Angular has been built analogue to previously built [MoviePool App in React](https://github.com/EllyPirelly/cf-movie-client). It is for movie lovers that want to be able to access information about movies and - once signed up - be able to view, update, delete their account. It's the client-side to the [RESTful Movie API](https://github.com/EllyPirelly/cf-movie-api).
<br>
This MoviePool App in Angular has been built as a task for Achievement 6 in [Career Foundry's Full-Stack Web Development Program](https://careerfoundry.com/en/courses/become-a-web-developer/).

![Screenshot of Welcome View](/src/assets/img/screenshots/client-angular-1.png)
![Screenshot of Movie View](/src/assets/img/screenshots/client-angular-2.png)

### Technical requirements
- [Angular](https://angular.io/)
- [Angular CLI](https://github.com/angular/angular-cli)
- TypeScript
- [Angular Material](https://material.angular.io/)
- hosted on GitHub pages
- implemented user registration and user login via forms
- [Typedoc](https://typedoc.org/api/) for technical documentation

### Features
The app must
- have a Welcome View, where users will be able to either sign up or log in
- have a User Profile View, where users will be able to view / edit their profile
- have a Movie View, showing all movies once the user is authenticated
- have a Movie Card Component
  - this component will be rendered ñ time on the Movie View, depending on the amount of movies present in the database
  - the component will have buttons to - on click - open
    - a dialogue with details about the Movie Genre
    - a dialogue with details about the Director
    - a dialogue with details about the Movie
    - as well as a (toggle) button to add/remove from favorite
- have Angular Router implemented to enable change between Welcome View, Movie View and Profile View

### Languages, Libraries, Frameworks, Tools
- Angular, Angular CLI (16.0.3), Angular Material
- TypeScript
- HTML
- SCSS

#### Global Dependencies
- `@angular/cli`

#### Dependencies
- `@angular/router`
- `@angular/material`

#### Dev Dependencies
- `@angular/cli` and all packages coming with this
- `angular-cli-ghpages` - to deploy on GitHub pages branch `gh-pages`
- `typedoc` - for technical documentation

## How to run this?
- clone the repo
- `cd` into project
- `npm install`
- `ng serve` - automatically rebuilds the application and reloads the page when you change any of the source files
- `ng serve --open` - automatically rebuilds the application and reloads the page when you change any of the source files and opens the application in a new tab in your browser `http://localhost:4200/`

## Heads-up: Deployment to GitHub pages
- angular cli commands do not work after install of `angular-cli-ghpages`
- code needs to be build manually, run
```
ng build --output-path docs --base-href /cf-movie-angular-client/
```
- follow: https://angular.io/guide/deployment#deploy-to-github-pages and https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site#choosing-a-publishing-source
- add, commit, push, deploy

## Heads-up: Typedoc config (note to myself)
- recommended directory `docs` for typedoc does not apply in this case as `docs` is already used for building files for github pages
- in `tsconfig.json` add config like follows
```
  "typedocOptions": {
    "entryPoints": [
      "src/main.ts",
      "src/app/fetch-api-data.service.ts",
      "src/app/welcome-page/welcome-page.component.ts",
      "src/app/user-registration-form/user-registration-form.component.ts",
      "src/app/user-login-form/user-login-form.component.ts",
      "src/app/user-profile/user-profile.component.ts",
      "src/app/movie-card/movie-card.component.ts",
      "src/app/topbar/topbar.component.ts",
    ],
    "out": "docstypedoc"
  }
```
- in `package.json`, `scripts` add following which will enable to run `npm run typedoc`
```
"typedoc": "typedoc --out docstypedoc src/main.ts"
```

### Typedoc Sources
- https://www.vojtechruzicka.com/documenting-angular-apps-with-typedoc-compodoc-and-angulardoc/
- https://www.npmjs.com/package/typedoc
- https://typedoc.org/guides/installation/
- https://typedoc.org/api/

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.
