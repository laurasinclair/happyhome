import { Trash } from 'react-bootstrap-icons'
import placeholder from '/src/assets/img/placeholder_image.jpg'

export default function FlatCard(props) {
	const { rental, clickToDelete } = props

	function truncate(str) {
		return str.length > 10 ? str.substring(0, 100) + ' (...)' : str
	}

	return (
		<div className="list_card">
			<div className="list_card_thumbnail">
				<img src={placeholder} alt={rental.id} />
			</div>
			<div className="list_card_body">
				<h3>{rental.name}</h3>
				<p>
					<strong>ID:</strong> {rental.id}
				</p>
				<p>
					<strong>Country:</strong> {rental.country}
				</p>
				<p>
					<strong>City:</strong> {rental.city}
					{rental.neighbourhood ? ' 📍 ' + rental.neighbourhood : null}
				</p>
				<p>{truncate(rental.description)}</p>

				<div className="card_button">
					<button id="deleteItem" className="btn btn-primary mt-3" onClick={() => {
						console.log("Delete button clicked")
						clickToDelete(rental.id)}
					}>
						Delete <Trash />
					</button>
				</div>
			</div>
		</div>
	)
}
