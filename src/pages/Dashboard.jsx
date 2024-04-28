import { Container, Row, Col } from 'react-bootstrap'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Hero, RentalCard, CreateItem, Fetch } from '@components'

export default function Dashboard() {
	const [rentals, setRentals] = useState([]);

	useEffect(() => {
	  fetch('/src/assets/data/rentals.json')
		.then((resp) => {
		  return resp.json();
		})
		.then((data) => {
		  setRentals([...data.results]);
		})
		.catch((err) => {
			console.log('Problem fetching data')
		})
	}, []);

	useEffect(() => {
		console.log('1. Updated rentals length:', rentals.length);
		
		if (rentals.length > 0) {
			localStorage.setItem('rentalsInLocalStorage', JSON.stringify(rentals));
			console.log('Rentals array saved to local storage');
		}
	}, [rentals]);

	// const [rentals, setRentals] = useState([])
	// const [rentalsInLocalStorage, setRentalsInLocalStorage] = useState([])
	// const [loading, setLoading] = useState(true)
	// const [err, setError] = useState('oops')
	
	// <Fetch />

	// useEffect(() => {
	// 	axios
	// 		.get('/src/assets/data/rentals.json')
	// 		.then((resp) => {
	// 			const temp = [...resp.data.results]
	// 			setRentals(temp)
	// 			console.log('1. ❗️ useEffect() - rentals', rentals && rentals.length)
	// 		})
	// 		.then(() => {
	// 			// console.log('2. ❗️ useEffect() - tempRentals', tempRentals && tempRentals.length)

	// 			localStorage.setItem('rentalsInLocalStorage', JSON.stringify(rentals))
	// 		})
	// 		.then ((resp) => {
	// 			console.log('2. ❗️ useEffect() - items in local storage', (JSON.parse(localStorage.getItem('rentalsInLocalStorage')).length))
	// 		})
	// 		.catch((error) => setError('oops', error))
	// 		.finally(() => {
	// 			setLoading(false)
	// 		})
	// }, [])


	const deleteRental = (rentalId) => {
		try {
			const findIndex = rentals.findIndex(rental => rental.id === rentalId);
			const tempRentals = [...rentals]
			tempRentals.splice(findIndex, 1)
			setRentals(tempRentals)
			localStorage.setItem('rentalsInLocalStorage', JSON.stringify(rentals));

			console.log('index of deleted item:', findIndex, `rentals.length is ${rentals.length}`)
		} catch (error) {
			console.error('Error deleting rental:', error);
		}
	}

	const handleAddRental = (newRental) => {
		try {
			const tempRentals = [...rentals]
			tempRentals.unshift(newRental)
			setRentals(tempRentals)
			localStorage.setItem('rentalsInLocalStorage', JSON.stringify(rentals));
			
			console.log('added item:', newRental.id, `rentals.length is ${rentals.length}`)
		} catch (error) {
			console.error('Error adding rental:', error);
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
					<Col>
						{rentals && rentals.length > 0 ? (
							rentals.map((rental, index) => {
								return (
									<Col md="6" xl="4" key={rental && rental.id} className="list_item d-flex align-items-stretch">
										<RentalCard rental={rental} index={index} deleteRental={deleteRental} />
									</Col>
								)})
							) : <div>Loading...</div> 
							}
					</Col>
				</Row>
			</Container>
		</>
	)
}
