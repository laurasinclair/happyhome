import { Container, Row, Col } from 'react-bootstrap'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Hero, RentalCard, CreateItem, Fetch } from '@components'
import { useRentalsContext } from '../components/RentalsContext'

export default function Stats() {
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')
	const { rentals, setRentals } = useRentalsContext()

	useEffect(() => {
		if (rentals && rentals.length > 0) {
			setLoading(false)
			setError('')
		}
	}, [rentals])

	const rentalsPerCountry = rentals.reduce((acc, rental) => {
		if (rental && rental.country) {
			acc[rental.country] = (acc[rental.country] || 0) + 1
		}
		return acc
	}, {})

	const rentalsPerCity = rentals.reduce((acc, rental) => {
		if (rental && rental.city) {
			acc[rental.city] = (acc[rental.city] || 0) + 1
		}
		return acc
	}, {})

	return (
		<>
			<Container fluid>
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
						rentals && (
							<>
								<Col>
									<div className="bg-white">{rentals.length} rentals</div>
								</Col>
								<Col>
									<div className="bg-white">
										{Object.entries(rentalsPerCountry).map(([country, count], index) => (
											<div key={index}>
												{country}: {count}
											</div>
										))}
									</div>
								</Col>
								<Col>
									<div className="bg-white">
										{Object.entries(rentalsPerCity).map(([city, count]) => (
											<div key={city}>
												{city}: {count}
											</div>
										))}
									</div>
								</Col>
							</>
						)
						// rentals &&
						// rentals.map((rental, index) => {
						// 	return (
						// 		<Col md="6" xl="4" key={rental && rental.id} className="list_item d-flex align-items-stretch">
						// 			<RentalCard rental={rental} index={index} deleteRental={deleteRental} />
						// 		</Col>
						// 	)
						// })
					)}
				</Row>
			</Container>
		</>
	)
}
