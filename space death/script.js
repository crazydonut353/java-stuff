import { Images } from "./lib/BetterImage.js";
import { Player } from "./lib/Player.js";
import { SpaceMap } from "./lib/Map.js";
import { Lazer } from "./lib/LazerManager.js";
import { World } from "./lib/World.js";

/**
 * @type {HTMLCanvasElement}
 */
const canvas = document.querySelector("#c");
const ctx = canvas.getContext("2d");

const imageAssets = new Images( [
    "./images/asteroids-arcade.png",
    "./images/stuipid_lazer.png"
] );

var player;
var map;
let world;
var l = new Lazer(0,0,40,0);
var GMKeys = {};

const backgroundColor = "black";

async function init() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    await imageAssets.load();
    
    player = new Player(imageAssets.files[0]);
    
    map = new SpaceMap(imageAssets.files[0]);
    
    await map.setupAsteroids();
    
    world=new World(player);
    
    gameloop();
}

function gameloop() {
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0,0,canvas.width,canvas.height)
    
    map.draw(ctx, player);
    
    player.draw(ctx);
    player.update(GMKeys);
    
    l.draw(ctx,imageAssets.files[1],1,world);
    l.update();
    
    requestAnimationFrame(gameloop);
}

init();

document.addEventListener("keydown", (e) => {
    GMKeys[e.code]=true;
}, true);
document.addEventListener("keyup", (e) => {GMKeys[e.code]=false;}, true);

