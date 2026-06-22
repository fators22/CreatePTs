# 🎲 YAHTZEE

A browser-based Yahtzee-style dice game built with **p5.js**. Roll five dice, strategically hold the ones you want to keep, and select score categories to maximize your points before the game ends.

## 📖 Overview

This project recreates the classic dice game experience with an interactive graphical interface. Players can roll up to three times per turn, choose which dice to keep, and assign their rolls to available scoring categories.

The game includes multiple screens, animated backgrounds, and a clickable scorecard system.

## 🎮 How to Play

### Objective

Score as many points as possible by rolling combinations of five dice and assigning them to scoring categories.

### Controls

| Action                 | Description                        |
| ---------------------- | ---------------------------------- |
| Roll Dice Button       | Roll all unheld dice               |
| Click a Die            | Hold or release a die              |
| Click a Score Category | Record the score for that category |
| Start Game             | Begin a new game                   |
| Instructions           | View game rules                    |
| Back                   | Return to the previous screen      |

## 🎯 Rules

1. Roll five dice.
2. You may roll up to **three times per turn**.
3. After each roll, click dice to **hold** them.
4. Held dice remain unchanged during future rolls.
5. When satisfied with your roll, select an available scoring category.
6. The turn resets after scoring.
7. Continue until all score categories have been filled.

## ✨ Features

### Multiple Screens

* Main Menu
* Instructions Screen
* Gameplay Screen

### Animated Backgrounds

* Falling dice animation on the menu screen
* Falling dice animation on the instructions screen

### Dice Mechanics

* Five playable dice
* Hold/unhold functionality
* Three-roll turn limit

### Interactive Scorecard

* Clickable scoring categories
* Visual indication of used categories
* Automatic turn reset after scoring

### User Interface

* Simple and intuitive controls
* Visual feedback for held dice
* Remaining roll counter

## 🛠 Built With

* JavaScript
* p5.js
* HTML5 Canvas

## 📂 Project Structure

```text
project/
│
├── sketch.js
├── dice.png
└── README.md
```

## 🚀 Running the Game

### Option 1: p5.js Web Editor

1. Open the project in the p5.js Web Editor.
2. Press the Play button.
3. Click "Start Game" to begin.

### Option 2: Local Setup

1. Download the project files.
2. Ensure `dice.png` is in the project folder.
3. Open the project with a local web server.
4. Run the sketch in your browser.

## 📸 Gameplay

### Main Menu

* Animated falling dice background
* Navigation buttons

### Instructions

* Displays game rules and objectives
* Animated dice background

### Game Screen

* Five playable dice
* Roll counter
* Interactive scorecard
* Hold functionality

## 💡 Concepts Demonstrated

This project demonstrates:

* Event-driven programming
* Object arrays
* User interaction handling
* State management
* Animation loops
* Random number generation
* GUI design in p5.js

## 🔮 Future Improvements

* Full Yahtzee scoring system
* Bonus scoring
* Total score display
* High-score tracking
* Sound effects
* Improved dice graphics
* Restart game option
* Multiplayer mode

## 👨‍💻 Author

Created by Gialob27 using the p5.js creative coding library.

## 📜 License

This project is intended for educational and personal use.
