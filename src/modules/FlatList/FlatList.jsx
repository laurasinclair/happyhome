import { Container, Row, Col } from 'react-bootstrap'
import React, { useState } from 'react'
import './FlatList.sass'
import FlatCard from '/src/components/FlatCard/FlatCard'
import rentalsData from './rentals.json'

export default function FlatList() {
	const [rentals, setRentals] = useState(rentalsData.results)

	const deleteRental = rentalId => {
        console.log("Deleting rental with ID:", rentalId);
		const filteredRentals = rentals && rentals.filter(rental => {
            return rental.id !== rentalId;
        });
        console.log(filteredRentals)
		setRentals(filteredRentals)
	}

	return (
		<Container fluid>
			<Row>
				{rentals && rentals.map((rental) => {
					return (
						<Col lg="6" xl="4" key={rental.id} className="list_item d-flex align-items-stretch">
							<FlatCard rental={rental} clickToDelete={deleteRental} />
						</Col>
					)
				})}
			</Row>
		</Container>
	)
}
