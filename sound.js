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
		
		 var gui = new dat.GUI();
		 
		var cntrlMenu =
		{
			mover_para_cima : 'W',
			mover_para_baixo: 'S',
			rotacionar_direita: 'D',
			rotacionar_esq: 'A',
			criar_cubo: 'SHIFT',
			empurrar_cubo: 'espaco'

		}
		
		var controls = gui.addFolder('Controles');
		
		controls.add(cntrlMenu, "mover_para_cima", [ 'W']).onChange(
		function(value){return;});
		controls.add(cntrlMenu, "mover_para_baixo", [ 'S']).onChange(
		function(value){return;});
		controls.add(cntrlMenu, "rotacionar_direita", [ 'D']).onChange(
		function(value){return;});
		controls.add(cntrlMenu, "rotacionar_esq", [ 'A']).onChange(
		function(value){return;});
		controls.add(cntrlMenu, "criar_cubo", [ 'SHIFT']).onChange(
		function(value){return;});
		controls.add(cntrlMenu, "empurrar_cubo", [ 'espaco']).onChange(
		function(value){return;});
		
		
        menu = 
        {
            mudo: false,
            volume: 1,
            musicas: 'classica'
        }
        
       
		
		var music = gui.addFolder('Controle de Som');

        music.add( menu, "mudo").onChange(function(value) { if(value) defaultSong.pause(); else defaultSong.play();});
        music.add( menu, "volume", 0, 1 ).onChange(function(value) {defaultSong.changeVolume(value);});
        music.add( menu, "musicas", ['classica', 'pengo', 'somos_pinguins']).onChange(
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