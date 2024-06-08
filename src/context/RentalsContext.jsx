import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { getData, storeData } from '@helpers';
const baseUrl = import.meta.env.VITE_MONGODB_BASEURL;

const RentalsContext = createContext({});

export const useRentalsContext = () => useContext(RentalsContext);

export default function RentalsContextProvider({ children }) {
	const [rentals, setRentals] = useState([]);
	const [error, setError] = useState('');

	const getRentalsData = async () => {
		try {
			axios
				.get(`${baseUrl}/rentals`)
				.then((res) => {
					setRentals('rentals', res);
				})
				.catch((err) => setError(err));
		} catch (error) {
			const errorDescription = error.response
				? error.response.data.message
				: error.message;
			console.error('❌ Failed to fetch rentals data | ' + errorDescription);
		}
	};

	useEffect(() => {
		getRentalsData();
	}, [])

	return (
		<RentalsContext.Provider value={{ rentals, setRentals }}>
			{children}
		</RentalsContext.Provider>
	);
}
