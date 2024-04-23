import { Container, Row, Col } from 'react-bootstrap'
import React, { useState } from 'react'
import { Hero, RentalCard, CreateItem } from '@components'

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
		// gimmethedata(newRental);
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
						rentals.map((rental) => {
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
