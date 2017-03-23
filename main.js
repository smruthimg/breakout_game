var canvas=document.getElementById("can");
var ctx=canvas.getContext("2d");
var ballRadius=10;
var x=canvas.width/2;
var y=canvas.height-30;
var dx=2;
var dy=-2;
var paddleheight=10;
var paddleWidth=75;
var paddleXPos=(canvas.width-paddleWidth)/2;
var rightPress=false;
var leftPress=false;

var brickRowCt=5;
var brickColCt=5;
var brickWidth=75;
var brickHeight=20;
var brickpadding=10;
var brickOffsetTop=30;
var brickOffsetLeft=30;
var score=0;
var bricks=[];
for(c=0;c<brickColCt;c++){
    bricks[c]=[];
    for(r=0;r<brickRowCt;r++){
        bricks[c][r]={ x: 0, y: 0,status: 1};
        }
    }
document.addEventListener("keydown",keyDownHandler,false);
document.addEventListener("keyup",keyUpHandler,false);

function collisionDetection(){
    for(c=0;c<brickColCt;c++){
    for (r=0;r<brickRowCt;r++){
    var b=bricks[c][r];
    if(b.status==1){
    if(x>b.x && x<b.x+brickWidth && y>b.y && y<b.y+brickHeight){
    dy=-dy;
    b.status=0;
    score++;
    if(score==(brickRowCt*brickColCt)-1){
    alert("You Win, Congratulations!!");
    document.location.reload();
    }}
    }
    }}
}

function drawBricks(){
    for(c=0;c<brickColCt;c++){
        for(r=0;r<brickRowCt;r++){
        if(bricks[c][r].status==1){
            var brickx=(c*(brickWidth+brickpadding))+ brickOffsetLeft;
            var bricky=(r*(brickHeight+brickpadding))+brickOffsetTop;
            bricks[c][r].x=brickx;
            bricks[c][r].y=bricky;
            ctx.beginPath();

            ctx.rect(brickx,bricky,brickWidth,brickHeight);

            ctx.fillStyle = "seagreen";
            ctx.fill();
            ctx.closePath();
            }
            }
        }
    }



function drawScore(){
ctx.font="16px Georgio";
ctx.fillStyle="midnightblue";
ctx.fillText("Score: " +score,8,20);
}
function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();

    drawPaddle();
    drawScore();
    collisionDetection();
    if(x+dx>canvas.width-ballRadius || x+dx<ballRadius){
    dx=-dx;
    }
    if(y+dy<ballRadius){
    dy=-dy;}
    else if(y+dy>canvas.height-ballRadius){
    if(x>paddleXPos && x<paddleWidth+paddleXPos){
    dy=-dy;}
    else{
    alert('GameOver!')
    document.location.reload();
    }
    }

x+=dx;
y+=dy;

if(rightPress && paddleXPos<canvas.width-paddleWidth){
paddleXPos+=7;}
else if(leftPress && paddleXPos>0){
paddleXPos-=7;}
}

function drawPaddle(){
ctx.beginPath();
ctx.rect(paddleXPos,canvas.height-paddleheight,paddleWidth,paddleheight);
fillStyle="#0095DD";
ctx.fill();
ctx.closePath();}



function drawBall(){
ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}
function keyDownHandler(e){
if(e.keyCode==39){
rightPress=true;
}
else if(e.keyCode==37){
leftPress=true;
}
}

function keyUpHandler(e){
if(e.keyCode==39){
rightPress=false;}

else if(e.keyCode==37){
leftPress=false;}
}

setInterval(draw,10);