(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = navigationOffCanvas;
// import Hammer from 'hammerjs'

function navigationOffCanvas() {
  var d = document,
      w = window,
      panel = d.querySelector('.Panel'),
      panelBtn = d.querySelector('.Panel-button'),
      mq = w.matchMedia('(min-width: 64em)'),
      hamburger = d.querySelector('.hamburger');
  // hammerBody = new Hammer(d.body),
  // hammerPanel = new Hammer(panel)

  function closePanel(mq) {
    if (mq.matches) {
      panel.classList.remove('is-active');
      hamburger.classList.remove('is-active');
    }
  }

  function hammerTouches(e) {
    if (e.type == 'swipeleft') {
      panel.classList.remove('is-active');
      hamburger.classList.remove('is-active');
    } else if (e.type == 'swiperight') {
      panel.classList.add('is-active');
      hamburger.classList.add('is-active');
    }
  }

  panelBtn.addEventListener('click', function (e) {
    e.preventDefault();
    panel.classList.toggle('is-active');
    hamburger.classList.toggle('is-active');
  });

  mq.addListener(closePanel);
  closePanel(mq);

  // hammerPanel.on('swipeleft  swiperight', hammerTouches)
  // hammerBody.on('swipeleft  swiperight', hammerTouches)
}

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = slid;
// Master DOManipulator v2 ------------------------------------------------------------
function slid() {
  var items = document.querySelectorAll('.item'),
      controls = document.querySelectorAll('.control'),
      headerItems = document.querySelectorAll('.item-header'),
      descriptionItems = document.querySelectorAll('.item-description'),
      activeDelay = .76,
      interval = 5000;

  var current = 0;

  var slider = {
    init: function init() {
      controls.forEach(function (control) {
        return control.addEventListener('click', function (e) {
          slider.clickedControl(e);
        });
      });
      controls[current].classList.add('active');
      items[current].classList.add('active');
    },
    nextSlide: function nextSlide() {
      // Increment current slide and add active class
      slider.reset();
      if (current === items.length - 1) current = -1; // Check if current slide is last in array
      current++;
      controls[current].classList.add('active');
      items[current].classList.add('active');
      slider.transitionDelay(headerItems);
      slider.transitionDelay(descriptionItems);
    },
    clickedControl: function clickedControl(e) {
      // Add active class to clicked control and corresponding slide
      slider.reset();
      clearInterval(intervalF);

      var control = e.target,
          dataIndex = Number(control.dataset.index);

      control.classList.add('active');
      items.forEach(function (item, index) {
        if (index === dataIndex) {
          // Add active class to corresponding slide
          item.classList.add('active');
        }
      });
      current = dataIndex; // Update current slide
      slider.transitionDelay(headerItems);
      slider.transitionDelay(descriptionItems);
      intervalF = setInterval(slider.nextSlide, interval); // Fire that bad boi back up
    },
    reset: function reset() {
      // Remove active classes
      items.forEach(function (item) {
        return item.classList.remove('active');
      });
      controls.forEach(function (control) {
        return control.classList.remove('active');
      });
    },
    transitionDelay: function transitionDelay(items) {
      // Set incrementing css transition-delay for .item-header & .item-description, .vertical-part, b elements
      var seconds = void 0;

      items.forEach(function (item) {
        var children = item.childNodes; // .vertical-part(s)
        var count = 1,
            delay = void 0;

        item.classList.value === 'item-header' ? seconds = .015 : seconds = .007;

        children.forEach(function (child) {
          // iterate through .vertical-part(s) and style b element
          if (child.classList) {
            item.parentNode.classList.contains('active') ? delay = count * seconds + activeDelay : delay = count * seconds;
            child.firstElementChild.style.transitionDelay = delay + 's'; // b element
            count++;
          }
        });
      });
    }
  };

  var intervalF = setInterval(slider.nextSlide, interval);
  slider.init();
}

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = transparentHeader;
function transparentHeader() {
  var d = document,
      w = window,
      header = d.querySelector('.Header'),
      logo = d.querySelector('.Logo'),
      firstContent = d.querySelector('.u-firstContent'),
      firstContentHeight = w.getComputedStyle(firstContent, null).getPropertyValue('height').split('px')[0],
      headerHeight = w.getComputedStyle(header, null).getPropertyValue('height').split('px')[0];

  var scrollTopLimit = firstContentHeight - headerHeight;
  //console.log(firstContentHeight, headerHeight, scrollTopLimit)

  function headerScroll() {
    var scrollTop = w.pageYOffset || d.documentElement.scrollTop;

    if (scrollTop > scrollTopLimit) {
      //console.log('abajo', scrollTop)
      header.classList.add('is-active'), logo.classList.add('is-active');
    } else {
      //console.log('arriba', scrollTop)
      header.classList.remove('is-active'), logo.classList.remove('is-active');
    }
  }

  d.addEventListener('DOMContentLoaded', headerScroll);
  w.addEventListener('scroll', headerScroll, false);
}

},{}],4:[function(require,module,exports){
'use strict';

var _navigation_off_canvas = require('./components/navigation_off_canvas');

var _navigation_off_canvas2 = _interopRequireDefault(_navigation_off_canvas);

var _transparent_header = require('./components/transparent_header');

var _transparent_header2 = _interopRequireDefault(_transparent_header);

var _slid = require('./components/slid');

var _slid2 = _interopRequireDefault(_slid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import wow from '../../node_modules/wowjs/dist/wow.min.js'

// new wow().init()
(0, _navigation_off_canvas2.default)();
(0, _transparent_header2.default)();
(0, _slid2.default)();

},{"./components/navigation_off_canvas":1,"./components/slid":2,"./components/transparent_header":3}]},{},[4])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGpzXFxjb21wb25lbnRzXFxuYXZpZ2F0aW9uX29mZl9jYW52YXMuanMiLCJzcmNcXGpzXFxjb21wb25lbnRzXFxzbGlkLmpzIiwic3JjXFxqc1xcY29tcG9uZW50c1xcdHJhbnNwYXJlbnRfaGVhZGVyLmpzIiwic3JjXFxqc1xcaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztrQkNFd0IsbUI7QUFGeEI7O0FBRWUsU0FBUyxtQkFBVCxHQUErQjtBQUM1QyxNQUFNLElBQUksUUFBVjtBQUFBLE1BQ0UsSUFBSSxNQUROO0FBQUEsTUFFRSxRQUFRLEVBQUUsYUFBRixDQUFnQixRQUFoQixDQUZWO0FBQUEsTUFHRSxXQUFXLEVBQUUsYUFBRixDQUFnQixlQUFoQixDQUhiO0FBQUEsTUFJRSxLQUFLLEVBQUUsVUFBRixDQUFhLG1CQUFiLENBSlA7QUFBQSxNQUtFLFlBQVksRUFBRSxhQUFGLENBQWdCLFlBQWhCLENBTGQ7QUFNRTtBQUNBOztBQUVGLFdBQVMsVUFBVCxDQUFvQixFQUFwQixFQUF3QjtBQUN0QixRQUFJLEdBQUcsT0FBUCxFQUFnQjtBQUNkLFlBQU0sU0FBTixDQUFnQixNQUFoQixDQUF1QixXQUF2QjtBQUNBLGdCQUFVLFNBQVYsQ0FBb0IsTUFBcEIsQ0FBMkIsV0FBM0I7QUFDRDtBQUNGOztBQUVELFdBQVMsYUFBVCxDQUF1QixDQUF2QixFQUEwQjtBQUN4QixRQUFJLEVBQUUsSUFBRixJQUFVLFdBQWQsRUFBMkI7QUFDekIsWUFBTSxTQUFOLENBQWdCLE1BQWhCLENBQXVCLFdBQXZCO0FBQ0EsZ0JBQVUsU0FBVixDQUFvQixNQUFwQixDQUEyQixXQUEzQjtBQUNELEtBSEQsTUFHTyxJQUFJLEVBQUUsSUFBRixJQUFVLFlBQWQsRUFBNEI7QUFDakMsWUFBTSxTQUFOLENBQWdCLEdBQWhCLENBQW9CLFdBQXBCO0FBQ0EsZ0JBQVUsU0FB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bEQsRUFBNEQsS0FBNUQsQ0FBa0UsSUFBbEUsRUFBd0UsQ0FBeEUsQ0FOakI7O0FBUUEsTUFBSSxpQkFBaUIscUJBQXFCLFlBQTFDO0FBQ0E7O0FBRUEsV0FBUyxZQUFULEdBQXdCO0FBQ3RCLFFBQUksWUFBWSxFQUFFLFdBQUYsSUFBaUIsRUFBRSxlQUFGLENBQWtCLFNBQW5EOztBQUVBLFFBQUksWUFBWSxjQUFoQixFQUFnQztBQUM5QjtBQUNBLGFBQU8sU0FBUCxDQUFpQixHQUFqQixDQUFxQixXQUFyQixHQUNBLEtBQUssU0FBTCxDQUFlLEdBQWYsQ0FBbUIsV0FBbkIsQ0FEQTtBQUVELEtBSkQsTUFJTztBQUNMO0FBQ0EsYUFBTyxTQUFQLENBQWlCLE1BQWpCLENBQXdCLFdBQXhCLEdBQ0EsS0FBSyxTQUFMLENBQWUsTUFBZixDQUFzQixXQUF0QixDQURBO0FBRUQ7QUFDRjs7QUFFRCxJQUFFLGdCQUFGLENBQW1CLGtCQUFuQixFQUF1QyxZQUF2QztBQUNBLElBQUUsZ0JBQUYsQ0FBbUIsUUFBbkIsRUFBNkIsWUFBN0IsRUFBMkMsS0FBM0M7QUFDRDs7Ozs7QUM1QkQ7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvLyBpbXBvcnQgSGFtbWVyIGZyb20gJ2hhbW1lcmpzJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbmF2aWdhdGlvbk9mZkNhbnZhcygpIHtcclxuICBjb25zdCBkID0gZG9jdW1lbnQsXHJcbiAgICB3ID0gd2luZG93LFxyXG4gICAgcGFuZWwgPSBkLnF1ZXJ5U2VsZWN0b3IoJy5QYW5lbCcpLFxyXG4gICAgcGFuZWxCdG4gPSBkLnF1ZXJ5U2VsZWN0b3IoJy5QYW5lbC1idXR0b24nKSxcclxuICAgIG1xID0gdy5tYXRjaE1lZGlhKCcobWluLXdpZHRoOiA2NGVtKScpLFxyXG4gICAgaGFtYnVyZ2VyID0gZC5xdWVyeVNlbGVjdG9yKCcuaGFtYnVyZ2VyJylcclxuICAgIC8vIGhhbW1lckJvZHkgPSBuZXcgSGFtbWVyKGQuYm9keSksXHJcbiAgICAvLyBoYW1tZXJQYW5lbCA9IG5ldyBIYW1tZXIocGFuZWwpXHJcblxyXG4gIGZ1bmN0aW9uIGNsb3NlUGFuZWwobXEpIHtcclxuICAgIGlmIChtcS5tYXRjaGVzKSB7XHJcbiAgICAgIHBhbmVsLmNsYXNzTGlzdC5yZW1vdmUoJ2lzLWFjdGl2ZScpXHJcbiAgICAgIGhhbWJ1cmdlci5jbGFzc0xpc3QucmVtb3ZlKCdpcy1hY3RpdmUnKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gaGFtbWVyVG91Y2hlcyhlKSB7XHJcbiAgICBpZiAoZS50eXBlID09ICdzd2lwZWxlZnQnKSB7XHJcbiAgICAgIHBhbmVsLmNsYXNzTGlzdC5yZW1vdmUoJ2lzLWFjdGl2ZScpXHJcbiAgICAgIGhhbWJ1cmdlci5jbGFzc0xpc3QucmVtb3ZlKCdpcy1hY3RpdmUnKVxyXG4gICAgfSBlbHNlIGlmIChlLnR5cGUgPT0gJ3N3aXBlcmlnaHQnKSB7XHJcbiAgICAgIHBhbmVsLmNsYXNzTGlzdC5hZGQoJ2lzLWFjdGl2ZScpXHJcbiAgICAgIGhhbWJ1cmdlci5jbGFzc0xpc3QuYWRkKCdpcy1hY3RpdmUnKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcGFuZWxCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKVxyXG4gICAgcGFuZWwuY2xhc3NMaXN0LnRvZ2dsZSgnaXMtYWN0aXZlJylcclxuICAgIGhhbWJ1cmdlci5jbGFzc0xpc3QudG9nZ2xlKCdpcy1hY3RpdmUnKVxyXG4gIH0pXHJcblxyXG4gIG1xLmFkZExpc3RlbmVyKGNsb3NlUGFuZWwpXHJcbiAgY2xvc2VQYW5lbChtcSlcclxuXHJcbiAgLy8gaGFtbWVyUGFuZWwub24oJ3N3aXBlbGVmdCAgc3dpcGVyaWdodCcsIGhhbW1lclRvdWNoZXMpXHJcbiAgLy8gaGFtbWVyQm9keS5vbignc3dpcGVsZWZ0ICBzd2lwZXJpZ2h0JywgaGFtbWVyVG91Y2hlcylcclxufVxyXG4iLCIvLyBNYXN0ZXIgRE9NYW5pcHVsYXRvciB2MiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNsaWQoKXtcbiAgY29uc3QgaXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuaXRlbScpLFxuICAgIGNvbnRyb2xzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNvbnRyb2wnKSxcbiAgICBoZWFkZXJJdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5pdGVtLWhlYWRlcicpLFxuICAgIGRlc2NyaXB0aW9uSXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuaXRlbS1kZXNjcmlwdGlvbicpLFxuICAgIGFjdGl2ZURlbGF5ID0gLjc2LFxuICAgIGludGVydmFsID0gNTAwMDtcblxuICBsZXQgY3VycmVudCA9IDA7XG5cbiAgY29uc3Qgc2xpZGVyID0ge1xuICAgIGluaXQ6ICgpID0+IHtcbiAgICAgIGNvbnRyb2xzLmZvckVhY2goY29udHJvbCA9PiBjb250cm9sLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHsgc2xpZGVyLmNsaWNrZWRDb250cm9sKGUpIH0pKTtcbiAgICAgIGNvbnRyb2xzW2N1cnJlbnRdLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgICAgaXRlbXNbY3VycmVudF0uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgfSxcbiAgICBuZXh0U2xpZGU6ICgpID0+IHsgLy8gSW5jcmVtZW50IGN1cnJlbnQgc2xpZGUgYW5kIGFkZCBhY3RpdmUgY2xhc3NcbiAgICAgIHNsaWRlci5yZXNldCgpO1xuICAgICAgaWYgKGN1cnJlbnQgPT09IGl0ZW1zLmxlbmd0aCAtIDEpIGN1cnJlbnQgPSAtMTsgLy8gQ2hlY2sgaWYgY3VycmVudCBzbGlkZSBpcyBsYXN0IGluIGFycmF5XG4gICAgICBjdXJyZW50Kys7XG4gICAgICBjb250cm9sc1tjdXJyZW50XS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgIGl0ZW1zW2N1cnJlbnRdLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgICAgc2xpZGVyLnRyYW5zaXRpb25EZWxheShoZWFkZXJJdGVtcyk7XG4gICAgICBzbGlkZXIudHJhbnNpdGlvbkRlbGF5KGRlc2NyaXB0aW9uSXRlbXMpO1xuICAgIH0sXG4gICAgY2xpY2tlZENvbnRyb2w6IChlKSA9PiB7IC8vIEFkZCBhY3RpdmUgY2xhc3MgdG8gY2xpY2tlZCBjb250cm9sIGFuZCBjb3JyZXNwb25kaW5nIHNsaWRlXG4gICAgICBzbGlkZXIucmVzZXQoKTtcbiAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxGKTtcblxuICAgICAgY29uc3QgY29udHJvbCA9IGUudGFyZ2V0LFxuICAgICAgICBkYXRhSW5kZXggPSBOdW1iZXIoY29udHJvbC5kYXRhc2V0LmluZGV4KTtcblxuICAgICAgY29udHJvbC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgIGl0ZW1zLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgIGlmIChpbmRleCA9PT0gZGF0YUluZGV4KSB7IC8vIEFkZCBhY3RpdmUgY2xhc3MgdG8gY29ycmVzcG9uZGluZyBzbGlkZVxuICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICBjdXJyZW50ID0gZGF0YUluZGV4OyAvLyBVcGRhdGUgY3VycmVudCBzbGlkZVxuICAgICAgc2xpZGVyLnRyYW5zaXRpb25EZWxheShoZWFkZXJJdGVtcyk7XG4gICAgICBzbGlkZXIudHJhbnNpdGlvbkRlbGF5KGRlc2NyaXB0aW9uSXRlbXMpO1xuICAgICAgaW50ZXJ2YWxGID0gc2V0SW50ZXJ2YWwoc2xpZGVyLm5leHRTbGlkZSwgaW50ZXJ2YWwpOyAvLyBGaXJlIHRoYXQgYmFkIGJvaSBiYWNrIHVwXG4gICAgfSxcbiAgICByZXNldDogKCkgPT4geyAvLyBSZW1vdmUgYWN0aXZlIGNsYXNzZXNcbiAgICAgIGl0ZW1zLmZvckVhY2goaXRlbSA9PiBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpKTtcbiAgICAgIGNvbnRyb2xzLmZvckVhY2goY29udHJvbCA9PiBjb250cm9sLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpKTtcbiAgICB9LFxuICAgIHRyYW5zaXRpb25EZWxheTogKGl0ZW1zKSA9PiB7IC8vIFNldCBpbmNyZW1lbnRpbmcgY3NzIHRyYW5zaXRpb24tZGVsYXkgZm9yIC5pdGVtLWhlYWRlciAmIC5pdGVtLWRlc2NyaXB0aW9uLCAudmVydGljYWwtcGFydCwgYiBlbGVtZW50c1xuICAgICAgbGV0IHNlY29uZHM7XG5cbiAgICAgIGl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgIGNvbnN0IGNoaWxkcmVuID0gaXRlbS5jaGlsZE5vZGVzOyAvLyAudmVydGljYWwtcGFydChzKVxuICAgICAgICBsZXQgY291bnQgPSAxLFxuICAgICAgICAgIGRlbGF5O1xuXG4gICAgICAgIGl0ZW0uY2xhc3NMaXN0LnZhbHVlID09PSAnaXRlbS1oZWFkZXInID8gc2Vjb25kcyA9IC4wMTUgOiBzZWNvbmRzID0gLjAwNztcblxuICAgICAgICBjaGlsZHJlbi5mb3JFYWNoKGNoaWxkID0+IHsgLy8gaXRlcmF0ZSB0aHJvdWdoIC52ZXJ0aWNhbC1wYXJ0KHMpIGFuZCBzdHlsZSBiIGVsZW1lbnRcbiAgICAgICAgICBpZiAoY2hpbGQuY2xhc3NMaXN0KSB7XG4gICAgICAgICAgICBpdGVtLnBhcmVudE5vZGUuY2xhc3NMaXN0LmNvbnRhaW5zKCdhY3RpdmUnKSA/IGRlbGF5ID0gY291bnQgKiBzZWNvbmRzICsgYWN0aXZlRGVsYXkgOiBkZWxheSA9IGNvdW50ICogc2Vjb25kcztcbiAgICAgICAgICAgIGNoaWxkLmZpcnN0RWxlbWVudENoaWxkLnN0eWxlLnRyYW5zaXRpb25EZWxheSA9IGAke2RlbGF5fXNgOyAvLyBiIGVsZW1lbnRcbiAgICAgICAgICAgIGNvdW50Kys7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICB9LFxuICB9XG5cbiAgbGV0IGludGVydmFsRiA9IHNldEludGVydmFsKHNsaWRlci5uZXh0U2xpZGUsIGludGVydmFsKTtcbiAgc2xpZGVyLmluaXQoKTtcblxufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdHJhbnNwYXJlbnRIZWFkZXIoKSB7XHJcbiAgY29uc3QgZCA9IGRvY3VtZW50LFxyXG4gICAgdyA9IHdpbmRvdyxcclxuICAgIGhlYWRlciA9IGQucXVlcnlTZWxlY3RvcignLkhlYWRlcicpLFxyXG4gICAgbG9nbyA9IGQucXVlcnlTZWxlY3RvcignLkxvZ28nKSxcclxuICAgIGZpcnN0Q29udGVudCA9IGQucXVlcnlTZWxlY3RvcignLnUtZmlyc3RDb250ZW50JyksXHJcbiAgICBmaXJzdENvbnRlbnRIZWlnaHQgPSB3LmdldENvbXB1dGVkU3R5bGUoZmlyc3RDb250ZW50LCBudWxsKS5nZXRQcm9wZXJ0eVZhbHVlKCdoZWlnaHQnKS5zcGxpdCgncHgnKVswXSxcclxuICAgIGhlYWRlckhlaWdodCA9IHcuZ2V0Q29tcHV0ZWRTdHlsZShoZWFkZXIsIG51bGwpLmdldFByb3BlcnR5VmFsdWUoJ2hlaWdodCcpLnNwbGl0KCdweCcpWzBdXHJcblxyXG4gIGxldCBzY3JvbGxUb3BMaW1pdCA9IGZpcnN0Q29udGVudEhlaWdodCAtIGhlYWRlckhlaWdodFxyXG4gIC8vY29uc29sZS5sb2coZmlyc3RDb250ZW50SGVpZ2h0LCBoZWFkZXJIZWlnaHQsIHNjcm9sbFRvcExpbWl0KVxyXG5cclxuICBmdW5jdGlvbiBoZWFkZXJTY3JvbGwoKSB7XHJcbiAgICBsZXQgc2Nyb2xsVG9wID0gdy5wYWdlWU9mZnNldCB8fCBkLmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3BcclxuXHJcbiAgICBpZiAoc2Nyb2xsVG9wID4gc2Nyb2xsVG9wTGltaXQpIHtcclxuICAgICAgLy9jb25zb2xlLmxvZygnYWJham8nLCBzY3JvbGxUb3ApXHJcbiAgICAgIGhlYWRlci5jbGFzc0xpc3QuYWRkKCdpcy1hY3RpdmUnKSxcclxuICAgICAgbG9nby5jbGFzc0xpc3QuYWRkKCdpcy1hY3RpdmUnKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy9jb25zb2xlLmxvZygnYXJyaWJhJywgc2Nyb2xsVG9wKVxyXG4gICAgICBoZWFkZXIuY2xhc3NMaXN0LnJlbW92ZSgnaXMtYWN0aXZlJyksXHJcbiAgICAgIGxvZ28uY2xhc3NMaXN0LnJlbW92ZSgnaXMtYWN0aXZlJylcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGhlYWRlclNjcm9sbClcclxuICB3LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGhlYWRlclNjcm9sbCwgZmFsc2UpXHJcbn1cclxuIiwiaW1wb3J0IG5hdmlnYXRpb25PZmZDYW52YXMgZnJvbSAnLi9jb21wb25lbnRzL25hdmlnYXRpb25fb2ZmX2NhbnZhcydcbmltcG9ydCB0cmFuc3BhcmVudEhlYWRlciBmcm9tICcuL2NvbXBvbmVudHMvdHJhbnNwYXJlbnRfaGVhZGVyJ1xuaW1wb3J0IHNsaWQgZnJvbSAnLi9jb21wb25lbnRzL3NsaWQnXG4vLyBpbXBvcnQgd293IGZyb20gJy4uLy4uL25vZGVfbW9kdWxlcy93b3dqcy9kaXN0L3dvdy5taW4uanMnXG5cbi8vIG5ldyB3b3coKS5pbml0KClcbm5hdmlnYXRpb25PZmZDYW52YXMoKVxudHJhbnNwYXJlbnRIZWFkZXIoKVxuc2xpZCgpXG4iXX0=
