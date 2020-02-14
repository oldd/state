<h1 id='top' align="center">Module 3: State</h1>

<div align="center">
  <a href="https://hackyourfuture.be" target="_blank">
    <img src="https://user-images.githubusercontent.com/18554853/63941625-4c7c3d00-ca6c-11e9-9a76-8d5e3632fe70.jpg" width="250" height="250"/>
  </a>
</div>

> "... a computer program stores data in variables, which represent storage locations in the computer's memory. The contents of these memory locations, at any given point in the program's execution, is called the program's state."
> * [Wikipedia](https://en.wikipedia.org/wiki/State_(computer_science)#Program_state)

### Overview

* [Module Summary](#module-summary)
* [Learning Objectives](#learning-objectives)
* [About the Projects](#about-the-projects)
* [Homework Submission](https://github.com/hackyourfuturebelgium/homework-submission) (external)
* Week 1
* Week 2
* Week 3
* [Deeper Dives](./deeper-dives.md)
* [Class Recordings](./class-recordings.md)
* [Study Links](https://study.hackyourfuture.be) (external)

---

## Module Summary

In the previous module you learned to decompose & plan projects, organize your code, and use HTML/CSS/JS to implement simple websites that process user input.  All well and good but there was something missing.  Your projects never "remembered" anything!

Enter: __State__.  This is a fancy programming term to talk about the _data_ stored by your web pages.  Nearly every app you use has state -> message histories, images, profile details, weather reports, ... you name it!  Data is the core of any application.  Just like you learned to write tests to describe your functions and show that they do what they should, you will learn how to use schemas and validation to prove that your program data in fact what you say it is.

Your new projects will be more interesting, but they will also be a lot more complicated.  The logic will be more challenging, and the data saved in your page will change over time leading to bugs you could never have imagined!  To help you deal with the added complexity this module will dive deeply into debugging techniques, problem solving strategies, and your browser's developer tools.

[TOP](#overview)

---

## Learning Objectives

### Programming Skills

* Documenting your projects with ...
  * _READMEs_ for why your project exists and how to run it
  * _schemas_ to describe data in your program (data/state)
  * _wireframes_ to describe the user interface (html & css)
  * _user stories_ to define the actions a user can take (handlers & listeners)
  * _tests_ & _specs_ to describe the logic in your program (logic)
* Logging
  * Capture and store a log of all user interactions & state changes
  * Use this log to reconstruct user actions and debug your projects
* Data-first development
  * Understanding applications as Data + User Interactions
  * Developing from the "inside" out: planning data & logic before the user interface
  * Explain what a schema is and why it's useful (PS. it's like tests, but for data!)
  * Use the JSON schema specification to document your program's data
  * Use a schema validation library to grantee the integrity of your project's data
* Debugging:
  * Bugs are when you don't understand what your code is doing, not when your code doesn't understand what you want it to do!  The computer is always right :)
  * Stepping through your programs with the Browser and Node.js debuggers
  * Using the `debugger`, `console.assert`, `assert` (in Node) and breakpoints for native debugging
  * Refactoring & testing segments of code you don't understand / are not working
* Understand Behavior vs. Implementation
  * _Behavior_: The test cases that a function does and doesn't pass. What the function _does_.
  * _Implementation_: The actual lines of code written.  How memory is manipulated so that the behavior _happens_.
* Testing
  * Learn to _predict_ what _will happen_ instead of _describing_ what _did happen_
  * Testing each step of your project before moving on
  * Using the native Node.js module `assert`
  * Writing & using popular testing libraries (jasmine & mocha)

### Isolating JavaScript (study JS outside of applications)

* Operators:
  * Understand order of operators
  * Be able to rewrite complex expressions as a sequence of single operations
  * Understand that implicit coercion is a learnable (but confusing) set of well-defined rules
* Statements vs. Expressions
  * Understand the difference between the two
  * Explain if a line of code produces an intermediary result, updates memory, and/or redirects flow
  * Use the debugger to step step through complex expressions
  * Refactor between ternary operators and conditional statements
* Reference vs. Value:
  * Understand & explain the different ways JS stores data in memory
  * Explain how arguments are passed into functions by reference or value
  * Use different strategies to avoid side-effects
  * Direct vs. Indirect keys: correctly apply dots & brackets for Array & Object access
* Data Structures: Arrays & Objects
  * Use `Object.method`s to iterate over objects
  * Use non-mutating array methods to process data
* Array & Object Methods
  * Arrays: `.map`, `.reduce`, `.filter`, ...
  * Objects: `Object.keys()`, `Object.values()`, `Object.entries()`
  * Refactor loops into array methods
* Control Flow
  * Correctly apply different types of JS loops

### Integrating JavaScript (JS embedded in applications)

* Organizing your code based on it's _role_ in your program
  1. _Data_: the information your users are interacting with
  2. _Logic_: define & test how user data is transformed
  3. _DOM_: define the structure of your user interface
  4. _Styles_: define the display of your user interface
  5. _Actions_: define _how_ users will interact with your program (handlers + listeners)
  6. _Handlers_: define _what_ interactions a user is allowed to have with program state
* DOM Manipulation
  * Dynamically update the DOM
  * Represent changes in state with the user interface

[TOP](#overview)

---

## About the Projects

In this module you'll be flipping everything upside down! In previous modules you learned to develop your projects from the user interface backwards, beginning by planning what a user will see on the screen and how they will in interact with this.  Starting now you will learn to do things from the inside out:

1. __What can a user do on your web site?__ Write user stories to describe the user's possible interactions with your site
1. __What data is necessary for these user stories?__  Write a schema to describe & validate your project's data.
1. __What must a user be able to do to this dtat?__ Write & test the logic to enable these interactions.
1. __How does the UI display *state* and possible *actions*?__ Write a wireframe to describe the user interface.

### Separating your Concerns

A working project is not enough! For projects in this module we will expect you to turn in code that is well organized & documented according to it's role.  Your projects should have these directories:

* `/data`: contains your schema, initial state, and a helpful README (including a description of your schema)
* `/logic`: contains your tests, pure functions, and a helpful README (including specs for your functions)
* `/actions`: contains pairs of event listeners & handlers to implement your user stories and a helpful README with some specs
* `/styles`: contains the CSS for your web page and a helpful README (including documentation of your classes & styles)
* `index.html`: contains the initial DOM for your user interface & requires all scripts
* `init.js`: initializes your live project's log & anything else that needs to happen when the window loads
* `README.md`: describes what your project does & how to use it.
* `development-strategy.md`: a file containing a table of your user stories in order, with one column for each folder.

Your project will contain one more directory called `/dependencies`, but there is nothing for you to write in here. This folder will contain testing and validation scripts provided by us.

### Development Strategy

The `development-strategy.md` for this module will be less detailed than in the last module.  As your applications grows in complexity it will become impractical to capture all the details on one table.  You will write the detailed documentation for each concern in the separate README's.  Try to keep your descriptions in each section as short and clear as possible! The main development strategy file will look like this:

| User Story | Data | Logic | DOM | Styles | Actions |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |

Good luck!

[TOP](#overview)

---

![[food, not food](https://deviq.com/separation-of-concerns/)](./separation-of-concerns.png)

---
---

### <a href="https://hackyourfuture.be" target="_blank"><img src="https://user-images.githubusercontent.com/18554853/63941625-4c7c3d00-ca6c-11e9-9a76-8d5e3632fe70.jpg" width="100" height="100" alt="Hack Your Future: Belgium"></a>
