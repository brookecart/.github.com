(function() {
  "use strict";

  const stacks = document.querySelectorAll('section .stack');

  // works
  stacks.forEach(function (stack) {
    stack.addEventListener('click', expand);
  });

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
  //
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

  function expand () {
    // need to redefine the section because it goes out of scope here
    const section = this.parentNode;
    const stack = this;
    const polaroids = document.querySelectorAll(`#${section.getAttribute('id')} .stack .polaroid`);
    const date = document.querySelector(`#${section.getAttribute('id')} article`);
    // used to position the stack/date when the stack is expanded snapscrolls
    const stackOffset = stack.getBoundingClientRect().left - (window.innerWidth - 1200)/2;
    const dateOffset = date.getBoundingClientRect().left - (window.innerWidth - 1200)/2;

    // create new polaroids
    // console.log(stack.getElementsByClassName('polaroid'));

    // stack.getElementsByClassName('polaroid')[3].scrollIntoView();

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

    // appendPolaroid("initial", stack);


    /// infinite scroll
    // var lastTop = stack.scrollTop;
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
    //
    // scrollStop(function () {
    //     // console.log('Scrolling has stopped.');
    //     if (stack.scrollTop > lastTop) {
    //       // down scroll
    //       // append to the bottom, and remove from the top
    //       // appendPolaroid("bottom", stack);
    //     } else {
    //       // up scroll
    //       // append to the top, and remove from the bottom
    //       // appendPolaroid("top", stack);
    //     }
    //     lastTop = stack.scrollTop;
    // });

    /// collapse stack again on click
    stack.addEventListener('click', function() {
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
      // stack.addEventListener('click', expand);
    });  // click event listener
  };  // expand function

  // function collapse () {
  //   // this is a stack
  //   var section = this.parentNode;
  //   var polaroids = this.children;
  //   var date = section.children[1];
  //
  //   for (var i = 0; i < polaroids.length; i++) {
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

  // function appendPolaroid(direction, stack) {
  //   var polaroids = stack.getElementsByClassName('polaroid');
  //   var firstChild = polaroids[0];
  //   var lastChild = polaroids[polaroids.length - 1];
  //   var dupe;
  //   var dupe2;
  //
  //   if ((direction == "bottom") || (direction == "top")) {
  //     dupe = polaroids[2];
  //   } else {
  //     dupe = firstChild;
  //     dupe2 = lastChild;
  //   }
  //   var dupeImg = dupe.getElementsByClassName('film')[0].getElementsByTagName('img')[0];
  //
  //   /// create new polaroid
  //   // polaroid
  //   var newPolaroid = document.createElement('div');
  //   newPolaroid.classList.add('polaroid');
  //
  //   // film
  //   var newFilm = document.createElement('div');
  //   newFilm.classList.add('film');
  //
  //   // img
  //   var newImg = document.createElement('img');
  //   newImg.setAttribute("src", `${dupeImg.getAttribute('src')}`);
  //   newImg.setAttribute("alt", `${dupeImg.getAttribute('alt')}`);
  //   newImg.setAttribute("height", `360`);
  //   newImg.setAttribute("width", `360`);
  //
  //   if (dupeImg.classList.contains('landscape')) {
  //     newImg.classList.add('landscape');
  //   }
  //
  //   newFilm.appendChild(newImg);
  //   newPolaroid.appendChild(newFilm);
  //
  //   if (direction == "bottom") {
  //     // scrolling down
  //     // append to the bottom, remove from the top
  //     stack.appendChild(newPolaroid);
  //     stack.removeChild(firstChild);
  //   } else if (direction == "top") {
  //     // scrolling up
  //     // append to the top, remove from the bottom
  //     stack.insertBefore(dupe.cloneNode(), polaroids[0]);
  //     stack.removeChild(lastChild);
  //   } else {
  //     // append on expand
  //     stack.insertBefore(dupe2.cloneNode(), polaroids[0]);
  //     stack.appendChild(dupe.cloneNode());
  //   }
  //
  // };





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
}());
