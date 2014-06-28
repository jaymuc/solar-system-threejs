define(['jquery', 'Scene', 'System', 'OrbitController'], function($, Scene, System, OrbitController) {

    var MoonFactory = {
        getMoonTexture: function(moon) {
            return new THREE.ImageUtils.loadTexture('../assets/textures/moon.jpg');
            // return new THREE.ImageUtils.loadTexture('../assets/textures/'+ moon.name.toLowerCase() +'.jpg');
        },

        buildMoon: function(parent, moon, planetObj) {
            // System.log([planet, moon], false)

            // USE A MOON CENTROID AND MAKE object.rotation angle different and add the moon object to that so it rotates at an angle

            var texture = MoonFactory.getMoonTexture();

            var material = new THREE.MeshLambertMaterial({
                                      ambient: 0xbbbbbb,
                                      map: texture,
                                      side: THREE.DoubleSide
                                    });

            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;

            texture.anisotropy = 5;

            thisMoon = new THREE.Mesh(
                        new THREE.SphereGeometry(
                                moon.radius,
                                12,
                                7
                            ),
                            material
                        );

            var moonCentroid = new THREE.Mesh(
                        new THREE.SphereGeometry(
                                1,
                                1,
                                1
                            ),
                            material
                        );

            moonCentroid.rotation.x = moon.axisTilt;

            console.log(thisMoon, moonCentroid)

            var Controller = new OrbitController(thisMoon, moon, parent, { interval: 1 });

            if (App.config.moonOrbitsEnabled) {
                Controller.positionObject(thisMoon);
            }

            planetObj.add(moonCentroid);
            moonCentroid.add(thisMoon);
        }
    };

    return MoonFactory;
});