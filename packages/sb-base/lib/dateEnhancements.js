UniqueAppAbbrevUpperCase.namespacer('UniqueAppAbbrevUpperCase.Date', {
	beginningToday : function beginningToday() {
	var d = new Date();
	return d.clearTime()
	},
	endToday : function endToday() {
	var d = new Date();
	return d.maxTime()
	},
	mostRecentGameDate : function mostRecentGameDate() {
		var mostRecentGame = UniqueAppAbbrevUpperCase.Game.getGames([], {date: -1})[0];
		if (mostRecentGame == undefined) return null;
		return mostRecentGame.date.clearTime();
	},
	beginningYesterday : function beginningYesterday() {
	var d = new Date();
	d.addDays(-1)
	return d.clearTime()
	}
});

Date.prototype.addDays = function(numDays) {
	this.setDate(this.getDate() + numDays);
};
Date.prototype.clearTime = function clearTime() {
	var tmpDate = new Date(this);
	tmpDate.setHours(0,0,0,0);
	return tmpDate;
};
Date.prototype.maxTime = function maxTime() {
	var tmpDate = new Date(this);
	tmpDate.setHours(23,59,59,999);
	return tmpDate;
};
Date.prototype.yyyymmdd = function() {
	 var yyyy = this.getFullYear().toString();
	 var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
	 var dd  = this.getDate().toString();
	 return yyyy + (mm[1]?mm:"0"+mm[0]) + (dd[1]?dd:"0"+dd[0]); // padding
};
Date.prototype.mostRecentMonday = function() {
	var d = new Date(this);
	var day = d.getDay(),
	  diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
	return new Date(d.setDate(diff));
};
Date.prototype.messageFormat = function() {
	 var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
	 var dd  = this.getDate().toString();
	 var M = this.getMinutes().toString();
	 var ss = this.getSeconds().toString();

	 return (mm[1]?mm:"0"+mm[0]) + "/" + (dd[1]?dd:"0"+dd[0]) + "  " + M + ":" + ss;
};