const {remote} = require('electron');
const web = remote.getCurrentWebContents();
const url = require('url');
const $ = require('jquery');

let wv = document.getElementById('tab-viewport');
var activeTab = document.getElementById('tab_colorPicker');
var tabMemory = {
  'tab_colorPicker': remote.getCurrentWebContents();
}

const tabs = {
  "tab_ColorPicker" : "tabColorPicker.html",
  "tab_LightSet"    : "tabLightSet.html"
}

function changeTab(ev){
  if(ev.srcElement == activeTab){
    return; //No need to switch
  }
  activeTab = ev.srcElement;
  wv.src = "../views/"+tabs[activeTab.id];
  console.log("../views/"+tabs[activeTab.id]);
}
