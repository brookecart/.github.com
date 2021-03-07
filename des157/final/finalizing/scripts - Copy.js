(function() {
  "use strict";
  console.log("reading js");

  // mouse responsive animation for title
  const intro = document.querySelector('#intro');
  const title = intro.querySelector('h1');

  intro.addEventListener('mousemove', parallax);
  function parallax(event) {
    const speed = title.getAttribute('data-speed');
    // get original background position value and add/subtract from it
    // background-position: 50% 47%;
    const x = 50 - event.pageX*speed*3;
    const y = 47 - event.pageY*speed;
    title.style.backgroundPosition = `${x}% ${y}%`;
  }

  const photos = [
    '1.jpg',
    '4.png',
    '5.png'
  ];

  let currentPhoto = 0;
  setInterval(function() {
    currentPhoto++;
    if (currentPhoto > photos.length-1) {
      currentPhoto = 0;
    }
    title.style.backgroundImage = `url(images/cover/${photos[currentPhoto]})`;
  }, 5000);

  // all stacks
  const stacks = document.querySelectorAll('section .stack');

  // expand/collapse for stacks
  stacks.forEach(function (stack) {
    // conditional handles if the stack should be expanded or collapsed
    stack.addEventListener('click', function() {
      expandOrCollapse(stack);
    });

    // hover effect
    stack.addEventListener('mouseover', function() {
      // don't take effect on expanded stacks
      if (!stack.classList.contains('expandedStack')) {
        pushApart(stack);
      }
    });

    // unhover effect
    stack.addEventListener('mouseout', function() {
      pullTogether(stack);
    });


  });

  // on hover effect
  function pushApart(stack) {
    const polaroids = stack.querySelectorAll('.polaroid');
    for (let i = 0; i < polaroids.length; i++) {
      polaroids[i].classList.add(`polaroidHover${i+1}`);
    }
  }

  // off hover effect
  function pullTogether(stack) {
    const polaroids = stack.querySelectorAll('.polaroid');
    for (let i = 0; i < polaroids.length; i++) {
      polaroids[i].classList.remove(`polaroidHover${i+1}`);
    }
  }

  function expandOrCollapse(stack) {
    if (stack.classList.contains('collapsed')) {
      expand(stack);
      // captions(stack);
      // initially adds the extra polaroids on top and bottom
      appendPolaroid('expand', stack);
      // centers the middle polaroid on the screen
      stack.querySelectorAll('.polaroid')[2].scrollIntoView();

      // add listener for scroll here?
      /*!
       * Run a callback function after scrolling has stopped
       * (c) 2017 Chris Ferdinandi, MIT License, https://gomakethings.com
       * @param  {Function} callback The function to run after scrolling
       */
      // var scrollStop = function(callback) {
      //   if (!callback || typeof callback !== 'function') return;
      //   var isScrolling;
      //   stack.addEventListener('scroll', function() {
      //     // if (stack.classList.contains('expandedStack')) {
      //       window.clearTimeout(isScrolling);
      //       isScrolling = setTimeout(function() {
      //         callback();
      //       }, 100);
      //     // }  // if
      //   }, false);  // event listener
      // };  // scrollStop
      //
      // // detect if user stopped scrolling on stack
      // // when the stack is expanded the first time, this automatically comes back as "down"
      // // could user an iterator
      // // call back on expand function
      // let lastTop = stack.scrollTop;
      // scrollStop(function () {
      //     // when scrolling has stopped, detect if up scroll or down scroll
      //     if (stack.scrollTop > lastTop) {
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

    } else if (stack.classList.contains('expandedStack')) {
      // removes the extra 2 polaroids from top and bottom
      unappendOnCollapse(stack);
      collapse(stack);
    }
  }

  function expand(stack) {
    const section = stack.parentNode;
    const polaroids = document.querySelectorAll(`#${section.getAttribute('id')} .stack .polaroid`);
    const date = document.querySelector(`#${section.getAttribute('id')} article`);
    // used to position the stack/date when the stack is expanded snapscrolls
    const stackOffset = stack.getBoundingClientRect().left - (window.innerWidth - 1200)/2;
    const dateOffset = date.getBoundingClientRect().left - (window.innerWidth - 1200)/2;

    // expand the stack
    stack.classList.remove('collapsed');
    stack.classList.add('expandedStack');

    // reposition stack and date to accommodate scroll snap on the stack
    section.classList.add('expandedSection');
    date.classList.add('expandedDate');
    // dynamically generated styles
    stack.style.paddingLeft = `${stackOffset + 50}px`;
    date.style.marginLeft = `${dateOffset}px`;

    // stuff i'm not sure about
    // // expand the stack on top and bottom to make it so there's always a centered polaroid
    // appendPolaroid("initial", stack);
    // // center the carousel on the middle polaroid
    // stack.getElementsByClassName('polaroid')[2].scrollIntoView();
  }

  function collapse(stack) {
    const section = stack.parentNode;
    //const stack = this;
    const date = document.querySelector(`#${section.getAttribute('id')} article`);

    stack.classList.remove('expandedStack');
    stack.classList.add('collapsed');

    // removing styling added in expand function
    section.classList.remove('expandedSection');
    date.classList.remove('expandedDate');
    stack.removeAttribute('style');
    date.removeAttribute('style');

    // center the section on the screen again
    section.scrollIntoView();
  }

  // function captions(stack) {
  //   const polaroids = stack.querySelectorAll('.polaroid');
  //   polaroids.forEach(function (polaroid) {
  //     const caption = document.createTextNode(`${polaroid.querySelector('.film img').getAttribute('alt')}`);
  //     const location = polaroid.getBoundingClientRect();
  //     const thisMargin = getComputedStyle(polaroid).marginLeft;
  //     polaroid.addEventListener('mouseover', function() {
  //       console.log(thisMargin);
  //       // move polaroid over
  //       // polaroid.style.marginLeft = `${thiMargin+30}px`;
  //       // add caption
  //     });
  //     polaroid.addEventListener('mouseout', function() {
  //       // remove caption
  //       polaroid.removeAttribute('style');
  //     });
  //   });
  // }



  //// "bottom" and "top" inputs would work with the infinite scroll function (see comments below)
  //// would dynamically add/remove polaroids from the stack to give the illusion of infinite scroll
  //// i didn't get the "bottom" and "top" inputs to work in time for the deadline
  // function appendPolaroid(direction, stack) {
//     var polaroids = stack.querySelectorAll('.polaroid');
//     var firstChild = polaroids[0];
//     var lastChild = polaroids[polaroids.length - 1];
//     var dupe;
//
//     if ((direction == 'bottom') || (direction == 'top')) {
//       dupe = polaroids[2];  // middle polaroid
//       if (direction == 'bottom') {
//         // scrolling down
//         // append to the bottom, remove from the top
//         stack.appendChild(dupe.cloneNode(true));
//         stack.removeChild(firstChild);
//       } else {
//         // scrolling up
//         // append to the top, remove from the bottom
//         stack.insertBefore(dupe.cloneNode(true), polaroids[0]);
//         stack.removeChild(lastChild);
//       }
//     } else {
//       // append on expand
//       stack.insertBefore(lastChild.cloneNode(true), firstChild);
//       stack.appendChild(firstChild.cloneNode(true));
//     }
//   };
// }());

function unappendOnCollapse(stack) {
  // at this point, will have an indeterminate amount of polaroids
  // remove all, then add back the original 3? or could remove all but middle 3

  // the polaroid in view is the last in the stack, then add the two above it
  const polaroids = stack.querySelectorAll('.polaroid');

  // for (let i = 3; i < polaroids.length; i++) {
  //   stack.removeChild(polaroids[i]);
  // }

  // let i = 0;
  // while (polaroids.length > 3) {
  //   if (i % 2 == 0) {
  //     stack.removeChild(polaroids[0]);
  //   } else {
  //     stack.removeChild(polaroids[polaroids.length-1]);
  //   }
  //   i++;
  // }

  const firstChild = polaroids[0];
  const lastChild = polaroids[polaroids.length-1];
  // indiscriminately remove the top and bottom polariods, 0 and 4
  stack.removeChild(firstChild);
  stack.removeChild(lastChild);
}

}());
