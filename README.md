# AdCash Coding Challenge

## Description

A simple app that helps advertisers to add targeting logic to their advertisements

# Tools and Frameworks

- [Vue](https://vuejs.org/)

- [Jest](https://jestjs.io/)

## App Main Goals

- Simple add targeting logic application
- Performant code
- Reusable code and structures
- Unit testing
- Optimized user experience
- Responsive user interface

## Quick Start

The guild lines below contains the instructions/commands to get started.

#### Development app

To run the app locally on your computer

1. Open the root directory of the project on your terminal
2. Run `npm install` to install all the app dependencies
3. Run `npm run serve` (This will start the local server on port `http://localhost:8080`)

```
$ npm install
$ npm run serve
```

# Features

- Display list of existing rules on the homepage
- User can add new rules
- User can delete/remove rules

# Unit Testing

[Jest](https://jestjs.io/) is used for testing of the major components

To get started with the unit testing

1. Open the root directory fo the project on your terminal
2. Run `npm install` to install all the app dependencies
3. Run `npm run test:unit`
4. Optional `npm run serve` to run the app locally on your machine

## Folder Structure

```
├── public
├── src
│   ├── Api
│   ├── assets
│   ├── components
│   ├── router
│   ├── utils
│   └── views
│
└── tests
     │
     │
     │
     │
     │
     └── unit
```

---

---

- Due to time, I could not test all the components, I was able to test 3 components

- I only used Vuetify for multiple select of rules for good user experience.

- The endpoint was returning string data instead of normal javascript array.
