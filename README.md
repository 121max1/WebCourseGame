# Snake Game
## Game Entities
1. Game Field - Place where snake can eat some food. It's presented as a range of squares
2. Snake - main game unit, it grows for one cell when it eats food.
3. Food - in this game it's presented as burger

## Game rules
1. Food randomly spawns on the field
2. When the snake eats food it increases by one cell.
3. when the snake eats itself the game ends
4. When the snake goes out of bounds game ends
5. Еhe goal of the game is to eat as much food as possible

## Сontrol
1.  Use W button to go up
2.  Use S button to go down
3.  Use A button to go left
4.  Use D button to go right

## Technologies
1. WebPack
2. ES6 Classes
3. HTML Canvas
4. CSS Styles

## Project structure
1. folder src contains all objects for the game
2. folder src/css contains css styles to decorate the game
3. folder images contains favicon.ico and also folder content that stores images
4. folder js contains code for the game. In sub folder classes you can find entities for the game
5. folder modules connects part of the application together
6. folder tools needed to store some configurations for the game

## Start Game
1. You need to download repo
2. Install node.js
2. Use command "npm start" to start game locally
3. Use command "npm run-scipt production" to assembly game
