// Import styles & icons
import '@fortawesome/fontawesome-free/css/all.css';
import '../scss/client.scss';
import './shims';
import console from './console';
import helpers from './helpers';
import UserMedia from './usermedia';
import Settings from './settings';
import Bowser from 'bowser';


/**
 * Default configuration for Client
 * @type {[type]}
 */
const _defaultConfig = 
{
	constraints : {
		video: true,
		audio: true
	},

	ui : {
		monitor : {}
	}
}


const _el = (tag) => {
	let element = document.createElement(tag);
	return element;
}

const _div = (className) => {
	let div = _el('div');
	div.className = className;
	return div;
}


class Client
{
	/**
	 * Class constructor
	 * @type {Object}
	 */
	constructor( id, config = {} )
	{
		// Set root element
		this.id      = id;
		this.element = document.getElementById(id);

		if( ! this.element ) {
			console.warn('Element not specified');
			return;
		}

		// Set config
		this.config = helpers.merge(_defaultConfig, config);

		// Check compatibility
		this.compat();

		// Initialize User Media
		this.usermedia = new UserMedia(this.config.constraints, this.video);

		this.addControl( 'capture', { label: 'Capture', icon: 'fas fa-video' }, this.onCaptureClick.bind(this) );
		this.addControl( 'join', { label: 'Join', icon: 'fas fa-sign-in-alt' }, this.onJoinClick.bind(this) );
		this.addControl( 'broadcast', { label: 'Broadcast', icon: 'fas fa-broadcast-tower' }, this.onBroadcastClick.bind(this) );
		this.addControl( 'settings', { label: 'Settings', icon: 'fas fa-cog' }, this.onSettingsClick.bind(this) );

		// Initialize Settings
		this.settings = new Settings(this.ui.controls, { devices: this.usermedia.devices } );

		// Reset the UI to zero state
		this.reset();

	}


	compat()
	{
		const browser = Bowser.getParser(window.navigator.userAgent);

		this.user = browser.getResult();
		
		const compatible = browser.satisfies({
			chrome: ">=53",
			firefox: ">=36",
			edge: ">=12",
			safari: ">=11",
			opera: ">=40",
			mobile: {
				safari: '>=9',
				'android browser': '>=5'
			}
		});

		if( compatible ) {
			console.log('Compatible!');
		} else {
			console.log('Not Compatible!');
		}
		
		console.log('User Agent');
		console.log(this.user);
	}


	onCaptureClick(e){

		const icon  = this.controls.capture.getElementsByTagName('i')[0];
		const label = this.controls.capture.getElementsByTagName('label')[0];

		if( this.isStreaming )
		{
			this.usermedia.stop();
			icon.classList.remove('fa-video-slash');
			icon.classList.add('fa-video');
			label.innerHTML = 'Capture';
		} else {
			this.usermedia.capture();
			icon.classList.remove('fa-video');
			icon.classList.add('fa-video-slash');
			label.innerHTML = 'Stop';
		}
		
	}

	onJoinClick(e){
		console.log('Join');
	}

	onBroadcastClick(e){
		console.log('Broadcast');
	}

	onSettingsClick(e){
		this.settings.toggle();
	}

	/**
	 * Reset to zero state
	 */
	reset()
	{
		// Disconnect from server if connected
		this.disconnect();
		// Stop capturing media
		this.usermedia.stop();

		this.video.srcObject = null;
	}

	/**
	 * Get users webcam & microphone
	 */
	capture()
	{
		this.usermedia.capture( this.config.constraints );
	}

	/**
	 * Connect to a specifc channel ID
	 */
	connect( channel )
	{

	}

	/**
	 * Disconnect from active connection, if exists
	 */
	disconnect()
	{
		if( !! this.connection ) this.connection.close();

		this.connection = null;
	}

	stopStream()
	{
		this.usermedia.stop();
	}


	addControl( name, config, clickFunction )
	{
		if( ! this._controls ) this._controls = {};

		const control = document.createElement('div');

		control.classList.add('control','control-'+name);
		
		// Add button
		const button = document.createElement('button');

		if( !! config.icon )
		{
			const icon = document.createElement('i');
			icon.className = config.icon;
			button.appendChild(icon);
		}

		button.onclick = clickFunction;

		control.appendChild(button);

		// Add label
		const label = document.createElement('label');

		label.innerHTML = config.label || name;

		control.appendChild(label);
		
		this.ui.controls.appendChild(control);

		this._controls[name] = control;
	}

	layer( name )
	{
		if( ! this._layers ) this._layers = {};

		if( !! this._layers[name] ) return this._layers[name];

		const children = this.element.getElementsByClassName('layer-'+name);

		const element = children.length ? children[0] :  document.createElement('div');

		element.classList.add('layer-'+name, 'layer');

		this._layers[name] = element;

		this.element.appendChild(element);

		return this._layers[name];
	}

	/**
	 * @return UI Object
	 */
	get ui() {

		if( !! this._ui ) return this._ui;

		this._ui = {
			monitor : this.layer('monitor'),
			peers : this.layer('peers'),
			chat : this.layer('chat'),
			controls : this.layer('controls'),
		}

		// Add video if not already there
		if( ! this._ui.monitor.getElementsByTagName('video').length )
		{
			this._ui.monitor.append(document.createElement('video'));
		}

		return this._ui;
	}

	/**
	 * Get the monitor video
	 */
	get video()
	{
		return this.ui.monitor.getElementsByTagName('video').item(0);
	}

	/**
	 * Get added control elements
	 */
	get controls()
	{
		this._controls = this._controls || {};

		return this._controls;
	}


	get isStreaming()
	{
		return !! this.usermedia.stream;
	}



}


export default Client;