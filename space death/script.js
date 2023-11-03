import { Images } from "./lib/BetterImage.js";
import { Player } from "./lib/Player.js";
import { SpaceMap } from "./lib/Map.js";

/**
 * @type {HTMLCanvasElement}
 */
const canvas = document.querySelector("#c");
const ctx = canvas.getContext("2d");

const imageAssets = new Images( [
    "./images/asteroids-arcade.png"
] );

var player;
var map;
var GMKeys = {};

const backgroundColor = "black";

async function init() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    await imageAssets.load();
    
    player = new Player(imageAssets.files[0]);
    
    map = new SpaceMap(imageAssets.files[0]);
    
    await map.setupAsteroids();
    
    gameloop();
}

function gameloop() {
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0,0,canvas.width,canvas.height)
    
    map.draw(ctx, player);
    
    player.draw(ctx);
    player.update(GMKeys);
    
    requestAnimationFrame(gameloop);
}

init();

document.addEventListener("keydown", (e) => {
    GMKeys[e.key]=true;
}, true);
document.addEventListener("keyup", (e) => {GMKeys[e.key]=false;}, true);

document.addEventListener("click", () => {
    player.ship++;
});