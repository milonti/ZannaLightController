const TabGroup = require('electron-tabs');
const {remote} = require('electron');
const web = remote.getCurrentWebContents();
const $ = require('jquery');
let tabGroup = new TabGroup();

let tab = tabGroup.addTab({
    title: "Color Picker",
    src: "../views/colorPickerTab.html",
    visible: true,
    active: true
  });

let tab2 = tabGroup.addTab({
  title: "Googley",
  visible: true,
  webviewAttributes: {
    'nodeintegration':true,
    'disablewebsecurity' :true,
    'guestinstance': web.id,
  },
})
