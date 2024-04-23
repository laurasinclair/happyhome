import { Trash, StarFill, Pen } from 'react-bootstrap-icons'
import placeholder from '@img/placeholder_image.jpg'
import { Button, UnsplashImage } from '@components'
import { Row, Col } from 'react-bootstrap'
import styles from './RentalCard.module.sass'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function RentalCard({ index, rental, clickToDelete }) {
	function truncate(str) {
		return str && str.length > 100 ? str.substring(0, 100) + ' (...)' : str
	}

	const [ratingStyle, setRatingStyle] = useState('')

	useEffect(() => {
		// pass 2 arguments to it:
		if (rental.review_scores_rating !== undefined) {
			if (rental.review_scores_rating <= 50) {
				setRatingStyle(styles.rentalcard_score_bad)
			} else if (rental.review_scores_rating > 50 && rental.review_scores_rating < 75) {
				setRatingStyle(styles.rentalcard_score_okay)
			} else if (rental.review_scores_rating >= 75) {
				setRatingStyle(styles.rentalcard_score_good)
			}
		} // 1. a function...
	}, [rental.review_scores_rating]) // 2. and an array
	// 1. The function passed to useEffect is a callback function. This will be called after the component renders.
	// 2. The second argument is an array, called the dependencies array. This array should include all of the values that our side effect relies upon.

	return (
		<div className={styles.rentalcard}>
			<div className={styles.rentalcard_thumbnail}>
				{rental.review_scores_rating && (
					<p className={`${styles.rentalcard_score} ${ratingStyle}`}>
						<StarFill size="15" />
						<span>{(rental.review_scores_rating / 20).toFixed(1)}</span>/5
					</p>
				)}

				<Link to={`/rentals/${rental.id}`}>
					<UnsplashImage index={index} classes={styles.rentalcard_thumbnail_img /* to improve, not connected to component */} name={rental.name} />
					<img src={placeholder} className={styles.rentalcard_thumbnail_img} alt="" />
				</Link>
			</div>
			<div className={styles.rentalcard_body}>
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

			<div className={styles.rentalcard_footer}>
				<Row>
					<Col className="pe-md-1">
						<Button text="Edit" type="primary" fullWidth iconRight={<Pen />} />
					</Col>
					<Col className="ps-md-1">
						<Button
							text="Delete"
							type="secondary"
							fullWidth
							iconRight={<Trash />}
							onClick={() => {
								clickToDelete(rental.id)
							}}
						/>
					</Col>
				</Row>
			</div>
		</div>
	)
}
