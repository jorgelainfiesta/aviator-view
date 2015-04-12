define(['datgui', './variables'], function(dat, opts){

  var gui = new dat.GUI();

	var guiData  = {
		//Search: ,
		AircraftID: opts.AircraftID,
		AircraftType: opts.AircraftType,
		Latitude: opts.Latitude,
		Longitude: opts.Longitude, 
		Altitude: opts.Altitude,
		Speed: opts.Speed,
		City: opts.City,
		Temperature: opts.Temperature	
	}	
	
	gui.add(guiData, 'AircraftID');
	gui.add(guiData, 'AircraftType');
	gui.add(guiData, 'Latitude');
	gui.add(guiData, 'Longitude');
	gui.add(guiData, 'Altitude');
	gui.add(guiData, 'Speed');
	gui.add(guiData, 'City');
	gui.add(guiData, 'Temperature');
	
  //return {'clouds' : clouds};
});