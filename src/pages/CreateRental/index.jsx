import styles from './index.module.sass';
import { Container, Row, Col } from 'react-bootstrap';
import { Hero } from '@components/layout';
import { useState } from 'react';

export default function CreateRental({ handleAddRental }) {
	const [name, setName] = useState(''),
		[country, setCountry] = useState(''),
		[city, setCity] = useState(''),
		[description, setDescription] = useState(''),
		[review_scores_rating, setScore] = useState(80),
		[pictureUrl, setPictureUrl] = useState('');

	const handleNameInput = (e) => setName(e.target.value),
		handleCountryInput = (e) => setCountry(e.target.value),
		handleCityInput = (e) => setCity(e.target.value),
		handleDescriptionInput = (e) => setDescription(e.target.value),
		handleScoreInput = (e) => setScore(e.target.value),
		handleImageInput = (e) => setPictureUrl(e.target.value);

	const handleSubmit = (e) => {
		e.preventDefault();

		const newId = Math.floor(Math.random() * 100000000);
		handleAddRental({
			name: name || 'Name not provided :(',
			country,
			city,
			description: description || 'Description not provided :(',
			id: newId,
			review_scores_rating,
			picture_url: pictureUrl,
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
				<form className={styles.CreateRental_form}>
					<Row className='mb-3'>
						<Col sm='6'>
							<div>
								<label htmlFor='name'>Name</label>

								<input
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
									required
								/>
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
							<button
								className='btn-primary'
								type='submit'
								onClick={handleSubmit}>
								Add rental
							</button>
						</Col>
					</Row>
				</form>
			</section>
		</>
	);
}
