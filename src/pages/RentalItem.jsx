import { Hero } from '@components'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import { Trash, Pen } from 'react-bootstrap-icons'
import { Button, BackButton, RentalCardScore, RentalCardImage } from '@components'
import styles from '@components/RentalCard.module.sass'
import { useState, useEffect } from 'react'

export default function RentalItem() {
	const [rentals, setRentals] = useState([])
	const [rental, setRental] = useState({})
	const { rentalId } = useParams();
	const navigate = useNavigate();


	const fetchData = () => {
		const rentalsInLocalStorage = JSON.parse(localStorage.getItem('rentalsInLocalStorage'))
		setRentals(rentalsInLocalStorage || [])

		if (rentals.length > 0) {
			console.log(`fetchdata(); - rentals.length is ${rentals.length}`)
		}
	}

	console.log('useParams().rentalId', rentalId)

	useEffect(() => {
		fetchData();
	}, [])



	// const findIndex = rentals.findIndex(rental => rental.id === rentalId);
	// console.log('index of current rental', findIndex)

	// const tempRentals = [...rentals]
	// tempRentals.splice(findIndex, 1)
	// setRentals(tempRentals)


	// const [rentals, setRentals] = useState([])

	// const fetchData = () => {
	// 	const rentalsInLocalStorage = JSON.parse(localStorage.getItem('rentalsInLocalStorage'))
	// 	setRentals(rentalsInLocalStorage || [])

	// 	if (rentals.length > 0) {
	// 		console.log(`fetchdata(); - rentals.length is ${rentals.length}`)
	// 	}
	// }



	useEffect(() => {
		// const loadedRental = JSON.parse(localStorage.getItem("rentals"));
		// const allRentals = loadedRental || rentalsJSON;
		// const currentRental = allRentals.find(
		//   (rental) => rental.id.toString() === rentalId
		// );
		// setRental(currentRental);

		// console.log('?')

		return () => {
			// console.log('currentRental?', currentRental);
		}
	  }, []);
	
	//   console.log(rental);

	// useEffect(() => {
	// 	const rentalsData = getRentals();
	// 	setRentals(rentalsData)
	// 	console.log(getRentals().length)

	// 	const findRental = rentalsData.find((rental) => rental.id === rentalId);
	// 	setRental(findRental)
	// }, [getRentals, useParams().rentalId])

	// console.log(rental)

	const { 
		id, 
		name, 
		country, 
		city, 
		description, 
		neighbourhood, 
		review_scores_rating, 
		picture_url 
	} = rental || {};


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
