/////////////////////
/* Text Colouriser */
/////////////////////

var clipboard;

function Colouriser() {}

// Page load
$(function() {
  "use strict";
  
  $(".colourControls").spectrum({
    color: "black",
    preferredFormat: "hex",
    showInput: true,
    showInitial: true,
    move: function(color) {
      Colouriser.updateOutput();
    }
  });
  
  $("#colourOptionGradient").hide();
  $("#colourOptionRandom").hide();
  
  $('#input').bind('input propertychange', Colouriser.updateOutput);
  
  clipboard = new ClipboardJS(".btnCopy");
});

// Displays controls to accompany the selected colour mode, and updates the output.
Colouriser.modeChanged = function() {
  "use strict";

  var value = document.getElementById("colourMode").value;

  value === "solid" ? $("#colourOptionSolid").show() : $("#colourOptionSolid").hide();
  value === "gradient" ? $("#colourOptionGradient").show() : $("#colourOptionGradient").hide();
  value === "random" ? $("#colourOptionRandom").show() : $("#colourOptionRandom").hide();

  Colouriser.updateOutput();
}

// Generates colourised text code for the current text input, using the selected colour mode (and colour values).
// Displays the results in the output textarea.
Colouriser.updateOutput = function() {
  "use strict";

  var resultCode = "",
      resultHTML = "",
      text = document.getElementById("input").value;

  if (text != "") {
    switch (document.getElementById("colourMode").value) {
      case "solid":
        var c = $("#solidColour").spectrum("get");
        resultCode = "^" + c + ";" + text;
        resultHTML = "<span style='color:" + c + "';>" + text + "</span>";
        break;
      case "gradient":
        var cFrom = $("#fromColour").spectrum("get").toHex(),
            cTo = $("#toColour").spectrum("get").toHex(),
            r = hexToInt(cFrom, 0, 2),
            rStep = (hexToInt(cTo, 0, 2) - r) / (text.length - 1),
            g = hexToInt(cFrom, 2, 4),
            gStep = (hexToInt(cTo, 2, 4) - g) / (text.length - 1),
            b = hexToInt(cFrom, 4, 6),
            bStep = (hexToInt(cTo, 4, 6) - b) / (text.length - 1),
            i,
            currentColour,
            char;
        // Create gradient colour values
        for (i = 0; i < text.length; i++) {
          currentColour = intToHex(Math.ceil(r)) + intToHex(Math.ceil(g)) + intToHex(Math.ceil(b));

          char = text.charAt(i);

          if (char === " ") {
            // Ignore spaces
            resultCode += " ";
            resultHTML += " ";
          } else {
            // Add color code in front of current character
            resultCode += '^#' + currentColour + ';' + char;
            resultHTML += "<span style='color:#" + currentColour + ";'>" + char + "</span>";
          }

          // Increase values for next step
          r += rStep;
          g += gStep;
          b += bStep;
        }
        break;
      case "random":
        var char = "";

        for (var i = 0; i < text.length; i++) {
          char = text.charAt(i);
          if (char == " ") {
            resultCode += " ";
            resultHTML += " ";
          } else {
            var c = randomColour();
            resultCode += "^" + c + ";" + char;
            resultHTML += "<span style='color:" + c + ";'>" + char + "</span>";  
          } 
        }      
        break;
    }

    resultCode += "^reset;";
  }

  // Set Output
  document.getElementById("output").value = resultCode;

  document.getElementById("outputHTML").innerHTML = resultHTML;
}
