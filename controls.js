var ROTATE_LEFT = 97; //a
var ROTATE_LEFT_UPPER = 65; //A
var ROTATE_RIGHT = 100; //d
var ROTATE_RIGHT_UPPER = 68; //D
var PUSH_CUBE = 32; // space
var CREATE_CUBE = 16; // shift
var CHANGE_VIEW = 118; //v
var CHANGE_VIEW_UPPER = 86; //V
var UP = 119; //w
var UP_UPPER = 87; //W
var DOWN = 115; // s
var DOWN_UPPER = 83; //S

var MOVABLE_CUBE = 1;
var FIXED_CUBE = 2;



var NORTH = 1;
var WEST = 2;
var SOUTH = 3;
var EAST = 4;


function Controls(character, scene, camera)
{
    
    var  controls = 
    {
        isGoingLeft: false,
        isGoingUp: false,
        isGoingRight: false,
        isGoingDown: false,
        cameraView: UP_VIEW
    };
    
    var x;
    var z;
    var y;
    var that = this;
    
    this.hasCollisionWithEnemy = function(newPosX, newPosZ)
    {
        var i;
        for(i=0; i < enemyNum; i++)
        {
            if(enemyMatrix[i])
            {
                var enemy = enemyMatrix[i];

                if(newPosX < enemy.getX() + 30 && newPosX > enemy.getX() - 30 && newPosZ < enemy.getZ() + 30 && newPosZ > enemy.getZ() - 30)
                {
                    return true;
                }
                
            }
        }
        return false;
    }
    
    //$(document).keydown(function (event)
    window.addEventListener('keydown', function (event)
    {
        var key = event.which ? event.which : event.keyCode;
 
        switch(key) 
        {
            case UP:
            case UP_UPPER:
                controls.isGoingUp = true;
                character.goUp(scene, controls);
            break;
            
            case DOWN:
            case DOWN_UPPER:
                controls.isGoingDown = true;
                character.goDown(scene, controls);
            break;
        
            case ROTATE_LEFT: 
            case ROTATE_LEFT_UPPER:
                controls.isGoingLeft = true;
                character.turnLeft(scene, controls);

            break;
        
            case ROTATE_RIGHT:
            case ROTATE_RIGHT_UPPER:
                controls.isGoingRight = true;
                character.turnRight(scene, controls);
            break;
            
            case CHANGE_VIEW:
            case CHANGE_VIEW_UPPER:
           
                
                if(controls.cameraView == FIRST_PERSON)
                {
                    x = character.getX();
                    z = character.getZ();
                    y = character.getY();
                    if( character.getDirection() == NORTH)
                    {
                        camera.position.set( x, THIRD_CAM_Y, z - THIRD_CAM_DISTANCE );
                        camera.lookAt(new THREE.Vector3(x,y+ THIRD_CAM_UP_Y,z));
                    }
                    
                    if( character.getDirection() == EAST)
                    {
                        camera.position.set( x + THIRD_CAM_DISTANCE, THIRD_CAM_Y, z );
                        camera.lookAt(new THREE.Vector3(x,y + THIRD_CAM_UP_Y,z));
                    }
                    
                    if( character.getDirection() == SOUTH)
                    {
                        camera.position.set( x, THIRD_CAM_Y, z + THIRD_CAM_DISTANCE);
                        camera.lookAt(new THREE.Vector3(x,y+ THIRD_CAM_UP_Y,z));
                    }
                    
                    if( character.getDirection() == WEST)
                    {
                        camera.position.set( x - THIRD_CAM_DISTANCE, THIRD_CAM_Y, z);
                        camera.lookAt(new THREE.Vector3(x,y+ THIRD_CAM_UP_Y,z));
                    }
                    
                    controls.cameraView = THIRD_PERSON;
                }
                else
                {
                    if(controls.cameraView == THIRD_PERSON)
                    {   
                        var xU = character.getX();
                        var zU = character.getZ();
                    
                        camera.position.set( 0, UP_CAMERA_Y, 0 );
                        camera.lookAt(new THREE.Vector3(0,0,0));
                        camera.position.set( xU, UP_CAMERA_Y, zU );
                        controls.cameraView = UP_VIEW;
                    }
                    else
                    {
                        if(controls.cameraView == UP_VIEW)
                        {
                            controls.cameraView = FIRST_PERSON;
                            
                            x = character.getX();
                            z = character.getZ();
                            y = character.getY();
                            
                            if( character.getDirection() == NORTH)
                            {
                                camera.position.set( x, FIRST_CAM_Y, z + FIRST_CAM_DISTANCE );
                                camera.lookAt(new THREE.Vector3(x,FIRST_CAM_Y,z + FIRST_CAM_DISTANCE*2));
                            }
                            
                            if( character.getDirection() == EAST)
                            {
                                camera.position.set( x - FIRST_CAM_DISTANCE, FIRST_CAM_Y, z );
                                camera.lookAt(new THREE.Vector3(x - FIRST_CAM_DISTANCE*2,FIRST_CAM_Y,z));
                            }
                            
                            if( character.getDirection() == SOUTH)
                            {
                                camera.position.set( x, FIRST_CAM_Y, z - FIRST_CAM_DISTANCE);
                                camera.lookAt(new THREE.Vector3(x,FIRST_CAM_Y,z- FIRST_CAM_DISTANCE*2));
                            }
                            
                            if( character.getDirection() == WEST)
                            {
                                camera.position.set( x + FIRST_CAM_DISTANCE, FIRST_CAM_Y, z);
                                camera.lookAt(new THREE.Vector3(x + FIRST_CAM_DISTANCE*2,FIRST_CAM_Y,z));
                            }
                            
                        }
                    }
                }
            break;
        
            case CREATE_CUBE:
                if(simCubes > 0)
                {
                    simCubes--;
                    
                    var cubeX = 0;
                    var cubeZ = 0;
                    var Mx, Mz;
                    var miniCube = new Cube();
                    var newCube = new Cube();
                    
                    switch(character.getDirection())
                    {
                        case WEST:
                            
                            Mx = Math.floor(character.getX()/50 + 1);
                            Mz = Math.floor(character.getZ()/50);
                            cubeX = Mx*50 + 25;
                            cubeZ = Mz*50 + 25;
                            
                            miniCube.makeMiniCube(cubeX,cubeZ);

                            window.setTimeout(function()
                            {
                                if(!worldMatrix[Mx*MATRIX_SIZE + Mz]&& 
                                !(cubeX < character.getX() + 30 && cubeX > character.getX() - 30 && cubeZ < character.getZ() + 30 && cubeZ > character.getZ() - 30)
                                 && that.hasCollisionWithEnemy(cubeX,cubeZ) == false && Mx >= 0 && Mx < 15 )
                                {
                                    newCube.generatePrePaidCube(cubeX, cubeZ);
                                    cubeX = Math.floor(newCube.getX()/50);
                                    cubeZ = Math.floor(newCube.getZ()/50);
                                    cubeMatrix[cubeX*MATRIX_SIZE + cubeZ] = newCube;
                                    worldMatrix[cubeX*MATRIX_SIZE + cubeZ] = 1;
                                }
                                else
                                {
                                    simCubes++;
                                }
                            },2000);
                            
                            break;
                                     
                        case SOUTH:
                            
                            Mx = Math.floor(character.getX()/50);
                            Mz = Math.floor(character.getZ()/50 - 1);
                            cubeX = Mx*50 + 25;
                            cubeZ = Mz*50 + 25;
                            
                            miniCube.makeMiniCube(cubeX,cubeZ);
                            window.setTimeout(function()
                            {
                                if(!worldMatrix[Mx*MATRIX_SIZE + Mz]&& 
                                !(cubeX < character.getX() + 30 && cubeX > character.getX() - 30 && cubeZ < character.getZ() + 30 && cubeZ > character.getZ() - 30)
                                 && that.hasCollisionWithEnemy(cubeX,cubeZ) == false && Mx >= 0 && Mx < 15 )
                                {
                                    newCube.generatePrePaidCube(cubeX, cubeZ);
                                    cubeX = Math.floor(newCube.getX()/50);
                                    cubeZ = Math.floor(newCube.getZ()/50);
                                    cubeMatrix[cubeX*MATRIX_SIZE + cubeZ] = newCube;
                                    worldMatrix[cubeX*MATRIX_SIZE + cubeZ] = 1;
                                }
                                else
                                {
                                    simCubes++;
                                }
                            },2000);
                            
                            break;
                    
                        case EAST:
                            
                            Mx = Math.floor(character.getX()/50 - 1);
                            Mz = Math.floor(character.getZ()/50);
                            cubeX = Mx*50 + 25;
                            cubeZ = Mz*50 + 25;
                            
                            miniCube.makeMiniCube(cubeX,cubeZ);
                            window.setTimeout(function()
                            {
                                if(!worldMatrix[Mx*MATRIX_SIZE + Mz]&& 
                                !(cubeX < character.getX() + 30 && cubeX > character.getX() - 30 && cubeZ < character.getZ() + 30 && cubeZ > character.getZ() - 30)
                                 && that.hasCollisionWithEnemy(cubeX,cubeZ) == false && Mx >= 0 && Mx < 15 )
                                {
                                    newCube.generatePrePaidCube(cubeX, cubeZ);
                                    cubeX = Math.floor(newCube.getX()/50);
                                    cubeZ = Math.floor(newCube.getZ()/50);
                                    cubeMatrix[cubeX*MATRIX_SIZE + cubeZ] = newCube;
                                    worldMatrix[cubeX*MATRIX_SIZE + cubeZ] = 1;
                                }
                                else
                                {
                                    simCubes++;
                                }
                            },2000);
                            
                            break;
                    
                        case NORTH:
                    
                            Mx = Math.floor(character.getX()/50);
                            Mz = Math.floor(character.getZ()/50 + 1);
                            cubeX = Mx*50 + 25;
                            cubeZ = Mz*50 + 25;
                            
                            miniCube.makeMiniCube(cubeX,cubeZ);
                            window.setTimeout(function()
                            {
                                if(!worldMatrix[Mx*MATRIX_SIZE + Mz]&& 
                                !(cubeX < character.getX() + 30 && cubeX > character.getX() - 30 && cubeZ < character.getZ() + 30 && cubeZ > character.getZ() - 30)
                                 && that.hasCollisionWithEnemy(cubeX,cubeZ) == false && Mx >= 0 && Mx < 15 )
                                {
                                    newCube.generatePrePaidCube(cubeX , cubeZ);
                                    cubeX = Math.floor(newCube.getX()/50);
                                    cubeZ = Math.floor(newCube.getZ()/50);
                                    cubeMatrix[cubeX*MATRIX_SIZE + cubeZ] = newCube;
                                    worldMatrix[cubeX*MATRIX_SIZE + cubeZ] = 1;
                                }
                                else
                                {
                                    simCubes++;
                                }
                            },2000);

                            break;
                    }
                    
                }
            break;
            
            case PUSH_CUBE:
            
                var charX = character.getX();
                var charZ = character.getZ();
                
                switch(character.getDirection())
                {
                    case NORTH:
                    
                        charZ += 50;
                        break;
                    
                    case SOUTH:
                        
                        charZ -= 50;
                        break;
                    
                    case EAST:
                        
                        charX -= 50;
                        break;
                    
                    case WEST:
                    
                        charX += 50;
                        break;
                }
                var Mx = Math.floor(charX/50);
                var Mz = Math.floor(charZ/50);
                
                if(cubeMatrix[Mx*MATRIX_SIZE + Mz] instanceof Cube)
                {
                    
                    var movingCube = cubeMatrix[Mx*MATRIX_SIZE + Mz];
                    cubeMatrix[Mx*MATRIX_SIZE + Mz] = 0;
                    worldMatrix[Mx*MATRIX_SIZE + Mz] = 0;
                    movedCube = false;
                    movingCube.pushCube(character.getDirection());
                    
                    window.setTimeout(function()
                    {
                        Mx = Math.floor(movingCube.getX()/50);
                        Mz = Math.floor(movingCube.getZ()/50);
                        if(movingCube.cubeWasRemoved() == false)
                        {
                            cubeMatrix[Mx*MATRIX_SIZE + Mz] = movingCube;   
                            worldMatrix[Mx*MATRIX_SIZE + Mz] = 1;
                        }
                    },1700);
                    
                }
                
            break;
            
            

        }
    });
    
    //$(document).keyup(function (event)
    window.addEventListener('keyup', function (event)
    {
        var keyUp = event.which ? event.which : event.keyCode;
 
        switch(keyUp) 
        {
            case UP:
            case UP_UPPER:
                controls.isGoingUp = false;
            break;
            
            case DOWN:
            case DOWN_UPPER:
                controls.isGoingDown = false;
            
            break;
        
            case ROTATE_LEFT: 
            case ROTATE_LEFT_UPPER:
                controls.isGoingLeft = false;
            break;
        
            case ROTATE_RIGHT:
            case ROTATE_RIGHT_UPPER:
                controls.isGoingRight = false;
            break;
            
            case CHANGE_VIEW:
            case CHANGE_VIEW_UPPER:
                
            break;
        
            
        }
    
    });
    
}