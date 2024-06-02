import { Container, Row, Col } from 'react-bootstrap'
import React, { useState, useEffect } from 'react'
import { RentalCard, CreateItem, Filter } from '@components'
import { Hero } from '@components/layout'
import { Stats } from '@pages'
import { useRentalsContext } from '@context'

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
				'added item:': newRental.id,
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

				{/* <Stats/> */}
				
				{/* <Row>
					<Col>
						<CreateItem handleAddRental={handleAddRental} />
					</Col>
				</Row> */}

				<Row className="gx4 gx-xl-5">
					{loading ? (
						<Col>
							<div>Loading...</div>
						</Col>
					) : error ? (
						<Col>
							<div>{error}</div>
						</Col>
					) : (
						rentals &&
						rentals.map((rental, index) => {
							return (
								<>
									<Col sm="12" key={rental && rental.id}>
										<RentalCard rental={rental} index={index} deleteRental={deleteRental} />
									</Col>
								</>
							)
						})
					)}
				</Row>
			</Container>
		</>
	)
}
