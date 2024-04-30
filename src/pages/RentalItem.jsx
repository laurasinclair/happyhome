import { Hero } from '@components'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import { Trash, Pen } from 'react-bootstrap-icons'
import { Button, BackButton, RentalCardScore, RentalCardImage } from '@components'
import styles from '@components/RentalCard.module.sass'
import { useState, useEffect } from 'react'

export default function RentalItem() {
	const [rentals, setRentals] = useState(() => {
		const storedRentals = localStorage.getItem('rentalsInLocalStorage')
		if (storedRentals) {
			return JSON.parse(storedRentals)
		}
		return []
	})
	const [rental, setRental] = useState({})
	const { rentalId } = useParams()
	const navigate = useNavigate()

	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')
	const [success, setSuccess] = useState('')


	useEffect(() => {
		if (rentals === undefined) return
		setSuccess(`Yeah all the rentals are here ${rentals.length}`)
	}, [rentals, 'rentalsInLocalStorage'])

	// fetch(localStorage.getItem('rentalsInLocalStorage'))
	// .then((resp) => {
	// 	resp.json();
	// })
	// .then((data) => {
	// 	console.log('data', data.results)
	// })
	// .catch((err) => {
	// 	console.log(err)
	// 	setError('Problem fetching data.')
	// })
	// get items from local storage
	// try {
	// 	setRentals(JSON.parse(localStorage.getItem('rentalsInLocalStorage')))

	// 	if (rentals && rentals.length > 0) {
	// 		setSuccess(`1. Items parsed from local storage - ❤️ ${rentals.length} ❤️`)
	// 	}
	// 	// console.log('1. items in local storage', rentalsInLocalStorage.length)
	// }
	// catch {
	// 	setError(`1. Items NOT parsed from local storage.`)
	// 	// console.log('Couldn\'t fetch items')
	// }

	// useEffect(() => {
	// 	// trying to find a match between useParams().rentalId and any rental.id
	// 	try {
	// 		if (rentals && rentals.length > 0) {
	// 			setRental(rentals.find((rental) => rental.id === rentalId))
	// 			setSuccess(`Rental ${rental.id} found, baby.`)
	// 		}
	// 	}
	// 	catch {
	// 		setError('Couldn\'t find that specific rental')
	// 	}
	// }, [])

	// const tempRentals = [...rentalsInLocalStorage]
	// console.log('2. tempRentals', tempRentals.length)

	// useEffect(() => {
	// 	try {
	// 		if (rentals.length > 0) {
	// 			setRental(tempRentals)
	// 		}
	// 	} catch {
	// 		setError('tempRentals.length <= 0')
	// 	}
	// }, [])

	// useEffect(() => {
	// 	try {
	// if (rentals.length > 0) {
	// console.log('rentals?', rentals)

	// const theRental = rentals.find((rental) => rental.id === rentalId)

	// console.log('theRental', theRental)

	// 	if (theRental) {
	// 		setRental(theRental)
	// 		setLoading(false)
	// 	}
	// }
	// console.log(theRental)
	// console.log(`4. ❗️ useEffect() - rentals length ${rentals && rentals.length} | ${rental && rental.name}`)
	// 	} catch {
	// 		setError('rentals.find((rental) => rental.id === rentalId) did not give us shit')
	// 	}
	// }, [])

	const { id, name, country, city, description, neighbourhood, review_scores_rating, picture_url } = rental || {}

	return (
		<>
			<main className="main">
				<Container fluid>
					<Row>
						<Col className="p-4">
							<BackButton />
						</Col>
					</Row>

					<div>{success}</div>
					<div>{error}</div>

					{loading ? (
						<Row>
							<Col>
								<div>{error ? error : 'Loading...'}</div>
							</Col>
						</Row>
					) : (
						<>
							<Row>
								<Col>
									<Hero category="Rental item" title={name} size="s" />
								</Col>
							</Row>
							<Row className="mb-5">
								<Col>
									<div className={styles.rentalcard_thumbnail}>
										<RentalCardScore review_scores_rating={review_scores_rating} />
										<RentalCardImage image={picture_url} rentalName={name} style={{ border: '10px solid red' }} />
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
											e.preventDefault()
											console.log('delete button')
											navigate('/')
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
