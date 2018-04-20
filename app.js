var express = require("express");
var {app, BrowserWindow} = require("electron");
var hue = require("node-hue-api");
var url = require("url");
var path = require("path");

//Basic window creation
function createWindow(){
  win = new BrowserWindow({width:800,height: 600,show: false})
  global.win = win;
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'views/index.html'),
    protocol: 'file:',
    slashes: true
  }))

  win.on('ready-to-show',() => {
    win.show();
  })

  win.on('closed',() => {
    win=null;
  })
}

exports.consolelog = function(msg){
  console.log(msg+"\n from renderer");
}

app.on('ready', createWindow);
app.on('window-all-closed', () => {
  console.log('Closing application');
  app.quit();
});
