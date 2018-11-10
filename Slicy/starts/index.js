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

let access = true;

window.onload = function() {

    context = document.getElementById('canvas').getContext('2d');
    player = new Player();

    setInterval(() => {
        if(access) {
        draw(context);
        update(context);
        }
    }, Interval);
    // setInterval(() => {
    //     player.addMass(0.2);
    // }, player.mass / Interval);
   
    setInterval(() => {
        if(player.mass > 20) { player.loseMass(0.02); }
    }, (player.mass / Interval));

};

function update(c) {
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
            player.addKill();
            eaten++;
            turboStarted = true;
        } else if(collides(player, enemies[i]) && player.mass < enemies[i].mass) {
            console.log('end');
            access = false;      

            var timeSurvived = (Date.now() - player.timeStarted);
            clearCanvas(c);
            foods.forEach((food) => {
                if(food.x < W-200) { food.draw(c) }
                if(food.y < H-400) { food.draw(c)}
            });
            c.beginPath();
            c.fillStyle = `rgb(${enemies[i].r}, ${enemies[i].g}, ${enemies[i].b})`;
            c.rect(50, 50, Math.min(enemies[i].mass,enemies[i].mass, 200), Math.min(enemies[i].mass,enemies[i].mass, 200));
            c.fill();
            c.closePath();
            c.font = "15px Arial";
            c.strokeText(`Killer`, 50, 70+enemies[i].mass);
            c.fillStyle = "#4f5359";
            c.beginPath();
            c.rect(W/2-315, H/2-140, W/2-100, H/2-20);
            c.fill();
            c.strokeStyle = "black";
            c.stroke();
            c.closePath();
            c.font = "30px Arial";
            c.strokeText(`Final Mass: ${Math.round(player.mass)}`, W/2-150, H/2);
            c.strokeText(`Kills: ${Math.round(player.kills)}`, W/2-150, H/2+50);
            c.strokeText(`Food Eaten: ${Math.round(player.foodEaten)}`, W/2-150, H/2+100);
            c.strokeText(`Time Survived: ${new Date(timeSurvived).getMinutes() > 0 ? `${new Date(timeSurvived).getMinutes()}min:${new Date(timeSurvived).getSeconds()}sec`:`${new Date(timeSurvived).getSeconds()}sec`}`, W/2-150, H/2+150);
            enemies = [];
            canvas.onclick = function() {
                foods = [];
                player = new Player();
                eaten = 0;
                turboStarted = false;
                access = true;
            }
        }
    }
    for(var f = 0; f < foods.length; f++) {
        if(collides(player, foods[f]) && player.mass > foods[f].mass) {
            player.addFoodEat();
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
