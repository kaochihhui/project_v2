var fbAppId = 748050775275737;
var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
// Additional JS functions here
window.fbAsyncInit = function() {
  FB.init({
    appId: fbAppId, // App ID
    status: true, // check login status
    cookie: true, // enable cookies to allow the
    // server to access the session
    xfbml: true, // parse page for xfbml or html5
    // social plugins like login button below
    version: 'v2.0', // Specify an API version
  });
  // Put additional init code here
};

// Load the SDK Asynchronously
(function(d, s, id) {
  var js,
    fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {
    return;
  }
  js = d.createElement(s);
  js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

var width_screen = $(window).width();
var height_screen = $(window).height();
/*start set values to footer*/
var height_footer = $("footer.st-content-footer").outerHeight();
// $("body").css("margin", "0 0 " + height_footer + "px");
// $("body").css("padding", "0 0 " + height_footer + "px");
$(".scrollContent").css("padding-bottom", height_footer + "px");
/*end set values to footer*/

if ($(".st-button-menu-mobile").length > 0) {
  $(".st-button-menu-mobile").on("click", function() {
    $(".modal-menu-mobile").toggleClass('st_dialogIsOpen');
    $(".st-content-menu-fixed").toggleClass('st_dialogIsOpen');
    eventCloseMenu($(".modal-menu-mobile").hasClass('st_dialogIsOpen'));
  });
}

if ($(".modal-menu-mobile").length > 0) {
  var elem = document.querySelector('.modal-menu-mobile');
  elem.addEventListener('touchstart', function(event) {
    startY = event.touches[0].pageY;
    startTopScroll = elem.scrollTop;
    if (startTopScroll <= 0)
      elem.scrollTop = 1;
    if (startTopScroll + elem.offsetHeight >= elem.scrollHeight)
      elem.scrollTop = elem.scrollHeight - elem.offsetHeight - 1;
    }
  , false);
}

if ($(".st-social-desktop").length > 0) {
  $(".st-social-desktop img:nth(0),.st-social-mobile img:nth(0)").on("click", function(e) {
    // code share facebook
    e.preventDefault();
    var image = 'http://graphics.straitstimes.com/STI/STIMEDIA/facebook_images/uselection/battlegrounds.png';
    var name = "Electing the US president: The numbers game & the states to watch";
    var description = "Ahead of the Nov 8 presidential election, here is a look at how the US president is elected, the key states to watch and why. http://str.sg/270towin";

    share_face_book(image, name, description);
    return false;
  });
  $(".st-social-desktop img:nth(1),.st-social-mobile img:nth(1)").on("click", function(e) {
    // code share twitter
    e.preventDefault();
    var text = "How will the next US president be decided? We break down the numbers for %23Election2016";
    var via = 'STcom';
    var url = 'http://str.sg/270towin';

    share_twitter(text, via, url);
    return false;
  });
}

// Listen for orientation changes
var settime_wpo;
window.addEventListener("orientationchange", function() {
  if (settime_wpo)
    clearTimeout(settime_wpo);
  settime_wpo = setTimeout(function() {
    clearTimeout(settime_wpo);
    update_parameters();
  }, 100);
}, false);

var settime,
  settime_wp;
$(window).on("resize", function() {
  if (settime_wp)
    clearTimeout(settime_wp);
  settime_wp = setTimeout(function() {
    clearTimeout(settime_wp);
    if (!is_mobile()) {
      update_parameters();
    }
  }, 100);
});

function share_face_book(image, name, description) {
  FB.ui({
    method: 'feed',
    link: window.location.href,
    caption: 'www.straitstimes.com',
    picture: image,
    name: name,
    description: description
  });
}

function share_twitter(text, via, url) {
  window.open('http://twitter.com/share?text=' + text + '&via=' + via + '&url=' + url, 'twitter', "_blank");
}

function eventCloseMenu(event) {
  if (event) {
    $(".st_menu_mobile").css('right', '10px');

    d3.select(".first_line").transition().duration(500).attr("x1", 12.8).attr("y1", 12.2).attr("x2", 23.5).attr("y2", 22.8);
    d3.select(".menu_mobile_line_center").transition().duration(500).attr('opacity', 0).attr("x2", 0);
    d3.select(".second_line").transition().duration(500).attr("x1", 12.9).attr("y1", 22.9).attr("x2", 23.4).attr("y2", 12.1);
    $('.st_content_menu_fixed').hide().slideDown('500').addClass('fixed_menu_mobile');
    $('body').css({'overflow': 'hidden', 'position': 'relative'});
  } else {
    $(".st-menu-mobile").css('right', '0');
    d3.select(".first_line").transition().duration(500).attr("x1", 10.5).attr("y1", 13.2).attr("x2", 26.1).attr("y2", 13.2);
    d3.select(".menu_mobile_line_center").transition().duration(500).attr('opacity', 1).attr("x2", 26.1);
    d3.select(".second_line").transition().duration(500).attr("x1", 10.5).attr("y1", 21.9).attr("x2", 26.1).attr("y2", 21.9);
    $('.st_content_menu_fixed').slideUp('500', function() {
      $(this).show().removeClass('fixed_menu_mobile');
    });
    $('body').removeAttr('style');
    // $("body").css("margin", "0 0 " + height_footer + "px");
    // $("body").css("padding", "0 0 " + height_footer + "px");
  }
}

function update_parameters() {
  width_screen = $(window).width();
  height_screen = $(window).height();
  var height_footer = $("footer.st-content-footer").outerHeight();
  // $("body").css("margin", "0 0 " + height_footer + "px");
  // $("body").css("padding", "0 0 " + height_footer + "px");
  $(".scrollContent").css("padding-bottom", height_footer + "px");
}

function is_mobile() {
  return (/Android|iPhone|iPad|iPod|BlackBerry/i).test(navigator.userAgent || navigator.vendor || window.opera);
}

$.fn.extend({
  animateCss: function(animationName, type) {
    var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
    var copy_this = this;
    if (type !== undefined) {
      if (type === 'in') {
        d3.timeout(function() {
          copy_this.removeClass('none');
        }, 100);
      }
    }
    this.addClass('animated ' + animationName).one(animationEnd, function() {
      copy_this.off();
      if (type !== undefined) {
        if (type === 'out')
          copy_this.addClass("none");
        }
      copy_this.removeClass('animated ' + animationName);
    });
  }
});
$.ajaxSetup({
  beforeSend: function() {
    $('.loading-page').fadeIn();
  },
  complete: function() {
    $('.loading-page').fadeOut();
  },
  success: function() {
    $('.loading-page').fadeOut();
  }
});
