const canvas = $("canvas");

const height = 1024;
const width = 576;

canvas.width(height);
canvas.height(width);

const c = canvas[0].getContext('2d');

c.fillStyle = "white";
c.fillRect(0,0, height, width);

const map = new Image();
map.src = './img/placeholdermap.png';

const playerDownImage = new Image()
playerDownImage.src = './img/playerDown.png'

console.log(map);

map.onload = () => {
    c.drawImage(map, -750, -550);
}

