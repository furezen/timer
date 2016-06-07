var WINDOW_WIDTH = 1024;
var WINDOW_HEIGHT = 768;
var RADIUS = 8;
var MARGIN_TOP = 60;
var MARGIN_LEFT = 30;
const endTime = new Date(2016,5,8,18,47,52);
var curShowTimeSeconds = 0;
var ball = [];
const colors = ["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"]

window.onload = function() {
    // body...
    WINDOW_WIDTH =document.body.clientWidth;
    WINDOW_HEIGHT = document.body.clientHeight;
    
    MARGIN_LEFT = Math.round(WINDOW_WIDTH/10);
    RADIUS = Math.round(WINDOW_WIDTH*4/5/108)-1;

    MARGIN_TOP = Math.round(WINDOW_HEIGHT/5);
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    
    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;
    curShowTimeSeconds = getCurrentShowTimeSeconds()
    setInterval(
    function(){
    render(context);
    update();
},
    50

    );
}

function getCurrentShowTimeSeconds(){
    var curtime = new Date()
    var ret = endTime.getTime()-curtime.getTime();
    ret = Math.round(ret/1000)

    return ret>=0? ret : 0;
}
function update(){
    var nextShowTimeSeconds = getCurrentShowTimeSeconds();
    var nextHours = parseInt(nextShowTimeSeconds / 3600);
    var nextMinutes = parseInt((nextShowTimeSeconds - nextHours*3600)/60)
    var nextSeconds = nextShowTimeSeconds %60

    var curHours = parseInt(curShowTimeSeconds / 3600);
    var curMinutes = parseInt((curShowTimeSeconds - curHours*3600)/60)
    var curSeconds = curShowTimeSeconds %60
    if(nextSeconds != curSeconds){
        if(parseInt(curHours/10) != parseInt(nextHours/10)){
            addBall(MARGIN_LEFT+0,MARGIN_TOP,parseInt(curHours/10));
        }
         if(parseInt(curHours%10) != parseInt(nextHours%10)){
            addBall(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(curHours/10));
        }
         if(parseInt(curMinutes/10) != parseInt(nextMinutes/10)){
            addBall(MARGIN_LEFT+39*(RADIUS+1),MARGIN_TOP,parseInt(curMinutes/10));
        }
         if(parseInt(curMinutes%10) != parseInt(nextMinutes%10)){
            addBall(MARGIN_LEFT+54*(RADIUS+1),MARGIN_TOP,parseInt(curMinutes/10));
        }
         if(parseInt(curSeconds/10) != parseInt(nextSeconds/10)){
            addBall(MARGIN_LEFT+78*(RADIUS+1),MARGIN_TOP,parseInt(curSeconds/10));
        }
         if(parseInt(curSeconds%10) != parseInt(nextSeconds%10)){
            addBall(MARGIN_LEFT+93*(RADIUS+1),MARGIN_TOP,parseInt(curSeconds/10));
        }
        curShowTimeSeconds = nextShowTimeSeconds;
    }
    updateBall();
    console.log(ball.length);
}
function updateBall(){
    for(var i = 0;i < ball.length ; i++){
        ball[i].x += ball[i].vx;
        ball[i].y += ball[i].vy;
        ball[i].vy += ball[i].g;
        if(ball[i].y>=WINDOW_HEIGHT-RADIUS ){
            ball[i].y = WINDOW_HEIGHT-RADIUS;
            ball[i].vy = -ball[i].vy*0.75
        }
        if(ball[i].x>=WINDOW_WIDTH-RADIUS){
            ball[i].x = WINDOW_WIDTH-RADIUS-5;
            ball[i].vx = - ball[i].vx*0.5
        }
    }
    var cnt = 0 
    for(var i = 0;i<ball.length ; i++)
        if(ball[i].x+RADIUS>0 && ball[i].x-RADIUS<WINDOW_WIDTH)
            ball[cnt++] = ball[i]


    while(ball.length>Math.min(800,cnt)){
        ball.pop();
    }    

}
function addBall(x,y,num){
    for(var i = 0 ; i < digit[num].length;i++)
        for(var j = 0 ;j<digit[num][i].length;j++)
            if(digit[num][i][j] ==1 ){
                var aBall = {
                    x:x+j*2*(RADIUS+1)+(RADIUS+1),
                    y:y+i*2*(RADIUS+1)+(RADIUS+1),
                    g:1.5+Math.random(),
                    vx:Math.pow(-1,Math.ceil(Math.random()*1000))*4,
                    vy:-5,
                    color:colors[Math.floor(Math.random()*colors.length)]
                }
                ball.push(aBall);
            }
}
function render(cxt){
    cxt.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);
    var hours = parseInt(curShowTimeSeconds / 3600);
    var minutes = parseInt((curShowTimeSeconds - hours*3600)/60)
    var seconds = curShowTimeSeconds %60
    renderDigit(MARGIN_LEFT,MARGIN_TOP,parseInt(hours/10),cxt)
    renderDigit(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(hours%10),cxt)
    renderDigit(MARGIN_LEFT+30*(RADIUS+1),MARGIN_TOP,10,cxt);
    renderDigit(MARGIN_LEFT+39*(RADIUS+1),MARGIN_TOP,parseInt(minutes/10),cxt)
    renderDigit(MARGIN_LEFT+54*(RADIUS+1),MARGIN_TOP,parseInt(minutes%10),cxt)
    renderDigit(MARGIN_LEFT+69*(RADIUS+1),MARGIN_TOP,10,cxt);
    renderDigit(MARGIN_LEFT+78*(RADIUS+1),MARGIN_TOP,parseInt(seconds/10),cxt)
    renderDigit(MARGIN_LEFT+93*(RADIUS+1),MARGIN_TOP,parseInt(seconds%10),cxt)

    for(var i = 0 ;i<ball.length;i++){
        cxt.fillStyle=ball[i].color;
        cxt.beginPath();
        cxt.arc(ball[i].x,ball[i].y,RADIUS,0,2*Math.PI,true);
        cxt.closePath();
        cxt.fill();

    }

}
function renderDigit(x,y,num,cxt){
    cxt.fillStyle="rgb(0,102,153)";

    for( var i = 0 ; i < digit[num].length ; i ++ )
        for(var j = 0 ; j < digit[num][i].length ; j ++ )
            if( digit[num][i][j] == 1 ) {
                cxt.beginPath();
                cxt.arc(x+j*2*(RADIUS+1)+(RADIUS+1),y+i*2*(RADIUS+1)+(RADIUS+1), RADIUS , 0 , 2*Math.PI );
                cxt.closePath();

                cxt.fill()
            }
}