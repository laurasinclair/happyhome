import { Container, Row, Col } from 'react-bootstrap'
import React, { useState, useEffect } from 'react'
import { Hero, RentalCard, CreateItem } from '@components'

export default function Dashboard({ loading }) {
	const [rentals, setRentals] = useState([])

	const fetchData = () => {
		const rentalsInLocalStorage = JSON.parse(localStorage.getItem('rentalsInLocalStorage'))
		setRentals(rentalsInLocalStorage || [])

		if (rentals.length > 0) {
			console.log(`fetchdata(); - rentals.length is ${rentals.length}`)
		}
	}

	const deleteRental = (rentalId) => {
		const findIndex = rentals.findIndex(rental => rental.id === rentalId);
		console.log('index of deleted item:', findIndex, `rentals.length is ${rentals.length}`)

		const tempRentals = [...rentals]
		tempRentals.splice(findIndex, 1)
		setRentals(tempRentals)
		localStorage.setItem('rentalsInLocalStorage', JSON.stringify(rentals));
	}

	const handleAddRental = (newRental) => {
		const tempRentals = [...rentals]
		tempRentals.unshift(newRental)
		setRentals(tempRentals)
		localStorage.setItem('rentalsInLocalStorage', JSON.stringify(rentals));
		console.log('added item:', newRental.id, `rentals.length is ${rentals.length}`)

	}

	useEffect(() => {
		
		fetchData();

		return () => {

		}
	}, [])

	if (loading) return <div> loading... </div>

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
									<RentalCard rental={rental} index={index} deleteRental={deleteRental} />
								</Col>
							)
						})}
				</Row>
			</Container>
		</>
	)
}
