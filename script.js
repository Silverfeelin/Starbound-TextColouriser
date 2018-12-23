$(function() {
  "use strict";

  // Set feature background image based on time of day.
  var time = new Date().getHours(), path;  
  path = time >= 18 || time < 6 ? "imgs/bgNight.jpg" : "imgs/bgDay2.jpg";  
  document.getElementById("featureBackground").style.backgroundImage = "url('" + path +  "')";
});

// Returns a hexadecimal string (values 0-255) matching the given integral value, with at least two characters in the resulting string.
function intToHex(n) {
  "use strict";

  if (n > 255) {
    n = 255;
  }

  var hex = n.toString(16);
  if (hex.length === 1) {
    return "0" + hex;
  } else {
    return hex;
  }
}

// Returns an integer matching the given hexadecimal value.
function hexToInt(str, startIndex, endIndex) {
  "use strict";
  startIndex = typeof startIndex !== 'undefined' ? startIndex : 0;
  endIndex = typeof endIndex !== 'undefined' ? endIndex : str.length;

  return parseInt(str.substring(startIndex, endIndex), 16);
}

// Returns a random hexadecimal colour (#RRGGBB)
function randomColour() {
  "use strict";

  var hex = "0123456789abcdef".split(""),
      result = "#";

  for (var i = 0; i < 6; i++) {
    result += hex[Math.floor(Math.random() * 16)]; 
  }

  return result;
}
