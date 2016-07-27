/*
TODO:
	automate this action
	remove function call from client
	add create time to sightings
	setup for Chicago
	figure out why node is using so much CPU.

	(Future) Integrate with mapping
*/

var Future = Npm.require("fibers/future");


var formatRequestURI = function formatRequestURI(sr) {
	var url = "https://pokevision.com/map/data/";
	url += sr.loc.lat + '/';
	url += sr.loc.long;
	console.log(url);
	return url;	
};

var convertToSightings = function convertToSightings(data) {
	if (data.pokemon === undefined) return;
	var sightings = [];
	data.pokemon.forEach(function(d) {
		sightings.push({
			expirationTime : d.expiration_time,
			pokeNumber : d.pokemonId,
			loc : {
				lat : d.latitude,
				long : d.longitude 
			}
		});
	});
	return sightings;
};

var requestData = function requestData(sr) {
	// var tmp = {"status":"success","pokemon":[{"id":203547294,"data":"[]","expiration_time":1469647796,"pokemonId":19,"latitude":42.727960505939,"longitude":-84.564842827237,"uid":"8822c02cd9d:19","is_alive":true},{"id":202075977,"data":"[]","expiration_time":1469647811,"pokemonId":21,"latitude":42.727228771745,"longitude":-84.56386049482,"uid":"8822c1d32a7:39","is_alive":true},{"id":202075978,"data":"[]","expiration_time":1469647905,"pokemonId":39,"latitude":42.727765545098,"longitude":-84.563942356489,"uid":"8822c1d32a7:39","is_alive":true},{"id":203547295,"data":"[]","expiration_time":1469647970,"pokemonId":13,"latitude":42.728085582356,"longitude":-84.564269802014,"uid":"8822c02cd9d:19","is_alive":true},{"id":203227495,"data":"[]","expiration_time":1469648152,"pokemonId":124,"latitude":42.726858973033,"longitude":-84.559276057063,"uid":"8822c1d225f:124","is_alive":true},{"id":202101446,"data":"[]","expiration_time":1469647869,"pokemonId":10,"latitude":42.72697073185,"longitude":-84.556819959358,"uid":"8822c1d0801:10","is_alive":true},{"id":202389030,"data":"[]","expiration_time":1469647958,"pokemonId":19,"latitude":42.724023364946,"longitude":-84.55567374488,"uid":"8822c1cfcf5:19","is_alive":true},{"id":202924627,"data":"[]","expiration_time":1469647959,"pokemonId":19,"latitude":42.724023364946,"longitude":-84.55567374488,"uid":"8822c1cfcf5:19","is_alive":true},{"id":203717494,"data":"[]","expiration_time":1469647759,"pokemonId":21,"latitude":42.731951509346,"longitude":-84.559112320448,"uid":"8822c1d4291:21","is_alive":true},{"id":203047418,"data":"[]","expiration_time":1469647995,"pokemonId":16,"latitude":42.732451615312,"longitude":-84.556819959358,"uid":"8822c1d7faf:17","is_alive":true},{"id":202572218,"data":"[]","expiration_time":1469647941,"pokemonId":19,"latitude":42.730466924649,"longitude":-84.555100629159,"uid":"8822c1d9ced:29","is_alive":true},{"id":202311332,"data":"[]","expiration_time":1469647942,"pokemonId":19,"latitude":42.730466924649,"longitude":-84.555100629159,"uid":"8822c1d9ced:29","is_alive":true},{"id":204746232,"data":"[]","expiration_time":1469648440,"pokemonId":19,"latitude":42.728978261554,"longitude":-84.55100678099,"uid":"8822c1d9877:29","is_alive":true},{"id":204746233,"data":"[]","expiration_time":1469648023,"pokemonId":29,"latitude":42.729610606941,"longitude":-84.551498058002,"uid":"8822c1d9877:29","is_alive":true},{"id":204746231,"data":"[]","expiration_time":1469647826,"pokemonId":46,"latitude":42.729606714267,"longitude":-84.551416178788,"uid":"8822c1d9877:29","is_alive":true},{"id":203047415,"data":"[]","expiration_time":1469647865,"pokemonId":16,"latitude":42.732849994678,"longitude":-84.555591871552,"uid":"8822c1d7faf:17","is_alive":true},{"id":201878035,"data":"[]","expiration_time":1469647866,"pokemonId":16,"latitude":42.732849994678,"longitude":-84.555591871552,"uid":"8822c1d7939:21","is_alive":true},{"id":204805813,"data":"[]","expiration_time":1469648527,"pokemonId":13,"latitude":42.732906665171,"longitude":-84.555182503179,"uid":"8822c1d78d3:19","is_alive":true},{"id":204911778,"data":"[]","expiration_time":1469648624,"pokemonId":10,"latitude":42.730791364197,"longitude":-84.552316843791,"uid":"8822c1d9955:10","is_alive":true},{"id":203457527,"data":"[]","expiration_time":1469648249,"pokemonId":21,"latitude":42.732938287839,"longitude":-84.552644354876,"uid":"8822c1d8633:16","is_alive":true},{"id":204805773,"data":"[]","expiration_time":1469648442,"pokemonId":96,"latitude":42.732145963121,"longitude":-84.55198933086,"uid":"8822c1d8395:21","is_alive":true},{"id":204473379,"data":"[]","expiration_time":1469648063,"pokemonId":96,"latitude":42.732030917624,"longitude":-84.551170540456,"uid":"8822c1d8939:120","is_alive":true},{"id":203457529,"data":"[]","expiration_time":1469648064,"pokemonId":96,"latitude":42.732030917624,"longitude":-84.551170540456,"uid":"8822c1d8633:16","is_alive":true},{"id":204764913,"data":"[]","expiration_time":1469648553,"pokemonId":41,"latitude":42.733386973471,"longitude":-84.563696771134,"uid":"8822c1d56dd:16","is_alive":true},{"id":201743747,"data":"[]","expiration_time":1469647859,"pokemonId":16,"latitude":42.734006013457,"longitude":-84.562305101159,"uid":"8822ea7f96d:13","is_alive":true},{"id":204764912,"data":"[]","expiration_time":1469647863,"pokemonId":16,"latitude":42.734006013457,"longitude":-84.562305101159,"uid":"8822c1d56dd:16","is_alive":true},{"id":204764914,"data":"[]","expiration_time":1469648338,"pokemonId":19,"latitude":42.73348715118,"longitude":-84.560995263646,"uid":"8822c1d56dd:16","is_alive":true},{"id":203649722,"data":"[]","expiration_time":1469648275,"pokemonId":41,"latitude":42.733351704741,"longitude":-84.554936880771,"uid":"8822c1d7eaf:19","is_alive":true},{"id":203840928,"data":"[]","expiration_time":1469648276,"pokemonId":41,"latitude":42.733351704741,"longitude":-84.554936880771,"uid":"8822c1d8395:21","is_alive":true},{"id":202635016,"data":"[]","expiration_time":1469648108,"pokemonId":19,"latitude":42.733316692318,"longitude":-84.554200007314,"uid":"8822c1d8733:69","is_alive":true},{"id":202828248,"data":"[]","expiration_time":1469648109,"pokemonId":19,"latitude":42.733316692318,"longitude":-84.554200007314,"uid":"8822c1d8733:69","is_alive":true},{"id":203047420,"data":"[]","expiration_time":1469647783,"pokemonId":17,"latitude":42.734077865277,"longitude":-84.554200007314,"uid":"8822c1d7faf:17","is_alive":true},{"id":202485510,"data":"[]","expiration_time":1469647784,"pokemonId":17,"latitude":42.734077865277,"longitude":-84.554200007314,"uid":"8822c1d8733:69","is_alive":true},{"id":202451530,"data":"[]","expiration_time":1469647788,"pokemonId":17,"latitude":42.734077865277,"longitude":-84.554200007314,"uid":"8822c1d8733:69","is_alive":true},{"id":204599846,"data":"[]","expiration_time":1469648554,"pokemonId":19,"latitude":42.7348545888,"longitude":-84.554527507782,"uid":"8822ea77a4f:16","is_alive":true},{"id":202857098,"data":"[]","expiration_time":1469648047,"pokemonId":16,"latitude":42.733785529581,"longitude":-84.551252420015,"uid":"8822c1d8939:120","is_alive":true},{"id":202505799,"data":"[]","expiration_time":1469648048,"pokemonId":16,"latitude":42.733785529581,"longitude":-84.551252420015,"uid":"8822c1d8633:16","is_alive":true},{"id":202526469,"data":"[]","expiration_time":1469648052,"pokemonId":16,"latitude":42.733785529581,"longitude":-84.551252420015,"uid":"8822c1d8633:16","is_alive":true},{"id":203595598,"data":"[]","expiration_time":1469647877,"pokemonId":21,"latitude":42.736859089679,"longitude":-84.55346312451,"uid":"8822ea77055:16","is_alive":true},{"id":201980018,"data":"[]","expiration_time":1469647878,"pokemonId":21,"latitude":42.736859089679,"longitude":-84.55346312451,"uid":"8822ea77055:16","is_alive":true},{"id":204944315,"data":"[]","expiration_time":1469648346,"pokemonId":21,"latitude":42.737405719548,"longitude":-84.552153087556,"uid":"8822ea770db:21","is_alive":true},{"id":204944317,"data":"[]","expiration_time":1469648617,"pokemonId":16,"latitude":42.738159046018,"longitude":-84.55198933086,"uid":"8822ea770db:21","is_alive":true},{"id":202720642,"data":"[]","expiration_time":1469647967,"pokemonId":16,"latitude":42.738541321442,"longitude":-84.553626877052,"uid":"8822ea7a2a7:19","is_alive":true},{"id":202835774,"data":"[]","expiration_time":1469647968,"pokemonId":16,"latitude":42.738541321442,"longitude":-84.553626877052,"uid":"8822ea79e87:133","is_alive":true},{"id":203267188,"data":"[]","expiration_time":1469648213,"pokemonId":16,"latitude":42.727627863826,"longitude":-84.548222799464,"uid":"8822c1dea7f:96","is_alive":true},{"id":203267187,"data":"[]","expiration_time":1469647981,"pokemonId":16,"latitude":42.72762007331,"longitude":-84.548059031691,"uid":"8822c1dea7f:96","is_alive":true},{"id":203267186,"data":"[]","expiration_time":1469647853,"pokemonId":13,"latitude":42.727444448479,"longitude":-84.547567725605,"uid":"8822c1dea7f:96","is_alive":true},{"id":204473380,"data":"[]","expiration_time":1469648270,"pokemonId":96,"latitude":42.732435249716,"longitude":-84.548468450258,"uid":"8822c1d8939:120","is_alive":true},{"id":202857097,"data":"[]","expiration_time":1469648131,"pokemonId":120,"latitude":42.733350436971,"longitude":-84.55010609568,"uid":"8822c1d8939:120","is_alive":true},{"id":203389856,"data":"[]","expiration_time":1469648134,"pokemonId":120,"latitude":42.733350436971,"longitude":-84.55010609568,"uid":"8822ea76751:129","is_alive":true},{"id":204369744,"data":"[]","expiration_time":1469648135,"pokemonId":120,"latitude":42.733350436971,"longitude":-84.55010609568,"uid":"8822c1d8939:120","is_alive":true},{"id":203891804,"data":"[]","expiration_time":1469648285,"pokemonId":54,"latitude":42.735483802891,"longitude":-84.548550333625,"uid":"8822ea766e9:140","is_alive":true},{"id":203891803,"data":"[]","expiration_time":1469647998,"pokemonId":129,"latitude":42.735636031085,"longitude":-84.548550333625,"uid":"8822ea766e9:140","is_alive":true},{"id":203389857,"data":"[]","expiration_time":1469648001,"pokemonId":129,"latitude":42.735636031085,"longitude":-84.548550333625,"uid":"8822ea76751:129","is_alive":true},{"id":204990024,"data":"[]","expiration_time":1469648505,"pokemonId":129,"latitude":42.73697668843,"longitude":-84.549532925032,"uid":"8822ea769d9:54","is_alive":true},{"id":203006936,"data":"[]","expiration_time":1469647984,"pokemonId":140,"latitude":42.735899425159,"longitude":-84.549287278738,"uid":"8822ea766e9:140","is_alive":true},{"id":203655233,"data":"[]","expiration_time":1469648117,"pokemonId":60,"latitude":42.73658833794,"longitude":-84.549369160951,"uid":"8822ea769d9:54","is_alive":true},{"id":202792768,"data":"[]","expiration_time":1469648118,"pokemonId":60,"latitude":42.73658833794,"longitude":-84.549369160951,"uid":"8822ea77055:16","is_alive":true},{"id":203655234,"data":"[]","expiration_time":1469647991,"pokemonId":54,"latitude":42.737534950572,"longitude":-84.548468450258,"uid":"8822ea769d9:54","is_alive":true},{"id":204162505,"data":"[]","expiration_time":1469648388,"pokemonId":120,"latitude":42.737687172705,"longitude":-84.548468450258,"uid":"8822ea73f8b:13","is_alive":true}]};
	// return(convertToSightings(tmp))
	var request = Npm.require('request');
	var future = new Future();

	request(formatRequestURI(sr), function(error, response, html){
		if(!error) {
			console.log("typeof(html)", typeof(html), html);
			future.return(convertToSightings(JSON.parse(html)));
		}
		else future.error('failure in getting response from pokeVision');
	});  
	return future.wait();
};

Meteor.methods({
	run : function run(reqID) {
		var sr = PGT.SearchRequest.findOne(reqID);
		console.log("run", reqID, sr);
		if (sr === undefined) throw "request " + reqID + " was not found";
		var sightingIDs = [];
		// check data

		var sightings = requestData(sr)
		if (sightings === undefined) throw "failed";
		sightings.forEach(function(s) {
			Meteor.call('savePreventingDuplicates', s, function(err, res) {
				if (err) console.log(err);
				else sightingIDs.push(res);
			})
		});
		sightingIDs = sightingIDs.filter(function(s){return s != undefined});

		PGT.SearchRequest.update({_id : sr._id}, {
			$set: {
				'sightingIDs': sightingIDs,
			}
		})
		return sightingIDs;
	}
});



