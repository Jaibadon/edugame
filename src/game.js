//root pass for wsl is Justic6a

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

let lastKey = ''
window.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'w':
      keys.w.pressed = true
      lastKey = 'w'
      break
    case 'a':
      keys.a.pressed = true
      lastKey = 'a'
      break

    case 's':
      keys.s.pressed = true
      lastKey = 's'
      break

    case 'd':
      keys.d.pressed = true
      lastKey = 'd'
      break
  }
})

window.addEventListener('keyup', (e) => {
  switch (e.key) {
    case 'w':
      keys.w.pressed = false
      break
    case 'a':
      keys.a.pressed = false
      break
    case 's':
      keys.s.pressed = false
      break
    case 'd':
      keys.d.pressed = false
      break
  }
})

