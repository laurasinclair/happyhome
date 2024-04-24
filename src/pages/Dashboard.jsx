import { Container, Row, Col } from 'react-bootstrap'
import React, { useState } from 'react'
import { Hero, RentalCard, CreateItem } from '@components'

export default function Dashboard({ rentals, loading }) {
	// const [rentals, setRentals] = useState([])

	// useEffect(() => {
	// 	axios
	// 		.get(rentalsJSON)
	// 		.then(function (data) {
	// 			setRentals(data.results)
	// 		})
	// 		.catch(function (err) {
	// 			console.log('oh no!', err)
	// 			setLoading(false)
	// 		})
	// 		.finally(function () {})
	// }, [])

	// if (loading) return <div> loading... </div>


	const deleteRental = (rentalId) => {
		const filteredRentals =
			rentals &&
			rentals.filter((rental) => {
				return rental.id !== rentalId
			})
		setRentals(filteredRentals)
	}

	const handleAddRental = (newRental) => {
		rentals.push(newRental)
		setRentals([newRental, ...rentals])
	}

	localStorage.setItem('rentals', JSON.stringify(rentals))
	
	localStorage.setItem('title', 'hello')

	if (loading) return <div> loading... </div>

	return (
		<>
			<Container fluid>
				<Row>
					<Col>
						<Hero 
							title="Admin dashboard" 
							size="m"
						/>

					</Col>
				</Row>
				<Row>
					<Col>
						<CreateItem handleAddRental={handleAddRental} />
					</Col>
				</Row>
				<Row>
					{rentals && rentals.map((rental, index) => {
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