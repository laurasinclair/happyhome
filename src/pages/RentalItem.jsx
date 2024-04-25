import { Hero } from '@components'
import { Link, useParams } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import { Trash, StarFill, Pen } from 'react-bootstrap-icons'
import placeholder from '@img/placeholder_image.jpg'
import { Button, BackButton } from '@components'
import styles from '@components/RentalCard.module.sass'
import { useState, useEffect } from 'react'

export default function RentalItem({ loading }) {
	// getting the right rental
	const rentals = JSON.parse(localStorage.getItem('rentals'))
	// console.log('rentals from localStorage', rentals)

	const rental = rentals.find((rental) => rental.id === useParams().rentalId)
	console.log('rental from rentals from localStorage', rental)

	// setting placeholder for thumbnail
	const imageSrc = `https://a0.muscache.com/im/pictures/${rental.picture_url.filename}`
	const [rentalImageSrc, setImageSrc] = useState(imageSrc)

	// adjusting rating background color to rating
	const [ratingStyle, setRatingStyle] = useState('')
	useEffect(() => {
		if (rental.review_scores_rating !== undefined) {
			if (rental.review_scores_rating <= 50) {
				setRatingStyle(styles.rentalcard_score_bad)
			} else if (rental.review_scores_rating > 50 && rental.review_scores_rating < 75) {
				setRatingStyle(styles.rentalcard_score_okay)
			} else if (rental.review_scores_rating >= 75) {
				setRatingStyle(styles.rentalcard_score_good)
			}
		}
	}, [])


	// to style maybe later
	if (loading) return <div> loading... </div>

	return (
		<main className="main">
			 <Container fluid>
				<Row>
					<Col className="p-4">
						<BackButton />
					</Col>
				</Row>
				<Row>
					<Col>
						<Hero category="Rental item" title={rental.name} size="s" />
					</Col>
				</Row>
				<Row className="mb-5">
					<Col>
						<div className={styles.rentalcard_thumbnail}>
							{rental.review_scores_rating && (
								<p className={`${styles.rentalcard_score} ${ratingStyle}`}>
									<StarFill size="15" />
									<span>{(rental.review_scores_rating / 20).toFixed(1)}</span>/5
								</p>
							)}

							<img
								onError={() => {
									if (rentalImageSrc !== placeholder) setImageSrc(placeholder)
								}}
								src={rentalImageSrc}
								alt={rental.name}
								style={{borderRadius: '8px'}}
							/>
						</div>
					</Col>
					<Col>
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
					</Col>
				</Row>
				<Row>
					<Col lg="8" xl="8" className="px-4 mb-4">
						<h3>Description</h3>
						<p>{rental.description}</p>
					</Col>
				</Row>

				<Row className="mt-4">
					<Col className="pe-md-1">
						<Button text="Edit" type="primary" fullWidth iconRight={<Pen />} />
					</Col>
					<Col className="ps-md-1">
						<Button
							text="Delete"
							link="/"
							type="secondary"
							fullWidth
							iconRight={<Trash />}
							onClick={(e) => {
								e.preventDefault();
								console.log('heeyeyyye')
								// clickToDelete({id})
							}}
						/>
					</Col>
				</Row>
			</Container>
		</main>
	)
}
