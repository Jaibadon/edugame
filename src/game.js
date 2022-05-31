//root pass for wsl is Justic6a
//difficulty of questions
var difmode = 1;

const canvas = $("canvas");

var gVar = {};

var exiting = false;

var player = {};

var biter = 0;

var piter = 0;

var enemy = {};

enemy.health = 2;

enemy.orghealth = 5;

player.health = 20;

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

var secondtime = 0;

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

const playerImage = new Image();
playerImage.src = './img/mainchar.png'

const batImage = new Image();
batImage.src = './img/Bat.png'

const waspImage = new Image();
waspImage.src = './img/Wasp.png'

const slimeImage = new Image();
slimeImage.src = './img/Slime.png'

const heartImage = new Image();
heartImage.src = './img/Heart.png'

const shieldImage = new Image();
shieldImage.src = './img/Sheild.png'

enemy.type = 2;

console.log(map);

map.onload = function(){loadBG(map);};

function loadBG() {

        enemy.posx = (canvas.width / 2)+100;
    
        var mapaspect = (map.naturalWidth/map.naturalHeight);
        var canvasaspect = (canvas.width/ canvas.height);
        if(mapaspect>canvasaspect){
            c.imageSmoothingEnabled = false;
            var owidth = map.naturalWidth;
            var fwidth = map.naturalHeight*canvasaspect;
            var sx = (owidth-fwidth)/2;
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

        if(document.getElementsByClassName("attackbutton").length == 0){
        var attackdamagetext = document.createElement("div");
        document.getElementById("gamecontainer").appendChild(attackdamagetext);
        attackdamagetext.id = "attackdamagetext";
        attackdamagetext.style = "font-size: 3vw; position: absolute; z-index: 6; left: 80%; display: inline-block;";
        attackdamagetext.style.top = 49 + "vw"
        var attackbutton = document.createElement("button");
        attackdamagetext.appendChild(attackbutton);
        attackbutton.classList.add('attackbutton');
        attackbutton.innerHTML = "ATTACK";
        attackbutton.addEventListener("click", question);
        }

        biter++;
        
        if(enemy.type == 0){
            //bat
            c.drawImage(batImage, 
                (batImage.width / 6) * (biter%6),0,(batImage.width / 6), batImage.height
                ,enemy.posx, canvas.height / 2, (batImage.width)/2, (batImage.height*6)/2);
                if(exiting == false){
                    setTimeout(loadBG, 100);
                }
                var dividsion = 3;
        }
        else if(enemy.type == 1){
            //sting
            c.drawImage(waspImage, 
                (waspImage.width / 3) * (biter%3),0,(waspImage.width / 3), waspImage.height
                ,enemy.posx, canvas.height / 2, (waspImage.width/3)/1.5, (waspImage.height)/1.5);
                if(exiting == false){
                    setTimeout(loadBG, 150);
                }
                var dividsion = 2;
        }
        else if(enemy.type == 2){
            //Slime
            c.drawImage(slimeImage, 
                (slimeImage.width / 9) * (biter%9),0,(slimeImage.width / 9), slimeImage.height
                ,enemy.posx, canvas.height / 2, (slimeImage.width)/3, (slimeImage.height*9)/3);
                if(exiting == false){
                    setTimeout(loadBG, 100);
                }
                var dividsion = 3;
        }
        
        //draw for 149 frames, then change on 150. if it is 150 then add one to gframerate
        if(secondtime%dividsion == 0){
        c.drawImage(playerImage, 
                (playerImage.width / 3) * (piter%3),0,(playerImage.width / 3), playerImage.height
                ,canvas.width / 3, canvas.height / 2, playerImage.width, playerImage.height * 3);    
                piter++;
        }
        else{
            c.drawImage(playerImage, 
                (playerImage.width / 3) * (piter%3),0,(playerImage.width / 3), playerImage.height
                ,canvas.width / 3, canvas.height / 2, (playerImage.width), playerImage.height*3); 
            
        }
        secondtime += 1;

        damageEnemy(0);
        damagePlayer(0);
}



function isLower(str) {
    return /[a-z]/.test(str) && !/[A-Z]/.test(str);
}


function question(){
    var questions = ["FeCl3 + 3NaOH → Fe(OH)3 + 3NaCl", "C3H8 + 5O2 → 3CO2 + 4H2O", "N+O2 → Na2O", "K + Cl2 → KCl", "Al + Br2 → AlBr2", "Li + S	→ Li2S", "CO2 + H2O → C6H12O6 + O2", "SiCl4 + H2O → H4SiO4 + HCl", "Al + HCl → AlCl3 + H2", "Na2CO3 + HCl → NaCl + H2O + CO2", "C7H6O2 + O2 → CO2 + H2O", "Fe2(SO4)3 + KOH → K2SO4 + Fe(OH)3", "Ca3(PO4)2 + SiO2 → P4O10 + CaSiO3", "KClO3 → KClO4 + KCl", "Al2(SO4)3 + Ca(OH)2 → Al(OH)3 + CaSO4", "H2SO4 + HI → H2S + I2 + H2O"];
    var randomnumber = Math.floor(Math.random() * questions.length);
    console.log(randomnumber +"yo");
    var i = 0;

    switch(difmode){
        case 0:
            var answerstoq = questions[randomnumber].match(/\d/s);
            answerstoq.filter(n => n)
            var fquestn = questions[randomnumber].split(/\d/s);
            break;
        case 1:
            var answerstoq = questions[randomnumber].match(/\d(?=.*→)/g);
            answerstoq.filter(n => n)
            var fquestn = questions[randomnumber].split(/\d(?=.*→)/g);

            break;
        case 2:
            var answerstoq = questions[randomnumber].match(/\d(?!.*→)/g);
            answerstoq.filter(n => n)
            var fquestn = questions[randomnumber].split(/\d(?!.*→)/g);
            break;
        case 3:
            var answerstoq = questions[randomnumber].match(/\d/g);
            answerstoq.filter(n => n)
            var fquestn = questions[randomnumber].split(/\d/g);
            break;
        case 4:
            var answerstoq = questions[randomnumber].match(/[A-Za-z](?!.*→)/g);
            answerstoq.filter(n => n)
            var fquestn = questions[randomnumber].split(/[A-Za-z](?!.*→)/g);
            break;
        case 5:
            var answerstoq = questions[randomnumber].match(/\w(?!.*→)/g);
            answerstoq.filter(n => n)
            var fquestn = questions[randomnumber].split(/\w(?!.*→)/g);
            break;
        case 6:
            var answerstoq = questions[randomnumber].match(/\w(?=.*→)/g);
            answerstoq.filter(n => n)
            var fquestn = questions[randomnumber].split(/\w(?=.*→)/g);
            break;
    }

    console.log(i);

    var j = 0;
    var floatingDiv = document.getElementById("floatingDiv");
    while (floatingDiv.firstChild) {
        floatingDiv.removeChild(floatingDiv.lastChild);
    }
    var attackdamagetext = document.getElementById("attackdamagetext");
    while (attackdamagetext.firstChild) {
        attackdamagetext.removeChild(attackdamagetext.lastChild);
    }


    

    while(j<fquestn.length-1){
        var beforetext = document.createElement("div");
        beforetext.innerHTML = fquestn[j];
        floatingDiv.appendChild(beforetext);
        beforetext.classList.add('questiontext');

        if(isLower(answerstoq[j])){
            console.log("answerbox"+parseInt((j-1), 10));
            document.getElementById("answerbox"+parseInt((j-1), 10)).setAttribute("maxlength", 2);
            document.getElementById("answerbox"+parseInt((j-1), 10)).style.width = "1.8vw";
            console.log(answerstoq, fquestn);
            answerstoq[j-1] = `${answerstoq[j-1]}${answerstoq[j]}`
            answerstoq.splice(j, j);    

            //fquestn[j-1] = `${fquestn[j-1]}${fquestn[j]}`
            //fquestn.splice(j, j);
            console.log(answerstoq, fquestn);
            
        }
        else{
        var answers = document.createElement("INPUT");
        floatingDiv.appendChild(answers);
        answers.id = "answerbox" + j;
        answers.classList.add('inputbox');
        answers.setAttribute("type", "text");
        answers.setAttribute("maxlength", 1);
        }
        gVar.answers = answerstoq;
        j++;
    }
    if(questions[randomnumber].includes(fquestn[fquestn.length-1][fquestn[fquestn.length-1].length-1], -1)){
        var beforetext = document.createElement("div");
        beforetext.innerHTML = fquestn[fquestn.length-1];
        floatingDiv.appendChild(beforetext);
        beforetext.classList.add('questiontext');
    }

    var attackbutton = document.createElement("button");
    attackdamagetext.appendChild(attackbutton);
    attackbutton.classList.add('attackbutton');
    attackbutton.innerHTML = "ATTACK";
    attackbutton.addEventListener("click", checkanswer);

}

function checkanswer(){
    var i = 0;
    var enemydamage = 0;
    var answerstoq = gVar.answers;
    var floatingDiv = document.getElementById("floatingDiv");

    while(i < answerstoq.length){
        var inputtedans = document.getElementById("answerbox" + i).value;
        if(inputtedans==answerstoq[i]){
            enemydamage = enemydamage + 1;
        }
        i++;
    }

    while (floatingDiv.firstChild) {
        floatingDiv.removeChild(floatingDiv.lastChild);
    }
    var attackdamagetext = document.getElementById("attackdamagetext");
    while (attackdamagetext.firstChild) {
        attackdamagetext.removeChild(attackdamagetext.lastChild);
    }

    damageEnemy(enemydamage);

    damagePlayer(3);

    var attackbutton = document.createElement("button");
    attackdamagetext.appendChild(attackbutton);
    attackbutton.classList.add('attackbutton');
    attackbutton.innerHTML = "ATTACK";
    attackbutton.addEventListener("click", question);
}



function damageEnemy(enemydamage){
    var randomnumber = Math.floor(Math.random() * 3);
    //if enemy is dead with amount of damage given
    if(enemy.health-enemydamage<1){
        if(difmode<7){
            //if enemy is an even(slime and bat at this stage) then increase difmode.
            if(randomnumber%2 == 0){
            difmode++;
            }
        }
        //enemy health is proportionate to difmode
        enemy.orghealth = enemy.orghealth*difmode;
        enemy.health = enemy.orghealth;
        enemy.type = randomnumber;
        return;
    }
   
    if(enemydamage>0){
        var enemydamagetext = document.createElement("div");
        document.getElementById("whenSignedIn").appendChild(enemydamagetext);
        enemydamagetext.style = "font-size: 4vw; position: absolute; z-index: 5; top: 40% ;left: 75%; display: inline-block;";
            enemydamagetext.innerHTML = "-" + (enemydamage);
        
        var fadeEffect = setInterval(function () {
            if (!enemydamagetext.style.opacity) {
                enemydamagetext.style.opacity = 1;
            }
            if (enemydamagetext.style.opacity > 0) {
                enemydamagetext.style.opacity -= 0.1;
            } else {
                enemydamagetext.remove();
                clearInterval(fadeEffect);
            }
        }, 200);
    }
    enemy.health -= enemydamage;

    var healthchunk = (100/enemy.orghealth)*(enemy.orghealth-enemy.health);

    var eposx = enemy.posx;
    var eposy = canvas.height/2;


    c.beginPath();
    c.lineWidth = "2";
    c.fillStyle = "rgba(255,255,255, 0.5)";
    c.rect(eposx, eposy,100, 10);
    c.stroke();

    c.beginPath();
    c.fillStyle = "rgba(191, 61, 61)";
    c.rect(eposx, eposy,100-healthchunk, 10);
    c.fill();
    console.log(enemy.health);

    
}

//please note that enemydamage is actually player damage here, im just too lazy to rename it
function damagePlayer(enemydamage){
    if(player.health-enemydamage<0){
        exiting = true;
        deathScreen();
        return;
    }
    if(enemydamage>0){
        var enemydamagetext = document.createElement("div");
        document.getElementById("whenSignedIn").appendChild(enemydamagetext);
        enemydamagetext.style = "font-size: 4vw; position: absolute; z-index: 5; top: 40% ;left: 30%; display: inline-block;";
        if(enemydamage > 1){
            enemydamagetext.innerHTML = "-" + (enemydamage);
        }
        else{
            enemydamagetext.innerHTML = "-" + enemydamage;
        }
        var fadeEffect = setInterval(function () {
            if (!enemydamagetext.style.opacity) {
                enemydamagetext.style.opacity = 1;
            }
            if (enemydamagetext.style.opacity > 0) {
                enemydamagetext.style.opacity -= 0.1;
            } else {
                enemydamagetext.remove();
                clearInterval(fadeEffect);
            }
        }, 200);
    }
    player.health -= enemydamage;

    var healthchunk = 5*(20-player.health);

    var eposx = canvas.width-950;
    var eposy = canvas.height/8*7;


    c.beginPath();
    c.lineWidth = "2";
    c.fillStyle = "rgba(255,255,255, 0.5)";
    c.rect(eposx, eposy,100, 10);
    c.stroke();

    c.beginPath();
    c.fillStyle = "rgba(191, 61, 61)";
    c.rect(eposx, eposy,100-healthchunk, 10);
    c.fill();

    c.drawImage(heartImage, eposx+100, eposy-17, heartImage.width/2, heartImage.height/2); 

    console.log(player.health);
}

function deathScreen(){
        
        c.beginPath();
        c.fillStyle = "rgba(255, 20, 0, 0.3)";
        c.rect(0, 0, canvas.width, canvas.height);
        c.fill();

        floatingDiv
}