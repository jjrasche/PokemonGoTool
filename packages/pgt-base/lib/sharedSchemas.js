PGT.namespacer('PGT.Schema', {latLong :
	new SimpleSchema({
		lat : {
			type : Number,
			decimal : true,
			min: -90,
			max: 90
		},
		long : {
			type : Number,
			decimal : true,
			min: -180,
			max: 180
		},	
	})
});