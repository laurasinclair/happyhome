import { Container, Row, Col } from 'react-bootstrap'
import React, { useState, useEffect } from 'react'
import { Hero, RentalCard, CreateItem } from '@components'

export default function Dashboard({ loading }) {
	const rentalsArray = JSON.parse(localStorage.getItem('rentals'))

	console.log('rentals from localStorage?', rentalsArray)

	const [rentals, setRentals] = useState([])
	
	console.log(rentals)
	useEffect(() => {
		setRentals(rentalsArray)

	}, [rentalsArray])

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

	// const handleAddRental = (newRental) => {
	// 	console.log('adding new flat')
	// 	// rentals.unshift(newRental) // just a test
	// 	// setRentals([newRental, ...rentals])

	// 	let rentalsArray = localStorage.getItem('rentals');
    
	// 	if (rentalsArray) {
	// 		rentalsArray = JSON.parse(rentalsArray);
	// 	} else {
	// 		// If the array doesn't exist in local storage, initialize it as an empty array
	// 		rentalsArray = [];
	// 	}
	
	// 	// Step 3: Push the new item to the array
	// 	rentalsArray.push(newRental);
	
	// 	// Step 4: Convert the updated array to a string
	// 	const updatedArrayString = JSON.stringify(rentalsArray);
	
	// 	// Step 5: Store the updated array back in local storage
	// 	localStorage.setItem('rentals', updatedArrayString);

	// 	console.log(JSON.parse(localStorage.getItem('rentals')))
	// }

	// localStorage.setItem('rentals', JSON.stringify(rentals))
	
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
						{/* <CreateItem handleAddRental={handleAddRental} /> */}
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
