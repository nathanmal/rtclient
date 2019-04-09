// object merge utility
import merge from 'deepmerge';

class helpers
{
	/**
	 * Create an element
	 */
	static create(tag)
	{
		return document.createElement(tag);
	}

	/**
	 * Create a div with className
	 */
	static div(className)
	{
		let div = this.create('div');
		div.className = className;
		return div;
	}

	/**
	 * Deep merge objects
	 */
	static merge()
	{
		return merge(...arguments);
	}

	/**
	 * Capitalize first character of a string
	 */
	static ucfirst(str)
	{
		return str.charAt(0).toUpperCase() + str.slice(1)
	}

}



export default helpers;