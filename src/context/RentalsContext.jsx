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
					setRentals(res.data);
				})
				.catch((err) => console.error('❌ ' + err.data.message));
		} catch (err) {
			console.error('❌ ' + err.data.message);
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
