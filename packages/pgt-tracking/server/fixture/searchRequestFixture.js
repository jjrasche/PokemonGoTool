// create data if data does not exist
if (!PGT.SearchRequest.find().count()) {
	console.log('No searchRequests in DB. Started to create ' + PGT.Util.getFormattedTime());

	var sighting1ID = PGT.Sighting.insert({
		loc : {
			lat: 42.73386893242186, 
			long: -84.55055929720402
		},
		expirationTime : (new Date()).getTime(),
		pokeNumber : 3
	});

	var sighting2ID = PGT.Sighting.insert({
		loc : {
			lat: 42.72734355512606, 
			long: -84.53695513308048
		},
		expirationTime : (new Date()).getTime() + 20000,
		pokeNumber : 93
	});

	PGT.SearchRequest.insert({
		loc : {
			lat : 	 42.73253499999999,
			long : -84.55553470000001
		},
		sightingIDs : [sighting1ID, sighting2ID],
		enabled : true
	});

	console.log('Finished searchRequests creation ' + PGT.Util.getFormattedTime());

}