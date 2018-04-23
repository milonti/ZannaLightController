const {remote} = require('electron');
const web = remote.getCurrentWebContents();
const url = require('url');
const $ = require('jquery');

let wv = document.getElementById('tab-viewport');
var activeTab = document.getElementById('tab_ColorPicker');
var tabMemory = {
  'tab_ColorPicker': web.id,
}

const tabs = {
  "tab_ColorPicker" : "tabColorPicker.html",
  "tab_LightSet"    : "tabLightSet.html"
}

function changeTab(ev){
  if(ev.srcElement == activeTab){
    return; //No need to switch
  }
  //Check for old tab in memory
  if(tabMemory[ev.srcElement.id] == undefined){
    tabMemory[activeTab.id] = web.id;
    activeTab = ev.srcElement;
    wv.src = "../views/"+tabs[activeTab.id];
  }
  else {

  }

}
