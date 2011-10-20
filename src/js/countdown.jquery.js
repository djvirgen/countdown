(function($){
  $.fn.countdown = function(options) {
    var settings = $.extend({
      cssClass: "countdown",
      overCssClass: "max-exceeded",
      max: false,
      format: function(current, max) {
        return max - current;
      },
      overFormat: false
    }, options || {}),
      $this = $(this),
      $countdown = $('<span></span>'),
      max = settings.max || parseInt($this.attr('maxlength'));
    
    if (!max) return this;
    
    $this.after($countdown);
    $countdown.addClass(settings.cssClass);
    
    var updateCountdown = function() {
      var current = $this.val().length,
        remaining = max - current;
        
      if (remaining < 0) {
        if (!$countdown.hasClass(settings.overCssClass)) $countdown.addClass(settings.overCssClass);
        var format = typeof(settings.overFormat) == 'function' ? settings.overFormat(current, max) : settings.format(current, max);
      } else {
        if ($countdown.hasClass(settings.overCssClass)) $countdown.removeClass(settings.overCssClass);
        var format = settings.format(current, max);
      }
      $countdown.html(format);
    };
    $this
      .keyup(updateCountdown)
      .keydown(updateCountdown)
      .keydown(); // Invoke immediately
    
    return this;
  };
})(jQuery);