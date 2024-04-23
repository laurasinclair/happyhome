import { Container, Row, Col } from 'react-bootstrap'
import React, { useState } from 'react'
import { Hero, RentalCard, CreateItem, UnsplashImage } from '@components'

// TO TRY
// Load Unsplash pic array
// 1. Grab images in the order they come (image[0], image[1], image[2])
// 2. Grab all data in rentalsdata.json
// 3. Create a new array by adding 1 image to each object
// HOW THE FUCK DOES IT WORK WITH NEW ITEMS  🤯

export default function Dashboard({rentalsData, gimmethedata}) {
	const [rentals, setRentals] = useState(rentalsData.results)

	const deleteRental = (rentalId) => {
		const filteredRentals =
			rentals &&
			rentals.filter((rental) => {
				return rental.id !== rentalId
			})
		setRentals(filteredRentals)
	}

	const handleAddRental = (newRental) => {
		gimmethedata(newRental);
		setRentals([newRental, ...rentals])
	}

	return (
		<>
			<Container fluid>
				<Row>
					<Col>
						<Hero 
							title="Admin dashboard" 
							size="m"
						/>

					</Col>
				</Row>
				<Row>
					<Col>
						<CreateItem handleAddRental={handleAddRental} />
					</Col>
				</Row>
				<Row>
					{rentals &&
						rentals.map((rental, index) => {
							return (
								<Col md="6" xl="4" key={rental.id} className="list_item d-flex align-items-stretch">
									<RentalCard rental={rental} index={index} clickToDelete={deleteRental} />
								</Col>
							)
						})}
				</Row>
			</Container>
		</>
	)
}
