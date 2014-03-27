#!/usr/bin/env node

var express = require('express');
var http = require('http');
var path = require('path');
var color = require('cli-color');
var cli = require('commander');

var app = express();

cli
	.version('0.0.1')
	.option('-p, --port <n>','Set Port (default is 3000)', parseInt)
	cli.on('--help', function(){
	  console.log('  Example Usage:');
	  console.log('');
	  console.log('    $ rjscli -p 3001');
	  console.log('');
	});
	cli.parse(process.argv);

// all environments
app.set('port', cli.port || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


app.post('/', function(req,res){
	var date = new Date(req.body.timestamp*1000);
	//var ts = date.toISOString().match(/(\d{2}:\d{2}:\d{2})/);
	console.log(color.red('['+date+'] ')+color.white(req.body.msg));
	res.send(true);
})

http.createServer(app).listen(app.get('port'), function(){
  console.log(color.yellow('r.js CLI started'));
  console.log(color.white('At port: '+ app.get('port')));
});

