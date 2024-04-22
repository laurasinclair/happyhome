import { Container, Row, Col } from 'react-bootstrap'
import React, { useState } from 'react'
import { RentalCard, CreateItem, UnsplashImage } from '@components'
import rentalsData from '@/assets/data/rentals.json'
const unsplashUrl = 'https://api.unsplash.com/search/photos?query=home&per_page=20&client_id=482IFLBmLCZUSRJAKS453o-0vaF6t1jLvbOUa40iYZo'

export default function Dashboard() {
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
		setRentals([newRental, ...rentals])
	}

	return (
		<>
			<Container fluid>
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
									<RentalCard rental={rental} clickToDelete={deleteRental} />
								</Col>
							)
						})}
				</Row>
			</Container>
		</>
	)
}
