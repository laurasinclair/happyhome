import { Hero } from '@components'
import { Link, useParams } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import { Trash, Pen } from 'react-bootstrap-icons'
import { Button, BackButton, RentalCardScore, RentalCardImage } from '@components'
import styles from '@components/RentalCard.module.sass'
import { useState, useEffect } from 'react'

export default function RentalItem({getRentals, loading}) {
	const [rental, setRental] = useState([])
	const rentals = getRentals();

	const findRental = rentals.find((rental) => rental.id === useParams().rentalId)

	useEffect(() => {
		setRental(findRental)
	}, [])

	const { 
		id, 
		name, 
		country, 
		city, 
		description, 
		neighbourhood, 
		review_scores_rating, 
		picture_url 
	} = rental || {}

	console.log('rental', rental)



	return (
		<>
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
				
				{rental && (
					<>
					<Row className="mb-5">
						<Col>
							<div className={styles.rentalcard_thumbnail}>
								<Link to={`/rentals/${id}`}>
									<RentalCardScore review_scores_rating={review_scores_rating} />
									<RentalCardImage image={picture_url} rentalName={name} style={{border: '10px solid red'}} />
								</Link>
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
									console.log('delete button')
								}}
							/>
						</Col>
					</Row>
					</>
				)}
			</Container>
		</main>
		</>
	)
}
