(function() {
  "use strict";

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

  // title photos
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
      if (!stack.classList.contains('expandedStack')) {
        pullTogether(stack);
      }
    });

  });  // forEach

  // on hover effect
  function pushApart(stack) {
    const polaroids = stack.querySelectorAll('.polaroid');
    // first polaroid is unchanged
    for (let i = 1; i < polaroids.length; i++) {
      polaroids[i].classList.remove(`inactive${i+1}`);
      polaroids[i].classList.add(`hover${i+1}`);
    }
  }  // pushApart

  // off hover effect
  function pullTogether(stack) {
    const polaroids = stack.querySelectorAll('.polaroid');
    // first polaroid is unchanged
    for (let i = 1; i < polaroids.length; i++) {
      if (polaroids[i].classList.contains(`hover${i+1}`)) {
        polaroids[i].classList.remove(`hover${i+1}`);
        polaroids[i].classList.add(`inactive${i+1}`);
      }
    }
  }  // pullTogether

  function expandOrCollapse(stack) {
    if (stack.classList.contains('collapsed')) {
      // handle the hover classes that stick on expand
      pullTogether(stack);
      expand(stack);
      // captions(stack);
      // initially adds the extra polaroids on top and bottom
      appendPolaroid('expand', stack);
      // centers the middle polaroid on the screen
      stack.querySelectorAll('.polaroid')[2].scrollIntoView();

      /*!
       * Run a callback function after scrolling has stopped
       * (c) 2017 Chris Ferdinandi, MIT License, https://gomakethings.com
       * @param  {Function} callback The function to run after scrolling
       */
      var scrollStop = function(callback) {
        if (!callback || typeof callback !== 'function') return;
        var isScrolling;
        stack.addEventListener('scroll', function() {
            window.clearTimeout(isScrolling);
            isScrolling = setTimeout(function() {
              callback();
            }, 500);  // timeout before calling the callback
        }, false);  // event listener
      };  // scrollStop

      // detect if user stopped scrolling on stack
      let lastTop = stack.scrollTop;
      let polaroids = stack.querySelectorAll('.polaroid');
      scrollStop(function () {
          // when scrolling has stopped, detect if up scroll or down scroll
          if (stack.scrollTop > lastTop) {
            // down scroll
            // append to the bottom, and remove from the top
            console.log("down");
            appendPolaroid("bottom", stack);
            // scroll back the height of the new polaroid
            stack.scrollBy(0, -lastTop+stack.scrollTop);
          } else if (stack.scrollTop < lastTop) {
            // up scroll
            // append to the top, and remove from the bottom
            console.log("up");
            appendPolaroid("top", stack);
            // scroll back the height of the new polaroid
            stack.scrollBy(0, stack.scrollTop-lastTop);
          }

          // if there's more than 5 polaroids - handle indeterminate scrolling behavior
          while (polaroids.length > 5) {
            // remove last one
            stack.removeChild(polaroids[polaroids.length-1]);
            stack.scrollBy(0, stack.scrollTop-lastTop);
          }

          lastTop = stack.scrollTop;
      });  // scroll stop listener

      // listener for hovering over

    } else if (stack.classList.contains('expandedStack')) {
      // removes the extra 2 polaroids from top and bottom
      unappendOnCollapse(stack);
      collapse(stack);
    }
  }  // expandOrCollapse

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
  }  // expand

  function collapse(stack) {
    const section = stack.parentNode;
    const polaroids = stack.querySelector('.polaroid');
    const date = document.querySelector(`#${section.getAttribute('id')} article`);

    // remove captions if any
    for (let i = 0; i < polaroids.length; i++) {
      if (polaroids[i].querySelector('.caption') != null) {
        let caption = polaroids[i].querySelector('.caption')
        polaroids[i].removeChild(caption);
      }
    }

    stack.classList.remove('expandedStack');
    stack.classList.add('collapsed');

    // removing styling added in expand function
    section.classList.remove('expandedSection');
    date.classList.remove('expandedDate');
    stack.removeAttribute('style');
    date.removeAttribute('style');

    // center the section on the screen again
    section.scrollIntoView();
  }  // collapse

  // function captions(stack) {
  //   const polaroids = stack.querySelectorAll('.expandedStack .polaroid');
  //   polaroids.forEach(function (polaroid) {
  //     let caption = document.createElement('p');
  //     caption.innerHTML = ``${polaroid.querySelector('.film img').getAttribute('alt')}``;  // FIX THIS ABSOLUTE BULLSHIT
  //     caption.className = 'caption';
  //     const location = polaroid.getBoundingClientRect();
  //     const thisMargin = parseInt((window.getComputedStyle(polaroid).getPropertyValue('margin-left')).replace('px', ''));
  //
  //     polaroid.addEventListener('mouseover', function(event) {
  //       if (event.target.parentNode == event.relatedTarget) {
  //         if (polaroid.querySelector('.caption') == null) {
  //           polaroid.insertBefore(caption, polaroid.querySelector('.film'));
  //         }
  //         // move polaroid over
  //         // console.log(thisMargin);
  //         // polaroid.style.marginLeft = `${thisMargin + 50}px`;
  //         // add caption
  //       }
  //     });
  //
  //     polaroid.addEventListener('mouseout', function(event) {
  //       if ((event.target.parentNode == event.relatedTarget) || nextPolaroid(event.target, event.relatedTarget)) {
  //           if (polaroid.querySelector('.caption') != null) {
  //             polaroid.removeChild(polaroid.querySelector('.caption'));
  //         }
  //         // move polaroid back
  //         // polaroid.removeAttribute('style');
  //       }
  //     });
  //   });
  // }

    // function nextPolaroid(target, relatedTarget) {
    //   let img1 = target.querySelector('.film img');
    //   let img2 = relatedTarget.querySelector('.film img');
    //   if (img1)
    //   if (img1 != null && img2 != null) {
    //     img1 = img1.getAttribute('src');
    //   }
    //   const img2 = relatedTarget.querySelector('.film img').getAttribute('src');
    //   if ((img1 != null) && (img2 != null) && (img1 != img2)) {
    //     return true;
    //   }
    //   return false;
    // }



  // function captions(stack) {
  //   stack.addEventListener('mouseover', function(event) {
  //     if (event.target.classList.contains('polaroid') || (event.target.tagName == 'IMG')) {
  //       if ((event.target.parentNode == event.relatedTarget) || ()) {
  //         console.log(event.target);
  //       }
  //     }
  //   });
  // }

  function appendPolaroid(direction, stack, lastTop) {
    var polaroids = stack.querySelectorAll('.polaroid');
    var firstChild = polaroids[0];
    var lastChild = polaroids[polaroids.length - 1];
    var dupe;

    if ((direction == 'bottom') || (direction == 'top')) {
      dupe = polaroids[2];  // middle polaroid
      if (direction == 'bottom') {
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
      stack.insertBefore(lastChild.cloneNode(true), firstChild);
      stack.appendChild(firstChild.cloneNode(true));
    }
  }  // appendPolaroid

function unappendOnCollapse(stack) {
  // at this point, will have 5 polaroids
  const polaroids = stack.querySelectorAll('.polaroid');

  // the polaroid in view (at index 0) is the last in the stack, then add the two above it
  for (let i = 3; i < polaroids.length; i++) {
    stack.removeChild(polaroids[i]);
  }

  // reassign class names to the polaroids
  for (let i = 0; i < polaroids.length; i++) {
    polaroids[i].className = 'polaroid';
    if (i == 0) {
      polaroids[i].classList.add('one');
    } else if (i == 1) {
      polaroids[i].classList.add('two');
    } else {
      polaroids[i].classList.add('three');
    }
    polaroids[i].classList.add(`inactive${i+1}`);
  }
}  // unappendOnCollapse

}());
