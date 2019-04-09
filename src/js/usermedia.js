import console from './console';



class Usermedia
{
	/**
	 * Class constructor
	 */
	constructor( constraints, video )
	{
		this.constraints = constraints || {};
		this.stream = null;
		this.autoPlay = false;

		if( !! video ) this.streamTo(video);

		console.log('Usermedia video', this.video);

		// event bindings
		this.onStream    = this.onStream.bind(this);
		this.handleError = this.handleError.bind(this);
	}

	/**
	 * Capture control over video/audio devices
	 */
	capture( success, error )
	{
		const onSuccess = !! success ? success : this.onStream;
		const onError   = !! error   ? error   : this.handleError;
		// this.media.getUserMedia(this.constraints).then(this.onStream).catch(this.handleError);
		navigator.getUserMedia(this.constraints, onSuccess, onError);
		// (this.constraints).then(this.onStream).catch(this.handleError);
	}

	/**
	 * Output the stream to DOM element
	 */
	streamTo(element)
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
		if( this.video && this.autoPlay )
		{
			this.video.srcObject = this.stream;
			this.video.play();
		}

		if( this.autoClose )
		{
			this.stop();
			this.autoClose = false;
		}
	}

	/**
	 * Stop capturing stream and output
	 */
	stop()
	{
		if( !! this.stream ) {

			console.log('Stop Capture', this.stream );

			// Stop video playback
			if( !! this.video ) {
				this.video.pause();
				this.video.srcObject = null;
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
	 * Error handler
	 */
	handleError(error)
	{
		console.log(error);
	}

	get devices()
	{
		if( !! this._devices ) return this._devices;

		this.capture( function(stream){
			navigator.mediaDevices.enumerateDevices().then(function(devices){
				console.log('Devices', devices);
				this._devices = devices;
				stream.getTracks().forEach( (track) => { track.stop(); } );
				return this._devices;
			}.bind(this)).catch(this.handleError);
		}.bind(this));

		
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