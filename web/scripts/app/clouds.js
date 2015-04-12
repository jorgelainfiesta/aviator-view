define(["OrbitControls", "./materials", "./opts", "./animate"], function(THREE, materials, opts, animate){
  
	var geometry = new THREE.Geometry();
	var texture = THREE.ImageUtils.loadTexture(opts.cloudURL , null);
	texture.magFilter = THREE.LinearMipMapLinearFilter;
	texture.minFilter = THREE.LinearMipMapLinearFilter;

	var fog = new THREE.Fog( "rgb(100,100,100)", -1000, 4000 );
	
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

	

	
	for ( var i = -5000; i < 600; i++ ) {
		
		var plane = new THREE.Mesh( new THREE.PlaneGeometry( 60, 60 ) );

		plane.position.x = Math.random() * 3000 - 1500;
		plane.position.y = - Math.random() * Math.random() * 100 - 15;
		plane.position.z = Math.random()*i;
		plane.rotation.z = Math.random() * Math.PI;
		plane.scale.x = plane.scale.y = Math.random() * Math.random() * 1.5 + 0.5;

		THREE.GeometryUtils.merge( geometry, plane );
		
		//geometry.merge(plane.geometry, plane.matrix);

	}

	mesh = new THREE.Mesh( geometry, material );
	
	//mesh.position.z = -8000;

	return {"mesh": mesh};
  
});