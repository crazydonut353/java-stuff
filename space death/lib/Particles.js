export { Particle }

class Particle {
    /**
     * 
     * @param {Number} x x of particle
     * @param {Number} y y of particle
     * @param {Number} angle angle of particle
     * @param {ImageBitmap} image 
     * @param {Number} scale 
     */
    constructor(x, y, angle, image, scale, vx, vy) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.vAngle = 0;
        this.angle = angle;
        this.image = image;
        this.scale = scale;
    }
    
    update() {
        this.y++;
        this.angle+=4;
    }
    /**
     * 
     * @param {CanvasRenderingContext2D} ctx 
     */
    draw(ctx) {
        ctx.save();
        ctx.translate(this.x,this.y);
        ctx.rotate(this.angle * Math.PI/360);
        ctx.drawImage(this.image,0-this.scale/2,0-this.scale/2,this.scale,this.scale)
        ctx.restore();
    }
}

class ParticleEmitter {
    /**
     * 
     * @param {Number} minAngle Minimum angle of each particle emmitted ( 0 - 360 )
     * @param {Number} maxAngle Maximum angle of each particle emmitted ( 0 - 360 )
     * @param {Number} x Position of midpoint on the X-Axis
     * @param {Number} y Position of midpoint on the Y-Axis
     * @param {ImageBitmap} image 
     * @param {Number} scale 
     * @param {int} type The type of animation played ( ParticleEmitter.CONTINUOUS or ParticleEmitter.STATIC )
     */
    constructor(minAngle, maxAngle, x, y, image, scale, type) {
        this.minAngle = minAngle;
        this.maxAngle = maxAngle;
        this.x = x;
        this.y = y;
        this.image = image;
        this.scale = scale;
        this.type = type;
        this.CONTINUOUS = 0;
        this.STATIC = 1;
        this.delay = 100;
        this.lifetime = 100;
        this.lastFrame = 0;
        this.startParticles = 10;
        this.particles = [];
        this.started = false;
    }
    
    addRandomParticles(count) {
        for( let i = 0; i < count; i++ ) {
            let angle = this.minAngle + Math.floor(Math.random() * (this.maxAngle-this.minAngle));
            let vx = (Math.sin((angle*(Math.PI/360)))*10);
            let vy = -(Math.cos(angle*(Math.PI/360))*10);
            
            this.particles.push(new Particle(this.x,this.y,angle,this.image,this.scale,vx,vy));
        }
    }
    
    start(time) {
        if(this.type == this.CONTINUOUS) {
            return;
        } else if(this.type == this.STATIC) {
            this.lastFrame = time;
            this.addRandomParticles(this.startParticles);
            return;
        } else {
            throw new Error("Animation type not compatible or null!");
        }
    }
    
    setDelay(d) {
        this.delay = d;
    }
    
    setLifetime(d) {
        this.lifetime = d;
    }
    
    update(time) {
        if(this.type == this.CONTINUOUS) {
            
        } else if(this.type == this.STATIC) {
            
        } else {
            throw new Error("Animation type not compatible or null!");
        }
        
        
    }
    
    draw(ctx) {
        this.particles.forEach((v,i,a)=>{
            v.draw(ctx);
        })
    }
    
}