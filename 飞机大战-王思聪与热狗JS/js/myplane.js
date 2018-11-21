var sp;
    var fps=55;
    var score=0;
    
    var boxx=0;
    var boxy=0;
    var boxwidth=500;
    var boxheight=500;
    
    var planeImage;
    var planex;
    var planey;
    var planewidth=60;
    var planeheight=60;
    
    var bulletImage;
    var herobullet;
    var allbullets = new Array();
    var bulletwidth=30;
    var bulletheight=30;
    
    var enemyImage;
    var heroenemy;
    var allenemys = new Array();
    var enemywidth=50;
    var enemyheight=50;
    
    var gameTimmer;
    var btimmer;
    var etimmer;
    
    bulletImage = new Image();
    bulletImage.src="images/newbullet.PNG";
    enemyImage = new Image()
    enemyImage.src="images/enemy.jpg";
    
    
    function beginplane(){
        planex = boxwidth / 2 - planewidth /2 ;
        planey = boxheight - planeheight;
        planeImage = new Image();
        planeImage.src="images/hero.jpg";
    }
    
    function init(){
        canvas = document.getElementById('canvas');
        cxt = canvas.getContext('2d');
        cxt.lineWidth=3;
        beginplane();
        var body = document.getElementsByTagName('body')[0];
        btimmer = setInterval(producebullet,500);
        etimmer = setInterval(produceenemy,800)
        body.addEventListener('keydown',function (event){
            switch(event.keyCode){
                case 37 : if(planex>boxx){sp=8}else{sp=0}planex-=sp;break;
                case 38 : if(planey>boxy){sp=8}else{sp=0}planey-=sp;break;
                case 39 : if((planex+planewidth)<boxwidth){sp=8}else{sp=0}planex+=sp;break;
                case 40 : if((planey+planeheight)<boxheight){sp=8}else{sp=0}planey+=sp;break;
                default:break;
            }
        },false)
        gameTimmer = setInterval(run,1000/fps);
    }
    
    
    function drawenemy(){
        for (var i=0;i<allenemys.length;i++){
            if(allenemys[i].islive){
                cxt.drawImage(enemyImage,allenemys[i].x,allenemys[i].y,enemywidth,enemyheight);
            }
        }
    }
    
    
    function drawplane(){
        cxt.clearRect(boxx,boxy,boxwidth,boxheight);
        cxt.drawImage(planeImage,planex,planey,planewidth,planeheight);
    }
    
    
    function drawbullet(){
        for(var i=0;i<allbullets.length;i++){
            if(allbullets[i].islive){
                cxt.drawImage(bulletImage,allbullets[i].x,allbullets[i].y,bulletwidth,bulletheight);
            }
        }
    }
    
    function produceenemy(){
        var x = Math.ceil(Math.random()*(boxwidth-planeheight));
        heroenemy = new enemy(x,33);
        allenemys.push(heroenemy);
        var timmer = setInterval("allenemys["+ (allenemys.length-1) + "].run()",50);
        allenemys[allenemys.length-1].timmer=timmer;
    }
    
    function producebullet(){
        herobullet = new bullet(planex+planewidth/2,planey+10);
        allbullets.push(herobullet);
        var timmer = setInterval("allbullets[" + (allbullets.length-1) + "].run()",50);
        allbullets[(allbullets.length-1)].timmer=timmer;
    }

    

function checkbullet(){
    for(var i=0;i<allenemys.length;i++){
        if(allenemys[i].islive){
            var e =allenemys[i];
            for(var j=0;j<allbullets.length;j++){
                if(allbullets[j].islive){
                var b = allbullets[j];
                if(b.x>e.x-bulletwidth&&b.x+bulletwidth<e.x+enemywidth+10&&b.y<e.y){
                    e.islive=false;
                    b.islive=false;
                    score+=100;
                }
                }
            }
        }
    }
}

function checkplane(){
    for(var i=0;i<allenemys.length;i++){
        if(allenemys[i].islive){
        var e = allenemys[i];
            if(e.x+enemywidth>planex&&e.x<planex+planewidth&&e.y>planey||e.y>boxheight){
                e.islive=false;
                stop();
                score=0;
            }
        }
    }
}

function drawscore(){
    document.getElementById('score').innerHTML=score;
}



    
    function run(){
        drawplane();
        drawbullet();
        drawscore();
        drawenemy();
        checkbullet();
        checkplane();
    }