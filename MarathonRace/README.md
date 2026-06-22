# Marathon Race Game

## Overview

Marathon Race is a simple 2D obstacle-avoidance game created using the p5.js library. The player controls a runner attempting to complete a full marathon distance (42.195 km) across three levels while avoiding cones and other runners.

The objective is to reach the finish line in each level without losing all three lives.

---

## Features

* Three progressively difficult race levels
* Distance tracking based on marathon length (42.195 km)
* Timer to record completion time
* Three-life system
* Static cone obstacles
* Moving runner obstacles
* Start, win, and lose screens
* Restart and replay functionality
* Collision detection system

---

## Controls

| Key | Action                        |
| --- | ----------------------------- |
| ↑   | Move Up                       |
| ↓   | Move Down                     |
| ←   | Move Left                     |
| →   | Move Right / Advance Distance |

---

## How to Play

1. Click **Start** on the main menu.
2. Use the arrow keys to move your runner.
3. Avoid hitting cones and other runners.
4. Reach the finish line to advance to the next level.
5. Complete all three levels to finish the marathon.
6. If you lose all three lives, the game ends.

---

## Game Mechanics

### Lives

* Players start with **3 lives**.
* Colliding with an obstacle removes one life.
* After a collision, the player is returned to the starting position.
* Losing all lives results in a game over.

### Levels

* The game contains **3 levels**.
* Each level increases the number of obstacles and moving runners.
* Completing Level 3 wins the game.

### Distance Tracking

The game simulates a real marathon distance:

* Total marathon distance: **42.195 km**
* Each level represents approximately one-third of the marathon.
* Distance increases as the player moves right.

### Timing

A timer begins when the game starts and records the player's completion time.

---

## Assets Required

Place the following image files in the same folder as the sketch:

* `runner.png`
* `cone.png`

These images are loaded in the `preload()` function.

---

## Program Structure

### Main Functions

#### `setup()`

Creates the game window and initializes settings.

#### `draw()`

Runs continuously and displays the appropriate game screen.

#### `startScreen()`

Displays instructions and the start button.

#### `gameScreen()`

Runs the main gameplay loop.

#### `movePlayer()`

Handles player movement and distance tracking.

#### `moveObstacles()`

Displays cone obstacles and checks for collisions.

#### `moveRunners()`

Displays moving runners and checks for collisions.

#### `drawFinishLine()`

Displays the finish line and handles level progression.

#### `updateHUD()`

Displays:

* Lives
* Current level
* Distance completed
* Elapsed time

#### `checkCollision()`

Determines whether the player collides with an obstacle.

#### `hitObstacle()`

Reduces lives and resets player position.

#### `resetLvl()`

Creates new obstacles and runners for each level.

#### `reset()`

Resets the entire game.

#### `winScreen()`

Displays victory information.

#### `loseScreen()`

Displays game-over information.

---

## Concepts Demonstrated

This project demonstrates:

* Variables
* Functions and Procedures
* Parameters and Return Values
* Selection (if statements)
* Iteration (for loops)
* Arrays/Lists
* Collision Detection
* User Input
* Graphics and Animation
* Game State Management

---

## Technologies Used

* JavaScript
* p5.js

---

## Author

Created as a p5.js game project demonstrating programming fundamentals, game design, and event-driven programming.
