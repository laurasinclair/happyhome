const baseUrl = import.meta.env.VITE_MONGODB_BASEURL
import axios from 'axios';
import { useEffect, useState } from 'react';

export const fetchRentalsData = () => {
	const [response, setResponse] = useState(null);
	const [error, setError] = useState('');

	axios
		.get(`${baseUrl}/rentals`)
		.then((res) => setResponse(res.data))
		.catch((err) => setError(err));

	useEffect(() => {
		fetchData();
	}, []);

	return { response, error };
};
