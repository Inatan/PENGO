
function SpeedItem()
{
    var sphere;
    
    this.makeSpeedItem = function(posx, posz)
    {
        var textSpeed = new THREE.ImageUtils.loadTexture( 'textures/speedTex.jpg' );
        var material = new THREE.MeshBasicMaterial({ map: textSpeed });    
        sphere = new THREE.Mesh(new THREE.SphereGeometry(15, 15, 15), material);
        sphere.position.set(posx,20,posz);
        sphere.overdraw = true;
        scene.add(sphere);
    
    
    }
    
    this.getX = function()
    {
        return sphere.position.x;
    }
    
    this.getZ = function()
    {
        return sphere.position.z;
    }
    
    this.destroySphere = function()
    {
        scene.remove(sphere);
    }
    
    this.getType = function()
    {
        return SPEED_ITEM;
    }
}