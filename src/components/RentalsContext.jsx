import { createContext, useContext, useEffect, useState } from 'react'

const uri = `mongodb://lsinclair:${import.meta.env.MONGODB_PWD}@happyhome.2jm7tzc.mongodb.net/?retryWrites=true&w=majority&appName=happyhome`

const RentalsContext = createContext({})

export const useRentalsContext = () => useContext(RentalsContext)

export default function RentalsContextProvider({ children }) {
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
			fetch(uri)
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


			// fetch('/data/rentals.json')
			// 	.then((resp) => {
			// 		return resp.json()
			// 	})
			// 	.then((data) => {
			// 		setRentals(data.results)
			// 	})
			// 	.catch((error) => {
			// 		setError('Problem fetching data.', error)
			// 	})
			// }
	}, [storedRentals])

	useEffect(() => {
		if (rentals && rentals.length > 0) {
			setLoading(false)
			setError('')

			localStorage.setItem('rentalsInLocalStorage', JSON.stringify(rentals))

			// console.table({
			// 	'rentals:': rentals.length,
			// 	// 'loading:': loading,
			// 	// 'error': error,
			// 	// 'Rentals array saved to local storage': true
			// })
		}
	}, [rentals])

	return <RentalsContext.Provider value={{ rentals, setRentals }}>{children}</RentalsContext.Provider>
}
