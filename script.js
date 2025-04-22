var popup = null;
var base_url = "https://raw.githubusercontent.com/cidkardi/edhack/main";

function http_get(url, callback, headers=[], method="GET", content=null) {
  var request = new XMLHttpRequest();
  request.addEventListener("load", callback);
  request.open(method, url, true);

  if (window.__EDPUZZLE_DATA__ && window.__EDPUZZLE_DATA__.token) {
    headers.push(["authorization", window.__EDPUZZLE_DATA__.token]);
  }
  for (const header of headers) {
    request.setRequestHeader(header[0], header[1]);
  }
  
  request.send(content);
}

// [Keep all other original functions exactly the same until openPopup()]

function openPopup(assignment) {
  var media = assignment.medias[0];
  // [Keep all original variable declarations]
  
  var base_html = `
<!DOCTYPE html>
<html>
<head>
  <!-- [Keep original head content] -->
  <script>
    var base_url = "${base_url}";
    // [Keep original get_tag() and http_get() functions]
    get_tag("style", base_url+"/app/popup.css");
    get_tag("script", base_url+"/app/popup.js");
    get_tag("script", base_url+"/app/videospeed.js");
  </script>
</head>
<!-- [Keep rest of HTML template] -->
`;

  // [Keep rest of original openPopup() function]
}

// [Keep all remaining original functions exactly as they were]
