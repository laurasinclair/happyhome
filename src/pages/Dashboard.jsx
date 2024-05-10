import { Container, Row, Col } from 'react-bootstrap'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Hero, RentalCard, CreateItem, Fetch } from '@components'
import { useRentalsContext } from '../components/RentalsContext'

export default function Dashboard() {
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')
	const { rentals, setRentals } = useRentalsContext()

	useEffect(() => {
		if (rentals && rentals.length > 0) {
			setLoading(false)
			setError('')
		}
	}, [rentals])


	const deleteRental = (rentalId) => {
		try {
			const findIndex = rentals.findIndex((rental) => rental.id === rentalId)
			const tempRentals = [...rentals]
			tempRentals.splice(findIndex, 1)
			setRentals(tempRentals)
			localStorage.setItem('rentalsInLocalStorage', JSON.stringify(rentals))

			console.table({
				'rentals.length': rentals.length,
				'index of deleted item:': findIndex, 
			})
		} catch (error) {
			setError('Error deleting rental:', error)
		}
	}

	const handleAddRental = (newRental) => {
		try {
			const tempRentals = [...rentals]
			tempRentals.unshift(newRental)
			setRentals(tempRentals)
			localStorage.setItem('rentalsInLocalStorage', JSON.stringify(rentals))

			console.table({
				'rentals.length': rentals.length,
				'added item:': newRental.id
			})
		} catch (error) {
			console.error('Error adding rental:', error)
		}
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
				{loading ? (
						<Row>
							<Col>
								<div>Loading...</div>
							</Col>
						</Row>
					) : error ? (
						<Row>
							<Col>
								<div>{error}</div>
							</Col>
						</Row>
					) : (
						rentals &&
						rentals.map((rental, index) => {
							return (
								<Col md="6" xl="4" key={rental && rental.id} className="list_item d-flex align-items-stretch">
									<RentalCard rental={rental} index={index} deleteRental={deleteRental} />
								</Col>
							)
						})
					)}
				</Row>
			</Container>
		</>
	)
}
