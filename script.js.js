var popup = null;
var base_url = "https://raw.githubusercontent.com/cidkardi/edhack/main"; // Changed to your repo

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

function init() {
  if (window.location.hostname == "edpuzzle.hs.vc") {
    alert("To use this, drag this button into your bookmarks bar. Then, run it when you're on an Edpuzzle assignment.");
  }
  else if ((/https{0,1}:\/\/edpuzzle.com\/assignments\/[a-f0-9]{1,30}\/watch/).test(window.location.href)) {
    getAssignment();
  }
  else if (window.canvasReadyState) {
    handleCanvasURL();
  }
  else if (window.schoologyMoreLess) {
    handleSchoologyURL();
  }
  else {
    alert("Please run this script on an Edpuzzle assignment. For reference, the URL should look like this:\nhttps://edpuzzle.com/assignments/{ASSIGNMENT_ID}/watch");
  }
}

// [Rest of the functions remain the same until openPopup()]

function openPopup(assignment) {
  // ... (previous code remains the same until base_html)
  
  var base_html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    * {font-family: 'Poppins', Arial, sans-serif;}
  </style>
  <script>
    var base_url = "${base_url}";
    function http_get(url, callback) {
      var request = new XMLHttpRequest();
      request.addEventListener("load", callback);
      request.open("GET", url, true);
      request.send();
    }
    function get_tag(tag, url) {
      console.log("Loading "+url);
      http_get(url, function(){
        if ((""+this.status)[0] == "2") {
          var element = document.createElement(tag);
          element.innerHTML = this.responseText;
          document.getElementsByTagName("head")[0].appendChild(element);
        }
        else {
          console.error("Could not fetch "+url);
        }
      });
    }
    
    get_tag("style", base_url+"/app/popup.css");
    get_tag("script", base_url+"/app/popup.js");
    get_tag("script", base_url+"/app/videospeed.js");
  </script>
  <title>Answers for: ${media.title}</title>
</head>
<body>
  <!-- [Rest of the HTML remains the same] -->
</body>
</html>`;

  popup = window.open("about:blank", "", "width=600, height=400");
  popup.document.write(base_html);
  popup.document.close();

  popup.document.assignment = assignment;
  popup.document.edpuzzle_data = window.__EDPUZZLE_DATA__;
  popup.window.onload = () => {getMedia(assignment)};
}

// [Rest of the original functions (getMedia, parseQuestions, etc.) stay unchanged]