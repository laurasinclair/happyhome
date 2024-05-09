import { Container, Row, Col } from 'react-bootstrap'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Hero, RentalCard, CreateItem, Fetch } from '@components'

export default function Dashboard() {
	const storedRentals = localStorage.getItem('rentalsInLocalStorage')

	const [rentals, setRentals] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')

	useEffect(() => {
		if (storedRentals && storedRentals.length > 0) {
			try {
				setRentals(JSON.parse(storedRentals))
			} catch {
				setError("Couldn't fetch rentals")
			}
		} else {
			fetch('/src/assets/data/rentals.json')
				.then((resp) => {
					return resp.json()
				})
				.then((data) => {
					setRentals(data.results)
				})
				.catch((error) => {
					setError('Problem fetching data.', error)
				})
			}
	}, [storedRentals])

	useEffect(() => {
		if (rentals && rentals.length > 0) {
			setLoading(false)
			setError('')

			localStorage.setItem('rentalsInLocalStorage', JSON.stringify(rentals))

			console.table({
				'rentals:': rentals.length,
				'loading:': loading,
				'error': error,
				'Rentals array saved to local storage': true
			})
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
