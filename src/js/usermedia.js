import console from './console';
import Bowser from 'bowser';

// Cross browserizing shims
navigator.getUserMedia  = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;

class Usermedia
{
	/**
	 * Class constructor
	 */
	constructor( constraints )
	{
		this.constraints = constraints || {};
		this.stream = null;

		// event bindings
		this.onStream    = this.onStream.bind(this);
		this.handleError = this.handleError.bind(this);
	}

	/**
	 * Capture control over video/audio devices
	 */
	capture()
	{
		// this.media.getUserMedia(this.constraints).then(this.onStream).catch(this.handleError);
		navigator.getUserMedia(this.constraints, this.onStream, this.handleError);
		// (this.constraints).then(this.onStream).catch(this.handleError);
	}

	/**
	 * Output the stream to DOM element
	 */
	outputTo(element)
	{
		this.video = element;
	}

	/**
	 * Handles stream from device capture
	 */
	onStream(stream)
	{	
		// Must stop any existing streams to start new one
		this.stop();

		// Set the stream
		this.stream = stream;

		// Stream output if set
		if( this.video )
		{
			this.video.srcObject = this.stream;
			this.video.play();
		}
	}

	/**
	 * Stop capturing stream and output
	 */
	stop()
	{
		if( !! this.stream ) {

			// Stop video playback
			if( this.video ) {
				this.video.srcObject = null;
				this.video.stop();
			}

			// Must stop individual tracks
			this.tracks.forEach( (track) => { 
				console.log('Stopping Track', track);
				track.stop();
			});

			this.stream = null;
		}
	}

	/**
	 * Get the available devices
	 */
	getDevices()
	{	
		if( this.devices ) return this.devices;

		this.capture();

		this.media.enumerateDevices().then(function(devices){
			console.log('Devices', devices);
			this.devices = devices;
			this.stop();
			return this.devices;
		}.bind(this)).catch(this.handleError);
	}

	/**
	 * Error handler
	 */
	handleError(error)
	{
		console.log(error);
	}


	/**
	 * Get the browser media object
	 */
	get media()
	{
		return navigator.mediaDevices;
	}

	/**
	 * Get the current stream's tracks (if exists)
	 */
	get tracks()
	{
		return !! this.stream ? this.stream.getTracks() : null;
	}


}

export default Usermedia;