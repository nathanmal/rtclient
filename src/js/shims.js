// Cross browserizing shims
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;

if( ! navigator.mediaDevices )
{
	console.warn('mediaDevices not present!');
}

/*console.log('navigator.getUserMedia', navigator.getUserMedia);
console.log('navigator.webkitGetUserMedia', navigator.webkitGetUserMedia);
console.log('navigator.mozGetUserMedia', navigator.mozGetUserMedia);
console.log('navigator.msGetUserMedia', navigator.msGetUserMedia);
*/