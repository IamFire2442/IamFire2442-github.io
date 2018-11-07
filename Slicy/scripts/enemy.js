class Enemy {
    constructor(p) {
        this.x = Math.random() * W == p.x ? Math.random() * W:Math.random() * W;
        this.y = Math.random() * H == p.y ? Math.random() * H:Math.random() * H;
        this.mass = p.mass * (Math.random() * 2);
        this.spd = Math.sqrt(this.mass);
        this.speed = 40/this.spd;

        this.turbo = false;

        if(this.IfstartCollision(p)) {
            this.newEnemy(p);
        }

        this.r = Math.random() * 255; this.g = Math.random() * 255; this.b = Math.random() * 255;
    }
    IfstartCollision(p) {
        return collides(Enemy, p);
    }

    newEnemy(p) {
        this.x = Math.random() * W == p.x ? Math.random() * W:Math.random() * W;
        this.y = Math.random() * H == p.y ? Math.random() * H:Math.random() * H;
        this.mass = p.mass * (Math.random() * 2);
        this.IfstartCollision(p);
    }

    setTurbo() {
        this.turbo = true;
    
        setTimeout(() => {
            this.turbo = false;
        }, 4000);

    }

    update(p) {
        if(this.turbo) {
            this.spd = Math.sqrt(this.mass);
            this.speed = 20/this.spd;
        } else {
            this.spd = Math.sqrt(this.mass);
            this.speed = 10/this.spd;
        }
    
        if(this.x + (this.mass - p.mass)*0.35> p.x) {
            this.x -= this.speed;
        }
        if(this.x + (this.mass - p.mass)*0.35< p.x) {
            this.x += this.speed;
        }
        if(this.y + (this.mass - p.mass)*0.35< p.y) {
            this.y += this.speed;
        }
        if(this.y + (this.mass - p.mass)*0.35> p.y) {
            this.y -= this.speed;
        }
    }

    draw(c) {


        c.beginPath();
        c.fillStyle = `rgb(${this.r}, ${this.g}, ${this.b})`;
        c.rect(this.x, this.y, this.mass, this.mass);
        c.fill();   
    }

}