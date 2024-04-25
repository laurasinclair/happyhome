import { Container, Row, Col } from 'react-bootstrap'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Hero, RentalCard, CreateItem } from '@components'

export default function Dashboard({ loading }) {
	const [rentals, setRentals] = useState([])
	const [reload, setReload] = useState(false)

	const fetchData = () => {
		const rentalsInLocalStorage = JSON.parse(localStorage.getItem('rentalsInLocalStorage'))
		setRentals(rentalsInLocalStorage || [])
	}

	useEffect(() => {
		console.log('fetchdata();')
		fetchData()
	}, [reload])

	const deleteRental = (rentalId) => {
		const updatedRentals = rentals.filter(rental => rental.id !== rentalId);
		setRentals(updatedRentals);
		localStorage.setItem('rentals', JSON.stringify(updatedRentals));
		setReload(true)
	}

	const handleAddRental = (newRental) => {
		rentals.push(newRental)
		setRentals([newRental, ...rentals])
	}

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
