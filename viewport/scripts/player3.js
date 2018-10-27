class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.speed = 22;
        
        this.width = 50;
        this.height = 50;
    }

    update(step, worldWidth, worldHeight) {
        if(key.isPressed(RIGHT)) {  
            this.x += this.speed;
        } 
        if(key.isPressed(LEFT)) {
            this.x -= this.speed;
        } 
        if(key.isPressed(UP)) {
            this.y -= this.speed;
        } 
        if(key.isPressed(DOWN)) {
            this.y += this.speed;
        }  

        if(this.x - this.width/2 < 0){
            this.x = this.width/2;
        }
        if(this.y - this.height/2 < 0){
            this.y = this.height/2;
        }
        if(this.x + this.width/2 > worldWidth){
            this.x = worldWidth - this.width/2;
        }
        if(this.y + this.height/2 > worldHeight){
            this.y = worldHeight - this.height/2;
        }

    }

    draw(context, xView, yView) {
        context.save();
        context.fillStyle = "black";

        context.fillRect((this.x-this.width/2) - xView, (this.y-this.height/2) - yView, this.width, this.height);
        context.restore();
    }

}
