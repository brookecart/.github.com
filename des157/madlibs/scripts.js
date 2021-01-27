(function() {
  "use strict";
  var attributes = ["n2", "adj1", "v1"];
  var labels = ["Noun2", "Adjective1", "Verb1"];
  var i = 0;
  var words = [];

  var currentInput = document.querySelector('input');
  var currentLabel = document.querySelector('label');

  var next = document.getElementById('button');
  next.addEventListener('click', function(event) {
    event.preventDefault();
    words.push(currentInput.value);
    currentInput.value = "";
    if (i == (labels.length)) {  // done with the array
      alert(words);  // print out madlib here
    } else {  // not done with the array
      if (i == (labels.length-1)) {
        next.setAttribute("value", "Get my MadLib!");
      }
      currentInput.setAttribute("id", `${attributes[i]}`);
      currentLabel.innerHTML = `${labels[i]}`;
      currentLabel.setAttribute("for", `${attributes[i]}`);
    }
    i++;
  });
}());
