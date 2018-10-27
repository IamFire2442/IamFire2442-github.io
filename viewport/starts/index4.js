var W = 800;
var H = 600;

var FPS = 30;
var INTERVAL = 1000/FPS; // milliseconds
var STEP = INTERVAL/1000 // seconds
var context;
var player, camera;
var LEFT = 37, UP = 38, RIGHT = 39, DOWN = 40;



window.onload = function() {
 
  var room = {
    width: 5000,
    height: 3000,
    map: new Map(5000, 3000)
  };

    context = document.getElementById("mycanvas").getContext('2d');
 
    room.map.generate();

    player = new Player(50, 50);
   
    camera = new Camera(0, 0, W, H, room.width, room.height);       
    camera.follow(player, W/2, H/2);


  setInterval(() => {
 
    player.update(STEP, room.width, room.height);
    camera.update();

    draw(context);
    room.map.draw(context, camera.xView, camera.yView);   
    player.draw(context, camera.xView, camera.yView);    
  }, INTERVAL);

}

function draw(context) {
  var c = context;

  c.clearRect(0, 0, W, H);

  // redraw all objects
 
}

function update() {


}


  function Rectangle(left, top, width, height){
      this.left = left || 0;
      this.top = top || 0;
                  this.width = width || 0;
      this.height = height || 0;
      this.right = this.left + this.width;
      this.bottom = this.top + this.height;
  }

  Rectangle.prototype.set = function(left, top, /*optional*/width, /*optional*/height){
      this.left = left;
      this.top = top;
      this.width = width || this.width;
      this.height = height || this.height
      this.right = (this.left + this.width);
      this.bottom = (this.top + this.height);
  }

  Rectangle.prototype.within = function(r) {
      return (r.left <= this.left && 
              r.right >= this.right &&
              r.top <= this.top && 
              r.bottom >= this.bottom);
  }       

  Rectangle.prototype.overlaps = function(r) {
      return (this.left < r.right && 
              r.left < this.right && 
              this.top < r.bottom &&
              r.top < this.bottom);
  }

function dist(ax, ay, bx, by) {
    return Math.floor(Math.sqrt((bx - ax) * (bx - ax) + (by - ay) * (by - ay)));
 }