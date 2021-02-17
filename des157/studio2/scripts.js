(function() {
  "use strict";
  console.log("reading js");

  const stacks = document.querySelectorAll('section .stack');

  stacks.forEach(function (stack) {
    stack.addEventListener('click', expand);
  });

  function expand () {
    // need to redefine the section because it goes out of scope here
    const section = this.parentNode;
    const stack = this;
    const polaroids = document.querySelectorAll(`#${section.getAttribute('id')} .stack .polaroid`);
    const date = document.querySelector(`#${section.getAttribute('id')} article`);
    // used to position the stack/date when the stack is expanded snapscrolls
    const stackOffset = stack.getBoundingClientRect().left - (window.innerWidth - 1200)/2;
    const dateOffset = date.getBoundingClientRect().left - (window.innerWidth - 1200)/2;

    /// expand the stack
    for (let i = 0; i < polaroids.length; i++) {
      polaroids[i].style.marginTop = "0";
    }

    if (!stack.className.includes("expanded")) {
      stack.classList.add("expanded");
    }

    // reposition stack and date to accommodate scroll snap on the stack
    section.style.justifyContent = "flex-start";
    stack.style.paddingRight = "100%";
    stack.style.paddingLeft = `${stackOffset + 50}px`;
    date.style.position = "absolute";
    date.style.marginLeft = `${dateOffset}px`;
    date.style.zIndex = -1;

    // expand the stack on top and bottom to make it so there's always a centered polaroid
    // appendPolaroid("initial", stack);
    // center the carousel on the middle polaroid
    // stack.getElementsByClassName('polaroid')[2].scrollIntoView();

    /// collapse stack again on click
    stack.addEventListener('click', function() {
      // remove the children added upon expansion before
      // stack.removeChild(stack.getElementsByClassName('polaroid')[4]);
      // stack.removeChild(stack.getElementsByClassName('polaroid')[0]);

      // remove all styling added in this onclick event
      for (let i = 0; i < polaroids.length; i++) {
        polaroids[i].removeAttribute("style");
      }
      stack.classList.remove("expanded");
      stack.removeAttribute("style");
      date.removeAttribute("style");
      section.removeAttribute("style");

      // center the section on the screen again
      section.scrollIntoView();
    });  // click event listener
  };  // expand function

  //// "bottom" and "top" inputs would work with the infinite scroll function (see comments below)
  //// would dynamically add/remove polaroids from the stack to give the illusion of infinite scroll
  //// i didn't get the "bottom" and "top" inputs to work in time for the deadline
  function appendPolaroid(direction, stack) {
    var polaroids = stack.getElementsByClassName('polaroid');
    var firstChild = polaroids[0];
    var lastChild = polaroids[polaroids.length - 1];
    var dupe;

    if ((direction == "bottom") || (direction == "top")) {
      dupe = polaroids[2];  // middle polaroid
      if (direction == "bottom") {
        // scrolling down
        // append to the bottom, remove from the top
        stack.appendChild(dupe.cloneNode(true));
        stack.removeChild(firstChild);
      } else {
        // scrolling up
        // append to the top, remove from the bottom
        stack.insertBefore(dupe.cloneNode(true), polaroids[0]);
        stack.removeChild(lastChild);
      }
    } else {
      // append on expand
      stack.insertBefore(lastChild.cloneNode(true), polaroids[0]);
      stack.appendChild(firstChild.cloneNode(true));
    }
  };
}());

////////// Scripts I couldn't get to work by the deadline //////////

//// these scripts would give an animation to the stack of polaroids to make it seem clickable

/* var film = document.querySelectorAll(".stack .polaroid .film")[2];
var bigShadow = "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)";
var normalShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)";

var polaroids = document.querySelectorAll(".stack .polaroid");

/* bigPolaroids.forEach(function (bigPolaroid) {
  bigPolaroid.addEventListener('mouseover', nudge);
  bigPolaroid.addEventListener('mouseout', );
}); */
/* stacks.forEach(function (stack) {
  stack.addEventListener('mouseover', nudge);
}); */

/* polaroid.addEventListener('mouseover', function() {
  var bump = (window.getComputedStyle(polaroid).getPropertyValue("margin-top")).substring(0,4) - 10;
  polaroid.style.marginTop = bump;
  polaroid.style.boxShadow = bigShadow;

  polaroid.style.transform = "rotate(-15deg)";
});

polaroid.addEventListener('mouseout', function() {
  var unbump = (window.getComputedStyle(polaroid).getPropertyValue("margin-top")).substring(0,4) + 10;
  polaroid.style.boxShadow = normalShadow;
  polaroid.style.marginTop = unbump;
  polaroid.style.transform = "rotate(-5deg)";
}); */

///// asynchronous functions - the function to collapse the stack would wait for
///// callback from the expand function
// var collapse = function(callback) {
//   // valid callback
//   if (!callback || typeof callback !== 'function') return;
//
//   // expand polaroids
//   stacks.forEach(function (stack) {
//     stack.addEventListener('click', function() {
//       var section = this.parentNode;
//       var stack = this;
//       var polaroids = document.querySelectorAll(`#${section.getAttribute('id')} .stack .polaroid`);
//       var date = document.querySelector(`#${section.getAttribute('id')} article`);
//       // used to position the stack/date when the stack is expanded snapscrolls
//       var stackOffset = stack.getBoundingClientRect().left - (window.innerWidth - 1200)/2;
//       var dateOffset = date.getBoundingClientRect().left - (window.innerWidth - 1200)/2;
//
//       /// expand the stack
//       for (var i = 0; i < polaroids.length; i++) {
//         polaroids[i].style.marginTop = "0";
//       }
//
//       if (!stack.className.includes("expanded")) {
//         stack.classList.add("expanded");
//       }
//
//       // reposition stack and date to accommodate scroll snap on the stack
//       section.style.justifyContent = "flex-start";
//       stack.style.paddingRight = "100%";
//       stack.style.paddingLeft = `${stackOffset + 50}px`;
//       date.style.position = "absolute";
//       date.style.marginLeft = `${dateOffset}px`;
//       date.style.zIndex = -1;
//     });
//     // run the callback
//     callback(stack);
//   });
//
// };
//
// collapse(function (stack) {
//   // to do when polaroids are expanded
//   stack.addEventListener('click', function() {
//     var section = this.parentNode;
//     // var stack = this;
//     var polaroids = this.children;
//     var date = section.children[1];
//
//     for (var i = 0; i < polaroids.length; i++) {
//       polaroids[i].removeAttribute("style");
//     }
//     stack.classList.remove("expanded");
//     stack.removeAttribute("style");
//     date.removeAttribute("style");
//     section.removeAttribute("style");
//
//     // center the section on the screen again
//     section.scrollIntoView();
//   });
// });

////// this collapse function would work with the asynchronous calls

// function collapse () {
//   // this is a stack
//   const section = this.parentNode;
//   const polaroids = this.children;
//   const date = section.children[1];
//
//   for (let i = 0; i < polaroids.length; i++) {
//     polaroids[i].removeAttribute("style");
//   }
//   stack.classList.remove("expanded");
//   stack.removeAttribute("style");
//   date.removeAttribute("style");
//   section.removeAttribute("style");
//
//   // center the section on the screen again
//   section.scrollIntoView();
// };


//// infinite scroll function - runs inside of the expand event listener
//// continuously adds ploaroids to the top and bottom of the stack depending on scroll direction
//// to give the illusion of infinite scroll

/*!
 * Run a callback function after scrolling has stopped
 * (c) 2017 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param  {Function} callback The function to run after scrolling
 */
// var scrollStop = function (callback) {
// 	// Make sure a valid callback was provided
// 	if (!callback || typeof callback !== 'function') return;
// 	// Setup scrolling variable
// 	var isScrolling;
// 	// Listen for scroll events
// 	stack.addEventListener('scroll', function (event) {
// 		// Clear our timeout throughout the scroll
// 		window.clearTimeout(isScrolling);
// 		// Set a timeout to run after scrolling ends
// 		isScrolling = setTimeout(function() {
// 			// Run the callback
// 			callback();
// 		}, 100);
// 	}, false);
// };


// var lastTop = window.scrollTop;
// scrollStop(function () {
//     // when scrolling has stopped, detect if up scroll or down scroll
//     if (window.scrollTop > lastTop) {
//       // down scroll
//       // append to the bottom, and remove from the top
//       console.log("down");
//       // appendPolaroid("bottom", stack);
//     } else {
//       // up scroll
//       // append to the top, and remove from the bottom
//       console.log("up");
//       // appendPolaroid("top", stack);
//     }
//     lastTop = stack.scrollTop;
// });
