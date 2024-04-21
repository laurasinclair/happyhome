import { Trash, StarFill } from 'react-bootstrap-icons'
import placeholder from '@img/placeholder_image.jpg'
import Button from '@components/Button'
import styles from './FlatCard.module.sass';

export default function FlatCard(props) {
	const { rental, clickToDelete } = props

	function truncate(str) {
		return str.length > 10 ? str.substring(0, 100) + ' (...)' : str
	}

	return (
		<div className={styles.flatcard}>
			<div className={styles.flatcard_thumbnail} style={{ backgroundImage: 'url(' + placeholder + ')' }}>
				{rental.review_scores_rating && <p className={styles.flatcard_score}><StarFill size="15" /><span>{(rental.review_scores_rating / 20).toFixed(1)}</span>/5</p>}
			</div>
			<div className={styles.flatcard_body}>
				<div>
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
				</div>

				<div className="card_button">
					<Button />
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
