// const baseUrl = import.meta.env.VITE_MONGODB_BASEURL || 'http://localhost:5005';
const baseUrl = 'http://localhost:5005';
import axios from 'axios';

export const fetchRentalsData = async () => {
	try {
		const response = await axios.get(`${baseUrl}/rentals`);
		return response.data;
	} catch (error) {
		console.error('Error fetching rentals data:', error);
		throw error;
	}
};