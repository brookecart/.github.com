(function() {
  "use strict";
  console.log("reading js");

        // start scripts
        const mainContent = document.getElementsByTagName('main')[0];
        const startButton = document.querySelector('button');
        startButton.addEventListener('click', function() {
          // set up form
          mainContent.removeChild(startButton);

          const form = document.createElement('form');

          const stylingDiv = document.createElement('div');
          stylingDiv.setAttribute("id", "inputArea");
          form.appendChild(stylingDiv);

          // initializing the form to first field
          const input = document.createElement('input');
          input.setAttribute("type", "text");
          input.setAttribute("class", "currentInput");
          input.setAttribute("id", "music");
          stylingDiv.appendChild(input);

          const label = document.createElement('label');
          label.setAttribute("for", "music");
          label.innerHTML = "genre of music";
          stylingDiv.appendChild(label);

          const button = document.createElement('button');
          button.setAttribute("id", "formButton");
          button.innerHTML = "next";
          form.appendChild(button);

          mainContent.appendChild(form);

          // processing the form
          const attributes = ["adj1", "pn1", "adj2", "bp", "adv", "anim", "ptv"];
          const labels = ["adjective", "plural noun", "adjective", "body part", "adverb", "animal", "past tense verb"];
          let i = 0;
          let words = [];

          const currentInput = document.querySelector('input');
          const currentLabel = document.querySelector('label');

          const next = document.getElementById('formButton');
          next.addEventListener('click', function(event) {
            event.preventDefault();
            if ((currentInput.value == null) || (currentInput.value == "")) {
              alert(`Hey! Give me a ${currentLabel.innerHTML}!`);
            }
            words.push(currentInput.value);
            currentInput.value = "";
            if (i == (labels.length)) {  // done with the array
              // print out mad lib
              mainContent.removeChild(mainContent.children[0]); // should delete form tag, which will be the only child
              const madLibTag = document.createElement('p');
              madLibTag.setAttribute("id", "madLibOut");
              madLibTag.innerHTML =
                `I went to a <span class=\"libWord\">${words[0]}</span> concert last weekend, and the band was called the
                <span class=\"libWord\">${words[1][0].toUpperCase()}${words[1].substring(1,words.length+1)}</span>
                <span class=\"libWord\">${words[2][0].toUpperCase()}${words[2].substring(1,words.length+1)}</span>.
                My <span class=\"libWord\">${words[3]}</span> friend had a spare ticket because their uncle broke his
                <span class=\"libWord\">${words[4]}</span>. The show went <span class=\"libWord\">${words[5]}</span>
                before the lead singer turned into a <span class=\"libWord\">${words[6]}</span> and
                <span class=\"libWord\">${words[7]}</span> away.`;
              mainContent.appendChild(madLibTag);

              // image
              const body = document.getElementsByTagName('body')[0];
              body.setAttribute("id", "image");

            } else {  // more fields to be filled in
              currentInput.setAttribute("id", `${attributes[i]}`);
              currentLabel.innerHTML = `${labels[i]}`;
              currentLabel.setAttribute("for", `${attributes[i]}`);
              if (i == (labels.length-1)) {  // at last item in array
                next.setAttribute("value", "Get my MadLib!");
              }  // if
            }  // else nested
          i++;
          });  // next event listener
        });  // start button event listener
}());
