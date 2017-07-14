var HomeState = {
   
    create:function(){
        this.game.input.mouse.capture = true;
        var background = this.game.add.sprite(0, 0, 'home');
        
       // background.inputEnabled = true;
      
       
        this.on = this.game.add.sprite(this.game.world.centerX, 520, 'on');
        this.on.anchor.setTo(0.5);
        this.on.inputEnabled = true;
        this.on.input.pixelPerfectClick = true;
        
        this.music = this.game.add.audio('music', 0.8, true);
        this.music.play();
        
        this.sound = this.game.add.audio('sound', 1, false);
        
        this.backmusic = true;
        
        this.on.events.onInputDown.add(this.switchFunction, this);
        

        var style = {font: 'bold 35px dimbo', fill:'#DC143C'};
       var StartPlay = this.game.add.text(this.game.world.centerX, 150, 'PLAY', style);
        StartPlay.anchor.setTo(0.5);
        StartPlay.inputEnabled = true;
        
        var about = this.game.add.text(this.game.world.centerX, 450, 'ABOUT', style);
        about.anchor.setTo(0.5);
        about.inputEnabled = true;
        
         about.events.onInputDown.add(function(){
            var aboutPage = this.game.add.sprite(0, 0, 'about');
            
             var style2 = {font: '20px dimbo', fill:'#DC143C'};
             
             var back = this.game.add.text(650, 40, 'Back', style2);
             back.inputEnabled = true;
             
             back.events.onInputDown.add(function(){
                 this.music.stop();
                 this.state.start('HomeState');
             }, this);
        }, this);
        
         StartPlay.events.onInputDown.add(function(){
             this.music.stop();
            this.state.start('GameState' ,false, true, this.backmusic, this.music, this.sound);
        }, this);
        
    },
    
    switchFunction : function(){
        if(this.backmusic){
           this.on = this.game.add.sprite(this.game.world.centerX, 520, 'off');
           this.on.anchor.setTo(0.5);
           this.on.inputEnabled = true;
           this.on.input.pixelPerfectClick = true;
           this.music.stop();
           this.backmusic = false;
           this.on.events.onInputDown.add(function(){
                
                this.on = this.game.add.sprite(this.game.world.centerX, 520, 'on');
                this.on.anchor.setTo(0.5);
                this.on.inputEnabled = true;
                this.music = this.game.add.audio('music', 1, true);
                this.music.play();
                this.backmusic = true;
                this.on.input.pixelPerfectClick = true;
                this.on.events.onInputDown.add(this.switchFunction, this);
           }, this);
        }
    }
    
};