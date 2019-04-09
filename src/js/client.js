import UserMedia from './usermedia';
import UserInterface from './userinterface';
import UserChat from './userchat'

import merge from 'deepmerge';

const defaultConfig = 
{
	constraints : {
		video: true,
		audio: true
	},

	ui : {}
}

class Client
{
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
		this.config = merge(defaultConfig, config);
		
		// Initialize the UI
		this.usermedia = new UserMedia(this.config.constraints);
	}



	initInterface()
	{	

		if( this.element.getElementsByClassName('monitor').length )
		{
			this.monitor = this.element.getElementsByClassName('monitor')[0];
		} else {
			this.monitor = this.element.createElement('div')
		}

		// Add video
		this.video = this.element.getElementsByTagName('video')[0] || document.createElement('video');
		this.video.setAttribute('id','rtc-usermedia');
		this.video.setAttribute('autoplay', '');
		this.video.setAttribute('muted', '');

		this.element.appendChild(this.video);

		if( this.config.chat && this.config.chat.enabled )
		{
			// Add chat layer
		}
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

	stopStream()
	{
		this.usermedia.stop();
	}

}


export default Client;