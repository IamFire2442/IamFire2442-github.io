class Player {
    constructor(x, y) {
        this.x = x || Math.random() * W;
        this.y = y || Math.random() * H;

        this.mass = Math.max(20, Math.random() * 50);
        this.spd = Math.sqrt(this.mass);
        this.speed = 40/this.spd;

        this.timeStarted = Date.now();

        this.r = Math.random() * 255; this.g = Math.random() * 255; this.b = Math.random() * 255;
        this.kills = 0;
        this.foodEaten = 0;
    }

    addMass(m) {
        this.mass += m;
    }

    loseMass(m) {
        this.mass -= m;
    }

    addKill() {
        this.kills++;
    }

    addFoodEat() {
        this.foodEaten++;
    }

    update() {
        this.spd = Math.sqrt(this.mass);
        this.speed = 40/this.spd;
    
        if(this.x > W-this.mass) {
            this.x = W-this.mass;
        }
        if(this.x < 0) {
            this.x = 0;
        }
        if(this.y > H-this.mass) {
            this.y = H-this.mass;
        } 
        if(this.y < 0) {
            this.y = 0;
        }

        if(this.x + this.mass / Math.PI * 0.5> mouse[0]) {
            this.x -= this.speed;
        }
        if(this.y + this.mass / Math.PI * 0.5> mouse[1]) {
            this.y -= this.speed;
        }
        if(this.x + this.mass / Math.PI * 0.5< mouse[0]) {
            this.x += this.speed;
        }
        if(this.y + this.mass / Math.PI * 0.5< mouse[1]) {
            this.y += this.speed;
        }
    }

    draw(c) {
        c.font = "30px Arial";
        c.strokeText(`Mass: ${Math.round(this.mass)}`, 0, 20);
        c.strokeText(`Speed: ${Math.round(this.speed)}mph`, 200, 20);
        c.beginPath();
        c.fillStyle = `black`;
        c.rect(this.x, this.y, this.mass, this.mass);
        c.fill();   
    }

}
