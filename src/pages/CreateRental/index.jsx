import { useState } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';

import { Button, Hero, Success, Error, NumberBlock } from '@components';
import styles from './index.module.sass';
import {
	Bed,
	Bathtub,
	People
} from '@components/elements/Icons';

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
		cancellationPolicy: 'Strict',
	});

	const handleAddRental = (req) => {
		try {
			axios
				.post(`${import.meta.env.VITE_MONGODB_BASEURL}/rentals`, req)
				.then((res) => {
					if (res.status === 201) {
						setSuccessMessage('Rental successfully created!');
						setLinkToRental(res.data._id);
						setErrorMessage(undefined);
					}
				})
				.catch((error) => {
					setIsValid(false);

					setErrorMessage(
						'Error adding rental - ' + error.response.data.errors[0]
					);

					setTimeout(() => {
						setErrorMessage(undefined);
					}, 4000);
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


	console.log('formData.review_scores_rating', formData.review_scores_rating)

	};


	const handleSubmit = (e) => {
		e.preventDefault();

		handleAddRental({
			...formData,
		});

		setFormData({
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
								<label htmlFor='name'>
									Name <span aria-label='required'>*</span>
								</label>

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
								<label htmlFor='country'>
									Country <span aria-label='required'>*</span>
								</label>

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
								<label htmlFor='city'>
									City <span aria-label='required'>*</span>
								</label>

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
								<label htmlFor='image'>
									Property type <span aria-label='required'>*</span>
								</label>

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
								<label htmlFor='image'>
									Room type <span aria-label='required'>*</span>
								</label>

								<select
									id='title'
									name='title'
									onChange={handleInputChange}
									required>
									<option value='Please choose'>Please choose</option>
									<option value='Single room'>Single room</option>
									<option value='Shared room'>Shared room</option>
								</select>
							</div>
						</Col>
					</Row>

					<Row>
						<Col
							sm='6'
							md='4'>
							<NumberBlock
								setFormData={setFormData}
								keyName='accommodates'
								value={formData.accommodates}
								icon={<People />}
								words={['person', 'people']}
							/>
						</Col>
						<Col
							sm='6'
							md='4'>
							<NumberBlock
								setFormData={setFormData}
								keyName='beds'
								value={formData.beds}
								icon={<Bed />}
								words={['bed', 'beds']}
							/>
						</Col>
						<Col
							sm='6'
							md='4'>
							<NumberBlock
								setFormData={setFormData}
								keyName='bathrooms'
								value={formData.bathrooms}
								icon={<Bathtub />}
								words={['bathroom', 'bathrooms']}
							/>
						</Col>
					</Row>

					<Row>
						<Col sm='12'>
							<div>
								<label htmlFor='description'>
									Description <span aria-label='required'>*</span>
								</label>

								<textarea
									name='description'
									id='description'
									type='description'
									placeholder='This property is fantastic because...'
									value={formData.description}
									onChange={handleInputChange}
									required
								/>
							</div>
						</Col>
						<Col sm='12'>
							<div>
								<label htmlFor='price'>
									Price in EUR per night <span aria-label='required'>*</span>
								</label>

								<input
									name='price'
									id='price'
									type='number'
									placeholder='40'
									value={formData.price}
									onChange={handleInputChange}
								/>
							</div>
						</Col>
						<Col sm='12'>
							<div>
								<label htmlFor='score'>Rating</label>
								<p>{formData.review_scores_rating / 20}</p>

								<input
									type='range'
									id='score'
									name='score'
									min='1'
									max='100'
									defaultValue={formData.review_scores_rating}
									onChange={handleInputChange}
								/>
							</div>
						</Col>
					</Row>

					<Row>
						<Col>
							<Button
								className='btn-primary'
								type='submit'
								value='Add rental'
								onClick={handleSubmit}
							>Add rental</Button>
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
