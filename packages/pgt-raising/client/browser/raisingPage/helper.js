// subscription by widget in main layout
Template.pgtRaisingPage.onCreated(function() {
	var instance = this;
});


Template.pgtRaisingPageInput.helpers({
	pokemonTypes : function() {
		return PGT.Pokemon.getNames();
	}
});

Template.pgtRaisingPageInput.events({
	'submit #pgtRaisingPageInput' : function(event) {
		event.preventDefault();
		var cp = parseInt(event.target.pgtRaisingPageCpInput.value);
		var stardust = parseInt(event.target.pgtRaisingPageStardustInput.value);
		var pokemonName = event.target.pgtRaisingPagePokemonSelect.value;
		var pokemon = PGT.Pokemon.getPokemonByName(pokemonName);

		console.log("pgtRaisingPageInput: ", pokemon);

		PGT.Raise.analyzePowerUpOutcomes(pokemon, cp, stardust);
		PGT.Raise.analyzeMoveRatings(pokemon);
		return false;
	}
});



Template.pgtRaisingPagePowerUpOutcomes.helpers({
	outcomes : function() {
		return Session.get('powerUpOutcomes');
	}
});

Template.pgtRaisingPageMoveRatings.helpers({
	ratings : function() {
		return Session.get('moveRatings');
	}
});




// business logic
PGT.namespacer('PGT.Raise', {analyzePowerUpOutcomes : 
	function analyzePowerUpOutcomes(pokemon, cp, stardust) {
		console.log(typeof(cp), cp, typeof(stardust), stardust);
		var cpData = pokemon.cpData;
		var dataMatch = cpData.filter(function(d) {  
			return(d.stardust === stardust && d.maxCP > cp && d.minCP < cp)
		});
		if (!dataMatch) throw "no data found for stardust (" + stardust + ") and cp (" + cp + ")";
		console.log('analyzePowerUpOutcomes: ', pokemon, cpData, dataMatch);
		
		handlePowerUpResults(cp, dataMatch);
	}
})

var handlePowerUpResults = function handlePowerUpResults(cp, dataMatch) {
	var sessionData = []
	dataMatch.forEach(function(match) {
		sessionData.push({
			percentMax : PGT.Util.calcCpPercentOfMax(cp, match.maxCP, match.minCP),
			level : match.level,
			minCP : match.minCP,
			maxCP : match.maxCP
		});

	});	
	console.log('handlePowerUpResults',dataMatch, sessionData);	
	Session.set('powerUpOutcomes', sessionData);
}


PGT.namespacer('PGT.Raise', {analyzeMoveRatings : 
	function analyzeMoveRatings(p) {
		var sessionData = []
		var moves = p._moves().sort(function(m1, m2) {
			if(m1.isQuickMove() && m2.isChargeMove())
				return false;
			else if(m1.isChargeMove() && m2.isQuickMove())
				return true;  
			else 
				return m2.getRating(p) - m1.getRating(p);
		})
		console.log('analyzeMoveRatings: ', moves);

		moves.forEach(function(m) {
			sessionData.push({
				moveName : m.name,
				dps : m.dps,
				rating : m.getRating(p)
			});
		});
		console.log('analyzeMoveRatings: ',sessionData)
		Session.set('moveRatings', sessionData);
	}
});

