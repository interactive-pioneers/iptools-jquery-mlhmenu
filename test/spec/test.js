'use strict';
/* jshint undef: false */
(function() {
  describe('IPTMlhMenu', function() {

    var config = {
      title: 'Menu',
      subtitle: 'Overview',
      breakPalm: 120
    };
    var menu = null;
    var pluginRef = 'plugin_iptMlhMenu';

    describe('init', function() {

      beforeEach(function() {
        menu = $('.header__nav').iptMlhMenu(config);
      });

      // TODO: implement destroy after each test, see issue #11.

      it('expected to construct object', function() {
        return expect(menu).to.be.an.object;
      });

      it('expected to have class header__nav', function() {
        return expect($(menu).attr('class')).to.equal('header__nav');
      });

      it('expected breakPalm setting to be of numeric type', function() {
        return expect(menu.data(pluginRef).settings.breakPalm)
          .to.be.a('number');
      });

      it('expected title setting to be of string type', function() {
        return expect(menu.data(pluginRef).settings.title)
          .to.be.a('string');
      });

      it('expected to set breakPalm to ' + config.breakPalm, function() {
        return expect(menu.data(pluginRef).settings.breakPalm)
          .to.equal(config.breakPalm);
      });

      it('expected to set style attribute on every list element', function() {
        var palmBreakPoint = menu.data(pluginRef).settings.breakPalm;
        if (document.body.clientWidth >= palmBreakPoint) {
          return expect($(menu).find('.header__nav__list').attr('style'))
            .to.include('left');
        }
      });

      it('expected to toggle between states', function() {
        return expect(menu.toggle()).to.be.ok;
      });

    });

  });
})();
