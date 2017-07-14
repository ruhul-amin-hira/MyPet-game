var PreloadState = {
    
    
    
    preload: function() {
        
        var style = {font: 'bold 20px dimbo', fill:'#000'};
        var style2 = {font: '16px dimbo', fill:'#DC143C'};
        
        this.game.add.text(370, 100, 'Black', style);
        this.game.add.text(380, 130, 'presents', style2);
        
        
        this.logo = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
        this.logo.anchor.setTo(0.5);
        
        this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'preloadBar');
        this.preloadBar.anchor.setTo(0.5);
        this.load.setPreloadSprite(this.preloadBar);
        
        //this.load.image('background' , 'assets/Untitled-2.png');
        this.load.image('background' , 'assets/home4.jpg');
        this.load.image('apple' , 'assets/apple2.png');
        this.load.image('hen' , 'assets/hen2.png');
        this.load.image('ruby' , 'assets/ruby2.png');
        this.load.image('arrow' , 'assets/refresh1.png');
        this.load.spritesheet('pet' , 'assets/Jelly1.png' , 97, 83, 4, 4, 3.5);
        this.load.image('home', 'assets/homsc.png');
        this.load.image('about', 'assets/homsc3.png');
        this.load.image('on', 'assets/music2.png');
        this.load.image('off', 'assets/off1.png');
        
        
        this.load.audio('music', ['assets/sound/backgroundMusic1.mp3', 'assets/sound/backgroundMusic1.ogg']);
        this.load.audio('sound', ['assets/sound/eating.mp3', 'assets/sound/eating.ogg']);
        this.load.audio('funny', ['assets/sound/funny.mp3', 'assets/sound/funny.ogg']);
      
    },
    
    create: function(){
        this.state.start('HomeState');
    }
};