var $ = require('jquery');
var hue = require('node-hue-api');


function findBridges(){
  var bridges;
  hue.nupnpSearch().then(function(bridges){
    console.log("Found bridges: ", bridges);
    for(b in bridges){
      console.log(bridges[b])
      // console.log(JSON.stringify(bridges[b],replacer));
    }
    return bridges;
  }).done();
}

function replacer(k,v){
  return v === undefined ? null : v;
}

function createBridgeEntry(bridge){

}
