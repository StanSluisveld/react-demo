import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';
import base from '../base';

class App extends React.Component {
	
	constructor() {
		super();
		//get initial state
		this.addFish = this.addFish.bind(this);
		this.updateFish = this.updateFish.bind(this);
		this.removeFish = this.removeFish.bind(this);
		this.loadSamples = this.loadSamples.bind(this);
		this.addToOrder = this.addToOrder.bind(this);
		this.removeFromOrder = this.removeFromOrder.bind(this);

		this.state = {
			fishes: {},
			order: {},
		};
	}

	

//life cycle method 	Deze methode runt voordat <app> is renderd
	componentWillMount() {
		this.ref = base.syncState(`${this.props.params.storeId}/fishes`
		, {
		context: this,
		state: 'fishes'	
		});

	// kijken of er nog een order in local storage staat
	const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`)

	if(localStorageRef) {
		// update de <App> component order status
		this.setState({
			// JSON order terug zetten naar een  object
			order: JSON.parse(localStorageRef)
		});

	}
}

// life cycle method  zorgt dat de database niet wordt geupdate als je naar een andere pagina gaat
	componentWillUnmount() {
		base.removeBinding(this.ref);
	}
// life cycle method		runt als de props of state veranderd  
	componentWillUpdate(nextProps, nextState) {
	  
		localStorage.setItem(`order-${this.props.params.storeId}`, 
		// local storage kan geen alleen strings verwerken geen objecten
		JSON.stringify(nextState.order));
	}

	addFish(fish) {
		// this.state.fishes.fhish1 = fish;			also a possability 
		// update state
		const fishes = {...this.state.fishes};
		// add new fish
		const timestamp = Date.now();
		fishes[`fish-${timestamp}`] = fish;
		//set state
		this.setState({ fishes }); 
	}

	// update namen uit Inventory.js
	updateFish(key, updatedFish){
		const fishes = {...this.state.fishes};
		fishes[key] = updatedFish;
		this.setState({ fishes }); 
	}

	removeFish(key){
		const fishes = {...this.state.fishes}
		// delete fishes[key] kan niet vanwege firebase koppeling
		fishes[key] = null;
		this.setState({ fishes })
	}



	loadSamples() { 
		this.setState({
			fishes: sampleFishes 
		})
	}

	addToOrder(key) {
		const order = {...this.state.order};
		order[key] = order[key] + 1 || 1;

		this.setState({ order });
	}

	removeFromOrder(key){
		const order = {...this.state.order}
		delete order[key]; // Hier zet je het niet up NULL omdat anders alleen de waarde wordt veranderd
		this.setState({ order });

	}

	render() {
		return (
			<div className="catch-of-the-day">
				<div className="menu">
					<Header tagline="Fresh Seafood Market" />
					<ul className='list-of-fishes'>
						{Object
							.keys(this.state.fishes)
							.map(key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder} />)
						}
					</ul>
				</div>
				<Order 
				fishes={this.state.fishes}
				order={this.state.order}
				params={this.props.params}
				removeFromOrder={this.removeFromOrder}
				 />
				<Inventory 
				loadSamples={this.loadSamples} 
				addFish={this.addFish} 
				removeFish={this.removeFish}
				fishes={this.state.fishes} 
				updateFish={this.updateFish} />
				
				
				
			</div>
			)
	}
}

App.propTypes = {
	params: React.PropTypes.object.isRequired
}

export default App;