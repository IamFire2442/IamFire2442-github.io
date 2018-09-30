var W = 1272;
var H = 877;
var LEFT = 37, UP = 38, RIGHT = 39, DOWN = 40;
var interval = 15;
var blob, gun, bullet;
var mouse = [0, 0];
var point = [150, 150];
var rot;
var res = 60;

let cols = Math.floor(W / res);
let rows = Math.floor(H / res);

var grid = [];
var bullets = [];


window.addEventListener('mousemove', function(ev) {
  mouse[0] = ev.clientX;
  mouse[1] = ev.clientY;
});

window.onload = function() {

    var canvas = document.getElementById("canvas"),
    c = canvas.getContext("2d");
    
    for(var j = 0; j < rows; j++) {
        for(var i = 0; i < cols; i++) {
            var cell = new Cell(i, j);
            grid.push(cell);
        }
    }

    blob = new Blob(W, H);     

         setInterval(() => {
            draw(canvas);
            update();
        }, interval);

        function update() {

            blob.update();

            if(key.isPressed('d')) {  
                blob.x += blob.vx;
            } 
            if(key.isPressed('a')) {
                blob.x -= blob.vx;
            } 
            if(key.isPressed('w')) {
                blob.y -= blob.vy;
            } 
            if(key.isPressed('s')) {
                blob.y += blob.vy;
            } else if(key.isPressed('f')) {

                var canshoot = true
                
                if(canshoot) {
                    var newbullet = new Bullet(blob.x, blob.y, Math.cos(blob.angle), Math.sin(blob.angle)); 
                    bullets.push(newbullet);
             
                    canshoot = false;

                    setTimeout(() => {
                        canshoot = true;
                    }, 1000);
                }
            }

            for(var i = 0; i < bullets.length; i++) {
                bullets[i].updateBullet();

                if(bullets[i].isOffset(bullets[i].x, bullets[i].y, bullets[i].r * Math.PI)) {
                    bullets.splice(i, 1);
                }
            }
        // lets see hm

        }

    
        function draw (canvas) {
            var c = canvas.getContext("2d");
            clearCanvas(canvas);

            blob.draw(c);
            bullets.forEach((bullet) => {
                bullet.drawBullet(c);
            });
        }

    
        function clearCanvas(canvas) {
            var c = canvas.getContext("2d");

            grid.forEach((g) => {
                g.show(c);
            });
        }
    
       function dist(ax, ay, bx, by) {
           return Math.floor(Math.sqrt((bx - ax) * (bx - ax) + (by - ay) * (by - ay)));
        }

        function Cell(i, j) {
            this.i = i;
            this.j = j;

            this.show = function(c) {
                var x = this.i*res;
                var y = this.j*res;
              
                c.beginPath();
                c.rect(x,y,res,res);
                c.stroke();
                c.fillStyle = '#1a7a3f';
                c.fill();
            }
        }

};
