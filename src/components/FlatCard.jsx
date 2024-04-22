import { Trash, StarFill } from 'react-bootstrap-icons'
import placeholder from '@img/placeholder_image.jpg'
import { Button } from '@components';
import styles from './FlatCard.module.sass'

export default function FlatCard(props) {
	const { rental, clickToDelete } = props

	function truncate(str) {
		return str && str.length > 100 ? str.substring(0, 100) + ' (...)' : str
	}

	return (
		<div className={styles.flatcard}>
			<div className={styles.flatcard_thumbnail} style={{ backgroundImage: 'url(' + placeholder + ')' }}>
				{rental.review_scores_rating && (
					<p className={styles.flatcard_score}>
						<StarFill size="15" />
						<span>{(rental.review_scores_rating / 20).toFixed(1)}</span>/5
					</p>
				)}
			</div>
			<div className={styles.flatcard_body}>
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

			<div className={styles.flatcard_footer}>
				<Button
					text="Delete"
					type="secondary"
					fullWidth
					iconRight={<Trash />}
					onClick={() => {
						clickToDelete(rental.id)
					}}
				/>
			</div>
		</div>
	)
}
