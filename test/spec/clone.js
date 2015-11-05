'use strict';
/* jshint undef: false */
(function() {
  describe('IPTMlhMenu', function() {

    var config = {
      title: 'Menu',
      subtitle: 'Overview',
      breakPalm: 120,
      id: 'my-mmenu-for-testing'
    };
    var menu = null;
    var pluginRef = 'plugin_iptMlhMenu';
    var selector = '.header__nav';

    describe('clone', function() {

      beforeEach(function() {
        menu = $(selector).iptMlhMenu(config);
      });

      afterEach(function() {
        menu.data(pluginRef).destroy();
      });

      context('with configured ID', function() {
        it('expected to clone menu', function() {
          menu.data(pluginRef).clone();
          var expectation = $('#' + config.id);
          return expect(expectation).to.have.length.of.at.least(1);
        });
      });

    });

  });
})();
