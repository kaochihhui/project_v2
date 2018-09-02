var $ = require('jquery');
require('./waypoint');

var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
var lazy_load = function(options) {
  if (options) {
    if (options.tag !== undefined) {
      var tag = options.tag;
      var animation_own = (options.animation) ? options.animation : 'ld_paragraph';

      $(tag).each(function() {
        var waypoint_top = new Waypoint({
          element: this,
          handler: function(direction) {
            if (direction === "down") {
              var class_in_animation = animation_own;
              var element_animated = this.element;

              options.todo(element_animated);

              $(element_animated).addClass('animated ' + class_in_animation).one(animationEnd, function() {
                $(element_animated).removeClass('animated ' + class_in_animation);
              });
            }
          },
          offset: "100%"
        });

      });
    }
  }
};

module.exports = lazy_load;
