var url = require('url');
var $ = require('jquery');

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

function loadTabFromHtml(idTarget, htmlPath){
  $.get(htmlPath, function(data) {
    $("#"+idTarget).append(data);
  })
}
