# Tic Tac Toe: Development Strategy

How to build this game in steps

---

## 0. Setup

### index.html

Boilerplate HTML file

---

## 1. DOM

### index.html

* Table with 9 empty squares
* `reset` button

---

## 2. Styles

### style.css

* `.centered` - centers the user interface
* `.game` - sizes the game board
* `td` - borders and sizes the game board squares

### index.html

* classes for the game board (`<tbody>`) and `<section id='user-interface'>`

---

## 3. Data

### ./data/game.js

* `game` object
* `game.board`: initialized as an array with 9 `null` values
* `game.nextPlayer`: initialized as `"X"`

### index.html

* include the state object into the web page

---

### 4. Log

### log.js

* `log` array
* contains a copy of the initial state (data)

### index.html

* include the state object into the web page

---

### 5. User Story -
