import { Player } from "./Player.js";
import { World } from "./World.js";

export { Lazer }

class Lazer {
    constructor(x, y, angle, speed) {
        this.oneDegree = Math.PI/360;
        
        this.x = x;
        this.y = y;
        this.vx = Math.sin((angle+90) * this.oneDegree)*speed;
        this.vy = (Math.cos((angle+90) * this.oneDegree)*speed);
        this.angle = angle;
    }
    
    update() {
        this.x+=this.vx;
        this.y+=this.vy;
    }
    
    /**
     * @param {CanvasRenderingContext2D} ctx 
     * @param {ImageBitmap} sprite 
     * @param {Number} scale 
     * @param {World} world 
     */
    
    draw(ctx, sprite, scale, world) {
        ctx.save();
        
        ctx.translate(world.worldToScreen(this.x,this.y,ctx).x,world.worldToScreen(this.x,this.y,ctx).y);
        console.log(world.worldToScreen(this.x,this.y,ctx).x)
        ctx.rotate(this.angle * this.oneDegree);
        ctx.drawImage(sprite,0,0,sprite.width,sprite.height,-((sprite.width*scale)/2),-((sprite.height*scale)/2),sprite.width*scale,sprite.height*scale);
        
        ctx.restore();
    }
}

class LazerManager {
    constructor(sprite) {
        this.lazers = [];
        this.lastRefresh = Date.now();
        this.image = sprite;
    }
    
    /**
     * @param {Player} player 
     */
    
    addLazer(player) {
        this.lazers.push(new Lazer(player.getX(),player.getY(),player.angle,10))
    }
    
    draw(ctx) {
        
    }
    
    update() {
        this.lazers.forEach((v,i,a)=>{
            v.update();
        });
        if(this.lastRefresh>3000) {
            this.lazers = [];
            this.lastRefresh = Date.now();
        }
    }
}