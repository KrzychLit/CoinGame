const StartGame_button = document.querySelector('.StartGame-button');
const button_restart = document.querySelector('.button-restart');
const coin = document.querySelector(".coin");
StartGame_button.addEventListener('click',gaming);
let move;

button_restart.addEventListener('click',gaming);
function gaming(){
const game = document.querySelector('.game');
const player = document.querySelector(".player");
const result = document.querySelector(".result");
const time=document.querySelector(".time");
const end = document.querySelector(".end");
let positionX =0;
let positionY=0;
let points=0;
let times=60;
let v =10;
  //delete items after end the game
  end.style.display='none';
const coins = document.querySelectorAll('.coin');
for(var i=0;i<coins.length;i++){
  let coin = coins[i];
  coin.remove();
}
  time.textContent = 60;
  result.textContent = 0;
  document.removeEventListener('keydown',move);
  //tutaj na nowo leci funkcja
  
  game.style.display='flex';
  StartGame_button.remove();
const updatePlayerPosition = () =>{
  player.style.transform = "translate("+positionX+"px,"+positionY+"px)";
  const coins = document.querySelectorAll('.coin');
  for(let i = 0;i<coins.length;i++){
    const coin = coins[i];
    const positionXcoin = parseInt(coin.style.left);
    const positionYcoin = parseInt(coin.style.top);
    if(
        positionX+25>=positionXcoin &&
        positionX<positionXcoin+30 &&
        positionY+60>=positionYcoin &&
        positionY<positionYcoin+30&&times>0
    ){
       if(coin.classList.contains('coin-black')){
        points += 2;
         result.textContent = points;
        times=times+2;
        coin.remove();
      }
      else if(coin.classList.contains('coin-green')){
        points += 3;
        result.textContent = points;
        times=times+3;
        coin.remove();
      }
      else if(coin.classList.contains('coin-red')){
        points += 4;
        result.textContent = points;
        times=times+4;
        coin.remove();
        v=v/2;
        setTimeout(returnToNormalSpeed = ()=>{
          v=v*2;
        },10000);
      }
      else{
        result.textContent = ++points;
         times++;
         coin.remove();
      }
    }
  }
}
const DeleteClass = () =>{
  player.classList.remove("player-left","player-right","player-back");
}
const goRight = () => {
  if(positionX + v> window.innerWidth-25){
    return;
  }
  positionX = positionX + v;
  updatePlayerPosition(); 
};
const goLeft = () => {
  if(positionX-v<0){
    return;
  }
  positionX = positionX -v;
  updatePlayerPosition(); 
}
const goUp = () => {
  if(positionY-v<0){
    return;
  }
  positionY = positionY -v;
  updatePlayerPosition(); 
}
const goDown = () => {
  if(positionY +v>window.innerHeight-40){
    return;
  }
  positionY = positionY +v;
  updatePlayerPosition();
}

move = function (e) {
  if(e.key==="ArrowRight"){
    goRight();
    DeleteClass();
    player.classList.add("player-right");
  }
  if(e.key==="ArrowLeft"){
    goLeft();
    DeleteClass();
    player.classList.add("player-left");
  }
if(e.key==="ArrowDown"){
  goDown();
  DeleteClass();
}
if(e.key==="ArrowUp"){
  goUp();
  DeleteClass();
  player.classList.add("player-back");
}
}
document.addEventListener('keydown',move);

const colorcoins = ['coin','coin-black','coin-green','coin-red'];
const random = () => {
   const colorcoin = colorcoins[Math.floor(Math.random()*colorcoins.length)];
  const randomcoin = coin.cloneNode(true);
  randomcoin.classList.add(colorcoin);
  randomcoin.style.left = Math.random()*(window.innerWidth - 30 )+"px";
  randomcoin.style.top = Math.random()*(window.innerHeight - 30 )+"px";
  game.append(randomcoin);
};
  const create_random = setInterval(random,2000);
const timer = setInterval(()=>{
  time.textContent=--times;
  if(times===0){
    clearInterval(timer);
    end.style.display="flex";
    clearInterval(create_random);
}
}
,1000);
}
