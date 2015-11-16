(function($, window, document) {

  'use strict';

  var pluginName = 'iptMlhMenu';

  var defaults = {
    id: 'menu',
    title: 'Menu',
    subtitle: 'Overview',
    breakPalm: 640,
    menuExtensions: []
  };

  var datas = {
    styleWhitelist: 'mlhmenu-style-whitelist',
    normalIcon: 'mlhmenu-normal-icon',
    activeIcon: 'mlhmenu-active-icon'
  };

  var selector = {
    cnt: '.header__wrapper',
    list: '.header__nav__list',
    item: '.header__nav__list__item',
    item1: '.level-1 > .header__nav__list__item',
    item2: '.level-2 > .header__nav__list__item',
    close: '.header__nav__close',
    actionableIcon: '.header__nav__list__item__icon[data-' + datas.activeIcon + ']'
  };

  var cssClassActive = 'active';
  var cssClassExpanded = 'expanded';

  function IPTMlhMenu(element, options) {

    this.element = $(element);
    this.settings = $.extend({}, defaults, options);
    this._defaults = defaults;
    this._name = pluginName;

    this.addEvents();
  }

  IPTMlhMenu.prototype = {

    addEvents: function() {
      this.element.find(selector.item1).on('click', this, this.toggle);
      this.element.find(selector.item2).on('mouseenter', this, this.toggleOn)
        .on('mouseleave', this, this.toggleOff);
      this.element.find(selector.close).on('click', this, this.close);
      $(window).on('resize', this, this.set).trigger('resize');
    },

    clone: function() {

      if ($.mmenu !== undefined) {

        var menuExtensions = this.settings.menuExtensions;

        var classesToRemove = [
          'header__nav__list',
          'header__nav__list__item',
          'header__nav__list__item__link',
          'header__nav__close',
          'is-1-of-2',
          'is-1-of-3',
          'is-1-of-4',
          'is-1-of-5',
          'is-1-of-6'
        ];

        var $menu = this.element.clone();
        $menu.attr({id: this.settings.id, class: ''})
          .find('*')
          .removeClass(classesToRemove.join(' '))
          .not('*[data-' + datas.styleWhitelist + ']')
          .removeAttr('style');

        $menu.mmenu({extensions: menuExtensions})
          .on('init', this, this.init)
          .trigger('init');
      }
    },

    init: function(event) {

      var self = event.data;

      // TODO: move to class wrapper, see issue #17.
      var selector = {
        list: '> .mm-listview',
        title: '> .mm-navbar .mm-title',
        prevButton: '> .mm-navbar .mm-prev',
        nextButton: '.mm-next',
        icon: '.header__nav__list__item__icon'
      };

      var titleText = self.settings.title;
      var subtitleText = self.settings.subtitle;

      // TODO: remove hard-coded classes, see issue #17.
      // TODO: move all the chained selector-bound assignments to methods.
      $($('.mm-panel.mm-hasnavbar', this).get().reverse()).each(function() {

        var panel = $(this);
        var panelTitle = panel.find(selector.title);
        var panelSubtitle = $('<li>').addClass('title')
          .text(subtitleText + ' ' + panelTitle.text());
        var parentPanel = $(panel.find(selector.prevButton).attr('href'));
        var parentPanelTitle = parentPanel.find(selector.title);
        var panelList = panel.find(selector.list);
        var panelIcon = parentPanel
          .find(selector.nextButton + '[href="#' + panel.attr('id') + '"]')
          .parent()
          .find(selector.icon);

        if (panelIcon.length) {
          panelSubtitle.prepend(panelIcon.clone());
        }
        panelList.prepend(panelSubtitle);

        panelTitle.text(titleText);
        if (parentPanelTitle.length) {
          panelTitle.text(parentPanelTitle.text());
        }

      });
    },

    set: function(event) {

      var self = event.data;

      // TODO: move calculation to getter method.
      if (!$('#' + self.settings.id).length &&
            document.body.clientWidth <= self.settings.breakPalm) {
        self.clone();
      }

      if (document.body.clientWidth > self.settings.breakPalm) {

        self.element.find(selector.list).each(function() {
          $(this).css({left: ''});

          var leftOffset = $(this).offset().left - $(selector.cnt)
            .offset()
            .left;

          $(this).css({left: -leftOffset, width: $(selector.cnt).width()});

          // TODO: remove hard-coded classes.
          if ($(this).hasClass('level-2')) {
            $(this).css({height: ''}).css({height: $(this).height()});
          }

          if ($(this).hasClass('level-3')) {
            $(this).css({paddingLeft: leftOffset - 7});
          }
        });

      }
    },

    close: function(event) {

      event.preventDefault();

      var self = event.data;

      self.element.find(selector.list).removeClass(cssClassExpanded)
        .find(selector.item).removeClass(cssClassActive);
    },

    toggle: function(event) {
      event.stopPropagation();

      var self = event.data;
      var $target = $(event.target).parent(selector.item);

      function show() {
        $(selector.item, $target.parent(selector.list))
          .not($target)
          .removeClass(cssClassActive);
        $target.toggleClass(cssClassActive);
        self.element.find(selector.list).removeClass(cssClassExpanded);
        // TODO: move to selectors.
        $('.' + cssClassActive + ' > ' + selector.list)
          .parents(selector.list)
          .addClass(cssClassExpanded);
      }

      show();
    },

    toggleOn: function(event) {

      event.stopPropagation();

      var self = event.data;
      var $target = $(event.target).parent(selector.item);

      $(selector.item, $target.parent(selector.list))
        .removeClass(cssClassActive);

      if ($target.children(selector.list).length) {
        $target.addClass(cssClassActive);

        self.element.find(selector.list).removeClass(cssClassExpanded);
        $('.' + cssClassActive + ' > ' + selector.list).parents(selector.list)
          .addClass(cssClassExpanded);
      }

      if ($(this).find(selector.actionableIcon)) {
        var $icon = $(this).find(selector.actionableIcon);
        $icon.css('background-image', 'url(' + $icon.data(datas.activeIcon) + ')');
      }
    },

    toggleOff: function(event) {

      event.stopPropagation();

      var self = event.data;
      var $target = $(event.target).parent(selector.item);

      $target.removeClass(cssClassActive);

      self.element.find(selector.list).removeClass(cssClassExpanded);
      $('.' + cssClassActive + ' > ' + selector.list).parents(selector.list)
        .addClass(cssClassExpanded);

      if ($(this).find(selector.actionableIcon)) {
        var $icon = $(this).find(selector.actionableIcon);
        $icon.css('background-image', 'url(' + $icon.data(datas.normalIcon) + ')');
      }
    },

    destroy: function() {
      this.element.find(selector.item1).off('click', this, this.toggle);
      this.element.find(selector.item2).off('mouseenter', this, this.toggleOn);
      this.element.find(selector.item2).off('mouseleave', this, this.toggleOff);
      this.element.find(selector.close).off('click', this, this.close);
      $(window).off('resize', this, this.set);
      this.element.removeData('plugin_' + pluginName);
    }
  };

  $.fn[pluginName] = function(options) {
    return this.each(function() {
      if (!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName, new IPTMlhMenu(this, options));
      }
    });
  };

})(jQuery, window, document);
