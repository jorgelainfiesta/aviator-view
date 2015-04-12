define(["OrbitControls", "./materials", "./opts", "./animate", "./variables"], function(THREE, materials, opts, animate, variables){
  
	var geometry = new THREE.Geometry();
	var texture = THREE.ImageUtils.loadTexture(opts.cloudURL , null);
	texture.magFilter = THREE.LinearMipMapLinearFilter;
	texture.minFilter = THREE.LinearMipMapLinearFilter;

	
	var colorValue = variables.humidity*.45+.5;
	var color = new THREE.Color(colorValue, colorValue, colorValue);
	var fog = new THREE.Fog( color, -3000, 3000 );
	
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
	
	for ( var i = -5000; i < 800; i++ ) {
		
		var plane = new THREE.Mesh( new THREE.PlaneGeometry( 60, 60 ) );

		//plane.position.x = Math.random() * 3000 - 1500;
		plane.position.x = Math.random() * variables.clouds*10000 - (variables.clouds*10000/2);
		plane.position.y = - Math.random() * Math.random() * 100 - 15;
		plane.position.z = i;
		plane.rotation.z = Math.random() * Math.PI;
		plane.scale.x = plane.scale.y = Math.random() * Math.random() * 1.5 + 0.5;

		THREE.GeometryUtils.merge( geometry, plane );
		
		//geometry.merge(plane.geometry, plane.matrix);

	}

	mesh = new THREE.Mesh( geometry, material );
	
	//mesh.position.z = -8000;

	return {"mesh": mesh};
  
});