var TwitchViewer = angular.module('TwitchViewer', []);

TwitchViewer.run([function () {

  var gui = require('nw.gui');
  var win = gui.Window.get();
  var nativeMenuBar = new gui.Menu({type: "menubar"});
  try {
    nativeMenuBar.createMacBuiltin("TwitchViewer");
    win.menu = nativeMenuBar;
  } catch (ex) {

  }

}]);