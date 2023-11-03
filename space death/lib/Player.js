export { Player }

class Player {
    constructor(spritesheet) {
        this.oneDegree = (Math.PI/360);
        this.x = 0;
        this.y = 0;
        this.vx = 0;
        this.vy = 0;
        this.angle = 0;
        this.vAngle = 30;
        this.spritesheet = spritesheet;
        this.ship = 0;
        this.ships=[
            {
                "canBoost":true,
                "sprite":0,
                "name":"ship 1",
                "speed":1,
                "boostSpeed":3,
                "flameSprites":[3,2]
            },
            {
                "canBoost":false,
                "sprite":1,
                "name":"ship 2",
                "speed":2,
                "flameSprites":[3]
            },
            {
                "canBoost":true,
                "sprite":8,
                "name":"ship 3",
                "speed":2,
                "boostSpeed":4,
                "flameSprites":[11,10]
            },
            {
                "canBoost":true,
                "sprite":9,
                "name":"ship 4",
                "speed":2,
                "boostSpeed":5,
                "flameSprites":[11,10]
            }
        ];
        this.isBoosting = false;
        this.isMoving = false;
        this.maxColomns = 8;
    }
    
    getSpritePos(index) {
        let x = ((index)%this.maxColomns)*32;
        let y = Math.floor(index/this.maxColomns)*32;
        return { x, y };
    }
    
    /**
     * 
     * @param {CanvasRenderingContext2D} ctx 
     */
    draw(ctx) {
        let middle = { 
            x:ctx.canvas.width/2,
            y:ctx.canvas.height/2
        }
        
        let drawB = 32*30;
        let drawS = this.getSpritePos(this.ships[this.ship].sprite);
        
        
        
        if(this.isBoosting&&this.ships[this.ship].canBoost&&this.isMoving) {
            drawB = this.ships[this.ship].flameSprites[1];
            drawB = this.getSpritePos(drawB);
        } else if(this.isMoving) {
            drawB = this.ships[this.ship].flameSprites[0];
            drawB = this.getSpritePos(drawB);
        }
        
        
        ctx.imageSmoothingEnabled = false;
        
        ctx.save();
        
        ctx.translate(middle.x,middle.y);
        ctx.rotate(this.angle * this.oneDegree);
        ctx.drawImage(this.spritesheet,drawB.x,drawB.y,32,32,-50,31-50,100,100);
        
        ctx.drawImage(this.spritesheet,drawS.x,drawS.y,32,32,-50,-50,100,100);
        
        ctx.restore();
    }
    update(GMKeys) {
        const angle = (this.angle) * this.oneDegree;
        
        this.x+=this.vx;
        this.y+=this.vy;
        this.angle+=this.vAngle;
        
        this.vAngle*=0.8;
        this.vx*=0.9;
        this.vy*=0.9;
        
        if(GMKeys.w) {
            if(this.isBoosting&&this.ships[this.ship].canBoost) {
                this.vx+=(Math.sin(angle)*this.ships[this.ship].boostSpeed);
            this.vy+=-(Math.cos(angle)*this.ships[this.ship].boostSpeed);
            } else {
                this.vx+=(Math.sin(angle)*this.ships[this.ship].speed);
                this.vy+=-(Math.cos(angle)*this.ships[this.ship].speed);
            }
            this.isMoving=true;
        } else {
            this.isMoving=false;
        }
        
        if(GMKeys.Shift) {
            this.isBoosting=true;
        } else {
            this.isBoosting=false;
        }
        
        if(GMKeys.a) {
            this.vAngle-=1;
        }
        
        if(GMKeys.d) {
            this.vAngle+=1;
        }
        
    }
}