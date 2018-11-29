var W = 800;
var H = 600;
var LEFT = 37, UP = 38, RIGHT = 39, DOWN = 40;
var snakey, food;
var interval = 90;
var scl = 20;
let lastkeyused;


window.onload = function() {

    var canvas = document.getElementById("canvas"),
    c = canvas.getContext("2d");
    
    snakey = new Snake(W, H);
    food = new Food(W, H);
    
    var randomdir = [
        snakey.x,
        snakey.y
    ];
    var randomacc = [
        '+=',
        '-='
    ];

        setInterval(() => {
          
            draw(canvas);
            update(c, canvas);

        }, interval);

        function update(c, canvas) {
            snakey.x = Math.floor(snakey.x);
            snakey.y = Math.floor(snakey.y);
            if(snakey.total === snakey.tail.length) {
                for(var i = 0; i < snakey.tail.length-1; i++) {
                    snakey.tail[i] = snakey.tail[i+1];
                }
              }
             snakey.tail[snakey.total-1] = {x: snakey.x, y: snakey.y};

            if (key.isPressed(RIGHT) && !key.isPressed(LEFT) && !key.isPressed(UP) && !key.isPressed(DOWN)) {                    
                //  if(snakey.x += snakey.vx !== snakey.x + snakey.vy) return;
                Math.floor(snakey.x += snakey.vx);
                lastkeyused = RIGHT;
            }
            if (key.isPressed(LEFT) && !key.isPressed(RIGHT) && !key.isPressed(UP) && !key.isPressed(DOWN)) {
                // if(snakey.x -= snakey.vx === -snakey.x) return;

                Math.floor(snakey.x -= snakey.vx);
                lastkeyused = LEFT;
            }
            if (key.isPressed(UP) && !key.isPressed(LEFT) && !key.isPressed(RIGHT) && !key.isPressed(DOWN)) {
                // if(snakey.y -= snakey.vx === -snakey.y) return;

                Math.floor(snakey.y -= snakey.vy);    
                lastkeyused = UP;
            }
            if (key.isPressed(DOWN) && !key.isPressed(LEFT) && !key.isPressed(RIGHT) && !key.isPressed(UP)) {
                // if(snakey.y += snakey.vx === -snakey.y) return;

                Math.floor(snakey.y += snakey.vy);   
                lastkeyused = DOWN;
            } else if(!key.isPressed(DOWN) && !key.isPressed(LEFT) && !key.isPressed(RIGHT) && !key.isPressed(UP) && lastkeyused !== undefined) {
                if(lastkeyused === 37) {
                    snakey.x -= snakey.vx;
                } else if(lastkeyused === 38) {
                    snakey.y -= snakey.vy;    
                } else if(lastkeyused === 39) {
                    snakey.x += snakey.vx;
                } else if(lastkeyused === 40) {
                    snakey.y += snakey.vy;   
                }
            } else if(!key.isPressed(DOWN) && !key.isPressed(LEFT) && !key.isPressed(RIGHT) && !key.isPressed(UP) && lastkeyused === undefined) {
                snakey.x -= snakey.vy;
            }
            
            console.log(snakey.x, snakey.y);

            if(snakey.x > W-snakey.size) {
                snakey.die(food);
            } else if(snakey.x < 0) {
                snakey.die(food);
            } else if(snakey.y > H-snakey.size) {
                snakey.die(food);
            } else if(snakey.y < 0) {
                snakey.die(food);
            }

            // snakey.x = Math.floor(Math.max(0, Math.min(snakey.x, W-snakey.size)));
            // snakey.y = Math.floor(Math.max(0, Math.min(snakey.y, H-snakey.size)));
            food.x = Math.floor(Math.max(0, Math.min(food.x, W-food.size)));
            food.y = Math.floor(Math.max(0, Math.min(food.y, H-food.size)));

            snakey.vx = Math.floor(Math.max(15 ,Math.min(scl-W, W-scl)));
            snakey.vy = Math.floor(Math.max(15 ,Math.min(scl-H, H-scl)));

            if(dist(snakey.x, snakey.y, food.x, food.y) < 20) {
                snakey.eat(food);
            }
            if(dist(snakey.x, snakey.y, snakey.x, snakey.y < 3)) {
            }

        }




        function draw (canvas) {
            var c = canvas.getContext("2d");
            clearCanvas(canvas);

            for(var i = 0; i < snakey.tail.length; i++) {
                snakey.drawtail(c, snakey.tail[i].x, snakey.tail[i].y);
            }

            // draw snakey
            snakey.death(food);
            snakey.draw(c);
            food.draw(c);


        
        }

        function clearCanvas(canvas) {
            var c = canvas.getContext("2d");
            c.beginPath();
            c.rect(0,0,W,H);
            c.fillStyle = "BLACK";
            c.fill();
        }

        function dist(ax, ay, bx, by) {
           return Math.floor(Math.sqrt((bx - ax) * (bx - ax) + (by - ay) * (by - ay)));
        }

    };