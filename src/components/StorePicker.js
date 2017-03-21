import React from 'react';
import { getStoreName } from '../helpers';


class StorePicker extends React.Component {

	// constructor() {
	// 	super();
	// 	this.goToStore = this.goToStore.bind(this);
	// }
	
	goToStore(event){
		event.preventDefault();

		console.log("URL change");
		
		const storeId = this.storeInput.value;

		console.log(`go to ${storeId} `)

		this.context.router.transitionTo(`/store/${storeId}`);  

	}

	render() {
		return (
			<form className='store-selector' onSubmit={this.goToStore.bind(this)}>
				<h2>Please enter a store</h2>
				<input type='text' required placeholder='Store Name' defaultValue={getStoreName()} ref={(input) => { this.storeInput = input}} />
				<button type='submit'>Visit store</button>	
			</form>
		)
	}
}

StorePicker.contextTypes = {
	router: React.PropTypes.object
}

export default StorePicker;