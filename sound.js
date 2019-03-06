var MUSIC_NORMAL = 'sounds/358232_j_s_song.mp3';
var MUSIC_NORMAL_OGG = 'sounds/358232_j_s_song.ogg';
var MUSIC_IM_PENGUIN = 'sounds/im_penguin.mp3';
var MUSIC_IM_PENGUIN_OGG = 'sounds/im_penguin.ogg';
var MUSIC_PENGO = 'sounds/pengo.mp3';
var MUSIC_PENGO_OGG = 'sounds/pengo.ogg';

function Sound(sources, radius, volume )
{ 
    var menu;
    var audio = document.createElement( 'audio' );
  
    for ( var i = 0; i < sources.length; i ++ ) 
    {

        var source = document.createElement( 'source' );
        source.src = sources[ i ];

        audio.appendChild( source );
    }

    this.position = new THREE.Vector3();
        
    this.play = function () 
    {
        audio.play();
        audio.loop = true;
        
    }
    
    this.pause = function ()
    {
        audio.pause();
    }
    
    this.changeVolume = function ( value )
    {
        audio.volume = value;
    }
    
    this.initSoundMenu = function ()
    {
    
        menu = 
        {
            mudo: false,
            volume: 1,
            musicas: 'classica'
        }
        
        var gui = new dat.GUI();
        gui.add( menu, "mudo").onChange(function(value) { if(value) defaultSong.pause(); else defaultSong.play();});
        gui.add( menu, "volume", 0, 1 ).onChange(function(value) {defaultSong.changeVolume(value);});
        gui.add( menu, "musicas", ['classica', 'pengo', 'somos_pinguins']).onChange(
        function(value)
        {
            if(value == 'classica')
            {
                defaultSong.pause();
                defaultSong = new Sound( [ MUSIC_NORMAL, MUSIC_NORMAL_OGG ], 275, 1 );
                defaultSong.play();
            }
            else
            {
                if(value == 'somos_pinguins')
                {
                    defaultSong.pause();
                    defaultSong = new Sound( [ MUSIC_IM_PENGUIN, MUSIC_IM_PENGUIN_OGG ], 275, 1 );
                    defaultSong.play();
                }
                else
                {
                    if(value == 'pengo')
                    {
                        defaultSong.pause();
                        defaultSong = new Sound( [ MUSIC_PENGO, MUSIC_PENGO_OGG ], 275, 1 );
                        defaultSong.play();
                    }
                }
            }
        });
    }
    
}