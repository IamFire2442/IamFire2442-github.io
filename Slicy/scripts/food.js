class Food {
    constructor() {
        this.x = Math.random() * W;
        this.y = Math.random() * H;

        this.mass = Math.max(5, (Math.random() * 15));

        this.r = Math.random() * 255; this.g = Math.random() * 255; this.b = Math.random() * 255;
    }

    draw(c) {

        c.beginPath();
        c.fillStyle = `rgb(${this.r}, ${this.g}, ${this.b})`;
        c.rect(this.x, this.y, this.mass, this.mass);
        c.fill();   
    }

}