function dist(ax, ay, bx, by) {
    return Math.floor(Math.sqrt((bx - ax) * (bx - ax) + (by - ay) * (by - ay)));
 }
function Snake(w, h) {
    this.x = Math.floor((w/2));
    this.y = Math.floor(h/2);
    this.width = 100;
    this.height = 100;

    this.size = 20;
    this.radius = 30;
    this.total = 0;
    this.tail = [];

    this.vx = Math.floor(6*scl);
    this.vy = Math.floor(6*scl);

    this.mass = [];

    this.color = "WHITE";

    this.drawtail = function(context ,x, y) {
        context.beginPath();
        context.rect(x, y, scl, scl);
        context.stroke();
        context.fillStyle = "WHITE";
        context.fill();
    };

    this.draw = function(context) {


        context.beginPath();
        context.rect(this.x, this.y, scl, scl);
        context.stroke();
        context.fillStyle = this.color;
        context.fill(); 

    };

    this.eat = function(food) {
        this.total++;
        food.pickLocation();
    };

    this.death = function(food) {
        for(var i = 0; i < this.tail.length; i++) {
            var pos = this.tail[i];
            var d = dist(this.x, this.y, pos.x, pos.y);
            if(d < 1) {
                console.log('starting over');
                this.total = 0;
                this.tail = [];
                this.x = w/2;
                this.y = h/2;
                lastkeyused = undefined;
                food.pickLocation();
            }
        }
    };

    this.die = function(food) {
        this.tail = [];
        this.total = 0;
        this.x = w/2;
        this.y = h/2;
        lastkeyused = undefined;
        food.pickLocation();
    };

}