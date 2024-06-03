import { createContext, useContext, useEffect, useState } from 'react';
import { fetchRentalsData } from '../../src/api/client';
import { getData, storeData } from '@helpers';

const RentalsContext = createContext({});

export const useRentalsContext = () => useContext(RentalsContext);

export default function RentalsContextProvider({ children }) {
	const storedRentals = getData('rentals');
	const [rentals, setRentals] = useState([]);

	useEffect(() => {
		if (storedRentals && storedRentals.length > 0 && storedRentals !== undefined) {
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
			const data = await fetchRentalsData();
			console.log(data)

			if (data) {
				setRentals(data);
				storeData('rentals', data);
			}
		} catch (error) {
			console.error('Failed to store rentals data');
		}
	};

	return (
		<RentalsContext.Provider value={{ rentals, setRentals }}>
			{children}
		</RentalsContext.Provider>
	);
}
