function radomGen(e,t){return Math.floor(Math.random()*(t-e)+e)}function delElem(e,t){return t.splice(e,1)}function add_enemy(){allEnemies.push(new Enemy)}function enemyStats(){allEnemies.forEach(function(e){e.x>=900&&delElem(allEnemies.indexOf(e),allEnemies),allEnemies.length<radomGen(1,5)*(1+player.score/8)&&add_enemy()})}var allEnemies=[],Enemy=function(){this.x=-100,this.enemyLoc=[310,230,145,60],this.y=this.enemyLoc[radomGen(0,4)],this.width=66,this.height=55,this.speedo=radomGen(40,120)*(1+player.score/5),this.picSelect=radomGen(0,5),this.picSelect>=1?this.sprite="dist/images/enemy-bug.png":this.sprite="dist/images/greenBug.png"};Enemy.prototype.update=function(e){this.speed(e),this.checkCollisions()},Enemy.prototype.speed=function(e){this.x+=this.speedo*e},Enemy.prototype.render=function(){ctx.drawImage(Resources.get(this.sprite),this.x,this.y)},Enemy.prototype.checkCollisions=function(){Math.abs(this.x-player.x)<this.width&&Math.abs(this.y-player.y)<this.height&&location.reload()};var Princess=function(){this.sprite="dist/images/char-princess-girl.png",this.xlocations=[0,100,200,400,500,600],this.x=this.xlocations[radomGen(0,6)],this.y=400,this.width=100,this.height=81};Princess.prototype.render=function(){ctx.drawImage(Resources.get(this.sprite),this.x,this.y)};var Heart=function(){this.sprite="dist/images/Heart.png",this.xlocations=[10,110,210,313,415,515,615],this.x=this.xlocations[radomGen(0,7)],this.y=20,this.width=100,this.height=81};Heart.prototype.render=function(){ctx.drawImage(Resources.get(this.sprite),this.x,this.y)};var Player=function(){this.sprite="dist/images/char-boy.png",this.x=300,this.y=400,this.width=100,this.height=81,this.hasHeart=!1,this.score=0};Player.prototype.update=function(){this.collisions()},Player.prototype.render=function(){ctx.drawImage(Resources.get(this.sprite),this.x,this.y)},Player.prototype.handleInput=function(e){switch(e){case"up":this.y>70&&(this.y-=this.height);break;case"down":this.y<390&&(this.y+=this.height);break;case"right":this.x<590&&(this.x+=this.width);break;case"left":this.x>10&&(this.x-=this.width);break;default:this.x=this.x,this.y=this.y}},Player.prototype.collisions=function(){Math.abs(this.x-heart.x)<40&&Math.abs(this.y-heart.y)<30&&(this.sprite="dist/images/lovingBoy.png",heart.x=-100,heart.y=-150,this.hasHeart=!0),Math.abs(this.x-princess.x)<this.width&&Math.abs(this.y-princess.y)<this.height&&this.hasHeart===!0&&(this.score+=1,document.getElementById("score").innerHTML="Your love score is "+this.score,this.x=300,this.y=400,princess.x=princess.xlocations[radomGen(0,6)],heart.x=heart.xlocations[radomGen(0,7)],heart.y=20,this.hasHeart=!1,this.sprite="dist/images/char-boy.png")};var player=new Player,princess=new Princess,heart=new Heart;add_enemy(),document.addEventListener("keyup",function(e){var t={37:"left",38:"up",39:"right",40:"down"};player.handleInput(t[e.keyCode])});var Engine=function(e){function t(){var e=Date.now(),s=(e-o)/1e3;i(s),a(),o=e,d.requestAnimationFrame(t)}function s(){h(),o=Date.now(),t()}function i(e){n(e),enemyStats()}function n(e){allEnemies.forEach(function(t){t.update(e)}),player.update()}function a(){var e,t,s=["dist/images/water-block.png","dist/images/stone-block.png","dist/images/stone-block.png","dist/images/stone-block.png","dist/images/grass-block.png","dist/images/grass-block.png"],i=6,n=7;for(e=0;i>e;e++)for(t=0;n>t;t++)g.drawImage(Resources.get(s[e]),101*t,83*e);r()}function r(){allEnemies.forEach(function(e){e.render()}),player.render(),princess.render(),heart.render()}function h(){}var o,c=e.document,d=e.window,p=c.createElement("canvas"),g=p.getContext("2d");p.width=707,p.height=550,c.body.appendChild(p),Resources.load(["dist/images/stone-block.png","dist/images/water-block.png","dist/images/grass-block.png","dist/images/enemy-bug.png","dist/images/char-boy.png","dist/images/Heart.png","dist/images/char-princess-girl.png","dist/images/lovingBoy.png","dist/images/blueBug.png","dist/images/greenBug.png"]),Resources.onReady(s),e.ctx=g}(this);