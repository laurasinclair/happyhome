import { Container, Row, Col } from 'react-bootstrap'
import React, { useState, useEffect } from 'react'
import { Hero, RentalCard, CreateItem } from '@components'

export default function Dashboard({getRentals, loading}) {
	const [rentals, setRentals] = useState([])
	
	useEffect(() => {
		setRentals(getRentals())
	}, [])

	const deleteRental = (rentalId) => {
		const updatedRentals = rentals.filter(rental => rental.id !== rentalId);
		setRentals(updatedRentals);
		localStorage.setItem('rentalsInLocalStorage', JSON.stringify(updatedRentals));
	}

	const handleAddRental = (newRental) => {
		const updatedRentals = JSON.parse(localStorage.getItem('rentalsInLocalStorage'))
		updatedRentals.push(newRental)
		setRentals([newRental, ...rentals])
		localStorage.setItem('rentalsInLocalStorage', JSON.stringify(updatedRentals));
	}


	return (
		<>
			<Container fluid>
				<Row>
					<Col>
						<Hero title="Admin dashboard" size="m" />
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
									<RentalCard rental={rental} deleteRental={deleteRental} />
								</Col>
							)
						})}
				</Row>
			</Container>
		</>
	)
}
