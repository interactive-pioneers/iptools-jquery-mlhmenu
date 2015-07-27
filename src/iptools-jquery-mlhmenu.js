(function($, window, document) {

  'use strict';

  var pluginName = 'iptMlhMenu';

  var defaults = {
    id: 'menu',
    title: 'Menu',
    subtitle: 'Overview',
    breakPalm: 640
  };

  var selector = {
    cnt: '.header__wrapper',
    list: '.header__nav__list',
    item: '.header__nav__list__item',
    close: '.header__nav__close'
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
      this.element.find(selector.item).on('click', this, this.toggle);
      this.element.find(selector.close).on('click', this, this.close);
      $(window).on('resize', this, this.set).trigger('resize');
    },

    clone: function() {

      var menuExtensions = [
        'theme-sennheiser',
        'effect-slide-menu',
        'multiline'
      ];

      var classesToRemove = [
        'header__nav__list',
        'header__nav__list__item',
        'header__nav__list__item__link',
        'header__nav__close',
        'is-1-of-5'
      ];

      var $menu = this.element.clone();
      $menu.attr({id: this.settings.id, class: ''})
        .find('*').removeAttr('style').removeClass(classesToRemove.join(' '));

      if ($.mmenu !== undefined) {
        $menu.mmenu({extensions: menuExtensions, searchfield: true})
          .on('init', this, this.init)
          .trigger('init');
      }
    },

    init: function(event) {

      var self = event.data;

      var selector = {
        list: '> .mm-listview',
        title: '> .mm-navbar .mm-title',
        prevButton: '> .mm-navbar .mm-prev',
        nextButton: '.mm-next',
        icon: '.header__nav__list__item__icon'
      };

      var titleText = self.settings.title;
      var subtitleText = self.settings.subtitle;

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
        $('.' + cssClassActive + ' > ' + selector.list)
          .parents(selector.list)
          .addClass(cssClassExpanded);
      }

      show();
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
