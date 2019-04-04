

function Enemy()
{
    var enemy;
    var isDead = false;
    var that = this;
    
    this.makeEnemy = function (scene, posx, posz)
    {
        var manager = new THREE.LoadingManager();
        manager.onProgress = function ( item, loaded, total ) 
        {

            console.log( item, loaded, total );

        };

        var texture = new THREE.Texture();

        var loader = new THREE.ImageLoader( manager );
        loader.load( 'textures/metal1.jpg', function ( image ) 
        {

            texture.image = image;
            texture.needsUpdate = true;

        } );

        // model

        var loader = new THREE.OBJLoader( manager );
        loader.load( 'enemy/SWAN.obj', function ( object ) 
        {

            object.traverse( function ( child ) 
            {

                if ( child instanceof THREE.Mesh ) 
                {

                    child.material.map = texture;
                    child.castShadow=true;
                    child.receiveShadow=true;
                }

            } );

            object.position.y = 15;
            object.scale.set(190,125,110);
            object.position.z = posz;
            object.position.x = posx;
            scene.add( object );
            enemy = object;

        } );

    
    }
    

    this.getX = function()
    {
        return enemy.position.x;
    }
    
    this.getY = function()
    {
        return enemy.position.y;
    }
    
    this.getZ = function()
    {
        return enemy.position.z;
    }
    
    this.getEnemy = function()
    {
        return enemy;
    }
    
    this.hasEnemyCollision = function(newPosX, newPosZ)
    {
        var i;
        for(i=0; i < 4; i++)
        {
            var otherEnemy = enemyMatrix[i];
			//console.log(otherEnemy);
            if(otherEnemy && otherEnemy.getEnemy() != enemy )
            {
                if(newPosX < otherEnemy.getX() + 30 && newPosX > otherEnemy.getX() - 30 && newPosZ < otherEnemy.getZ() + 30 && newPosZ > otherEnemy.getZ() - 30)
                {
                    //console.log("colisao inimiga");
                    return true;
                }
                
            }
        }
        return false;
    }
    
    this.moveRandomly = function()
    {
        var interv = window.setInterval(function()
        {
            if(isDead)
            {
                clearInterval(interv);
                return;
            }
            var Mx = Math.floor((enemy.position.x + 10)/50);
            var Mz = Math.floor((enemy.position.z)/50);
            var bool = that.hasEnemyCollision(enemy.position.x + 10, enemy.position.z);
            if(pengo.getX() > enemy.position.x && enemy.position.x < pengo.getX() + 10 && pengo.getZ() < enemy.position.z && enemy.position.z  < pengo.getZ() + 20 && worldMatrix[Mx*MATRIX_SIZE + Mz] != 1
             && bool == false)
            {
                enemy.rotation.y = (90 * Math.PI / 180);
                enemy.position.x = enemy.position.x + 10; 
            }
            else
            {
                Mx = Math.floor((enemy.position.x - 10)/50);
                Mz = Math.floor((enemy.position.z)/50);
                bool = that.hasEnemyCollision(enemy.position.x - 10, enemy.position.z);
                if(pengo.getX() < enemy.position.x && enemy.position.x > pengo.getX() + 10 && pengo.getZ() < enemy.position.z && enemy.position.z < pengo.getZ() + 20 && worldMatrix[Mx*MATRIX_SIZE + Mz] != 1 && bool == false)
                {
                    enemy.rotation.y = 3*(90 * Math.PI / 180);
                    enemy.position.x = enemy.position.x - 10; 
                }
                else
                {
                    Mx = Math.floor((enemy.position.x )/50);
                    Mz = Math.floor((enemy.position.z- 10)/50);
                    bool = that.hasEnemyCollision(enemy.position.x, enemy.position.z - 10);
                    if(pengo.getZ() < enemy.position.z && enemy.position.z > pengo.getZ() + 10 && pengo.getX() < enemy.position.x && enemy.position.x < pengo.getX() + 20 && worldMatrix[Mx*MATRIX_SIZE + Mz] != 1 && bool == false)
                    {
                        enemy.rotation.y = 2*(90 * Math.PI / 180);
                        enemy.position.z = enemy.position.z - 10; 
                    }
                    else
                    {
                        Mx = Math.floor((enemy.position.x )/50);
                        Mz = Math.floor((enemy.position.z+ 10)/50);
                        
                        bool = that.hasEnemyCollision(enemy.position.x, enemy.position.z + 10);
                        if(pengo.getZ() > enemy.position.z && enemy.position.z < pengo.getZ() + 10 && pengo.getX() < enemy.position.x && enemy.position.x < pengo.getX() + 20 && worldMatrix[Mx*MATRIX_SIZE + Mz] != 1 && bool == false)
                        {
                            enemy.rotation.y = 0;
                            enemy.position.z = enemy.position.z + 10; 
                        }
                        else
                        {                           
                            var newPosX = enemy.position.x + randomInt(-15,15);
                            var newPosZ = enemy.position.z + randomInt(-15,15);
                            Mx = Math.floor((newPosX+ 7)/50);
                            Mz = Math.floor((newPosZ+ 7)/50);
                            bool = that.hasEnemyCollision(newPosX, newPosZ);
                            if(735 > (newPosX) && 735 > (newPosZ) && 15 < (newPosX) &&  15 < (newPosZ) && worldMatrix[Mx*MATRIX_SIZE + Mz] != 1 && bool == false)
                            {
                                
                                enemy.position.x = newPosX ;
                                enemy.position.z = newPosZ;
                            }
                        }
                    }
                }
            }
            
            if(pengo.getX() < enemy.position.x  + 15 && pengo.getX() > enemy.position.x  - 15 && pengo.getZ() < enemy.position.z + 15 && pengo.getZ() > enemy.position.z  - 15)
            {
                pengo.destroyPenguin();
            }
            
        }, 200);
    }
    
    this.move = function(scene, posx, posz)
    {
        
        
        enemy.position.x = enemy.position.x + posx;
        enemy.position.z = enemy.position.z + posz;
        //enemy.translateY( posz );
        //enemy.translateX( posx );
        
    }
    
    this.destroyEnemy = function(scene)
    {
        isDead = true;
		enemyDeathEffect(enemy);
        scene.remove(enemy);
    }
    

}