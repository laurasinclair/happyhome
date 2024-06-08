import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { getData, storeData } from '@helpers';
const baseUrl = import.meta.env.VITE_MONGODB_BASEURL;

const RentalsContext = createContext({});

export const useRentalsContext = () => useContext(RentalsContext);

export default function RentalsContextProvider({ children }) {
	const [rentals, setRentals] = useState([]);

	const getRentalsData = async () => {
		try {
			axios
				.get(`${baseUrl}/rentals`)
				.then((res) => {
					setRentals(res.data);
				})
				.catch((err) => console.error('❌ Error'));
		} catch (err) {
			console.error('❌ Error');
		}
	};

	useEffect(() => {
		getRentalsData();
	}, [])

	return (
		<RentalsContext.Provider value={{ rentals, setRentals, getRentalsData }}>
			{children}
		</RentalsContext.Provider>
	);
}
