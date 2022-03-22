const canvas = $("canvas");

canvas.width(1024);
canvas.height(576);

const c = canvas[0].getContext('2d');

c.fillStyle = "white";
c.fillRect(0,0, 1024, 576);
