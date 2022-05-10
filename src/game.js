//root pass for wsl is Justic6a
//difficulty of questions
var difmode = 1;

const canvas = $("canvas");

var gVar = {}; 

document.addEventListener("DOMContentLoaded", function(event) {
    var ahash = window.location.hash.slice(1);
    if(window.location.hash == ""){
        show('home','game','about');
    }
    else{
            if(ahash == 'game'){
               show('game','home','about');
               console.log("tadnfjndjfnv");
            }
            else if(ahash == 'home'){
                show('home','game','about');
            }
            else if(ahash == 'about'){
                show('about','game','home');
            }
    }
});


//make it when dynamic and when resize screen change it

const width = 1024;
const height = 576;

canvas.width = width;
canvas.height = height;

canvas.attr('width', width);
canvas.attr('height', height);

const c = canvas[0].getContext('2d');

c.fillStyle = "white";
c.fillRect(0,0, width, height);

gVar.c = c;
gVar.canvas = canvas;

const map = new Image();
map.src = './img/combat.png';

console.log(map);

loadBG(map);

function loadBG(map) {
    var c = gVar.c;
    var canvas = gVar.canvas;
    map.onload = () => {
        var mapaspect = (map.naturalWidth/map.naturalHeight);
        var canvasaspect = (canvas.width/ canvas.height);
        if(mapaspect>canvasaspect){
            c.imageSmoothingEnabled = false;
            var owidth = map.naturalWidth;
            var fwidth = map.naturalHeight*canvasaspect;
            var sx = (owidth-fwidth)/2;
            console.log([sx,fwidth,owidth,mapaspect,canvasaspect, map.naturalWidth, map.naturalHeight, canvas.width, canvas.height]);
            c.drawImage(map, sx, 0, fwidth, map.naturalHeight, 0,0, c.canvas.width, c.canvas.height);
        }
        else{
            c.imageSmoothingEnabled = false;
            var oheight = map.naturalHeight;
            var fheight = map.naturalWidth*canvasaspect;
            var sy = (fheight-oheight)/2;
            console.log([sy,fheight,oheight,mapaspect,canvasaspect, map.naturalWidth, map.naturalHeight, canvas.width, canvas.height]);
            c.drawImage(map, 0, sy, map.naturalWidth, fheight, 0,0, c.canvas.width, c.canvas.height);
        }

        //attack box
        c.beginPath();
        c.fillStyle = "rgba(255, 255, 255, 0.5)";
        c.lineWidth = "2";
        c.rect(2, canvas.height-90, canvas.width-2, 88);
        c.fill();
        c.stroke();

        var floatingDiv = document.getElementById("floatingDiv");
        var attackbutton = document.createElement("button");
        floatingDiv.appendChild(attackbutton);
        attackbutton.classList.add('attackbutton');
        attackbutton.innerHTML = "ATTACK";
        attackbutton.addEventListener("click", question);
};
}


function question(){
    var questions = ["H20 + H20 = J2 + H5"];
    var randomnumber = Math.floor(Math.random() * questions.length);
    var i = 0;

    switch(difmode){
        case 0:
            var answerstoq = questions[randomnumber].match(/\d/s);
            var fquestn = questions[randomnumber].split(/\d/s);
        case 1:
            var answerstoq = questions[randomnumber].match(/\d?(?=.*=)/g);
            var fquestn = questions[randomnumber].split(/\d?(?=.*=)/g);
        case 2:
            var answerstoq = questions[randomnumber].match(/\d?(?!.*=)/g);
            var fquestn = questions[randomnumber].split(/\d?(?!.*=)/g);
        case 3:
            var answerstoq = questions[randomnumber].match(/\d/g);
            var fquestn = questions[randomnumber].split(/\d/g);
    }


    console.log(i);

    var j = 0;
    var floatingDiv = document.getElementById("floatingDiv");
    while (floatingDiv.firstChild) {
        floatingDiv.removeChild(floatingDiv.lastChild);
    }

    while(j<fquestn.length-1){
        var beforetext = document.createElement("div");
        beforetext.innerHTML = fquestn[j];
        floatingDiv.appendChild(beforetext);
        beforetext.classList.add('questiontext');
        
        var answers = document.createElement("INPUT");
        floatingDiv.appendChild(answers);

        answers.id = "answerbox" + j;
        answers.classList.add('inputbox');
        answers.setAttribute("type", "text");
        answers.setAttribute("maxlength", 1);
        
        gVar.answers = answerstoq;
        j++;
    }

    var attackbutton = document.createElement("button");
    floatingDiv.appendChild(attackbutton);
    attackbutton.classList.add('attackbutton');
    attackbutton.innerHTML = "ATTACK";
    attackbutton.addEventListener("click", checkanswer);

}

function checkanswer(){
    var i = 0;
    var enemydamage = 0;
    var answerstoq = gVar.answers;
    var floatingDiv = document.getElementById("floatingDiv");

    while(i < answerstoq.length-1){
        var inputtedans = document.getElementById("answerbox" + i).value;
        if(inputtedans==answerstoq[i]){
            enemydamage = enemydamage + 1;
        }
        i++;
    }
    while (floatingDiv.firstChild) {
        floatingDiv.removeChild(floatingDiv.lastChild);
    }

    if(enemydamage>0){
        var enemydamagetext = document.createElement("div");
        floatingDiv.appendChild(enemydamagetext);
        enemydamagetext.innerHTML = "-" + enemydamage;
        var seconds = 100;
        enemydamagetext.style.transition = "opacity "+seconds+"s ease-out";
        enemydamagetext.style.opacity = 1;
        setTimeout(function() {
            enemydamagetext.parentNode.removeChild(enemydamagetext);
        }, 2000);
    }

    var attackbutton = document.createElement("button");
    floatingDiv.appendChild(attackbutton);
    attackbutton.classList.add('attackbutton');
    attackbutton.innerHTML = "ATTACK";
    attackbutton.addEventListener("click", question);
}


