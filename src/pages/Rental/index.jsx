import { Hero } from '@components/layout'
import { useRentalsContext } from '@context'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import { Trash, Pen } from 'react-bootstrap-icons'
import { Button, BackButton, RentalCardScore, RentalCardImage } from '@components'
import styles from '@components/rentals/RentalCard/RentalCard.module.sass'
import { useState, useEffect } from 'react'

export default function Rental() {
	const [rental, setRental] = useState({})
	const { rentalId } = useParams()

	const navigate = useNavigate()

	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')
	const { rentals, setRentals } = useRentalsContext()

	useEffect(() => {
		if (rentals && rentals.length > 0) {
			const findRental = rentals.find((rental) => {
				return rental.id == Number(rentalId)
			})

			if (findRental) {
				setRental(findRental)
			}

			setLoading(false)
			setError('')
		} else {
			setError('No data to display')
		}
	}, [rentals])

	const deleteRental = (rentalId) => {
		try {
			const findIndex = rentals.findIndex((rental) => rental.id === rentalId)
			const tempRentals = [...rentals]
			tempRentals.splice(findIndex, 1)
			setRentals(tempRentals)
			localStorage.setItem('rentalsInLocalStorage', JSON.stringify(tempRentals))
		} catch (error) {
			setError('Error deleting rental:', error)
		}
	}

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
						<Row>
							<Col>
								<div>{error}</div>
							</Col>
						</Row>
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
											<RentalCardImage picture_url={rental.picture_url} rentalName={rental.name ? rental.name : 'Name unknown'} />
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
												deleteRental(rental.id)
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
