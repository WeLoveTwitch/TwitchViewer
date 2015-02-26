TwitchViewer.directive('titleBar', [function() {
    return {
        restrict: 'E',
        templateUrl: 'app/templates/directives/header.html',
        link: function($scope, element) {
            var gui = require('nw.gui');
            var win = gui.Window.get();

            element.on("click", function(event) {
                element.find("button:focus").blur();
            });

            $scope.goFullscreen = function() {
                win.toggleFullscreen();
            };

            $scope.showDevTools = function() {
                win.showDevTools();
            };

            $scope.reload = function() {
                win.reloadIgnoringCache();
            };

            $scope.closeApplication = function() {
                gui.App.closeAllWindows();
            };
        }
    }
}]);
