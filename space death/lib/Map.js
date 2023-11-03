export { SpaceMap }

class SpaceMap {
    constructor(spritesheet) {
        this.asteroids = [
            {
                "x":0,
                "y":0,
                "angle":0,
                "phase":0
            }
        ];
        this.enemys = [];
        this.tradeShips = [
            {
                "x":0,
                "y":0,
                "angle":0
            }
        ]
        this.spritesheet = spritesheet;
    }
    
    async setupAsteroids() {
        let l = Math.floor(Math.random()*500)+20
        
        for( let i = 0; i < l; i++ ) {
            this.asteroids.push({
                x:Math.floor(Math.random()*4000)-2000,
                y:Math.floor(Math.random()*4000)-2000,
                phase:0,
                angle:Math.floor(Math.random()*360)
            });
        }
    }
    
    getAsteroidSprite(phase) {
        
        let index = 50;
        
        let x = ((index)%8)*32;
        let y = Math.floor(index/8)*32;
        return { x, y, w:64,h:64 };
        
    }
    
    draw(ctx, player) {
        let middle = { 
            x:ctx.canvas.width/2,
            y:ctx.canvas.height/2
        }
        
        let a = this.asteroids.filter((v,i,a)=>{
            let b = v.x < player.x+middle.x && v.x > player.x-middle.x && v.y < player.y+middle.y && v.y > player.y-middle.y;
            
            return b;
        });
        
        a.forEach((v,i,a) => {
            let r = this.getAsteroidSprite(v.phase);
            
            
            ctx.save();
        
            ctx.translate(middle.x-50,middle.y-50);
            ctx.rotate(this.angle * player.oneDegree);
            ctx.drawImage(this.spritesheet,r.x,r.y,r.w,r.h,v.x-player.x,v.y-player.y,100,100);
            
            ctx.restore();
        });
    }
}