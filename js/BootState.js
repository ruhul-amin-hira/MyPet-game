var BootState = {
    

     init: function() {
        
       // this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
    },

    preload: function(){
        this.load.bitmapFont('dimbo', 'assets/font.png', 'assets/font.fnt');
        this.load.image('logo', 'assets/logo.png');
        this.load.image('preloadBar', 'assets/bar.png');
    },
    create: function(){
      
        this.game.stage.backgroundColor = '#333';
        
        this.state.start('PreloadState');
    }
};