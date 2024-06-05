import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { getData, storeData } from '@helpers';
const baseUrl = import.meta.env.VITE_MONGODB_BASEURL;

const RentalsContext = createContext({});

export const useRentalsContext = () => useContext(RentalsContext);

export default function RentalsContextProvider({ children }) {
	const storedRentals = getData('rentals');
	const [rentals, setRentals] = useState([]);
	const [response, setResponse] = useState(null);
	const [error, setError] = useState('');

	useEffect(() => {
		if (
			storedRentals &&
			storedRentals.length > 0 &&
			storedRentals !== undefined
		) {
			try {
				setRentals(storedRentals);
			} catch {
				console.error("Couldn't store rentals");
			}
		} else {
			getRentalsData();
		}
	}, []);

	const getRentalsData = async () => {
		try {
			axios
				.get(`${baseUrl}/rentals`)
				.then((res) => {
					storeData('rentals', res);
					setRentals(res.data);
				})
				.catch((err) => setError(err));
		} catch (error) {
			console.error('Failed to store rentals data | ', error);
		}
	};

	return (
		<RentalsContext.Provider value={{ rentals, setRentals }}>
			{children}
		</RentalsContext.Provider>
	);
}
