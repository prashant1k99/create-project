# CLI `@prashant1k99/create-app`
CLI for creating basic template application using different options.

**AIM**: It will be used to create different application in the VueJs, NodeJs, React, etc..

### TODO
* [x] Choose the libraries for the CLI
  * esm - to load ECMAScript module 
  * inquirer - to prompt questions in cli
  * chalk - for cli text styling
  * arg - argument handling
  * ncp - for copying files
  * execa - allows us to easily run external commands like git
  * pkg-install - to trigger either yarn install or npm install depending on what the user uses
  * listr - which let's us specify a list of tasks and gives the user a neat progress overview
* [x] List all the Arguments will be passed to the CLI
  * --git | -g
  * --install | -i
  * --help | -h
  * --version | -v
  * --lang [js, ts]
  * --type [node-express]
* [ ] CLI will ask the questions:
  * [ ] Check if folder with app name already exists in the cwd [if exists, ask for overwrite]
  * [ ] If no name is passed as arg, [What is the Project Name?]
  * [ ] Type of Project:
    * node-express-es6
    * node-express
    * node-express-graphql
    * vue
    * vue3
    * react
  * [ ] Type of language to use:
    * JavaScript
    * TypeScript
  * [ ] State Management [Vue, Vue3, React]
    * Vuex (Modularize) [Recommended for bog and complex projects]
    * Vues [default]
    * Redux
  * [ ] git init && git init commit
  * [ ] install dependencies

NOTE: To add the .gitignore file for node

### ANCHOR Future Plans
* [ ] if GIT, then Add Remote Repo URL
* [ ] UI library [Vue]
  * Vuetify
* [ ] Firebase [Vue, Vue3]
* [ ] Test functions:
  * Jest
* [ ] Angular
* [ ] Use Github hosted repos for templates and remove the templates from the package to lighten the package size and improve the templation. and use branch for different configs
* [ ] Add Build options
* [ ] Add Deployment options [Netlify, Now, Firebase]
* [ ] Add Serverless options
* [ ] MVC structure for node app [node-express-es6, node-express]
