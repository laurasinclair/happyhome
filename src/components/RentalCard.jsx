import { Trash, StarFill, Pen } from 'react-bootstrap-icons'
import placeholder from '@img/placeholder_image.jpg'
import { Button } from '@components'
import { Row, Col } from 'react-bootstrap'
import styles from './RentalCard.module.sass'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function RentalCard({ rental, deleteRental}) {
	const navigate = useNavigate()

	const {
		id,
		name,
		country,
		city,
		description,
		neighbourhood,
		review_scores_rating,
		picture_url
	} = rental

	// I should probably get rid of this
	const imageSrc = `https://a0.muscache.com/im/pictures/${picture_url.filename}`
	const [rentalImageSrc, setImageSrc] = useState(imageSrc)


	// it's just prettier
	function truncate(str) {
		return str && str.length > 100 ? str.substring(0, 100) + ' (...)' : str
	}

	// colours change depending on the rating
	const [ratingStyle, setRatingStyle] = useState('')
	useEffect(() => {
		if (review_scores_rating !== undefined) {
			if (review_scores_rating <= 50) {
				setRatingStyle(styles.rentalcard_score_bad)
			} else if (review_scores_rating > 50 && review_scores_rating < 75) {
				setRatingStyle(styles.rentalcard_score_okay)
			} else if (review_scores_rating >= 75) {
				setRatingStyle(styles.rentalcard_score_good)
			}
		}
	}, [review_scores_rating])

	return (
		<div className={styles.rentalcard}>
			<div className={styles.rentalcard_thumbnail}>
				{review_scores_rating && (
					<p className={`${styles.rentalcard_score} ${ratingStyle}`}>
						<StarFill size="15" />
						<span>{(review_scores_rating / 20).toFixed(1)}</span>/5
					</p>
				)}

				<Link to={`/rentals/${id}`}>
					<img
						onError={() => {
							if (rentalImageSrc !== placeholder) setImageSrc(placeholder)
						}}
						src={rentalImageSrc}
						alt={name}
					/>
				</Link>
			</div>
			<Link to={`/rentals/${id}`}>
				<div className={styles.rentalcard_body}>
					<h3>{name}</h3>
					<p>
						<strong>ID:</strong> {id}
					</p>
					<p>
						<strong>Country:</strong> {country}
					</p>
					<p>
						<strong>City:</strong> {city}
						{neighbourhood ? ' 📍 ' + neighbourhood : null}
					</p>
					<p>{truncate(rental.description)}</p>
				</div>
			</Link>

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
							onClick={(e) => {
								e.preventDefault();
								deleteRental(id)
								console.log('delete button clicked')
							}}
						/>
					</Col>
				</Row>
			</div>
		</div>
	)
}
