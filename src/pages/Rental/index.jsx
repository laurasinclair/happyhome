import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import { Trash, Pen, FloppyFill, X, Globe, Map } from 'react-bootstrap-icons';

import { Bed, Bathtub, People, PriceTag, ID } from '@components/elements/Icons';
import styles from './index.module.sass';
import {
	Hero,
	NumberBlock,
	Button,
	BackButton,
	RentalScore,
	RentalImage,
	Loading,
	Error,
	Success,
	Warning,
} from '@components';

export default function Rental() {
	const [rental, setRental] = useState({}),
		[loading, setLoading] = useState(true),
		[errorMessage, setErrorMessage] = useState(undefined),
		[successMessage, setSuccessMessage] = useState(undefined),
		[errorUpdateRentalMessage, setErrorUpdateRentalMessage] =
			useState(undefined),
		[isEditing, setIsEditing] = useState(false),
		[confirmDelete, setConfirmDelete] = useState(false),
		[formData, setFormData] = useState({});

	const { rentalId } = useParams();
	const navigate = useNavigate();

	// fetching the rental
	useEffect(() => {
		axios
			.get(`${import.meta.env.VITE_MONGODB_BASEURL}/rentals/${rentalId}`)
			.then((res) => {
				setRental(res.data);
				setFormData(res.data);
				setLoading(false);
			})
			.catch((err) => {
				setLoading(false);
				console.error(
					'❌ There was a problem displaying this rental.',
					err.message
				);
			});
	}, []);

	// editing
	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleEditRental = (req) => {
		axios
			.put(`${import.meta.env.VITE_MONGODB_BASEURL}/rentals/${rentalId}`, req)
			.then((res) => {
				if (res.status === 200) {
					setRental(res.data);

					setSuccessMessage('Rental successfully updated!');
					setTimeout(() => {
						setSuccessMessage(undefined);
					}, 4000);
				}
			})
			.catch((err) => {
				console.error(
					'❌ There was an error updating this rental.',
					err.message
				);

				setErrorUpdateRentalMessage('There was an error updating this rental.');
				setTimeout(() => {
					setErrorUpdateRentalMessage(undefined);
				}, 4000);
			});
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		handleEditRental({
			...formData,
		});
	};

	const deleteRental = (rentalId) => {
		axios
			.delete(`${import.meta.env.VITE_MONGODB_BASEURL}/rentals/${rentalId}`)
			.then((res) => {
				getRentalsData();
			})
			.catch((err) => {
				console.log('There was a problem deleting this rental.');
			});
	};

	return (
		<>
			<section className={styles.Rental}>
				<Container fluid>
					<Row>
						<Col className='p-4'>
							<BackButton
								label='Back to all rentals'
								to='/rentals'
							/>
						</Col>
					</Row>

					{loading ? (
						<Loading />
					) : errorMessage ? (
						<Error>{errorMessage}</Error>
					) : (
						rental && (
							<>
								<Row>
									<Col>
										<Hero
											category='Rental'
											title={rental.name ? rental.name : 'Name unknown'}
											size='s'
										/>
									</Col>
								</Row>

								<div className={styles.Rental_item}>
									<Row className='mb-4'>
										<Col
											md='6'
											className='mb-4'>
											<div className={styles.Rental_item_thumbnail}>
												{rental.review_scores_rating && (
													<div className={styles.Rental_item_thumbnail_score}>
														<RentalScore
															review_scores_rating={rental.review_scores_rating}
														/>
													</div>
												)}

												<RentalImage
													picture_url={rental.picture_url}
													rentalName={rental.name || 'Name unknown'}
												/>
											</div>
										</Col>
										<Col>
											<div className={styles.Rental_item_characteristics_tag}>
												<ID size='28' />
												<div
													className={
														styles.Rental_item_characteristics_tag_text
													}>
													<p>{rental._id || 'ID unknown'}</p>
												</div>
											</div>

											<div className={styles.Rental_item_characteristics_tag}>
												<Globe size='26' />
												<div
													className={
														styles.Rental_item_characteristics_tag_text
													}>
													{!isEditing ? (
														<p>
															<strong>
																{rental.country || 'Country unknown'}
															</strong>
														</p>
													) : (
														<input
															type='text'
															name='country'
															id='country'
															defaultValue={rental.country}
															placeholder={rental.country}
															onChange={handleInputChange}
														/>
													)}
												</div>
											</div>

											<div className={styles.Rental_item_characteristics_tag}>
												<Map size='24' />

												<div
													className={
														styles.Rental_item_characteristics_tag_text
													}>
													{!isEditing ? (
														<p>
															<strong>{rental.city || 'City unknown'}</strong>
															{rental.neighbourhood
																? ' 📍 ' + rental.neighbourhood
																: null}
														</p>
													) : (
														<input
															type='text'
															name='city'
															id='city'
															defaultValue={rental.city}
															placeholder={rental.city}
															onChange={handleInputChange}
														/>
													)}
												</div>
											</div>

											<div className={styles.Rental_item_characteristics_tag}>
												<PriceTag
													size='24'
													className='me-2'
												/>
												<div
													className={
														styles.Rental_item_characteristics_tag_text
													}>
													{!isEditing ? (
														<p>
															<strong>{rental.price}</strong>&nbsp;€ per night
														</p>
													) : (
														<input
															type='number'
															name='price'
															id='price'
															defaultValue={rental.price}
															placeholder={rental.price}
															onChange={handleInputChange}
														/>
													)}
												</div>
											</div>
										</Col>
									</Row>
									<Row className='mb-5'>
										<Col>
											{!isEditing ? (
												<NumberBlock
													value={formData.beds}
													icon={<Bed />}
													words={['bed', 'beds']}
												/>
											) : (
												<NumberBlock
													setFormData={setFormData}
													keyName='beds'
													value={formData.beds}
													icon={<Bed />}
													words={['bed', 'beds']}
												/>
											)}
										</Col>
										<Col>
											{!isEditing ? (
												<NumberBlock
													value={formData.bathrooms}
													icon={<Bathtub />}
													words={['bathroom', 'bathrooms']}
												/>
											) : (
												<NumberBlock
													setFormData={setFormData}
													keyName='bathrooms'
													value={formData.bathrooms}
													icon={<Bathtub />}
													words={['bathroom', 'bathrooms']}
												/>
											)}
										</Col>
										<Col>
											{!isEditing ? (
												<NumberBlock
													value={formData.accommodates}
													icon={<People />}
													words={['person', 'people']}
												/>
											) : (
												<NumberBlock
													setFormData={setFormData}
													keyName='accommodates'
													value={formData.accommodates}
													icon={<People />}
													words={['person', 'people']}
												/>
											)}
										</Col>
									</Row>

									{isEditing && (
										<Row>
											<Col sm='12'>
												<div>
													<label htmlFor='score'>Rating</label>
													<p>{formData.review_scores_rating / 20}</p>

													<input
														type='range'
														id='review_scores_rating'
														name='review_scores_rating'
														min={0}
														max={100}
														step={5}
														value={formData.review_scores_rating}
														onChange={handleInputChange}
													/>
												</div>
											</Col>
										</Row>
									)}
									{isEditing && (
										<Row>
											<Col
												lg='8'
												xl='8'
												className='mb-4'>
												<h3>Rental name</h3>
												<Row>
													<Col>
														<input
															type='text'
															name='name'
															id='name'
															defaultValue={rental.name}
															placeholder={rental.name}
															onChange={handleInputChange}
														/>
													</Col>
												</Row>
											</Col>
										</Row>
									)}

									<Row>
										<Col
											lg='8'
											xl='8'
											className='mb-4'>
											<h3>Description</h3>
											{isEditing ? (
												<>
													<textarea
														name='description'
														id='description'
														defaultValue={rental.description}
														onChange={handleInputChange}
													/>
												</>
											) : (
												<p>
													{rental.description
														? rental.description
														: 'No description provided.'}
												</p>
											)}
										</Col>
									</Row>
									<Row>
										<Col className='mb-4'>
											{rental.cancellation_policy && (
												<div>
													<strong>Cancellation policy:</strong>&nbsp;
													{rental.cancellation_policy}
												</div>
											)}
										</Col>
									</Row>

									{successMessage && <Success>{successMessage}</Success>}

									{errorUpdateRentalMessage && (
										<Error>{errorUpdateRentalMessage}</Error>
									)}

									<Row className='mt-4'>
										<Col className='pe-md-1'>
											{!isEditing ? (
												<Button
													text='Edit'
													type='primary'
													fullWidth
													onClick={() => {
														!isEditing
															? setIsEditing(true)
															: setIsEditing(false);
														confirmDelete && setConfirmDelete(false);
													}}
													iconLeft={<Pen />}>
													{' '}
													Edit{' '}
												</Button>
											) : (
												<Button
													type='primary'
													fullWidth
													onClick={(e) => {
														handleSubmit(e);
														setIsEditing(false);
													}}
													iconLeft={<FloppyFill />}>
													{' '}
													Save{' '}
												</Button>
											)}
										</Col>
										<Col className='ps-md-1 mb-3'>
											{!isEditing && !confirmDelete ? (
												<Button
													text='Delete'
													link='/'
													type='secondary'
													fullWidth
													iconLeft={<Trash />}
													onClick={() => {
														setConfirmDelete(true);
													}}>
													Delete
												</Button>
											) : (
												<Button
													type='secondary'
													fullWidth
													onClick={() => {
														isEditing && setIsEditing(false);
														confirmDelete && setConfirmDelete(false);
													}}
													iconLeft={<X size='30' />}>
													Cancel
												</Button>
											)}
										</Col>
									</Row>

									{confirmDelete && (
										<Row>
											<Col>
												<Warning>
													Are you sure you'd like to delete this rental? This
													action is irreversible. <br />
													<Link
														onClick={(e) => {
															e.preventDefault();
															deleteRental(rental._id);
															setConfirmDelete(false);
															navigate('/rentals');
														}}>
														Delete rental
													</Link>
												</Warning>
											</Col>
										</Row>
									)}
								</div>
							</>
						)
					)}
				</Container>
			</section>
		</>
	);
}
