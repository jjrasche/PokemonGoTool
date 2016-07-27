describe('namespace', function() {
	it('Add simple variable to namespace', function(done) {
		PGT.namespacer('PGT', {test : 5})
		expect(PGT.test).toEqual(5);
		done();
	});

	it('Add complex object to namespace', function(done) {
		var members = {obj : {test : 5}, arr : [{test : 1}, {test : 2}, 3]}
		PGT.namespacer('PGT', {test2 : members});
		expect(PGT.test2).toEqual(members);
		done();
	});	

	it('Add variable to existing path', function(done) {
		PGT.namespacer('PGT', {test3 : {innerTest1 : 1}});
		expect(PGT.test3.innerTest1).toEqual(1);

		PGT.namespacer('PGT.test3', {innerTest2 : 2});
		expect(PGT.test3.innerTest2).toEqual(2);
		expect(PGT.test3.innerTest1).toEqual(1);

		PGT.namespacer('PGT.test.const', {TEST : 100});
		PGT.namespacer('PGT.test.const', {TEST2 : 100});
		PGT.namespacer('PGT.test.const', {TEST2 : 100});

		done();
	});

	// directly existing namespace 
	it('Prevent overriding namespace', function(done) {
		PGT.namespacer('PGT', {test4 : 5});
		expect(PGT.test4).toEqual(5);

		var func = function() {
			PGT.namespacer('PGT', {test4 : 7});
		}
		expect(func).toThrow();
		expect(PGT.test4).toEqual(5);
		
		done();
	});

	// override existing member 
	it('Prevent overriding namespace2', function(done) {
		PGT.namespacer('PGT', {test5 : 5});
		expect(PGT.test5).toEqual(5);

		var func = function() {
			PGT.namespacer('PGT.test5', {obj : 6});
		}
		expect(func).toThrow();
		expect(PGT.test5).toEqual(5);
		
		done();
	});

	it('Prevent adding outside App namespace', function(done) {
		var func = function() {
			PGT.namespacer('noRoot');
		};
		expect(func).toThrow();
		done();
	});
});