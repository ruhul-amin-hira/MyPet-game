

var GameState = {
    
    init: function( backmusic, music,sound ){
      this.backmusic = backmusic;
      this.music = music;
      this.sound = sound;
    },
    
    create: function() {
        if(this.backmusic){
            this.music.stop();
            this.music.play();
        }
        
        this.background = this.game.add.sprite(0, 0, 'background');
        this.background.inputEnabled = true;
        this.background.events.onInputDown.add(this.placeItem, this);
        
       // this.bat = this.game.add.sprite(200, 350, 'bat');
       // this.bat.animations.add('batanimation' , [0, 1, 2, 2, 1, 0], 15, true);
       // this.bat.animations.play('batanimation');
        
        this.pet = this.game.add.sprite(400, 400, 'pet');
        this.pet.anchor.setTo(0.5);
        
       // this.pet2 = this.game.add.sprite(110, 400, 'pet2');
        //this.pet2.anchor.setTo(0.5);
        
        this.pet.animations.add('petanimation' , [0, 2, 0, 0, 0, 0, 0], 6, true);
        this.pet.animations.play('petanimation');
        
       // this.pet.animations.add('eating' , [0, 1, 2, 2, 1, 0], 7, false);
        
        this.pet.customParams = {health: 100, fun: 100};
        
        this.pet.inputEnabled = true;
        this.pet.input.enableDrag();
        
        this.apple = this.game.add.sprite(272, 550, 'apple');
        this.apple.anchor.setTo(0.5);
        this.apple.inputEnabled = true;
        this.apple.customParams = {health: 20};
        this.apple.events.onInputDown.add(this.pickItem, this);
        
        this.hen = this.game.add.sprite(344, 550, 'hen');
        this.hen.anchor.setTo(0.5);
        this.hen.inputEnabled = true;
        this.hen.customParams = {health: -10, fun: 10};
        this.hen.events.onInputDown.add(this.pickItem, this);
        
        this.ruby = this.game.add.sprite(416, 550, 'ruby');
        this.ruby.anchor.setTo(0.5);
        this.ruby.inputEnabled = true;
        this.ruby.customParams = {fun: 20};
        this.ruby.events.onInputDown.add(this.pickItem, this);
        
        this.arrow = this.game.add.sprite(488, 550, 'arrow');
        this.arrow.anchor.setTo(0.5);
        this.arrow.inputEnabled = true;
        this.arrow.events.onInputDown.add(this.rotatePet, this);
        
        this.buttons =[this.apple, this.hen, this.ruby, this.arrow];
        
        this.selectedItem = null;
        
        this.uiBlocked = false;
        
        //fonts
        var style = {font: 'bold 16px dimbo', fill: '#DC143C'};
        this.game.add.text(20, 20,'Health:',style);
        this.game.add.text(220, 20, 'Fun:', style);
        ////Back
             var style2 = {font: '20px dimbo', fill:'#DC143C'};
             
             this.back = this.game.add.text(700, 20, 'Back', style2);
              this.back.inputEnabled = true;
    
         this.back.events.onInputDown.add(function(){
                 this.music.stop();
                 this.state.start('HomeState');
             }, this);
       
        
        
        
        this.healthText = this.game.add.text(100, 20, '100', style);
        this.funText = this.game.add.text(270, 20, '100', style);
        
        this.refreshState();
        
        ////Decreaser
        this.statedecreaser = this.game.time.events.loop(Phaser.Timer.SECOND * 5, this.reduceProperties, this);
        
    },
    
    pickItem:function(sprite, event){
        if(!this.uiBlocked){
            this.clearSelection();
            this.selectedItem = sprite;
            sprite.alpha = 0.4;
        }

    },
    rotatePet:function(sprite, event){
        if(!this.uiBlocked){
            this.uiBlocked = true;
            this.clearSelection();
            sprite.alpha = 0.4;
            
            var petRotation = this.game.add.tween(this.pet);
            petRotation.to({angle: '+720'}, 1000);
            petRotation.onComplete.add(function(){
                this.uiBlocked = false;
                sprite.alpha = 1;
                this.pet.customParams.fun += 10;
                   this.refreshState();
            }, this);
            this.funny = this.game.add.audio('funny', 1, false);
            if(this.backmusic){
                this.funny.play();
            }
            petRotation.start();
            
            
           
        }
        
    },
    clearSelection: function(){
        this.buttons.forEach(function(element, index){
            element.alpha = 1;
        });
        this.selectedItem = null;
    },
    
    placeItem: function(sprite, event){
        if(this.selectedItem && !this.uiBlocked){
             var x = event.position.x;
             var y = event.position.y;
            
            var newItem = this.game.add.sprite(x, y, this.selectedItem.key);
            newItem.anchor.setTo(0.5);
            newItem.customParams = this.selectedItem.customParams;
            
            this.uiBlocked = true;
            var petMovement = this.game.add.tween(this.pet);
            petMovement.to({x: x, y: y}, 700);
            petMovement.onComplete.add(function(){
                
                newItem.destroy();
                
                var aim = this.pet.animations.add('eating' , [0, 1, 2, 2, 1, 0], 7, false);
                this.pet.animations.play('eating');
                if(this.backmusic){
                    this.sound.play();
                }
                
                aim.onComplete.add(function(){
                   this.pet.animations.play('petanimation');
                }, this);
                
                this.uiBlocked = false;
                
                var stat;
                for(stat in newItem.customParams){
                    if(newItem.customParams.hasOwnProperty(stat)){
                        this.pet.customParams[stat] += newItem.customParams[stat];
                    }
                }
                
                this.refreshState();
                
            }, this);
            
            petMovement.start();
        }
       
    },
    refreshState: function(){
        this.healthText.text = this.pet.customParams.health;
        this.funText.text = this.pet.customParams.fun;
    },
    
    reduceProperties:function(){
        this.pet.customParams.health -= 10;
        this.pet.customParams.fun -=15;
        
        this.refreshState();
    },
    
    update:function(){
        if(this.pet.customParams.health <= 0 || this.pet.customParams.fun <= 0){
            this.music.stop();
             this.pet.animations.stop();
            this.pet.frame = 3;
            this.uiBlocked = true;
            
             var style = {font: 'bold 35px dimbo', fill:'#DC143C'};
            this.game.add.text(this.game.world.centerX - 130, this.game.world.centerY - 100, 'GAME OVER!', style);
            this.g
            this.game.time.events.add(2000, this.gameOver, this);
        }
    },
    gameOver: function(){
       // this.game.state.restart();
        this.state.start('HomeState', true, false);
    }
    
};
