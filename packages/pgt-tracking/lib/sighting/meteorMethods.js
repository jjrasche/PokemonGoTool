var isDuplicate = function isDuplicate(sighting) {
	// is a duplicate if same pokemon within 4 sq meter and set to expire within 2 min of the other one
	var searchTerms = {$and : [
			/*
				within area ... don't know if the gps is exact yet but I doubt it is
				Precision. 
					4 decimals => 11.132 meters at the equator
					5 decimals => 1.1132 meter at the equator.
			*/
			{'loc.lat' : {
				$gt : parseFloat(sighting.loc.lat.toFixed(5)) - .00001,
				$lt: parseFloat(sighting.loc.lat.toFixed(5)) + .00001
			}},
			{'loc.long' : {
				$gt : parseFloat(sighting.loc.long.toFixed(5)) - .00001,
				$lt: parseFloat(sighting.loc.long.toFixed(5)) + .00001
			}},
			{expirationTime : {
				$gt : sighting.expirationTime - 60,
				$lt : sighting.expirationTime + 60,
			}},
			{pokeNumber : sighting.pokeNumber}
		]
	};
	// console.log("isDuplicate: ", searchTerms, PGT.Sighting.find(searchTerms).count());
	return PGT.Sighting.find(searchTerms).count() !== 0
}

Meteor.methods({
	savePreventingDuplicates : function savePreventingDuplicates(sighting) {
		// has a duplicate
		if (isDuplicate(sighting)) console.log("duplicate: ", sighting);
		else {
			var sightingID = PGT.Sighting.insert(sighting);
			return sightingID
		}
	}
});
