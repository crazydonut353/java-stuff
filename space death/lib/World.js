import { Player } from "./Player.js";

export { World }

class World {
    /**
     * @param {Player} player 
     */
    constructor(player) {
        this.player = player;
    }
    
    /**
     * @param {*} x 
     * @param {*} y 
     * @param {CanvasRenderingContext2D} ctx 
     * @returns {}
     */
    
    worldToScreen(x, y, ctx) {
        return {
            x : x-this.player.getX()+(ctx.canvas.width/2),
            y : y-this.player.getY()+(ctx.canvas.height/2)
        }
    }
}