var url = require('url');
var $ = require('jquery');

var hue = require('node-hue-api');

function findBridge(){
    hue.nupnpSearch().then(function(bridge){
      console.log("Found bridge: ", bridge);
      console.log(JSON.stringify(bridge));
    }).done();
}

const tabs = {
  "tab_ColorPicker" : "tabColorPicker.html",
  "tab_LightSet"    : "tabLightSet.html"
}

var activeTab = document.getElementById("tab_LightSet");

function changeTab(ev){
  if(ev.srcElement != activeTab){
    var tName = ev.srcElement.id;
    activeTab.classList.remove("active");
    document.getElementById("view"+activeTab.id.substring(3)).classList.remove('tactive');
    activeTab = ev.srcElement;
    activeTab.classList.add("active");
    document.getElementById("view"+activeTab.id.substring(3)).classList.add('tactive');
  }
}

function loadTab(idTarget, htmlPath){
  $.get(htmlPath, function(data) {
    $("#"+idTarget).html(data);
  })
}
