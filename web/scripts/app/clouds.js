define(["OrbitControls", "./materials", "./opts"], function(THREE, materials, opts){
  
	var geometry = new THREE.Geometry();
	var texture = THREE.ImageUtils.loadTexture(opts.cloudURL , null );
	texture.magFilter = THREE.LinearMipMapLinearFilter;
	texture.minFilter = THREE.LinearMipMapLinearFilter;

	var fog = new THREE.Fog( 0x4584b4, - 100, 3000 );
	var material = new THREE.ShaderMaterial( {
		uniforms: {

			"map": { type: "t", value: texture },
			"fogColor" : { type: "c", value: fog.color },
			"fogNear" : { type: "f", value: fog.near },
			"fogFar" : { type: "f", value: fog.far },

		},
		vertexShader: document.getElementById( 'vs' ).textContent,
		fragmentShader: document.getElementById( 'fs' ).textContent,
		depthWrite: false,
		depthTest: false,
		transparent: true

	} );

	var plane = new THREE.Mesh( new THREE.PlaneGeometry( 64, 64 ) );

	
	for ( var i = -1000; i < 1000; i++ ) {

		plane.position.x = Math.random() * 1000 - 500;
		plane.position.y = - Math.random() * Math.random() * 200 - 15;
		plane.position.z = i+i;
		plane.rotation.z = Math.random() * Math.PI;
		plane.scale.x = plane.scale.y = Math.random() * Math.random() * 1.5 + 0.5;

		THREE.GeometryUtils.merge( geometry, plane );

	}

	mesh = new THREE.Mesh( geometry, material );	

	return {"mesh": mesh};
  
});

	//position = ( ( Date.now() - start_time ) * 0.03 ) % 8000;


