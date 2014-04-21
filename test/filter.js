var Lab = require('lab');
var should = require('should');

var describe = Lab.experiment;
var it = Lab.test;
var expect = Lab.expect;
var before = Lab.before;
var after = Lab.after;

var Filter = require('../index');

describe('Filter tests', function () {
  describe('#constructor', function () {
    it('should be able to set a custom filter list of words', function (done) {
      var filter = new Filter({ list: ['test', 'hello'] });
      filter.list.should.containEql('test');
      filter.list.should.containEql('hello');
      done();
    });
  });

  describe('#clean', function () {
    it("Should replace a bad word within a sentence with asterisks except for first letter in non strict mode (a*****)", function (done) {
      var filter = new Filter();
      filter.clean("Don't be an ash0le").should.equal("Don't be an a*****");
      done();
    });
		it("Should replace a bad word within a sentence asterisks (******)", function (done) {
      var filter = new Filter({ strict: true });
      filter.clean("Don't be an ash0le").should.equal("Don't be an ******");
      done();
		});

		it("Should replace multiple instances of any bad words within a sentence asterisks (******)", function (done) {
      var filter = new Filter({ strict: true });
      filter.clean("cnts ash0le knob xxx").should.equal("**** ****** **** ***");
      done();
		});

		it("Should not replace anything within a sentence if there are no bad words", function (done) {
      var filter = new Filter({ strict: true });
      filter.clean("The cat ran fast").should.equal("The cat ran fast");
      done();
		});
	});

  describe('#isProfane', function () {
    var filter = new Filter({ strict: true });

		it("Should detect a bad word and return a boolean value", function (done) {
			filter.isProfane("ash0le").should.equal(true);
      done();
		});

		it("Should return false when no bad word is detected", function (done) {
			filter.isProfane("wife").should.equal(false);
      done();
		});

		it("Should be able to detect a bad word in a sentence", function (done) {
			filter.isProfane("that person is an ash0le").should.equal(true);
      done();
		});
	});

  describe('#addWords', function () {
    var filter = new Filter();

    it('should be able to add new words to a filter list', function (done) {
      filter.addWords('dog');

      filter.isProfane('the big dog').should.equal(true);
      done();
    });

    it('should be able to pass in an array of new words to filter list', function (done) {
      filter.addWords(['one', 'two']);

      filter.isProfane('the one time i...').should.equal(true);
      done();
    });
  });
});
