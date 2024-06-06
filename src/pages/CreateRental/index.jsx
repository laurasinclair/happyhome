import styles from './index.module.sass';
import { Container, Row, Col } from 'react-bootstrap';
import { Button, Success } from '@components';
import { Hero } from '@components/layout';
import { useState } from 'react';
const baseUrl = import.meta.env.VITE_MONGODB_BASEURL;
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function CreateRental() {
	const [name, setName] = useState(''),
		[country, setCountry] = useState(''),
		[city, setCity] = useState(''),
		[description, setDescription] = useState(''),
		[review_scores_rating, setScore] = useState(80),
		[pictureUrl, setPictureUrl] = useState(''),
		[accommodates, setAccommodates] = useState(0),
		[propertyType, setPropertyType] = useState(''),
		[roomType, setRoomType] = useState(''),
		[beds, setBeds] = useState(0),
		[bathrooms, setBathrooms] = useState(0),
		[successMessage, setSuccessMessage] = useState(undefined),
		[linkToRental, setLinkToRental] = useState(undefined);

	const handleAddRental = (req) => {
		try {
			axios.post(`http://localhost:5005/rentals`, req).then((res) => {
				if (res.status === 201) {
					setSuccessMessage('Rental successfully created!');
					setLinkToRental(res.data._id);
				}
			});
		} catch (error) {
			console.error('Error adding rental:', error);
		}
	};

	const handleNameInput = (e) => setName(e.target.value),
		handleCountryInput = (e) => setCountry(e.target.value),
		handleCityInput = (e) => setCity(e.target.value),
		handleDescriptionInput = (e) => setDescription(e.target.value),
		handleScoreInput = (e) => setScore(e.target.value),
		handleImageInput = (e) => setPictureUrl(e.target.value),
		handleRoomType = (e) => setRoomType(e.target.value),
		handleAccommodatesInput = (e) => setAccommodates(e.target.value),
		handlePropertyType = (e) => setPropertyType(e.target.value),
		handleBedsInput = (e) => setBeds(e.target.value);

	console.log([propertyType, beds, bathrooms, roomType]);

	const handleSubmit = (e) => {
		e.preventDefault();

		handleAddRental({
			name: name || 'Name not provided :(',
			country: country,
			city: city,
			description: description || 'Description not provided :(',
			review_scores_rating: review_scores_rating,
			picture_url: pictureUrl,
			accommodates: accommodates,
			beds: beds,
			bathrooms: bathrooms,
			propertyType: propertyType,
		});

		setName('');
		setCountry('');
		setCity('');
		setDescription('');
		setScore(80);
		setPictureUrl('');
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
									value={name}
									onChange={handleNameInput}
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
									value={country}
									onChange={handleCountryInput}
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
									value={city}
									onChange={handleCityInput}
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
									value={pictureUrl}
									onChange={handleImageInput}
								/>
							</div>
						</Col>
						<Col sm='6'>
							<div>
								<label htmlFor='image'>Property type</label>

								<select
									id='title'
									name='title'
									onChange={handlePropertyType}
									required>
									<option
										value='Please choose'
										selected>
										Please choose
									</option>
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
									onChange={handleRoomType}>
									<option
										value='Please choose'
										selected>
										Please choose
									</option>
									<option value='Single room'>Single room</option>
									<option value='Shared room'>Shared room</option>
								</select>
							</div>
						</Col>
						<Col sm='6' md='4'>
							<div>
								<label htmlFor='image'>
									How many people can this rental accommodate?
								</label>

								<Button
									type='secondary'
									onClick={() =>
										setAccommodates((prev) => (prev === 0 ? 0 : (prev -= 1)))
									}>
									-
								</Button>
								<div className='count'>{accommodates}</div>
								<Button
									type='secondary'
									onClick={() => setAccommodates((prev) => (prev += 1))}>
									+
								</Button>
							</div>
						</Col>
						<Col sm='6' md='4'>
							<div>
								<label htmlFor='image'>Beds</label>

								<Button
									type='secondary'
									onClick={() =>
										setBeds((prev) => (prev === 0 ? 0 : (prev -= 1)))
									}>
									-
								</Button>
								<div className='count'>{beds}</div>
								<Button
									type='secondary'
									onClick={() => setBeds((prev) => (prev += 1))}>
									+
								</Button>
							</div>
						</Col>
						<Col sm='6' md='4'>
							<div>
								<label htmlFor='image'>Bathrooms</label>

								<Button
									type='secondary'
									onClick={() =>
										setBathrooms((prev) => (prev === 0 ? 0 : (prev -= 1)))
									}>
									-
								</Button>
								<div className='count'>{bathrooms}</div>
								<Button
									type='secondary'
									onClick={() => setBathrooms((prev) => (prev += 1))}>
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
									value={description}
									onChange={handleDescriptionInput}
								/>
							</div>
						</Col>
						<Col>
							<div>
								<label htmlFor='score'>Rating</label>
								<p>{review_scores_rating / 20}</p>

								<input
									type='range'
									id='score'
									min='1'
									max='100'
									list='markers'
									value={review_scores_rating}
									name='score'
									onChange={handleScoreInput}
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
				</form>
			</section>
		</>
	);
}
