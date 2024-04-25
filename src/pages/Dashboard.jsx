import { Container, Row, Col } from 'react-bootstrap'
import React, { useState, useEffect } from 'react'
import { Hero, RentalCard, CreateItem } from '@components'

export default function Dashboard({getRentals}) {
	const [rentals, setRentals] = useState([])
	
	useEffect(() => {
		setRentals(getRentals())
	}, [])


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
						<CreateItem />
					</Col>
				</Row>
				<Row>
					{rentals &&
						rentals.map((rental, index) => {
							return (
								<Col md="6" xl="4" key={rental.id} className="list_item d-flex align-items-stretch">
									<RentalCard rental={rental} />
								</Col>
							)
						})}
				</Row>
			</Container>
		</>
	)
}
