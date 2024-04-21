import { Container, Row, Col } from 'react-bootstrap'
import React, { useState } from 'react'
import './FlatList.sass'
import FlatCard from '@components/FlatCard'
import Hero from '@components/Hero'
import rentalsData from '@/assets/data/rentals.json'

export default function FlatList() {
	const [rentals, setRentals] = useState(rentalsData.results)

	const deleteRental = rentalId => {
		const filteredRentals = rentals && rentals.filter(rental => {
            return rental.id !== rentalId;
        });
		setRentals(filteredRentals)
	}

	return (
		<>
		<Container fluid>
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