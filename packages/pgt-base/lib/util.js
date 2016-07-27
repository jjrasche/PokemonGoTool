PGT.namespacer('PGT.Util', {filterMap : 
	function filterMap(map, predicate) {
		var result = {};
		for (key in map) {
			// console.log(key + "   " + predicate(map[key]))
			if (map.hasOwnProperty(key) && predicate(map[key]) === true) {
				result[key] = map[key];
			}
		}
		return result;
	}
});

PGT.namespacer('PGT.Util', {mapToArray :
	function mapToArray(map) {
		var result = [];
		for (key in map) {
			if (map.hasOwnProperty(key)) {
				result.push(map[key]);
			}
		}
		return result;
	}
});

PGT.namespacer('PGT.Util', {mapToOrderedList : 
	function mapToOrderedList(map, predicate) {
		return mapToArray(map).sort(predicate);
	}
});

PGT.namespacer('PGT.Util', {calcCpPercentOfMax : 
	function calcCpPercentOfMax(val, max, min) {
		return Math.round(((val-min)/(max-min))*100) + "%";
	}
});


