class console
{
	static log()
	{
		const client = document.getElementById('rtclient');

		let chat = client.getElementsByClassName('layer-chat');

		if( chat.length )
		{	
			chat = chat[0];
			
			const message = document.createElement('div');
			message.classList.add('message');
			message.innerHTML = arguments[0];

			chat.appendChild(message);
		}
		

		window.console.log(...arguments);
	}
}

export default console;