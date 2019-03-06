
function Penguin()
{
    var pengo;
    
    var DEFAULT_SPEED = 4;
    var SUPER_SPEED = 6;
    var charSpeed = DEFAULT_SPEED;
    
    var walkingX = 0;
    var walkingZ = DEFAULT_SPEED;
    var direction = 3;
    var NORTH = 1;
    var WEST = 2;
    var SOUTH = 3;
    var EAST = 4;
    

    var that = this;
    var angle;
    var normalAngle;
    var goingLeft;
    
    this.makePenguin = function (scene, posx, posz)
    {
        var manager = new THREE.LoadingManager();
        manager.onProgress = function ( item, loaded, total ) 
        {

            console.log( item, loaded, total );

        };

        var texture = new THREE.Texture();

        var loader = new THREE.ImageLoader( manager );
        loader.load( 'textures/pengo.jpg', function ( image ) 
        {

            texture.image = image;
            texture.needsUpdate = true;

        } );

        // model

        var loader = new THREE.OBJLoader( manager );
        loader.load( 'pengo/PENGUIN.obj', function ( object ) 
        {

            object.traverse( function ( child ) 
            {

                if ( child instanceof THREE.Mesh ) 
                {

                    child.material.map = texture;
                    child.receiveShadow=true;
                    child.castShadow=true;

                }

            } );
            
            object.position.y = 0;
            object.scale.set(90,90,90);
            object.rotation.y = object.rotation.y + 2*(90 * Math.PI / 180);
            object.position.z = posz;
            object.position.x = posx;
            scene.add( object );
            pengo = object;

        } );

    
    }

    this.getDirection = function()
    {
        return direction;
    }
    
    this.getX = function()
    {
        return pengo.position.x;
    }
    
    this.getY = function()
    {
        return pengo.position.y;
    }
    
    this.getZ = function()
    {
        return pengo.position.z;
    }
    
    this.hasCollisionWithEnemy = function(newPosX, newPosZ)
    {
        var i;
        for(i=0; i < enemyNum; i++)
        {
            if(enemyMatrix[i])
            {
                var enemy = enemyMatrix[i];

                if(newPosX < enemy.getX() + 15 && newPosX > enemy.getX() - 15 && newPosZ < enemy.getZ() + 15 && newPosZ > enemy.getZ() - 15)
                {
                    return true;
                }
                
            }
        }
        return false;
    }
    
    this.handleCollisionWithItem = function(newPosX, newPosZ)
    {
        var i;
        for(i=0; i<itemNum; i++)
        {
            if(itemMatrix[i])
            {
                var sphere = itemMatrix[i];
                if(newPosX < sphere.getX() + 15 && newPosX > sphere.getX() - 15 && newPosZ < sphere.getZ() + 15 && newPosZ > sphere.getZ() - 15)
                {
                    if(sphere.getType() == SPEED_ITEM)
                    {
                        sphere.destroySphere();
                        itemMatrix[i] = 0;
                        charSpeed = SUPER_SPEED;
                        
                        window.setTimeout(function()
                        {
                            charSpeed = DEFAULT_SPEED;
                        },20000);
                    }
                    else
                    {
                        sphere.destroySphere();
                        itemMatrix[i] = 0;
                        simCubes++;
                    }
                }
            }
        }
    }
    
    this.applyMovement = function(scene, posx, posz)
    {

    
        //if( angle > normalAngle - 1 && goingLeft ==  false)
       // {
            pengo.position.x = pengo.position.x + posx;
            pengo.position.z = pengo.position.z + posz;
            //pengo.rotation.z = angle - 0.1;
            //angle = angle - 0.1;
            
            //if(angle == normalAngle - 1)
            //{
               // goingLeft = true;
            //}
            //return;
       // }
        /*                     
        if( angle < normalAngle + 1 && goingLeft == true)
        {
            pengo.position.x = pengo.position.x + posx;
            pengo.position.z = pengo.position.z + posz;
            //pengo.rotation.z = angle + 0.1;
            angle = angle + 0.1;
            
            if(angle == normalAngle + 1)
            {
                goingLeft = false;
            }
            return;
        }*/
        
        

        
    }
    
    this.goUp = function(scene, controls)
    {
        var newPosX = pengo.position.x -walkingX;
        var newPosZ = pengo.position.z -walkingZ;
        var Mx = Math.floor((newPosX -walkingX*3.5)/50);
        var Mz = Math.floor((newPosZ -walkingZ*3.5 )/50);
        
        if(controls.isGoingUp && 735 > (newPosX) && 735 > (newPosZ) && 15 < (newPosX) &&  15 < (newPosZ)  && worldMatrix[Mx*MATRIX_SIZE + Mz] != 1)
        {          
            this.applyMovement(scene, -walkingX, -walkingZ);
            if(controls.cameraView == UP_VIEW)
            {
                camera.position.set( pengo.position.x, UP_CAMERA_Y, pengo.position.z );
            }
            
            if(controls.cameraView == THIRD_PERSON || controls.cameraView == FIRST_PERSON)
            {
                camera.position.set(camera.position.x - walkingX, camera.position.y , camera.position.z - walkingZ );
            }
            
            this.handleCollisionWithItem(newPosX,newPosZ);
            if(that.hasCollisionWithEnemy(newPosX,newPosZ))
            {
                this.destroyPenguin();
            }

        }
    }
    
    this.goDown = function(scene, controls)
    {
        var newPosX = pengo.position.x + walkingX;
        var newPosZ = pengo.position.z + walkingZ;
        var Mx = Math.floor(newPosX/50);
        var Mz = Math.floor(newPosZ/50);

        if(controls.isGoingDown && 735 > (newPosX) && 735 > (newPosZ) && 15 < (newPosX) &&  15 < (newPosZ) && worldMatrix[Mx*MATRIX_SIZE + Mz] != 1)
        {
            this.applyMovement(scene, walkingX, walkingZ);
            if(controls.cameraView == UP_VIEW)
            {
                camera.position.set( pengo.position.x, UP_CAMERA_Y, pengo.position.z );
            }
            
            if(controls.cameraView == THIRD_PERSON || controls.cameraView == FIRST_PERSON)
            {
                camera.position.set(camera.position.x + walkingX, camera.position.y , camera.position.z + walkingZ );
            }
            
            this.handleCollisionWithItem(newPosX,newPosZ);

        }
    }
    
    this.turnLeft = function(scene, controls)
    {
        if(controls.isGoingLeft)
        {
            /*
            camera.rotation.y = camera.rotation.y + 18 * Math.PI / 180;    
            camera.rotation.y = camera.rotation.y + 18 * Math.PI / 180;
            camera.rotation.y = camera.rotation.y + 18 * Math.PI / 180;
            camera.rotation.y = camera.rotation.y + 18 * Math.PI / 180;    
            camera.rotation.y = camera.rotation.y + 18 * Math.PI / 180;
            camera.rotation.y = camera.rotation.y + 18 * Math.PI / 180;*/
            
            //camera.rotation.y = camera.rotation.y + 90 * Math.PI / 180; 
            var x = this.getX();
            var z = this.getZ();
            var y = this.getY();
            pengo.rotation.y = pengo.rotation.y + 90 * Math.PI / 180;
        
            if(direction == NORTH)
            {
                walkingX = -charSpeed;
                walkingZ = 0;
                if(controls.cameraView == THIRD_PERSON)
                {
                    camera.position.set( x - THIRD_CAM_DISTANCE, THIRD_CAM_Y, z);
                    camera.lookAt(new THREE.Vector3(x,y+ THIRD_CAM_UP_Y,z));
                }
                
                if(controls.cameraView == FIRST_PERSON)
                {
                    camera.position.set( x + FIRST_CAM_DISTANCE, FIRST_CAM_Y, z);
                    camera.lookAt(new THREE.Vector3(x + FIRST_CAM_DISTANCE*2,FIRST_CAM_Y,z));
                }
                direction = WEST;
            }
            else
            {
                if(direction == WEST)
                {
                    walkingX = 0;
                    walkingZ = charSpeed;
                    if(controls.cameraView == THIRD_PERSON)
                    {
                        camera.position.set( x, THIRD_CAM_Y, z + THIRD_CAM_DISTANCE);
                        camera.lookAt(new THREE.Vector3(x,y+ THIRD_CAM_UP_Y,z));
                    }
                    
                    if(controls.cameraView == FIRST_PERSON)
                    {
                        camera.position.set( x, FIRST_CAM_Y, z - FIRST_CAM_DISTANCE);
                        camera.lookAt(new THREE.Vector3(x,FIRST_CAM_Y,z- FIRST_CAM_DISTANCE*2));
                    }
                    direction = SOUTH;
                }
                else
                {
                    if(direction == SOUTH)
                    {
                        walkingX = charSpeed;
                        walkingZ = 0;
                        if(controls.cameraView == THIRD_PERSON)
                        {
                            camera.position.set( x + THIRD_CAM_DISTANCE, THIRD_CAM_Y, z );
                            camera.lookAt(new THREE.Vector3(x,y + THIRD_CAM_UP_Y,z));
                        }
                        if(controls.cameraView == FIRST_PERSON)
                        {
                            camera.position.set( x - FIRST_CAM_DISTANCE, FIRST_CAM_Y, z );
                            camera.lookAt(new THREE.Vector3(x - FIRST_CAM_DISTANCE*2,FIRST_CAM_Y,z));
                        }
                        direction = EAST;
                    }
                    else
                    {
                        if(direction == EAST)
                        {
                            walkingX = 0;
                            walkingZ = -charSpeed;
                            if(controls.cameraView == THIRD_PERSON)
                            {
                                camera.position.set( x, THIRD_CAM_Y, z - THIRD_CAM_DISTANCE );
                                camera.lookAt(new THREE.Vector3(x,y+ THIRD_CAM_UP_Y,z));
                            }
                            if(controls.cameraView == FIRST_PERSON)
                            {
                                camera.position.set( x, FIRST_CAM_Y, z + FIRST_CAM_DISTANCE );
                                camera.lookAt(new THREE.Vector3(x,FIRST_CAM_Y,z + FIRST_CAM_DISTANCE*2));
                            }
                            direction = NORTH;
                        }
                    }
                }
            }
       
            isGoingLeft = false;
        }
    }
    
    
    this.turnRight = function(scene, controls)
    {

        if(controls.isGoingRight)
        {
            //camera.rotation.y = camera.rotation.y - 90 * Math.PI / 180;
            var x = this.getX();
            var z = this.getZ();
            var y = this.getY();
            pengo.rotation.y = pengo.rotation.y - 90 * Math.PI / 180;
            
            if(direction == NORTH)
            {
                walkingX = charSpeed;
                walkingZ = 0;
                if(controls.cameraView == THIRD_PERSON)
                {
                    camera.position.set( x + THIRD_CAM_DISTANCE, THIRD_CAM_Y, z );
                    camera.lookAt(new THREE.Vector3(x,y + THIRD_CAM_UP_Y,z));
                }
                if(controls.cameraView == FIRST_PERSON)
                {
                    camera.position.set( x - FIRST_CAM_DISTANCE, FIRST_CAM_Y, z );
                    camera.lookAt(new THREE.Vector3(x - FIRST_CAM_DISTANCE*2,FIRST_CAM_Y,z));
                }
                direction = EAST;
            }
            else
            {
                if(direction == EAST)
                {
                    walkingX = 0;
                    walkingZ = charSpeed;
                    if(controls.cameraView == THIRD_PERSON)
                    {
                        camera.position.set( x, THIRD_CAM_Y, z + THIRD_CAM_DISTANCE);
                        camera.lookAt(new THREE.Vector3(x,y+ THIRD_CAM_UP_Y,z));
                    }
                    if(controls.cameraView == FIRST_PERSON)
                    {
                        camera.position.set( x, FIRST_CAM_Y, z - FIRST_CAM_DISTANCE);
                        camera.lookAt(new THREE.Vector3(x,FIRST_CAM_Y,z- FIRST_CAM_DISTANCE*2));
                    }
                    direction = SOUTH;
                }
                else
                {
                    if(direction == SOUTH)
                    {
                        walkingX = -charSpeed;
                        walkingZ = 0;
                        if(controls.cameraView == THIRD_PERSON)
                        {
                            camera.position.set( x - THIRD_CAM_DISTANCE, THIRD_CAM_Y, z);
                            camera.lookAt(new THREE.Vector3(x,y+ THIRD_CAM_UP_Y,z));
                        }
                        
                        if(controls.cameraView == FIRST_PERSON)
                        {
                            camera.position.set( x + FIRST_CAM_DISTANCE, FIRST_CAM_Y, z);
                            camera.lookAt(new THREE.Vector3(x + FIRST_CAM_DISTANCE*2,FIRST_CAM_Y,z));
                        }
                        direction = WEST;
                    }
                    else
                    {
                        if(direction == WEST)
                        {
                            walkingX = 0;
                            walkingZ = -charSpeed;
                            if(controls.cameraView == THIRD_PERSON)
                            {
                                camera.position.set( x, THIRD_CAM_Y, z - THIRD_CAM_DISTANCE );
                                camera.lookAt(new THREE.Vector3(x,y +THIRD_CAM_UP_Y,z));
                            }
                            if(controls.cameraView == FIRST_PERSON)
                            {
                                camera.position.set( x, FIRST_CAM_Y, z + FIRST_CAM_DISTANCE );
                                camera.lookAt(new THREE.Vector3(x,FIRST_CAM_Y,z + FIRST_CAM_DISTANCE*2));
                            }
                            direction = NORTH;
                        }
                    }
                }
            }
            
            isGoingRight = false;
        }
    }

    this.destroyPenguin = function()
    {
        window.location.href = "game_over.html";
    }
}

