import { Hero } from '@components'
import { Link, useParams } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import { Trash, StarFill, Pen } from 'react-bootstrap-icons'
import placeholder from '@img/placeholder_image.jpg'
import { Button, BackButton } from '@components'
import styles from '@components/RentalCard.module.sass'
import { useState, useEffect } from 'react'

export default function RentalItem({ loading }) {
	const [rental, setRental] = useState({})
	const rentals = JSON.parse(localStorage.getItem('rentalsInLocalStorage'))

	// getting the right rental
	// const rentals = JSON.parse(localStorage.getItem('rentalsInLocalStorage'))
	// setRental(rentals.find((rental) => rental.id === useParams().rentalId))
	// console.log('rentals from localStorage', rentals)

	useEffect(() => {
		setRental(rentals.find((rental) => rental.id === useParams().rentalId))
	}, [])

	const {
		id,
		name,
		country,
		city,
		description,
		neighbourhood,
		review_scores_rating,
		// picture_url: { filename }
	} = rental


	// setting placeholder for thumbnail
	// const rentalImage = picture_url?.filename || placeholder;
	const rentalImage = placeholder;


	// adjusting rating background color to rating
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
						<Hero category="Rental item" title={name} size="s" />
					</Col>
				</Row>
				<Row className="mb-5">
					<Col>
						<div className={styles.rentalcard_thumbnail}>
							{review_scores_rating && (
								<p className={`${styles.rentalcard_score} ${ratingStyle}`}>
									<StarFill size="15" />
									<span>{(review_scores_rating / 20).toFixed(1)}</span>/5
								</p>
							)}

							<img
								src={rentalImage}
								alt={name}
								style={{borderRadius: '8px'}}
							/>
						</div>
					</Col>
					<Col>
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
					</Col>
				</Row>
				<Row>
					<Col lg="8" xl="8" className="px-4 mb-4">
						<h3>Description</h3>
						<p>{description}</p>
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
