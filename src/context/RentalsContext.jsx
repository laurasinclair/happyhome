import { createContext, useContext, useEffect, useState } from 'react';
import { fetchRentalsData } from '/src/api/client';
import { getData, storeData } from '@helpers';

const RentalsContext = createContext({});

export const useRentalsContext = () => useContext(RentalsContext);

export default function RentalsContextProvider({ children }) {
	const [storedRentals, setStoredRentals] = useState([]);
	const [rentals, setRentals] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	useEffect(() => {
		setStoredRentals(getData('rentalsInLocalStorage'));
	}, [])

	useEffect(() => {
		if (storedRentals && storedRentals.length > 0 && storedRentals !== undefined) {
			try {
				setRentals(storedRentals);
			} catch {
				setError("Couldn't fetch rentals");
			}
		} else {
			getRentalsData();
		}
	}, [storedRentals]);

	const getRentalsData = async () => {
		try {
			const data = await fetchRentalsData();
			storeData('rentalsInLocalStorage', data);
		} catch (error) {
			setError('Failed to fetch rentals data');
		}
	};

	useEffect(() => {
		if (rentals && rentals.length > 0) {
			setLoading(false);
			setError('');
		}
	}, [rentals]);

	return (
		<RentalsContext.Provider value={{ rentals, setRentals }}>
			{children}
		</RentalsContext.Provider>
	);
}
