function bullet(x,y){
    this.x=x;
    this.y=y;
    this.islive=true;
    this.timmer=null;
    this.run=function run(){
        if(this.y<-10||this.islive==false){
            clearInterval(this.timmer);
            this.islive=false;
        }else{
            this.y-=20;
        }
    }
}


function enemy(x,y){
    this.x=x;
    this.y=y;
    this.islive=true;
    this.timmer=null;
    this.run=function run(){
        if(this.y>boxheight||this.islive==false){
            clearInterval(this.timmer);
            this.islive=false;
        }else{
            this.y+=2.5;
        }
    }
}