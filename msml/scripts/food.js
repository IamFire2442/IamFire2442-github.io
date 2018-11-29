function Food(w, h) {
    this.x = Math.floor(Math.random() * w);
    this.y = Math.floor(Math.random() * h);
    this.width = 50;
    this.height = 50;


    this.size = 20;
    this.color = "RED";

    this.pickLocation = function() {
        this.x = Math.floor(Math.random() * w);
        this.y = Math.floor(Math.random() * h);
    };

    this.draw = function(context) {
            context.beginPath();
            context.rect(this.x, this.y, scl, scl);
            context.fillStyle = this.color;
            context.fill(); 
    };
}