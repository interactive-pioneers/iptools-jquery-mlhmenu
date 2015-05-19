/* global jQuery */
(function ($, window, document) {

  'use strict';

  var pluginName = 'Mlhmenu';
  var defaults = {
    title: 'Menu',
    subtitle: 'Overview',
    breakPalm: 640
  };

  var cnt = '.header';
  var navList = '.header__nav__list';
  var navItem = '.header__nav__list__item';
  var navClose = '.header__nav__close';

  function Mlhmenu(element, options) {

    var self = this;

    this.element = $(element);
    this.settings = $.extend({}, defaults, options);
    this._defaults = defaults;
    this._name = pluginName;

    this.element.find(navItem).on('click', function (event) {
      self.toggle(event);
    });

    this.element.find(navClose).on('click', function (event) {
      self.close(event);
    });

    $(window).on('resize', function () {
      self.set();
    });

    this.set();

  }

  Mlhmenu.prototype = {

    clone: function () {

      var classesToRemove = [
        'header__nav__list',
        'header__nav__list__item',
        'header__nav__list__item__link',
        'header__nav__close',
        'is-1-of-5'
      ];

      var self = this;

      function init() {

        var titleText = self.settings.title;
        var subtitleText = self.settings.subtitle;

        $($('.mm-panel.mm-hasnavbar', this).get().reverse()).each(function () {
          var panel = $(this);
          var panelTitle = panel.find('> .mm-navbar .mm-title');
          var panelSubtitle = $('<li>').addClass('title').text(subtitleText + ' ' + panelTitle.text());
          var parentPanel = $(panel.find('> .mm-navbar .mm-prev').attr('href'));
          var parentPanelTitle = parentPanel.find('> .mm-navbar .mm-title');
          var panelList = panel.find('> .mm-listview');
          var panelIcon = parentPanel.find('.mm-next[href="#'+panel.attr('id')+'"]').parent().find('.header__nav__list__item__icon');

          if(panelIcon.length) {
            panelSubtitle.prepend(panelIcon.clone());
          }
          panelList.prepend(panelSubtitle);

          panelTitle.text(titleText);
          if (parentPanelTitle.length) {
            panelTitle.text(parentPanelTitle.text());
          }
        });
      }

      var $menu = this.element.clone();
      $menu.attr({id: 'menu', class: ''}).find('*').removeAttr('style').removeClass(classesToRemove.join(' '));

      if ($.mmenu !== undefined) {
        $menu.mmenu({
          extensions: ['theme-sennheiser', 'effect-slide-menu', 'multiline']
        }).on('init', init).trigger('init');
      }
    },

    set: function () {
      if(!$('#menu').length && document.body.clientWidth <= this.settings.breakPalm) {
        this.clone();
      }
      if(document.body.clientWidth >= this.settings.breakPalm) {

        this.element.find(navList).each(function () {
          $(this).css({left: ''});

          var leftOffset = $(this).offset().left - $(cnt).offset().left;

          console.log($(this).offset().left);

          $(this).css({left: -leftOffset, width: $(cnt).width()});

          if($(this).hasClass('level-2')) {
            $(this).css({height: ''}).css({height: $(this).height()});
          }

          if($(this).hasClass('level-3')) {
            $(this).css({paddingLeft: leftOffset - 7});
          }
        });
      }
    },

    close: function (event) {
      event.preventDefault();
      this.element.find(navList).removeClass('expanded').find(navItem).removeClass('active');
    },

    toggle: function (event) {
      event.stopPropagation();

      var $target = $(event.target).parent(navItem);

      $(navItem, $target.parent(navList)).not($target).removeClass('active');
      $target.toggleClass('active');

      this.element.find(navList).removeClass('expanded');
      $('.active > ' + navList).parents(navList).addClass('expanded');
    }

  };

  $.fn[ pluginName ] = function (options) {
    return this.each(function () {
      if (!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName, new Mlhmenu(this, options));
      }
    });
  };

})(jQuery, window, document);
