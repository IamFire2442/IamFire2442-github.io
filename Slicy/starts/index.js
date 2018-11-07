var W = outerWidth;
var H = 870;

let context, player, enemies = [], foods = [];

var Interval = 15;
var LEFT = 37, UP = 38, RIGHT = 39, DOWN = 40;
var mouse = [0, 0];

let eaten = 0;
let turboStarted = false;
window.addEventListener('mousemove', function(ev) {
    mouse[0] = ev.clientX;
    mouse[1] = ev.clientY;
});

window.onload = function() {

    context = document.getElementById('canvas').getContext('2d');
    player = new Player();

    setInterval(() => {

        draw(context);
        update();
    }, Interval);

    // setInterval(() => {
    //     player.addMass(0.2);
    // }, player.mass / Interval);
   
    setInterval(() => {
        if(player.mass > 20) { player.loseMass(0.02); }
    }, (player.mass / Interval));

};

function update() {
    player.update();
    var RandomTurbo = Math.max(5, Math.floor((Math.random() * 10)));
    if(eaten === RandomTurbo && turboStarted) {
        turboStarted = false;
        for(var n = 0; n < enemies.length; n++) {
            enemies[n].setTurbo();
        }
        eaten = 0;

    }

    for(var i = 0; i < enemies.length; i++) {
        if(collides(player, enemies[i]) && player.mass > enemies[i].mass) {
            player.addMass(enemies[i].mass*0.1111);
            enemies.splice(i, 1);
            eaten++;
            turboStarted = true;
        } else if(collides(player, enemies[i]) && player.mass < enemies[i].mass) {
            console.log('end');
            enemies = [];
            foods = [];
            player = new Player();
            eaten = 0;
            turboStarted = false;
        }
    }
    for(var f = 0; f < foods.length; f++) {
        if(collides(player, foods[f]) && player.mass > foods[f].mass) {
            player.addMass(foods[f].mass*0.1);
            foods.splice(f, 1);
        }
    }
    for(var j = 0; j < enemies.length; j++) {
        enemies[j].update(player);
    }
}

function draw(c) {
    clearCanvas(c);

    if(foods.length < 300) {
        foods.push(new Food());
    }
    
    if(enemies.length < 5) {
        enemies.push(new Enemy(player));
    }

    for(var i = 0; i < foods.length; i++) {
        foods[i].draw(c);
    } 

    for(var j = 0; j < enemies.length; j++) {
        enemies[j].draw(c);
    }

    player.draw(c);
}

function clearCanvas(c) {
    c.fillStyle = `rgb(255, 255, 255)`;
    c.rect(0, 0, W, H);
    c.fill();
    
}

function dist(ax, ay, bx, by) {
    return Math.floor(Math.sqrt((bx - ax) * (bx - ax) + (by - ay) * (by - ay)));
 }
 
 function collides(a, b) {
     return a.x < b.x + b.mass &&
     a.x + a.mass > b.x &&
     a.y < b.y + b.mass &&
     a.y + a.mass > b.y;
 }