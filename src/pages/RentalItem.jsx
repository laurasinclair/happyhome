import { Hero } from '@components'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import { Trash, Pen } from 'react-bootstrap-icons'
import { Button, BackButton, RentalCardScore, RentalCardImage } from '@components'
import styles from '@components/RentalCard.module.sass'
import { useState, useEffect } from 'react'

export default function RentalItem() {
	const storedRentals = localStorage.getItem('rentalsInLocalStorage')

	const [rentals, setRentals] = useState([])
	const [rental, setRental] = useState({})
	const { rentalId } = useParams()

	const navigate = useNavigate()

	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')
	


	// getting all the rentals
	useEffect(() => {
		if (storedRentals.length > 0) {
			try {
				setRentals(JSON.parse(storedRentals))
			} catch {
				setError("Couldn't fetch rentals")
			}
		}
	}, [storedRentals])



	// getting that one rental
	useEffect(() => {
		if (rentals && rentals.length > 0) {
			console.log(rentals[0].id, Number(rentalId))

			const findRental = rentals.find((rental) => {
				return rental.id == Number(rentalId)
			})

			if (findRental) {
				setRental(findRental)
			}

			console.table({
				'Number(rentalId)': Number(rentalId),
				'rentals[0].id': rentals[0].id,
				findRental: findRental
			})

			setError('')
			setLoading(false)
		} else {
			setError('No data to display')
		}
	}, [storedRentals, rentals])


	// info about flat
	useEffect(() => {
		if (rental) {
			console.table({
				rentals: rentals.length,
				'useParams().rentalId': rentalId,
				rental: rental.name,
				'rental.id': rental && rental.id + '',
				'rentals[0]': rentals[0] && rentals[0].name
			})
		}
	}, [rentals, rental])

	return (
		<>
			<main className="main">
				<Container fluid>
					<Row>
						<Col className="p-4">
							<BackButton />
						</Col>
					</Row>

					{loading ? (
						<Row>
							<Col>
								<div>Loading...</div>
							</Col>
						</Row>
					) : error ? (
						<div>{error}</div>
					) : (
						rental && (
							<>
								<Row>
									<Col>
										<Hero category="Rental item" title={rental.name ? rental.name : 'Name unknown'} size="s" />
									</Col>
								</Row>
								<Row className="mb-5">
									<Col>
										<div className={styles.rentalcard_thumbnail}>
											<RentalCardScore review_scores_rating={rental.review_scores_rating || 0} />
											<RentalCardImage image={rental.picture_url} rentalName={rental.name ? rental.name : 'Name unknown'} />
										</div>
									</Col>
									<Col>
										<p>
											<strong>ID:</strong> {rental.id ? rental.id : 'id unknown'}
										</p>
										<p>
											<strong>Country:</strong> {rental.country ? rental.country : 'country unknown'}
										</p>
										<p>
											<strong>City:</strong> {rental.city ? rental.city : 'City unknown'}
											{rental.neighbourhood ? ' 📍 ' + rental.neighbourhood : null}
										</p>
									</Col>
								</Row>
								<Row>
									<Col lg="8" xl="8" className="px-4 mb-4">
										<h3>Description</h3>
										<p>{rental.description ? rental.description : 'No description'}</p>
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
												e.preventDefault()
												console.info('delete button clicked')
												navigate('/')
											}}
										/>
									</Col>
								</Row>
							</>
						)
					)}
				</Container>
			</main>
		</>
	)
}
