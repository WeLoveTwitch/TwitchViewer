var execFile = require('child_process').execFile;

var username = 'Raynoir';

var child = execFile('livestreamer', ['twitch.tv/' + username, 'best'], {});

child.stdout.on('data', function(data) {
	console.log(data);
});

child.stderr.on('data', function(data) {
	console.log(data);
});