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

      context('with style whitelist', function() {

        var whitelistedSelector = '.header__nav__list__item__icon';
        var styleWhitelistConfig = $.extend({}, config, {
          styleWhitelistSelectors: whitelistedSelector
        });
        var style = 'border: 0 none;';

        beforeEach(function() {
          menu.data(pluginRef).destroy();
          menu = $(selector).iptMlhMenu(styleWhitelistConfig);
          $(whitelistedSelector).attr('style', style);
        });

        afterEach(function() {
          $(whitelistedSelector).removeAttr('style');
        });

        it('expected to have persistant style attribute', function() {
          menu.data(pluginRef).clone();
          return expect($(whitelistedSelector).attr('style')).to.equal(style);
        });

      });

      context('without style whitelist', function() {

        var nonWhitelistedSelector = '.header__nav__list__item__icon';

        it('expected to have persistant style attribute', function() {
          $(nonWhitelistedSelector).attr('style', 'border: 0 none;');
          menu.data(pluginRef).clone();
          return expect($(nonWhitelistedSelector).attr('style')).to.not.exist;
        });

      });

    });

  });
})();
