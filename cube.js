var CUBE_SIZE = 50;
var MOVABLE_CUBE = 1;
var FIXED_CUBE = 2;
var SLIDING_SPEED = 15;

function Cube()
{
    var x;
    var y;
    var z;
    var type;
    var cube;
    var Ncube;
    var hasSpeedItem = false;
    var hasBlocksItem = false;
    var wasRemoved = false;
    var Mx;
    var Mz;
    var newX;
    var newZ;

    this.makeCube = function(posx, posz, cType)
    {  
        x = posx;
        z = posz;
        type = cType;
               
        if(cType == MOVABLE_CUBE)
        {
            var iceText =new THREE.TextureLoader().load( 'textures/terrain/ice.jpg');
            var iceGeo = new THREE.CubeGeometry(CUBE_SIZE,CUBE_SIZE,CUBE_SIZE);
            var iceMat = new THREE.MeshBasicMaterial({ map: iceText, transparent: true, opacity: 0.9});
            cube = new THREE.Mesh(iceGeo, iceMat);
            cube.castShadow=true;
            cube.receiveShadow=true;
            cube.position.y = CUBE_SIZE/2;
            cube.position.x = x;
            cube.position.z = z;
            scene.add(cube);  
        }
        else
        {
            var wallTexture = new THREE.TextureLoader().load( 'textures/crate.gif');
            var wallGeo = new THREE.CubeGeometry(CUBE_SIZE,CUBE_SIZE,CUBE_SIZE);
            var wallMat = new THREE.MeshBasicMaterial({ map: wallTexture, transparent: false, opacity: 0.9});
            cube = new THREE.Mesh(wallGeo, wallMat);
            cube.castShadow=true;
            cube.receiveShadow=true;
            cube.position.y = CUBE_SIZE/2;
            cube.position.x = x;
            cube.position.z = z;
            scene.add(cube);  
        }
    }
    
    this.makeMiniCube = function(posx,posz)
    {
        x = posx;
        z = posz;
               
        
        var iceText = new new THREE.TextureLoader().load( 'textures/terrain/ice.jpg');
        var iceGeo = new THREE.CubeGeometry(10,10,10);
        var iceMat = new THREE.MeshBasicMaterial({ map: iceText, transparent: true, opacity: 0.9});
        cube = new THREE.Mesh(iceGeo, iceMat);
        cube.castShadow=true;
        cube.receiveShadow=true;
        cube.position.y = 25;
        cube.position.x = x;
        cube.position.z = z;
        scene.add(cube);  
        
        var scale = 0;
        var interv = window.setInterval(function()
        {
            
            if(scale != 19*5/20)
            {
                scale += 0.25;
                cube.scale.set(scale, scale, scale);
                cube.rotation.x = cube.rotation.x + 1.50*Math.PI/20;
                cube.rotation.y = cube.rotation.y + 1.25*Math.PI/20;
                cube.rotation.x = cube.rotation.x + 0.75*Math.PI/20;
            }
            else
            {
                scene.remove(cube);
                clearInterval(interv);
                return;
            }
            
        },100);
    }
      
    this.generatePrePaidCube = function(posx, posz)
    {   
        x = posx;
        z = posz;

        var iceText = new THREE.TextureLoader().load( 'textures/terrain/ice.jpg');
        var iceGeo = new THREE.CubeGeometry(CUBE_SIZE,CUBE_SIZE,CUBE_SIZE);
        var iceMat = new THREE.MeshBasicMaterial({ map: iceText, transparent: true, opacity: 0.9});
        cube = new THREE.Mesh(iceGeo, iceMat);
        cube.castShadow=true;
        cube.receiveShadow=true;
        cube.position.y = CUBE_SIZE/2;
        cube.position.x = x;
        cube.position.z = z;
        scene.add(cube);  
            
        simCubes++;
    }
    
    this.makeSpeedItemCube = function(posx, posz)
    {
        x = posx;
        z = posz;
        cube = new THREE.Object3D();
        cube.castShadow=true;
        cube.receiveShadow=true;
        cube.position.x = x;
        cube.position.z = z;
        
        var textSpeed = new THREE.TextureLoader().load( 'textures/speedTex.jpg' );
        var material = new THREE.MeshBasicMaterial({ map: textSpeed });    
        var sphere = new THREE.Mesh(new THREE.SphereGeometry(15, 15, 15), material);
        sphere.castShadow=true;
        sphere.receiveShadow=true;
        sphere.position.set(0,20,0);
        sphere.overdraw = true;
       
        var iceText = new THREE.TextureLoader().load( 'textures/terrain/ice.jpg');
        var iceGeo = new THREE.CubeGeometry(CUBE_SIZE,CUBE_SIZE,CUBE_SIZE);
        var iceMat = new THREE.MeshBasicMaterial({ map: iceText, transparent: true, opacity: 0.9});
        Ncube = new THREE.Mesh(iceGeo, iceMat);
        Ncube.castShadow=true;
        Ncube.receiveShadow=true;
        Ncube.position.y = CUBE_SIZE/2;
        Ncube.position.x = 0;
        Ncube.position.z = 0;

        cube.add(sphere);
        cube.add(Ncube);
        
        scene.add(cube);
        
        hasSpeedItem = true;
    }
    
    this.makeBlocksItemCube = function(posx, posz)
    {
        x = posx;
        z = posz;
        cube = new THREE.Object3D();
        cube.castShadow=true;
        cube.receiveShadow=true;
        cube.position.x = x;
        cube.position.z = z;
        
        var textSpeed = new THREE.TextureLoader().load(  'textures/terrain/blocksTex.jpg' );
        var material = new THREE.MeshBasicMaterial({ map: textSpeed });    
        var sphere = new THREE.Mesh(new THREE.SphereGeometry(15, 15, 15), material);
        sphere.castShadow=true;
        sphere.receiveShadow=true;
        sphere.position.set(0,20,0);
        sphere.overdraw = true;
        
        var iceText = new THREE.TextureLoader().load( 'textures/terrain/ice.jpg');
        var iceGeo = new THREE.CubeGeometry(CUBE_SIZE,CUBE_SIZE,CUBE_SIZE);
        var iceMat = new THREE.MeshBasicMaterial({ map: iceText, transparent: true, opacity: 0.9});
        Ncube = new THREE.Mesh(iceGeo, iceMat);
        Ncube.castShadow=true;
        Ncube.receiveShadow=true;
        Ncube.position.y = CUBE_SIZE/2;
        Ncube.position.x = 0;
        Ncube.position.z = 0; 
        
        cube.add(sphere);
        cube.add(Ncube);
        
        scene.add(cube);
        
        hasBlocksItem = true;
    }
    
    
    this.pushCube = function(direction)
    {
        if( direction == WEST )
        {
            newX = cube.position.x + SLIDING_SPEED;
            newZ = cube.position.z;
            
            var posx = newX + 50 - SLIDING_SPEED;
            var MxF = Math.floor(posx/50);
            Mx = Math.floor(newX/50);
            Mz = Math.floor(newZ/50);
            if(worldMatrix[(MxF)*MATRIX_SIZE + Mz] == 1 || posx < 0 || posx >= 740)
            {
                this.destroyCube();
            }
            else
            {
                var interv = window.setInterval(function()
                {
                    if( worldMatrix[(Mx)*MATRIX_SIZE + Mz] != 1 && Mx >= 0 && Mx < 15 )
                    {
                            console.log(Mz);
                            cube.position.set( newX, cube.position.y, newZ);
                            newX = cube.position.x + SLIDING_SPEED;
                            Mx = Math.floor(newX/50);
                            var i;
                            for(i=0; i < 4; i++)
                            {
                                if(enemyMatrix[i])
                                {
                                    var enemy = enemyMatrix[i];

                                    if(newX < enemy.getX() + 25 && newX > enemy.getX() - 25 && newZ < enemy.getZ() + 25 && newZ > enemy.getZ() - 25)
                                    {
										
                                        enemy.destroyEnemy(scene);
										enemyMatrix[i] = 0;
										enemyNum--;
                                    }
                                    
                                }
                            }
                    }
                    else
                    {
                        cube.position.set((Mx-1)*50 +25, cube.position.y, (Mz)*50 + 25);
                        movedCube = true;
                        //worldMatrix[(Mx-1)*MATRIX_SIZE + Mz] = 1;
                        clearInterval(interv);
                        return;
                    }
                        
                },50);
                
            }
            
        }
        if( direction == SOUTH )
        {
            newX = cube.position.x;
            newZ = cube.position.z - SLIDING_SPEED;
            
            var posz = newZ - 50 + SLIDING_SPEED;
            var MzF = Math.floor(posz/50);
            
            Mx = Math.floor(newX/50);
            Mz = Math.floor(newZ/50);
            
            if(worldMatrix[(Mx)*MATRIX_SIZE + MzF] == 1 || posz < 0 || posz >= 740)
            {
                this.destroyCube();
            }
            else
            {
                var interv = window.setInterval(function()
                {
                    if( worldMatrix[(Mx)*MATRIX_SIZE + Mz] != 1 && Mz >= 0 && Mz < 15 )
                    {
                            cube.position.set( newX, cube.position.y, newZ);
                            newZ = cube.position.z - SLIDING_SPEED;
                            Mz = Math.floor(newZ/50);
                            var i;
                            for(i=0; i < 4; i++)
                            {
                                if(enemyMatrix[i])
                                {
                                    var enemy = enemyMatrix[i];

                                    if(newX < enemy.getX() + 25 && newX > enemy.getX() - 25 && newZ < enemy.getZ() + 25 && newZ > enemy.getZ() - 25)
                                    {
                                        enemy.destroyEnemy(scene);
										enemyMatrix[i] = 0;
										enemyNum--;
                                    }
                                    
                                }
                            }
                    }
                    else
                    {
                        cube.position.set((Mx)*50 +25, cube.position.y, (Mz+1)*50 + 25);
                        //worldMatrix[(Mx)*MATRIX_SIZE + Mz+1] = 1;
                        clearInterval(interv);
                        return;
                    }
                        
                },50);
                
            }
        }
        if( direction == EAST )
        {
            newX = cube.position.x - SLIDING_SPEED;
            newZ = cube.position.z;
            
            var posx = newX - 50 + SLIDING_SPEED;
            var MxF = Math.floor(posx/50);
            
            Mx = Math.floor(newX/50);
            Mz = Math.floor(newZ/50);
            
            if(worldMatrix[(MxF)*MATRIX_SIZE + Mz] == 1 || posx < 0 || posx >= 740)
            {
                console.log("hey!!");
                this.destroyCube();
            }
            else
            {
                var interv = window.setInterval(function()
                {
                    if( worldMatrix[(Mx)*MATRIX_SIZE + Mz] != 1 && Mx >= 0 && Mx < 15 )
                    {
                            cube.position.set( newX, cube.position.y, newZ);
                            newX = cube.position.x - SLIDING_SPEED;
                            Mx = Math.floor(newX/50);
                            var i;
                            for(i=0; i < 4; i++)
                            {
                                if(enemyMatrix[i])
                                {
                                    var enemy = enemyMatrix[i];

                                    if(newX < enemy.getX() + 25 && newX > enemy.getX() - 25 && newZ < enemy.getZ() + 25 && newZ > enemy.getZ() - 25)
                                    {
                                        enemy.destroyEnemy(scene);
										enemyMatrix[i] = 0;
										enemyNum--;
                                    }
                                    
                                }
                            }
                    }
                    else
                    {
                        cube.position.set((Mx+1)*50 +25, cube.position.y, (Mz)*50 + 25);
                        //worldMatrix[(Mx+1)*MATRIX_SIZE + Mz] = 1;
                        clearInterval(interv);
                        return;
                    }
                        
                },50);
                
            }
        }
        if( direction == NORTH )
        {
            newX = cube.position.x;
            newZ = cube.position.z + SLIDING_SPEED;
            
            var posz = newZ + 50 - SLIDING_SPEED;
            var MzF = Math.floor(posz/50);
            
            Mx = Math.floor(newX/50);
            Mz = Math.floor(newZ/50);
            
            if(worldMatrix[(Mx)*MATRIX_SIZE + MzF] == 1 || posz < 0 || posz >= 740)
            {
                this.destroyCube();
            }
            else
            {
                var interv = window.setInterval(function()
                {
                    if( worldMatrix[(Mx)*MATRIX_SIZE + Mz] != 1 && Mz >= 0 && Mz < 15 )
                    {
                            cube.position.set( newX, cube.position.y, newZ);
                            newZ = cube.position.z + SLIDING_SPEED;
                            Mz = Math.floor(newZ/50);
                            var i;
                            for(i=0; i < 4; i++)
                            {
                                if(enemyMatrix[i])
                                {
                                    var enemy = enemyMatrix[i];

                                    if(newX < enemy.getX() + 25 && newX > enemy.getX() - 25 && newZ < enemy.getZ() + 25 && newZ > enemy.getZ() - 25)
                                    {
                                        enemy.destroyEnemy(scene);
										enemyMatrix[i] = 0;
										enemyNum--;
                                    }
                                    
                                }
                            }
                    }
                    else
                    {
                        cube.position.set((Mx)*50 +25, cube.position.y, (Mz-1)*50 + 25); 
                        //worldMatrix[(Mx)*MATRIX_SIZE + Mz-1] = 1;
                        clearInterval(interv);
                        return;
                    }
                        
                },50);
                
            }
        }
        
    }
    

    this.getX = function()
    {/*
        if( hasSpeedItem || hasBlocksItem )
        {
            return Ncube.position.x;
        }*/
        return cube.position.x;
    }
    
    this.getZ = function()
    {/*
        if( hasSpeedItem || hasBlocksItem )
        {
            return Ncube.position.z;
        }*/
        return cube.position.z;
    }
    
    this.cubeWasRemoved = function()
    {
        return wasRemoved;
    }
    
    this.destroyCube = function()
    {
        var sphere;
        if( hasSpeedItem )
        {
            sphere = new SpeedItem();
            sphere.makeSpeedItem(cube.position.x, cube.position.z);
            itemMatrix[currentItemNum] = sphere;
            currentItemNum++;
        }
        
        if( hasBlocksItem )
        {
            sphere = new BlocksItem();
            sphere.makeBlocksItem(cube.position.x, cube.position.z);
            itemMatrix[currentItemNum] = sphere;
            currentItemNum++;
        }
        cubeDeathEffect(cube);
        wasRemoved = true;
        scene.remove(cube);
    }
}