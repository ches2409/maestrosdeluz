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

(0, _navigation_off_canvas2.default)();
(0, _transparent_header2.default)();
(0, _slid2.default)();

},{"./components/navigation_off_canvas":1,"./components/slid":2,"./components/transparent_header":3}]},{},[4])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGpzXFxjb21wb25lbnRzXFxuYXZpZ2F0aW9uX29mZl9jYW52YXMuanMiLCJzcmNcXGpzXFxjb21wb25lbnRzXFxzbGlkLmpzIiwic3JjXFxqc1xcY29tcG9uZW50c1xcdHJhbnNwYXJlbnRfaGVhZGVyLmpzIiwic3JjXFxqc1xcaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztrQkNFd0IsbUI7QUFGeEI7O0FBRWUsU0FBUyxtQkFBVCxHQUErQjtBQUM1QyxNQUFNLElBQUksUUFBVjtBQUFBLE1BQ0UsSUFBSSxNQUROO0FBQUEsTUFFRSxRQUFRLEVBQUUsYUFBRixDQUFnQixRQUFoQixDQUZWO0FBQUEsTUFHRSxXQUFXLEVBQUUsYUFBRixDQUFnQixlQUFoQixDQUhiO0FBQUEsTUFJRSxLQUFLLEVBQUUsVUFBRixDQUFhLG1CQUFiLENBSlA7QUFBQSxNQUtFLFlBQVksRUFBRSxhQUFGLENBQWdCLFlBQWhCLENBTGQ7QUFNRTtBQUNBOztBQUVGLFdBQVMsVUFBVCxDQUFvQixFQUFwQixFQUF3QjtBQUN0QixRQUFJLEdBQUcsT0FBUCxFQUFnQjtBQUNkLFlBQU0sU0FBTixDQUFnQixNQUFoQixDQUF1QixXQUF2QjtBQUNBLGdCQUFVLFNBQVYsQ0FBb0IsTUFBcEIsQ0FBMkIsV0FBM0I7QUFDRDtBQUNGOztBQUVELFdBQVMsYUFBVCxDQUF1QixDQUF2QixFQUEwQjtBQUN4QixRQUFJLEVBQUUsSUFBRixJQUFVLFdBQWQsRUFBMkI7QUFDekIsWUFBTSxTQUFOLENBQWdCLE1BQWhCLENBQXVCLFdBQXZCO0FBQ0EsZ0JBQVUsU0FBVixDQUFvQixNQUFwQixDQUEyQixXQUEzQjtBQUNELEtBSEQsTUFHTyxJQUFJLEVBQUUsSUFBRixJQUFVLFlBQWQsRUFBNEI7QUFDakMsWUFBTSxTQUFOLENBQWdCLEdBQWhCLENBQW9CLFdBQXBCO0FBQ0EsZ0JBQVUsU0FB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bEQsRUFBNEQsS0FBNUQsQ0FBa0UsSUFBbEUsRUFBd0UsQ0FBeEUsQ0FOakI7O0FBUUEsTUFBSSxpQkFBaUIscUJBQXFCLFlBQTFDO0FBQ0E7O0FBRUEsV0FBUyxZQUFULEdBQXdCO0FBQ3RCLFFBQUksWUFBWSxFQUFFLFdBQUYsSUFBaUIsRUFBRSxlQUFGLENBQWtCLFNBQW5EOztBQUVBLFFBQUksWUFBWSxjQUFoQixFQUFnQztBQUM5QjtBQUNBLGFBQU8sU0FBUCxDQUFpQixHQUFqQixDQUFxQixXQUFyQixHQUNBLEtBQUssU0FBTCxDQUFlLEdBQWYsQ0FBbUIsV0FBbkIsQ0FEQTtBQUVELEtBSkQsTUFJTztBQUNMO0FBQ0EsYUFBTyxTQUFQLENBQWlCLE1BQWpCLENBQXdCLFdBQXhCLEdBQ0EsS0FBSyxTQUFMLENBQWUsTUFBZixDQUFzQixXQUF0QixDQURBO0FBRUQ7QUFDRjs7QUFFRCxJQUFFLGdCQUFGLENBQW1CLGtCQUFuQixFQUF1QyxZQUF2QztBQUNBLElBQUUsZ0JBQUYsQ0FBbUIsUUFBbkIsRUFBNkIsWUFBN0IsRUFBMkMsS0FBM0M7QUFDRDs7Ozs7QUM1QkQ7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLy8gaW1wb3J0IEhhbW1lciBmcm9tICdoYW1tZXJqcydcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG5hdmlnYXRpb25PZmZDYW52YXMoKSB7XHJcbiAgY29uc3QgZCA9IGRvY3VtZW50LFxyXG4gICAgdyA9IHdpbmRvdyxcclxuICAgIHBhbmVsID0gZC5xdWVyeVNlbGVjdG9yKCcuUGFuZWwnKSxcclxuICAgIHBhbmVsQnRuID0gZC5xdWVyeVNlbGVjdG9yKCcuUGFuZWwtYnV0dG9uJyksXHJcbiAgICBtcSA9IHcubWF0Y2hNZWRpYSgnKG1pbi13aWR0aDogNjRlbSknKSxcclxuICAgIGhhbWJ1cmdlciA9IGQucXVlcnlTZWxlY3RvcignLmhhbWJ1cmdlcicpXHJcbiAgICAvLyBoYW1tZXJCb2R5ID0gbmV3IEhhbW1lcihkLmJvZHkpLFxyXG4gICAgLy8gaGFtbWVyUGFuZWwgPSBuZXcgSGFtbWVyKHBhbmVsKVxyXG5cclxuICBmdW5jdGlvbiBjbG9zZVBhbmVsKG1xKSB7XHJcbiAgICBpZiAobXEubWF0Y2hlcykge1xyXG4gICAgICBwYW5lbC5jbGFzc0xpc3QucmVtb3ZlKCdpcy1hY3RpdmUnKVxyXG4gICAgICBoYW1idXJnZXIuY2xhc3NMaXN0LnJlbW92ZSgnaXMtYWN0aXZlJylcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGhhbW1lclRvdWNoZXMoZSkge1xyXG4gICAgaWYgKGUudHlwZSA9PSAnc3dpcGVsZWZ0Jykge1xyXG4gICAgICBwYW5lbC5jbGFzc0xpc3QucmVtb3ZlKCdpcy1hY3RpdmUnKVxyXG4gICAgICBoYW1idXJnZXIuY2xhc3NMaXN0LnJlbW92ZSgnaXMtYWN0aXZlJylcclxuICAgIH0gZWxzZSBpZiAoZS50eXBlID09ICdzd2lwZXJpZ2h0Jykge1xyXG4gICAgICBwYW5lbC5jbGFzc0xpc3QuYWRkKCdpcy1hY3RpdmUnKVxyXG4gICAgICBoYW1idXJnZXIuY2xhc3NMaXN0LmFkZCgnaXMtYWN0aXZlJylcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHBhbmVsQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KClcclxuICAgIHBhbmVsLmNsYXNzTGlzdC50b2dnbGUoJ2lzLWFjdGl2ZScpXHJcbiAgICBoYW1idXJnZXIuY2xhc3NMaXN0LnRvZ2dsZSgnaXMtYWN0aXZlJylcclxuICB9KVxyXG5cclxuICBtcS5hZGRMaXN0ZW5lcihjbG9zZVBhbmVsKVxyXG4gIGNsb3NlUGFuZWwobXEpXHJcblxyXG4gIC8vIGhhbW1lclBhbmVsLm9uKCdzd2lwZWxlZnQgIHN3aXBlcmlnaHQnLCBoYW1tZXJUb3VjaGVzKVxyXG4gIC8vIGhhbW1lckJvZHkub24oJ3N3aXBlbGVmdCAgc3dpcGVyaWdodCcsIGhhbW1lclRvdWNoZXMpXHJcbn1cclxuIiwiLy8gTWFzdGVyIERPTWFuaXB1bGF0b3IgdjIgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzbGlkKCl7XG4gIGNvbnN0IGl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLml0ZW0nKSxcbiAgICBjb250cm9scyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jb250cm9sJyksXG4gICAgaGVhZGVySXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuaXRlbS1oZWFkZXInKSxcbiAgICBkZXNjcmlwdGlvbkl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLml0ZW0tZGVzY3JpcHRpb24nKSxcbiAgICBhY3RpdmVEZWxheSA9IC43NixcbiAgICBpbnRlcnZhbCA9IDUwMDA7XG5cbiAgbGV0IGN1cnJlbnQgPSAwO1xuXG4gIGNvbnN0IHNsaWRlciA9IHtcbiAgICBpbml0OiAoKSA9PiB7XG4gICAgICBjb250cm9scy5mb3JFYWNoKGNvbnRyb2wgPT4gY29udHJvbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7IHNsaWRlci5jbGlja2VkQ29udHJvbChlKSB9KSk7XG4gICAgICBjb250cm9sc1tjdXJyZW50XS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgIGl0ZW1zW2N1cnJlbnRdLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgIH0sXG4gICAgbmV4dFNsaWRlOiAoKSA9PiB7IC8vIEluY3JlbWVudCBjdXJyZW50IHNsaWRlIGFuZCBhZGQgYWN0aXZlIGNsYXNzXG4gICAgICBzbGlkZXIucmVzZXQoKTtcbiAgICAgIGlmIChjdXJyZW50ID09PSBpdGVtcy5sZW5ndGggLSAxKSBjdXJyZW50ID0gLTE7IC8vIENoZWNrIGlmIGN1cnJlbnQgc2xpZGUgaXMgbGFzdCBpbiBhcnJheVxuICAgICAgY3VycmVudCsrO1xuICAgICAgY29udHJvbHNbY3VycmVudF0uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICBpdGVtc1tjdXJyZW50XS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgIHNsaWRlci50cmFuc2l0aW9uRGVsYXkoaGVhZGVySXRlbXMpO1xuICAgICAgc2xpZGVyLnRyYW5zaXRpb25EZWxheShkZXNjcmlwdGlvbkl0ZW1zKTtcbiAgICB9LFxuICAgIGNsaWNrZWRDb250cm9sOiAoZSkgPT4geyAvLyBBZGQgYWN0aXZlIGNsYXNzIHRvIGNsaWNrZWQgY29udHJvbCBhbmQgY29ycmVzcG9uZGluZyBzbGlkZVxuICAgICAgc2xpZGVyLnJlc2V0KCk7XG4gICAgICBjbGVhckludGVydmFsKGludGVydmFsRik7XG5cbiAgICAgIGNvbnN0IGNvbnRyb2wgPSBlLnRhcmdldCxcbiAgICAgICAgZGF0YUluZGV4ID0gTnVtYmVyKGNvbnRyb2wuZGF0YXNldC5pbmRleCk7XG5cbiAgICAgIGNvbnRyb2wuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICBpdGVtcy5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICBpZiAoaW5kZXggPT09IGRhdGFJbmRleCkgeyAvLyBBZGQgYWN0aXZlIGNsYXNzIHRvIGNvcnJlc3BvbmRpbmcgc2xpZGVcbiAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgY3VycmVudCA9IGRhdGFJbmRleDsgLy8gVXBkYXRlIGN1cnJlbnQgc2xpZGVcbiAgICAgIHNsaWRlci50cmFuc2l0aW9uRGVsYXkoaGVhZGVySXRlbXMpO1xuICAgICAgc2xpZGVyLnRyYW5zaXRpb25EZWxheShkZXNjcmlwdGlvbkl0ZW1zKTtcbiAgICAgIGludGVydmFsRiA9IHNldEludGVydmFsKHNsaWRlci5uZXh0U2xpZGUsIGludGVydmFsKTsgLy8gRmlyZSB0aGF0IGJhZCBib2kgYmFjayB1cFxuICAgIH0sXG4gICAgcmVzZXQ6ICgpID0+IHsgLy8gUmVtb3ZlIGFjdGl2ZSBjbGFzc2VzXG4gICAgICBpdGVtcy5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKSk7XG4gICAgICBjb250cm9scy5mb3JFYWNoKGNvbnRyb2wgPT4gY29udHJvbC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKSk7XG4gICAgfSxcbiAgICB0cmFuc2l0aW9uRGVsYXk6IChpdGVtcykgPT4geyAvLyBTZXQgaW5jcmVtZW50aW5nIGNzcyB0cmFuc2l0aW9uLWRlbGF5IGZvciAuaXRlbS1oZWFkZXIgJiAuaXRlbS1kZXNjcmlwdGlvbiwgLnZlcnRpY2FsLXBhcnQsIGIgZWxlbWVudHNcbiAgICAgIGxldCBzZWNvbmRzO1xuXG4gICAgICBpdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICBjb25zdCBjaGlsZHJlbiA9IGl0ZW0uY2hpbGROb2RlczsgLy8gLnZlcnRpY2FsLXBhcnQocylcbiAgICAgICAgbGV0IGNvdW50ID0gMSxcbiAgICAgICAgICBkZWxheTtcblxuICAgICAgICBpdGVtLmNsYXNzTGlzdC52YWx1ZSA9PT0gJ2l0ZW0taGVhZGVyJyA/IHNlY29uZHMgPSAuMDE1IDogc2Vjb25kcyA9IC4wMDc7XG5cbiAgICAgICAgY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB7IC8vIGl0ZXJhdGUgdGhyb3VnaCAudmVydGljYWwtcGFydChzKSBhbmQgc3R5bGUgYiBlbGVtZW50XG4gICAgICAgICAgaWYgKGNoaWxkLmNsYXNzTGlzdCkge1xuICAgICAgICAgICAgaXRlbS5wYXJlbnROb2RlLmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykgPyBkZWxheSA9IGNvdW50ICogc2Vjb25kcyArIGFjdGl2ZURlbGF5IDogZGVsYXkgPSBjb3VudCAqIHNlY29uZHM7XG4gICAgICAgICAgICBjaGlsZC5maXJzdEVsZW1lbnRDaGlsZC5zdHlsZS50cmFuc2l0aW9uRGVsYXkgPSBgJHtkZWxheX1zYDsgLy8gYiBlbGVtZW50XG4gICAgICAgICAgICBjb3VudCsrO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgfSxcbiAgfVxuXG4gIGxldCBpbnRlcnZhbEYgPSBzZXRJbnRlcnZhbChzbGlkZXIubmV4dFNsaWRlLCBpbnRlcnZhbCk7XG4gIHNsaWRlci5pbml0KCk7XG5cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRyYW5zcGFyZW50SGVhZGVyKCkge1xyXG4gIGNvbnN0IGQgPSBkb2N1bWVudCxcclxuICAgIHcgPSB3aW5kb3csXHJcbiAgICBoZWFkZXIgPSBkLnF1ZXJ5U2VsZWN0b3IoJy5IZWFkZXInKSxcclxuICAgIGxvZ28gPSBkLnF1ZXJ5U2VsZWN0b3IoJy5Mb2dvJyksXHJcbiAgICBmaXJzdENvbnRlbnQgPSBkLnF1ZXJ5U2VsZWN0b3IoJy51LWZpcnN0Q29udGVudCcpLFxyXG4gICAgZmlyc3RDb250ZW50SGVpZ2h0ID0gdy5nZXRDb21wdXRlZFN0eWxlKGZpcnN0Q29udGVudCwgbnVsbCkuZ2V0UHJvcGVydHlWYWx1ZSgnaGVpZ2h0Jykuc3BsaXQoJ3B4JylbMF0sXHJcbiAgICBoZWFkZXJIZWlnaHQgPSB3LmdldENvbXB1dGVkU3R5bGUoaGVhZGVyLCBudWxsKS5nZXRQcm9wZXJ0eVZhbHVlKCdoZWlnaHQnKS5zcGxpdCgncHgnKVswXVxyXG5cclxuICBsZXQgc2Nyb2xsVG9wTGltaXQgPSBmaXJzdENvbnRlbnRIZWlnaHQgLSBoZWFkZXJIZWlnaHRcclxuICAvL2NvbnNvbGUubG9nKGZpcnN0Q29udGVudEhlaWdodCwgaGVhZGVySGVpZ2h0LCBzY3JvbGxUb3BMaW1pdClcclxuXHJcbiAgZnVuY3Rpb24gaGVhZGVyU2Nyb2xsKCkge1xyXG4gICAgbGV0IHNjcm9sbFRvcCA9IHcucGFnZVlPZmZzZXQgfHwgZC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wXHJcblxyXG4gICAgaWYgKHNjcm9sbFRvcCA+IHNjcm9sbFRvcExpbWl0KSB7XHJcbiAgICAgIC8vY29uc29sZS5sb2coJ2FiYWpvJywgc2Nyb2xsVG9wKVxyXG4gICAgICBoZWFkZXIuY2xhc3NMaXN0LmFkZCgnaXMtYWN0aXZlJyksXHJcbiAgICAgIGxvZ28uY2xhc3NMaXN0LmFkZCgnaXMtYWN0aXZlJylcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vY29uc29sZS5sb2coJ2FycmliYScsIHNjcm9sbFRvcClcclxuICAgICAgaGVhZGVyLmNsYXNzTGlzdC5yZW1vdmUoJ2lzLWFjdGl2ZScpLFxyXG4gICAgICBsb2dvLmNsYXNzTGlzdC5yZW1vdmUoJ2lzLWFjdGl2ZScpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBkLmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBoZWFkZXJTY3JvbGwpXHJcbiAgdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBoZWFkZXJTY3JvbGwsIGZhbHNlKVxyXG59XHJcbiIsImltcG9ydCBuYXZpZ2F0aW9uT2ZmQ2FudmFzIGZyb20gJy4vY29tcG9uZW50cy9uYXZpZ2F0aW9uX29mZl9jYW52YXMnXG5pbXBvcnQgdHJhbnNwYXJlbnRIZWFkZXIgZnJvbSAnLi9jb21wb25lbnRzL3RyYW5zcGFyZW50X2hlYWRlcidcbmltcG9ydCBzbGlkIGZyb20gJy4vY29tcG9uZW50cy9zbGlkJ1xuXG5uYXZpZ2F0aW9uT2ZmQ2FudmFzKClcbnRyYW5zcGFyZW50SGVhZGVyKClcbnNsaWQoKVxuIl19
