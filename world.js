var SCENE_SIZE = 750;
var WALL_WIDTH = 10;
var WALL_HEIGHT = 30;
var CUBE_SIZE = 50;


var MOVABLE_CUBE = 1;
var FIXED_CUBE = 2;


function getPixel( imagedata, x, y ) 
{

    var position = ( x + imagedata.width * y ) * 4, data = imagedata.data;
    return { r: data[ position ], g: data[ position + 1 ], b: data[ position + 2 ]};

}

function getImgData( image ) 
{

    var canvas = document.createElement( 'canvas' );
    canvas.width = image.width;
    canvas.height = image.height;

    var context = canvas.getContext( '2d' );
    context.drawImage( image, 0, 0 );

    return context.getImageData( 0, 0, image.width, image.height );

}

function bitmapToWorld ( posx, posz)
{
    var worldPosX = posx*50 + 25;
    var worldPosZ = posz*50+ 25;
    return {x: worldPosX, z: worldPosZ};
}

function World()
{
    var charac;
    var controls;
    var ready = 0;
    var imgData;
    var img;
    this.makeScenario = function(scene)
    {
        var context = document.getElementById('canvas').getContext('2d');
        //alert(context);
        img = new Image();
        img.src = 'bitmap/map1.bmp';
        //alert(img);
        context.drawImage(img,0,0);
        
        //img.onload = function() 
        //{
        imgData = context.getImageData(0, 0, canvas.height, canvas.width);
        //}

        
        
        
    }
    
    $(img).load(function()
    {
        ready = 1;
    });
    
    $(document).ready(function()
    {
        var i, j, e = 0;
        for(j = 0; j < MATRIX_SIZE; j++) //z
        {
            for(i = 0; i < MATRIX_SIZE; i++) //x
            {
                var rgba = getPixel( imgData, MATRIX_SIZE - 1 - i, j);
                
                if(rgba.r == 255 && rgba.g == 255 && rgba.b == 255) //white
                {   
                    var cube = new Cube();
                    var coord = bitmapToWorld(j,i);
                    
                    var rand = Math.random();
                    if(rand > 0.7 && speedItemCounter > 0)
                    {
                        cube.castShadow=true;
                        cube.receiveShadow=true;
                        cube.makeSpeedItemCube(coord.x, coord.z);
                       
                        cubeMatrix[j*MATRIX_SIZE + i] = cube;
                        worldMatrix[j*MATRIX_SIZE + i] = 1;
                        speedItemCounter--;
                    }
                    else
                    {
                        if(rand < 0.2 && cubeItemCounter > 0)
                        {
                            cube.castShadow=true;
                            cube.receiveShadow=true;
                            cube.makeBlocksItemCube(coord.x, coord.z);
                           
                            cubeMatrix[j*MATRIX_SIZE + i] = cube;
                            worldMatrix[j*MATRIX_SIZE + i] = 1;
                            cubeItemCounter--;
                        }
                        else
                        {
                            cube.makeCube(coord.x, coord.z, MOVABLE_CUBE);
                            cubeMatrix[j*MATRIX_SIZE + i] = cube;
                            worldMatrix[j*MATRIX_SIZE + i] = 1;
                        }
                    }
                    
                    
                    
                }
                
                if(rgba.r == 255 && rgba.g == 0 && rgba.b == 0) //red
                {   
                    var cube = new Cube();
                    var coord = bitmapToWorld(j,i);
                    cube.makeCube(coord.x, coord.z, FIXED_CUBE);
                    worldMatrix[j*MATRIX_SIZE + i] = 1;
                    
                }
                

                
                if(rgba.r == 255 && rgba.g == 255 && rgba.b == 0) //yellow
                {
                    pengo = new Penguin();
                    var coordP = bitmapToWorld(j,i);
                    pengo.makePenguin(scene, coordP.x, coordP.z);
                    
                    camera.position.set( coordP.x, UP_CAMERA_Y, coordP.z );
                    camera.lookAt(new THREE.Vector3(coordP.x,0,coordP.z));
                    
                    //controls
                    controls = new Controls(pengo, scene, camera);
                }
                
                if(rgba.r == 0 && rgba.g == 0 && rgba.b == 255) //blue
                {
                    enemy = new Enemy();
                    var coordE =  bitmapToWorld(j,i);
                    enemy.makeEnemy(scene, coordE.x, coordE.z);
                    enemyMatrix[e] = enemy;
                    enemy.moveRandomly();
                    //enemyNum++;
                    e++;
                }
            }
        }
    });
    
    this.makeGround = function(scene, mesh)
    {
        var texture = new THREE.TextureLoader().load('textures/terrain/snow_ground.jpg');
        
        var material = new THREE.MeshBasicMaterial( { map: texture/*, envMap:  textureCube*/ } );

        mesh = new THREE.Mesh( new THREE.PlaneGeometry( SCENE_SIZE, SCENE_SIZE), material );
        mesh.receiveShadow = true;
        mesh.position.set(SCENE_SIZE/2,SCENE_SIZE/2,SCENE_SIZE/2);
        mesh.position.y = 0.1;
        mesh.rotation.x = - Math.PI / 2;
        scene.add( mesh );
    }

    this.makeWalls = function(scene)
    {
		
		var wallTexture = new THREE.TextureLoader().load('textures/terrain/wall.jpg');
        wallTexture.wrapS = wallTexture.wrapT = THREE.RepeatWrapping;
        wallTexture.repeat.set( 10, 1 );
        var cubeGeometry = new THREE.CubeGeometry(SCENE_SIZE + 2*WALL_WIDTH,WALL_HEIGHT,WALL_WIDTH); 
        var cubeMaterial = new THREE.MeshBasicMaterial( { map: wallTexture, blending: THREE.AdditiveBlending, transparent: false /*, envMap: textureCube*/ } )
        var wall = new THREE.Mesh(cubeGeometry, cubeMaterial);
        wall.castShadow = true;
        wall.receiveShadow = true;
        wall.position.y = 10;
        wall.position.z = SCENE_SIZE  + WALL_WIDTH/2;
        wall.position.x = SCENE_SIZE/2;        
        scene.add(wall);
        
        
        var cubeGeometry2 = new THREE.CubeGeometry(WALL_WIDTH,WALL_HEIGHT,SCENE_SIZE ); 
        var wall2 = new THREE.Mesh(cubeGeometry2, cubeMaterial);
        wall2.castShadow = true;
        wall2.receiveShadow = true;
        wall2.position.x = SCENE_SIZE  + WALL_WIDTH/2;
        wall2.position.y = 10;
        wall2.position.z = SCENE_SIZE/2;   
        scene.add(wall2);
        
        
        var cubeGeometry3 = new THREE.CubeGeometry(WALL_WIDTH,WALL_HEIGHT,SCENE_SIZE ); 
        var wall3 = new THREE.Mesh(cubeGeometry3, cubeMaterial);
        wall3.castShadow = true;
        wall3.receiveShadow = true;
        wall3.position.x = 0  - WALL_WIDTH/2;
        wall3.position.y = 10;
        wall3.position.z = SCENE_SIZE/2;
        scene.add(wall3);
        
        var cubeGeometry4 = new THREE.CubeGeometry(SCENE_SIZE+ 2*WALL_WIDTH,WALL_HEIGHT,WALL_WIDTH); 
        var wall4 = new THREE.Mesh(cubeGeometry4, cubeMaterial);
        wall4.castShadow = true;
        wall4.receiveShadow = true;

        wall4.position.z = 0 - WALL_WIDTH/2;
        wall4.position.x = SCENE_SIZE/2;
        wall4.position.y = 10;
        scene.add(wall4);
    }

    this.makeSky = function(scene)
    {
        var urlPrefix = "textures/skybox/";
        var urls = [ urlPrefix + "px.jpg", urlPrefix + "nx.jpg",
            urlPrefix + "py.jpg", urlPrefix + "ny.jpg",
            urlPrefix + "pz.jpg", urlPrefix + "nz.jpg" ];
        var textureCube = new THREE.CubeTextureLoader().load( urls );
        //textureCube.format = THREE.RGBFormat;

        var shader = THREE.ShaderLib["cube"];
        shader.uniforms['tCube'].value = textureCube;

        var mat = new THREE.ShaderMaterial({
            fragmentShader    : shader.fragmentShader,
            vertexShader  : shader.vertexShader,
            uniforms  : shader.uniforms,
            depthWrite : false,
            side : THREE.BackSide
            });

        // build the skybox Mesh 
         var skyboxMesh    = new THREE.Mesh( new THREE.CubeGeometry( 10000, 10000, 10000, 1, 1, 1, null, true ), mat );
        // add it to the scene
        scene.add( skyboxMesh );
    }
    


}