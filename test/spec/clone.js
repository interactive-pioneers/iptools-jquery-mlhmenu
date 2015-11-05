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

      // FIXME: fails due to invalid cleanup.
      xcontext.only('with style whitelist', function() {

        var whitelistedSelector = '.header__nav__list__item__icon:first';
        var style = 'border: 0 none;';

        beforeEach(function() {
          menu.data(pluginRef).destroy();
          $(whitelistedSelector).attr('style', style)
            .attr('data-mlhmenu-style-whitelist', true);
          menu = $(selector).iptMlhMenu(config);
        });

        afterEach(function() {
          $(whitelistedSelector).removeAttr('style')
            .removeAttr('data-mlhmenu-style-whitelist');
        });

        it('expected to have persistant style attribute', function() {
          menu.data(pluginRef).clone();
          return expect($(whitelistedSelector).attr('style')).to.equal(style);
        });

      });

      xcontext('without style whitelist', function() {

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
