(function () {
  "use strict";
  var categorical = require('../categorical')
    , assert = require('assert')
    , people = [
        { votes: 1, name: 'Some Person', someNumber: 1 }
      , { votes: 2, name: 'Other Person', someNumber: 2 }
    ]
    ;

  function scorePerson(person) {
    return person.votes + person.someNumber;
  }

  describe('categorical', function () {
    describe('#createDistribution', function () {

      it('returns a distribution when given an array of items and a valid callback.', function () {
        var distribution = categorical.createDistribution(people, scorePerson)
          ;
        assert.equal(distribution.length, 2);
      });

      it('throws a reasonable error when the first argument is not an array', function () {
        assert.throws(function () {categorical.createDistribution({}, scorePerson)});
          ;
      });

      it('throws a reasonable error when the second argument is not a function', function () {
        assert.throws(function () {categorical.createDistribution(people)});
      });
    });

    describe('#draw', function () {
      var distro = categorical.createDistribution(people, scorePerson)
        ;
      it('returns a random item when given a valid distribution', function () {
        var item = categorical.draw(distro)
          ;

        assert(item.name == people[0].name || item.name == people[1].name);
      });

      it('returns a reasonable error when given an invalid distribution', function () {
        assert.throws(function () {categorical.draw([])});
      });
    });
  });
}());
