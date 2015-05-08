'use strict';
/* jshint undef: false */
(function() {
  describe('MlhMenu', function() {

    var menu = null;

    describe('init', function() {
      beforeEach(function() {
        menu = $('#mocha').mlhmenu();
      });
      it('expected to construct object', function() {
        return expect(menu).to.exist;
      });
      it('expected to return element initialised on', function() {
        return expect($(menu).attr('id')).to.equal('mocha');
      });
    });
  });
})();
