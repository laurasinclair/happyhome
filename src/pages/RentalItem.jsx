import { Hero } from '@components'
import { Link, useParams } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import { Trash, StarFill, Pen } from 'react-bootstrap-icons'
import placeholder from '@img/placeholder_image.jpg'
import { Button } from '@components'
import styles from '@components/RentalCard.module.sass'
import { useState, useEffect } from 'react'

export default function RentalItem({ rentals }) {
    // setting up the right page
	const { name, review_scores_rating, country, id, neighbourhood, city, description } = rentals.results.find((rental) => rental.id === useParams().rentalId)


    // adjusting rating background color to rating
	const [ratingStyle, setRatingStyle] = useState('')

	useEffect(() => {
		// pass 2 arguments to it:
		if (review_scores_rating !== undefined) {
			if (review_scores_rating <= 50) {
				setRatingStyle(styles.rentalcard_score_bad)
			} else if (review_scores_rating > 50 && review_scores_rating < 75) {
				setRatingStyle(styles.rentalcard_score_okay)
			} else if (review_scores_rating >= 75) {
				setRatingStyle(styles.rentalcard_score_good)
			}
		} // 1. a function...
	}, [review_scores_rating])

	return (
		<main className="main">
			<Container fluid>
				<Row>
					<Col>
						<Hero title="Rental item" lead="Lorem ipsum dolor sit, amet consectetur adipisicing elit." />
					</Col>
				</Row>
				<h3>{name}</h3>




                <div className={styles.rentalcard}>
			<div className={styles.rentalcard_thumbnail}>
				{review_scores_rating && (
					<p className={`${styles.rentalcard_score} ${ratingStyle}`}>
						<StarFill size="15" />
						<span>{(review_scores_rating / 20).toFixed(1)}</span>/5
					</p>
				)}

					<img src={placeholder} className={styles.rentalcard_thumbnail_img} alt="" />
			</div>
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
				<p>{description}</p>
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










			</Container>
		</main>
	)
}
