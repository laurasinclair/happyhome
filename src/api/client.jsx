const baseUrl = import.meta.env.VITE_MONGODB_BASEURL;
import axios from 'axios';
import { useEffect, useState } from 'react';

export const fetchRentalsData = () => {
	const [response, setResponse] = useState(null);
	const [error, setError] = useState('');

	axios
		.get(`${baseUrl}/rentals`, {
			headers: {
				'Content-Type': 'application/json',
				// Add other headers as needed
			},
		})
		.then((res) => setResponse(res.data))
		.catch((err) => setError(err.data.message));

	useEffect(() => {
		fetchData();
	}, []);

	return { response, error };
};
