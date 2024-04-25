import { Container, Row, Col } from 'react-bootstrap'
import React, { useState, useEffect } from 'react'
import { Hero, RentalCard, CreateItem } from '@components'

export default function Dashboard({ rentals, loading }) {
	const [data, setData] = useState([])
	const [reload, setReload] = useState(false)

	const fetchData = () => {
		const storedData = JSON.parse(localStorage.getItem('rentals'))
		setData(storedData || [])
	}

	useEffect(() => {
		console.log('fetchdata();')
		fetchData()
	}, [reload])

	const deleteRental = (rentalId) => {

		const indexToRemove = data.findIndex((rental) => rental.id === rentalId)

		if (indexToRemove !== -1) {
			data.splice(indexToRemove, 1)
			localStorage.setItem('rentals', JSON.stringify(data))
		}

		setReload((prev) => !prev)
	}

	const handleAddRental = (newRental) => {
		rentals.push(newRental)
		setRentals([newRental, ...rentals])
	}

	// localStorage.setItem('rentals', JSON.stringify(rentals))

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
									<RentalCard rental={rental} index={index} clickToDelete={deleteRental} />
								</Col>
							)
						})}
				</Row>
			</Container>
		</>
	)
}
