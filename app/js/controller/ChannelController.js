TwitchViewer.controller('ChannelController', ['$scope', function($scope) {

  var execFile = require('child_process').execFile;

  $scope.searchTerm = '';
  $scope.channels = [];
  $scope.totalSearchResults = 0;
  $scope.loading = null;

  var starred = JSON.parse(localStorage.getItem('starred'));

  if(!(starred instanceof Array)) {
    starred = [];
  }

  $scope.starred = starred;

  $scope.clearResults = function() {
    $scope.searchTerm = '';
    $scope.channels = [];
    $scope.totalSearchResults = 0;

    $scope.starred.forEach(function(name) {
      getChannels(name, function(channels, total) {
        $scope.channels = $scope.channels.concat(channels)
      });
    });
  };

  $scope.clearResults();

  $scope.search = function(term) {
    $scope.channels = [];
    getChannels(term, function(channels, total) {
      $scope.channels = channels;
      $scope.totalSearchResults = total;
    });
    $scope.searchTerm = '';
  };

  function getChannels(term, cb) {
    $scope.loading = 'data';
    $.getJSON('https://api.twitch.tv/kraken/search/streams?q=' + term, function(response) {
      $scope.loading = null;
      cb(response.streams, response._total);
      digest();
    });
  }

  $scope.watch = function(twitchUsername) {
    $scope.loading = 'stream';
    var child = execFile('livestreamer', ['twitch.tv/' + twitchUsername, 'best'], {}, function() {
    });

    child.stdout.on('data', function(data) {
      if(data.indexOf('Starting player') !== -1) {
        $scope.loading = null;
        digest();
      } else {
        console.log(data);
      }
    });

    child.stderr.on('data', function(data) {
      console.log(data);
    });
  };

  $scope.star = function(name) {
    if($scope.isStarred(name)) {
      $scope.starred = $scope.starred.filter(function(starredName) {
        return name !== starredName;
      });
    } else {
      $scope.starred.push(name);
    }
    localStorage.setItem('starred', JSON.stringify($scope.starred));
  };

  $scope.isStarred = function(name) {
    return $scope.starred.indexOf(name) !== -1;
  };

  function digest() {
    if(!$scope.$$phase) {
      $scope.$digest();
    }
  }
}]);