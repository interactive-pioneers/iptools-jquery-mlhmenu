'use strict';
/* jshint undef: false */
(function() {
  describe('MlhMenu', function() {

    var menu = null;

    describe('init', function() {

      beforeEach(function() {
        menu = $('.header__nav').Mlhmenu();
      });

      it('expected to construct object', function() {
        return expect(menu).to.exist;
      });

      it('expected to return element initialised on', function() {
        return expect($(menu).attr('class')).to.equal('header__nav');
      });

    });

  });
})();
