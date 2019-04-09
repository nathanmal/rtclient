import helpers from './helpers';
import console from './console';



class Settings
{
	constructor( parent, config = {} )
	{
		this.parent  = parent;

		this.element = helpers.div('settings');

		this.parent.appendChild(this.element);

		this.init();
	}

	init()
	{
		this.header = helpers.div('header');

		this.title  = helpers.create('h2');
		this.title.innerHTML = 'Settings';

		this.close  = helpers.div('close');
		this.close.innerHTML = '<i class="fas fa-times"></i>';
		this.close.onclick = this.toggle.bind(this);

		this.header.appendChild(this.title);
		this.header.appendChild(this.close);

		this.element.appendChild(this.header);

		this.addSetting('videosource', { label: 'Video Input', input: this.getVideoInput() });

	}

	getVideoInput()
	{

	}


	addSetting( name, config = {} )
	{
		let setting = helpers.div('setting setting-'+name);
		let text = config.label || name;
		let label = helpers.create('label');
		label.innerHTML = text;
		setting.appendChild(label);

		this.element.appendChild(setting);
	}


	toggle()
	{
		this.element.classList.toggle('show');
	}

}


export default Settings;