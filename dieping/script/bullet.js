function Bullet(x, y, dx, dy) {
    this.x = x;
    this.y = y;
    this.vx = 8;
    this.vy = 8;

    this.dx = dx * this.vx;
    this.dy = dy * this.vy;

    this.r = 10;

    this.drawBullet = function(c) {
        
        c.beginPath();
        c.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        c.stroke();
        
        c.fillStyle = 'Red';
        c.fill();
        c.closePath();

    };
    
    this.isOffset = function(x, y, size) {
        if(x > W-size) {
            return true;
        } else
        if(x < 0) {
            return true;
        } else
        if(y > H-size) {
            return true;
        } else 
        if(y < 0) {
            return true;
        }

        return false;
    }

    this.updateBullet = function() {

        this.x += this.dx;
        this.y += this.dy;


    };
};