import styles from './index.module.sass';
import { Container, Row, Col } from 'react-bootstrap';
import { Button, Success, Error } from '@components';
import { Hero } from '@components';
import { useState } from 'react';
const baseUrl = import.meta.env.VITE_MONGODB_BASEURL;
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function CreateRental() {
	const [successMessage, setSuccessMessage] = useState(undefined),
		[errorMessage, setErrorMessage] = useState(undefined),
		[linkToRental, setLinkToRental] = useState(undefined);

	const [formData, setFormData] = useState({
		name: undefined,
		country: undefined,
		city: undefined,
		description: undefined,
		review_scores_rating: 80,
		pictureUrl: undefined,
		accommodates: 2,
		propertyType: undefined,
		roomType: undefined,
		beds: 1,
		bathrooms: 1,
		price: undefined,
	});

	const handleAddRental = (req) => {
		try {
			axios
				.post(`${import.meta.env.VITE_MONGODB_BASEURL}/rentals`, req)
				.then((res) => {
					if (res.status === 201) {
						setSuccessMessage('Rental successfully created!');
						setLinkToRental(res.data._id);
					}
				});
		} catch (error) {
			setErrorMessage('Error adding rental');
		}
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		handleAddRental({
			...formData
		});

		// setFormData({
		// 	name: '',
		// 	country: '',
		// 	city: '',
		// 	description: '',
		// 	review_scores_rating: 80,
		// 	pictureUrl: '',
		// 	accommodates: 2,
		// 	propertyType: '',
		// 	roomType: '',
		// 	beds: 1,
		// 	bathrooms: 1,
		// });
	};

	return (
		<>
			<Container fluid>
				<Row>
					<Col>
						<Hero
							title='Add a new rental'
							size='m'
						/>
					</Col>
				</Row>
			</Container>

			<section className={styles.CreateRental}>
				<form
					className={styles.CreateRental_form}
					onSubmit={handleSubmit}>
					<Row className='mb-3'>
						<Col sm='6'>
							<div>
								<label htmlFor='name'>Name</label>

								<input
									required
									name='name'
									id='name'
									type='text'
									placeholder='Rental name'
									value={formData.name}
									onChange={handleInputChange}
								/>
							</div>
						</Col>

						<Col sm='6'>
							<div>
								<label htmlFor='country'>Country</label>

								<input
									name='country'
									id='country'
									type='text'
									placeholder='Country'
									value={formData.country}
									onChange={handleInputChange}
									required
								/>
							</div>
						</Col>

						<Col sm='6'>
							<div>
								<label htmlFor='city'>City</label>

								<input
									name='city'
									id='city'
									type='text'
									placeholder='City'
									value={formData.city}
									onChange={handleInputChange}
									required
								/>
							</div>
						</Col>
						<Col sm='6'>
							<div>
								<label htmlFor='image'>Image url</label>

								<input
									name='image'
									id='image'
									type='text'
									placeholder='Image'
									value={formData.pictureUrl}
									onChange={handleInputChange}
								/>
							</div>
						</Col>
						<Col sm='6'>
							<div>
								<label htmlFor='image'>Property type</label>

								<select
									id='title'
									name='title'
									onChange={handleInputChange}
									defaultValue='Please choose'
									required>
									<option value='Please choose'>Please choose</option>
									<option value='Apartment'>Apartment</option>
									<option value='House'>House</option>
								</select>
							</div>
						</Col>
						<Col sm='6'>
							<div>
								<label htmlFor='image'>Room type</label>

								<select
									id='title'
									name='title'
									onChange={handleInputChange}>
									<option value='Please choose'>Please choose</option>
									<option value='Single room'>Single room</option>
									<option value='Shared room'>Shared room</option>
								</select>
							</div>
						</Col>
						<Col
							sm='6'
							md='4'>
							<div>
								<label htmlFor='image'>
									How many people can this rental accommodate?
								</label>

								<Button
									type='secondary'
									onClick={() =>
										setFormData((prev) => ({
											...prev,
											accommodates:
												prev.accommodates === 0 ? 0 : (prev.accommodates - 1),
										}))
									}>
									-
								</Button>
								<div className='count'>{formData.accommodates}</div>
								<Button
									type='secondary'
									onClick={() =>
										setFormData((prev) => ({
											...prev,
											accommodates:
												prev.accommodates === 0 ? 0 : (prev.accommodates + 1),
										}))
									}>
									+
								</Button>
							</div>
						</Col>
						<Col
							sm='6'
							md='4'>
							<div>
								<label htmlFor='image'>Beds</label>

								<Button
									type='secondary'
									onClick={() =>
										setFormData((prev) => ({
											...prev,
											beds:
												prev.beds === 0 ? 0 : (prev.beds - 1),
										}))
									}>
									-
								</Button>
								<div className='count'>{formData.beds}</div>
								<Button
									type='secondary'
									onClick={() =>
										setFormData((prev) => ({
											...prev,
											beds:
												prev.beds === 0 ? 0 : (prev.beds + 1),
										}))
									}>
									+
								</Button>
							</div>
						</Col>
						<Col
							sm='6'
							md='4'>
							<div>
								<label htmlFor='image'>Bathrooms</label>

								<Button
									type='secondary'
									onClick={() =>
										setFormData((prev) => ({
											...prev,
											bathrooms:
												prev.bathrooms === 0 ? 0 : (prev.bathrooms - 1),
										}))
									}>
									-
								</Button>
								<div className='count'>{formData.bathrooms}</div>
								<Button
									type='secondary'onClick={() =>
										setFormData((prev) => ({
											...prev,
											bathrooms:
												prev.bathrooms === 0 ? 0 : (prev.bathrooms + 1),
										}))
									}>
									+
								</Button>
							</div>
						</Col>
						<Col sm='12'>
							<div>
								<label htmlFor='description'>Description</label>

								<textarea
									name='description'
									id='description'
									type='description'
									placeholder='This property is fantastic because...'
									value={formData.description}
									onChange={handleInputChange}
								/>
							</div>
						</Col>
						<Col>
							<div>
								<label htmlFor='score'>Rating</label>
								<p>{formData.review_scores_rating / 20}</p>

								<input
									type='range'
									id='score'
									min='1'
									max='100'
									list='markers'
									value={formData.review_scores_rating}
									name='score'
									onChange={handleInputChange}
								/>
							</div>
						</Col>
					</Row>

					<Row>
						<Col>
							<input
								className='btn-primary'
								type='submit'
								value='Add rental'
							/>
						</Col>
					</Row>

					{successMessage && (
						<>
							<Success className='mt-4'>
								{successMessage}
								<br />
								<Link to={`/rentals/${linkToRental}`}>View your rental</Link>
							</Success>
						</>
					)}

					{errorMessage && (
						<>
							<Error className='mt-4'>{errorMessage}</Error>
						</>
					)}
				</form>
			</section>
		</>
	);
}
