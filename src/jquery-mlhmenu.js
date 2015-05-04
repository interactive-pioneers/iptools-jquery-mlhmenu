(function ($, window, document) {

  'use strict';

  var pluginName = 'mlhmenu';

  function MlhMenu(element, options) {
    return element;
  }

  $.fn[pluginName] = function (options) {
    return this.each(function () {
      if (!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName, new MlhMenu(this, options));
      }
    });
  };
})(jQuery, window, document);