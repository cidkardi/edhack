var video_script = null;

if (typeof base_url == "undefined") {
  var base_url = "https://raw.githubusercontent.com/cidkardi/edhack/main";
}

function http_exec(url) {
  http_get(url, function(){
    eval(this.responseText);
  });
}

function skip_video() {
  var button = document.getElementById("skipper");
  button.disabled = true; 
  button.value = "Downloading script...";
  http_exec(base_url+"/app/skipper.js");
}

function answer_questions() {
  var button = document.getElementById("answers_button");
  button.disabled = true;
  button.value = "Downloading script...";
  http_exec(base_url+"/app/autoanswers.js");
}
