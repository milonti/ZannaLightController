var $ = require('jquery');
var hue = require('node-hue-api');



function findBridge(){
  hue.nupnpSearch().then(function(bridge){
    console.log("Found bridge: ", bridge);
    console.log(JSON.stringify(bridge));
  }).done();
}

function createBridgeEntry(bridge){

}
