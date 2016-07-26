describe('namespace', function() {
	it('Add simple variable to namespace', function(done) {
		UniqueAppAbbrevUpperCase.namespacer('UniqueAppAbbrevUpperCase', {test : 5})
		expect(UniqueAppAbbrevUpperCase.test).toEqual(5);
		done();
	});

	it('Add complex object to namespace', function(done) {
		var members = {obj : {test : 5}, arr : [{test : 1}, {test : 2}, 3]}
		UniqueAppAbbrevUpperCase.namespacer('UniqueAppAbbrevUpperCase', {test2 : members});
		expect(UniqueAppAbbrevUpperCase.test2).toEqual(members);
		done();
	});	

	it('Add variable to existing path', function(done) {
		UniqueAppAbbrevUpperCase.namespacer('UniqueAppAbbrevUpperCase', {test3 : {innerTest1 : 1}});
		expect(UniqueAppAbbrevUpperCase.test3.innerTest1).toEqual(1);

		UniqueAppAbbrevUpperCase.namespacer('UniqueAppAbbrevUpperCase.test3', {innerTest2 : 2});
		expect(UniqueAppAbbrevUpperCase.test3.innerTest2).toEqual(2);
		expect(UniqueAppAbbrevUpperCase.test3.innerTest1).toEqual(1);

		UniqueAppAbbrevUpperCase.namespacer('UniqueAppAbbrevUpperCase.test.const', {TEST : 100});
		UniqueAppAbbrevUpperCase.namespacer('UniqueAppAbbrevUpperCase.test.const', {TEST2 : 100});
		UniqueAppAbbrevUpperCase.namespacer('UniqueAppAbbrevUpperCase.test.const', {TEST2 : 100});

		done();
	});

	// directly existing namespace 
	it('Prevent overriding namespace', function(done) {
		UniqueAppAbbrevUpperCase.namespacer('UniqueAppAbbrevUpperCase', {test4 : 5});
		expect(UniqueAppAbbrevUpperCase.test4).toEqual(5);

		var func = function() {
			UniqueAppAbbrevUpperCase.namespacer('UniqueAppAbbrevUpperCase', {test4 : 7});
		}
		expect(func).toThrow();
		expect(UniqueAppAbbrevUpperCase.test4).toEqual(5);
		
		done();
	});

	// override existing member 
	it('Prevent overriding namespace2', function(done) {
		UniqueAppAbbrevUpperCase.namespacer('UniqueAppAbbrevUpperCase', {test5 : 5});
		expect(UniqueAppAbbrevUpperCase.test5).toEqual(5);

		var func = function() {
			UniqueAppAbbrevUpperCase.namespacer('UniqueAppAbbrevUpperCase.test5', {obj : 6});
		}
		expect(func).toThrow();
		expect(UniqueAppAbbrevUpperCase.test5).toEqual(5);
		
		done();
	});

	it('Prevent adding outside App namespace', function(done) {
		var func = function() {
			UniqueAppAbbrevUpperCase.namespacer('noRoot');
		};
		expect(func).toThrow();
		done();
	});
});