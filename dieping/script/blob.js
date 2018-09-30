
function Blob(w, h) {
    this.x = w/2;
    this.y = h/2;
    this.width = 100;
    this.height = 100;
    
    this.size = 20;
    this.r = 30;
    
    this.vx = 3;
    this.vy = 3;
       
    this.GunX = -9;
    this.GunY = 25;

    this.angle = Math.atan2(mouse[1] - this.y, mouse[0] - this.x);
    
    this.updateAngle = function() {
        this.angle = Math.atan2(mouse[1] - this.y, mouse[0] - this.x);
    }

    this.color = "BLACK";

    this.camX = clamp(-this.x + 1272/2, -1000, 3272 - 1272);
    this.camY = clamp(-this.y + 877/2, -1000, 3272 - 877);
     
    this.update = function() {
        this.updateAngle();
        }

    this.draw = function(context) {
        context.save();
        context.translate(this.x, this.y);
        context.rotate(this.angle - Math.PI * 0.5);

        context.beginPath();
        context.arc(0,0, this.r, 0, 7);
        context.rect(this.GunX, this.GunY, 20, 40)
        context.stroke();
        context.fillStyle = this.color;
        context.fill();
        context.restore(); 
            
    };
}

function clamp(value, min, max){
    if(value < min) return min;
    else if(value > max) return max;
    return value;
}

