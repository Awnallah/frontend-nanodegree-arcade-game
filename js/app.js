
/* Global variables */
//allEnemies array stores the enemy objects
var allEnemies = [];


//general functions used throughout the code
/*@func randomGen generates a random number between a min and a max value (the range is always one digit below the max) */

function radomGen(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

/*@func delElem deletes an element (element) from a given array (array))
This function is used to delete enemy bugs after leaving the screen to ensure the speed and number of 
bugs is randomized througout the game*/
function delElem(elem, array) {
    return array.splice(elem, 1);
}

// Enemies our player must avoid
/*@constructor of enemies
The sprite property specifies the image using a helper method in the engine.js
The y location property is chosen randomly from four positions in the screen where separate blocks are located.
The speedo property is a random #  between 50 abd 119 which is utilized in the speed method (updates with every animation frame)
and uses a 40% chance for green enemy image (0,1) and 60% for a brown enemy image (2,3,4)
The x location is set to -100 (behind the canvas) to allow for 'natual' motion approximation
The y locaiton is randomized amongst the 4 allowed blocks
The speedo property is randomized but the average of the randomized samlple increases by 20% with every level of the game (player.score)
*/
var Enemy = function() {
    this.x = -100;
    this.enemyLoc = [310, 230, 145, 60];
    this.y = this.enemyLoc[radomGen(0, 4)];
    this.width = 66;
    this.height = 55;
    this.speedo = radomGen(40, 120)*(1+(player.score/5));
    
    
    
    this.picSelect = radomGen(0, 5);
    if (this.picSelect >= 1) {
        this.sprite = "images/enemy-bug.png";
    } else {
        this.sprite = "images/greenBug.png";
    }
};

//The update method is called in the engine.js under updatedEntities(dt). It updates Enemy.speed() which updates the enemy object speed and Enemy.checkCollitions()  which updates
//the collision status with the player.
Enemy.prototype.update = function(dt) {
    this.speed(dt);
    this.checkCollisions();
};

//The speed method is used to update the speed and ensure that time is consistent regardless of the processor used by utilizing a tick (dt)
Enemy.prototype.speed = function(dt) {
    this.x += (this.speedo) * dt;
};

//The render method draws the enemy on the screen, a required method for the game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//checkCollisions method resets the game (reloads) once a collision occurs between the player and an enemy (bug).
Enemy.prototype.checkCollisions = function() {
    if (Math.abs(this.x - player.x) < this.width && Math.abs(this.y - player.y) < this.height) {
        location.reload();
    }

};


/*@constructor Princess 
The y position of the Princess is constant throughout the program (safe zone)
The x position is chosen randomly with each level or reload from optional six positions
The x positin of 300 is skipped as it is dedicated for the main player*/
var Princess = function() {
    this.sprite = 'images/char-princess-girl.png';
    this.xlocations = [0, 100, 200, 400, 500, 600];
    this.x = this.xlocations[radomGen(0, 6)];
    this.y = 400;
    this.width = 100;
    this.height = 81;

};

//Draws an image of the Princess
Princess.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/*@constructor Heart
Places the heart in a fixed y position (the first block)
The x location is chosen randomly from seven locations
The heart image is smaller than the player and princess so locations are adjustec accordingly (trial and error)*/
var Heart = function() {
    this.sprite = 'images/Heart.png';
    this.xlocations = [10, 110, 210, 313, 415, 515, 615];
    this.x = this.xlocations[radomGen(0, 7)];
    this.y = 20;
    this.width = 100;
    this.height = 81;

};

//Draws the heart method
Heart.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};



//@constructor Player sets the image(sprite), and a fixed initial position of the player
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 300;
    this.y = 400;
    this.width = 100;
    this.height = 81;
    this.hasHeart = false;
    this.score = 0;

};

//The update method is called in the engine.js under updatedEntities(dt). It updates the player status with each animation frame
//The method updates the collisions method which checks for collisions of the player with the Heart or the Princess (follows later).
Player.prototype.update = function() {
    this.collisions();

};

// Draws the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//player.handleInput is called by the addEventListener. It translates a key stroke (input) in the arrow keys to a movement of the player in the screen
//The limits (if statements) are set so that the player is unable to move out of the canvas
Player.prototype.handleInput = function(input) {
    switch (input) {
        case "up":
            if (this.y > 70) {
                this.y -= this.height;
            }
            break;
        case "down":
            if (this.y < 390) {
                this.y += this.height;
            }
            break;
        case "right":
            if (this.x < 590) {
                this.x += this.width;
            }
            break;
        case "left":
            if (this.x > 10) {
                this.x -= this.width;
            }
            break;
        default:
            this.x = this.x;
            this.y = this.y;

    }
};

//Player.collisions checks if the player reached the heart or the Princess
Player.prototype.collisions = function() {
    //when a player reaches the heart, the image of the player is changed(heart on top), the heart is moved off canvas, and hasHeart is set to true.
    if (Math.abs(this.x - heart.x) < 40 && Math.abs(this.y - heart.y) < 30) {
        this.sprite = "images/lovingBoy.png";
        heart.x = -100;
        heart.y = -150;
        this.hasHeart = true;
    }
    //when player reaches the Pricess with a heart, the score is increased and displayed, the heart is relocated into the canvas, the Princess gets
    //a random x location, and the player is returned to initial locaiton  and initial image(sprite).
    if (Math.abs(this.x - princess.x) < this.width && Math.abs(this.y - princess.y) < this.height && this.hasHeart === true) {
        this.score += 1;
        document.getElementById("score").innerHTML = "Your love score is " + this.score;
        this.x = 300;
        this.y = 400;
        princess.x = princess.xlocations[radomGen(0, 6)];
        heart.x = heart.xlocations[radomGen(0, 7)];
        heart.y = 20;
        this.hasHeart = false;
        this.sprite = "images/char-boy.png";
    }
};


/*@function add_enemy instantiates an enemy object and pushes it to the global variable array allEnemies */
function add_enemy() {

    allEnemies.push( new Enemy());
}


//Objects instantiated
//payer must be instantiated before the enemy since the enemy object has a property the depends on the player.score
var player = new Player();
var princess = new Princess();
var heart = new Heart();

add_enemy();

/*@function enemyStats checks for enemies in allEnemies and deletes enemis that are off the screen
A new enemy is generated into the array randomly from 1 to 4, with the number of enemies increasing by 12.5% with every level (player.score)*/
function enemyStats() {
    allEnemies.forEach(function(enemy) {

        if (enemy.x >= 900) {
            delElem(allEnemies.indexOf(enemy), allEnemies);
        }

        if (allEnemies.length < radomGen(1, 5) * (1 + (player.score / 8))) {
            add_enemy();
        }


    });
}




// This listens for key presses and sends the keys to the
// Player.handleInput() method.


document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
