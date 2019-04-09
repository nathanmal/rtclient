import jQuery from 'jquery';
import Client from './js/client';
import './scss/demo.scss';



jQuery(function($){
	
	let c = {};

	c.log = function(msg)
	{
		console.log(msg);
		$('#console').prepend(msg + '<br/>');
	}

	let client = new Client('rtclient');

	$('#capture').click(function(e){
		client.usermedia.capture();
	});

	$('#sources').click(function(e){
		client.usermedia.getDevices();
	});

	$('#stop').click(function(e){
		c.log('Stopping streams');
		client.stopStream();
	});

});