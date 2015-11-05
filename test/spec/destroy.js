'use strict';

/* jshint undef: false, expr: true */

(function() {

  describe('IPTMlhMenu', function() {

    var config = {
      title: 'Menu',
      subtitle: 'Overview',
      breakPalm: 120
    };
    var menu = null;
    var pluginRef = 'plugin_iptMlhMenu';
    var selector = '.header__nav';

    describe('destroy', function() {

      beforeEach(function() {
        menu = $(selector).iptMlhMenu(config);
      });

      afterEach(function() {
        $(selector).off();
      });

      it('expected to remove data', function() {
        menu.data(pluginRef).destroy();
        return expect(menu.data(pluginRef)).to.not.exist;
      });

      // TODO: implement event emission on mmenu init, see issue #15.
      xit('expected to stop event emission', function(done) {
        var emission = false;
        object.data(pluginRef).destroy();
        $(selector).on('mmenuInit.iptMlhMenu', function() {
          done();
          emission = true;
          expect(emission).to.not.be.ok;
        }).trigger('click');
        setTimeout(function() {
          done();
          expect(emission).to.not.be.ok;
        }, 1500);
      });

    });

  });

})();
