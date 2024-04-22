import { Container, Row, Col } from 'react-bootstrap'
import React, { useState } from 'react'
import { FlatCard, CreateItem } from '@components';
import rentalsData from '@/assets/data/rentals.json'

export default function FlatList() {
	const [rentals, setRentals] = useState(rentalsData.results)

	const deleteRental = rentalId => {
		const filteredRentals = rentals && rentals.filter(rental => {
            return rental.id !== rentalId;
        });
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
				{rentals && rentals.map((rental) => {
					return (
						<Col md="6" xl="4" key={rental.id} className="list_item d-flex align-items-stretch">
							<FlatCard rental={rental} clickToDelete={deleteRental} />
						</Col>
					)
				})}
			</Row>
		</Container>
		</>
	)
}
