import React from 'react';
import { formatPrice } from '../helpers'



class Fish extends React.Component {
	render() { 

		const {details, index} = this.props;
		const isAvailable = details.status === 'available';
		const buttonText = isAvailable ? 'add to order' : 'sold out!';


		return (
		<li className="menu-fish">
			<img src={details.image} alt={details.name} />
			<h3 className="fish-name">
				{details.name}
				<span className='price'>{formatPrice(details.price)}</span>
				<formatPrice />
			</h3> 
			<p>
				{details.desc}
			</p>
			<button onClick={() => this.props.addToOrder(index)} disabled={!isAvailable}>{buttonText}</button>

		</li>

		) 
	}
}

Fish.propTypes = {
	details: React.PropTypes.object.isRequired,
	addToOrder: React.PropTypes.func.isRequired,
	index: React.PropTypes.string.isRequired,
}

export default Fish; 