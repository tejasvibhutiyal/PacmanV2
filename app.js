const board = ['pink','blue','green','red','purple','orange'];
const myBoard = [];
const tempBoard = [
    1,1,1,1,1,1,1,1,1,1,
    1,4,4,4,2,2,2,2,2,1,
    1,1,1,1,2,2,2,2,2,1,
    1,2,2,1,1,1,2,2,2,1,
    1,2,3,2,2,2,2,1,2,1,
    1,2,2,1,1,1,2,2,2,1,
    1,2,3,2,2,2,2,2,2,1,
    1,2,1,2,2,1,1,1,2,1,
    1,2,2,2,2,2,2,2,2,1,
    1,1,1,1,1,1,1,1,1,1
];
var button=0;
const keyz= {ArrowRight: false, ArrowLeft: false, ArrowDown: false, ArrowUp:false};//we willadd the keys whivh we want to listen
const ghosts = [];
const g = {
    x:'',y:'',h:50,size:20,ghosts:6,inplay:false,startGhost:11
}
const player = {
    pos:32,speed:3,cool:0,pause:false,score:0,lives:3,gameover:true,gamewin:false
    ,powerup:false,powerCount:0
}
const startGame=document.querySelector('.btn');
//Definig arrow keys
const upKey=document.querySelector('.arrowUp');
const downKey=document.querySelector('.arrowDown');
const rightKey=document.querySelector('.arrowRight');
const leftKey=document.querySelector('.arrowLeft');

///EVENT LISTENERS WHERE WE SETUP GAME CONTENT
document.addEventListener('DOMContentLoaded',()=>{
    g.grid =  document.querySelector('.grid'); ///gameBoard
    g.pacman = document.querySelector('.pacman');///pacman
    g.eye = document.querySelector('.eye');
    g.mouth = document.querySelector('.mouth');
    g.ghost = document.querySelector('.ghost');
    g.ghost.style.display = 'none';
    g.score=document.querySelector('.score');
    g.lives=document.querySelector('.lives');
    g.pacman.style.display='none';
    g.grid.style.display='none';
    
    ////console.log(g);
})

document.addEventListener('keydown',(e)=>{
    //console.log(e.code);
    console.log(e);
    if(e.code in keyz){
        keyz[e.code]= true;//this will tell which key is pressed
    }
    if(!g.inplay && !player.pause){
        //this will check that the game was not playing and player also dont pause it
        //then it will create game
     player.play =requestAnimationFrame(move);//
        g.inplay= true;
    }
    })

document.addEventListener('keyup',(e)=>{
    if(e.code in keyz){
        keyz[e.code]= false;//this will tell which key is pressed
    }
})

upKey.addEventListener('touchstart',moveup);
upKey.addEventListener('touchend',(e)=>{
    button=1;
    clearmove();
});
upKey.addEventListener('touchmove',moveup);

downKey.addEventListener('touchstart',movedown);
downKey.addEventListener('touchend',(e)=>{
    button=4;
    clearmove();
});
downKey.addEventListener('touchmove',movedown);

leftKey.addEventListener('touchstart',moveleft);
leftKey.addEventListener('touchend',(e)=>{
    button=2;
    clearmove();
});
leftKey.addEventListener('touchmove',moveleft);

rightKey.addEventListener('touchstart',moveright);
rightKey.addEventListener('touchend',(e)=>{
    button=3;
    clearmove();
});
rightKey.addEventListener('touchmove',moveright);

//startGame.addEventListener('click',starterGame);
startGame.addEventListener('click',boardBuilder);


//function for touch

function boardBuilder(){
   
   tempBoard.length=0;
   let boxSize=(document.documentElement.clientHeight<document.documentElement.clientWidth) ? document.documentElement.clientHeight:document.documentElement.clientWidth;
console.log(boxSize);
g.h=(boxSize/g.size)-(boxSize/(g.size*5));
let tog=false;
for(let x=0;x<g.size;x++){
    let wallz=0;
    for(let y=0;y<g.size;y++){
        let val=2;
        wallz--;
        if(wallz>0 && (x-1)%2){
            val=1;
        }else{
            wallz=Math.floor(Math.random()*(g.size/2));
        }
        if(x==1 || x==(g.size-3)||y==1||y==(g.size-2)){
            val=2;//place dot
        }

        if(x==(g.size-2)){
            if(!tog){
                g.startGhost=tempBoard.length;
                tog=true;
            }
           val=4;
        }
        if(y==3 || (y==(g.size-4)) ){
            if(x==1 || x==(g.size-3)){ val=3;}
           
        }

        if(x==0 || x==(g.size-1)||y==0||y==(g.size-1)){
            val=1;
        }
        tempBoard.push(val);
    }
   
}

starterGame();
}







//THE MAIN GAME PLAY
function clearmove(){
  if(button==1){
      keyz.ArrowUp=false;
  }
  if(button==2){
      keyz.ArrowLeft=false;
  }
  if(button==3){
      keyz.ArrowRight=false;
  }
  if(button==4){
      keyz.ArrowDown=false;
  }

}
function moveup() {
    //player.pos -=g.size;
    console.log('click');
    keyz.ArrowUp=true;
    player.cool--;
    g.inplay=true;
    player.play=requestAnimationFrame(move);
  }
  
  function movedown() {
    //player.pos += g.size;
    console.log('click');
    keyz.ArrowDown=true;
    player.cool--;
    g.inplay=true;
    player.play=requestAnimationFrame(move);
  }
  
  function moveleft() {
    /*player.pos-=1;
    g.eye.style.left = '60%';
    g.mouth.style.left ='0%';*/
    console.log('click');
    keyz.ArrowLeft=true;
    player.cool--;
    g.inplay=true;
    player.play=requestAnimationFrame(move);
  }
  
  function moveright() {
    /*player.pos+=1;
    g.eye.style.left = '20%';
    g.mouth.style.left ='60%';*/
    console.log('click');
    player.cool--;
    keyz.ArrowRight=true;
    g.inplay=true;
    player.play=requestAnimationFrame(move);
  }

function move(){
    //will loop thru all the ghost 
    if(g.inplay){
        player.cool--;//cool down the speed of player
        if(player.cool < 0){
            ////console.log(ghosts);
            //placing maovement of ghost
            let tempPower=0;//color of the ghost depends on it
             if(player.powerup){
                 g.pacman.style.backgroundColor='red';
                 player.powerCount--;
                 if(player.powerCount<20){
                    g.pacman.style.backgroundColor='orange';
                    if(player.powerCount%2==0){
                        g.pacman.style.backgroundColor='white';
                    }
                 }
                 if(player.powerCount<=0){
                     player.powerup=false;
                     g.pacman.style.backgroundColor='yellow';
                     console.log('POWER DOWN');
                     tempPower=1;
                 }
                 
             }

            ghosts.forEach((ghost)=>{
                if(tempPower==1){
                    ghost.style.backgroundColor=ghost.defaultColor;
                }else if(player.powerCount>0){
                    if(player.powerCount%2==0){
                        ghost.style.backgroundColor='white';
                    }else{
                        ghost.style.backgroundColor='teal';
                    }
                }
                
                myBoard[ghost.pos].append(ghost);//this will append the ghost to the screen
                 ghost.counter--;
                 
                 let oldPOS= ghost.pos;//original ghost position
                
                 if(ghost.counter <=0) 
                 {
                     changeDir(ghost);//this will change the direction of ghost
                 }else{
                     
                     //this will change the direction of ghost
                     if(ghost.dx==0){ghost.pos -= g.size;}
                     else if(ghost.dx==1){ghost.pos +=g.size;}
                     else if(ghost.dx==2){ghost.pos +=1;}
                     else if(ghost.dx==3){ghost.pos -=1;}
                 }
                 if(ghost.stopped>0){
                    ghost.stopped--;
                    ghost.pos=oldPOS;
                }
                 //******* Testing only
                // ghost.pos=oldPOS;
                 if(player.pos == ghost.pos){
                     //console.log('ghost caught you'+ghost.namer);
                    if(player.powerCount>0){
                        //ate the ghost
                        player.score+=200;
                        let randomRegenerateSpot=Math.floor(Math.random()*40);
                        //ghost.pos=startPosPlayer(randomRegenerateSpot);//this will place ghost after eaten by pacman
                       ghost.stopped=100;
                        ghost.pos=g.startGhost;
                    }
                    else{
                        player.lives--;
                        gameReset();
                    }
                     
                    updateScore();
                 }
                 let valGhost =myBoard[ghost.pos];
                 if(valGhost.t==1){
                     ghost.pos=oldPOS;
                     changeDir(ghost);//this will change the direction of movement of ghost
                     //so that it will not hit the obstacle
                 }
                 if(ghost.stopped>0){
                    ghost.stopped--;
                    ghost.pos = startPosPlayer(g.startGhost);
                }
                
                 myBoard[ghost.pos].append(ghost);
            
            })
               //keyboard movement of player
              
               let tempPos= player.pos;
               if(keyz.ArrowRight){
                player.pos+=1;
                g.eye.style.left = '20%';
                g.mouth.style.left ='60%';
            }else if(keyz.ArrowLeft){
                player.pos-=1;
                g.eye.style.left = '60%';
                g.mouth.style.left ='0%';
            }else if(keyz.ArrowUp){
                player.pos -=g.size;//this will subtract the grid size from the player
            }else if(keyz.ArrowDown){
                player.pos += g.size;
            }
            let newPlace= myBoard[player.pos];//future pos
            if(newPlace.t == 1 || newPlace.t==4)
            {
                //console.log('wall');
                player.pos=tempPos;//this will keep the player in its old position
            }
            if(newPlace.t ==3){
                 player.powerCount=100;
                 player.powerup=true;
                 console.log('powerup');
                 myBoard[player.pos].innerHTML = '';
                 player.score+=100;
                 updateScore();
                 newPlace.t =0;
             }
            if(newPlace.t ==2){
                //console.log('dot');//dot eaten
                //Here we clear out the dots which pacman eats by changing the value of myBoard to empty
                myBoard[player.pos].innerHTML = '';
                let tempDots=document.querySelectorAll('.dot');//this will contain the remaining dots left on board
                if(tempDots.length==0){
                    
                    playerWins();
                }
                player.score++;
                updateScore();
                newPlace.t =0;
                //once we eat the dot it will not eat it next time that means the dot will be gone
            }
            if(player.pos != tempPos){//check if pacman moved
                if(player.tog){
                    //this will do open and close of mouth
                    g.mouth.style.height='30%';
                    player.tog= false;
                }
                else{
                 g.mouth.style.height='10%';
                 player.tog= true;
                }
 
            }
            player.cool = player.speed;//this is dynamic value
            
            //console.log(newPlace.t);

        }
       if(!player.pause){
       myBoard[player.pos].append(g.pacman);
       setTimeout(function(){
        player.play= requestAnimationFrame(move);
       },200); 
    }//in order to create the animation we have to call the animation frame all the time
}}


//

function createGame(){
    for(let i=0;i<g.ghosts;i++){
        createGhost();
    }
    tempBoard.forEach((cell)=>{
        ////console.log(cell);
        createSquare(cell);
    })

    for(let i=0;i<g.size;i++){
        g.x += ` ${g.h}px `; //cell grid height
    }
    g.grid.style.gridTemplateColumns = g.x;
    g.grid.style.gridTemplateRows =  g.x;
    startPos(); 
}
 

//STARTING AND RESTARTING
function starterGame(){
    {
        myBoard.length=0;
        ghosts.length=0;
        //console.log('game start');
        g.grid.innerHTML='';
        g.x='';
        if(!player.gamewin){
            player.score=0;
        player.lives=3;
        }else{
            player.gamewin=false;
        }
        
        player.gameover=false;
        createGame(); //create game board
        updateScore();
        g.grid.focus();//it will immediately focus on the keyboard
        g.grid.style.display='grid';
        startGame.style.display='none';//this will remove the button after ots clicked
        g.pacman.style.display='block';
    }
}
function playerWins(){
    player.gamewin=true;
    g.inplay=false;
    player.pause=true;
    startGame.style.display='block';

}
function endGame(){
    player.gamewin=false;
        startGame.style.display='block';
}

function gameReset(){
 //console.log('pause');
 window.cancelAnimationFrame(player.play);//this will cancel the animation happening on screen
 g.inplay = false;
 player.pause=true;
 if(player.lives<=0){
     player.gameover=true;
     endGame();
 } 
 if(!player.gameover){
 setTimeout(startPos,3000);//this will pause the game for 3 sec
}}


//STARTING AND RESTARTING


function startPos(){
    //this will create start position of pacman
    player.pause = false;
    let firstStartPos = 20;
    player.pos = startPosPlayer(firstStartPos);//it will return the place to place player or enemy where wall is not present
    myBoard[player.pos].append(g.pacman);
    ghosts.forEach((ghost,ind)=>{
        let temp = (g.startGhost)+ind;
        ghost.pos = startPosPlayer(temp);
        myBoard[ghost.pos].append(ghost);
    })
}


//STARTING AND RESTARTING
function startPosPlayer(val){
 if(myBoard[val].t != 1){
     return val;
 }
     return startPosPlayer(val+1);
}


//GAME UPDATES
function updateScore(){
    if(player.lives<=0){
        player.gameover=true;
        g.lives.innerHTML = `GAME OVER`;
    }else{
        g.score.innerHTML =`Score : ${player.score}`;
        g.lives.innerHTML = `Lives :${player.lives}`;
    }
    
}


//GAME BOARD SETUP

function createGhost(){
    //this will clone the ghost
     let newGhost = g.ghost.cloneNode(true);
     newGhost.pos =g.startGhost;//this will set the position of the ghost
     newGhost.style.display = 'block';
     newGhost.counter=0;//this will help in iteration for movement of ghost
     newGhost.defaultColor=board[ghosts.length];
     newGhost.dx = Math.floor(Math.random()*4);//this will set the random direction for ghost
     newGhost.style.backgroundColor= board[ghosts.length];
     newGhost.style.opacity = '0.9';//this will show when ghost is top on us
     newGhost.namer = board[ghosts.length] +'y';
     ghosts.push(newGhost);
     //console.log(newGhost);
 }

function createSquare(val){
    const div = document.createElement('div');
    div.classList.add('box');
    if(val == 1){ div.classList.add('wall');} //add wall to element
    if(val == 2){ 
        const dot = document.createElement('div');
        dot.classList.add('dot');
        div.append(dot);
    } //add dot 
    if(val==4){
        div.classList.add('hideout');
        if(g.startGhost==11){
            g.startGhost=myBoard.length;
        }
    }
    if(val == 3){ 
        const dot = document.createElement('div');
        dot.classList.add('superdot');
        div.append(dot);
    } //add superdot 
    g.grid.append(div);
    myBoard.push(div);
    //this is the valur tru which we can see what item is going to be
    div.t=val;//element type of content
    div.idVal = myBoard.length;
    div.addEventListener('click',(e)=>{
        //console.dir(div);
    })
    }
    


    //GHOST THINKING

//this function will find position of pacman
function findDir(a){
    let val = [a.pos % g.size, Math.ceil(a.pos/g.size)];
    //first one will tell the column other one row
    return val;
}

function changeDir(ene){
    let gg =findDir(ene);
    let pp = findDir(player);
    ////console.log(gg);
    ////console.log(pp);
    let ran = Math.floor(Math.random() * 3);
    console.log(ran);
    if (ran < 2) {
      ene.dx = (gg[0] < pp[0]) ? 2 : 3;
    } //hor
    else {
      ene.dx = (gg[1] < pp[1]) ? 1 : 0;
    } //ver
    
    //ene.dx = Math.floor(Math.random()*4);
    ene.counter = (Math.random() * 1) + 2;

}