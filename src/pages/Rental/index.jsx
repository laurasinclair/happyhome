import { Hero } from '@components/layout';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { Trash, Pen, FloppyFill, X } from 'react-bootstrap-icons';
import styles from './index.module.sass';
import {
	Button,
	BackButton,
	RentalCardScore,
	RentalCardImage,
	Loading,
	Error,
	Success,
	Warning,
} from '@components';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Rental() {
	const [rental, setRental] = useState({}),
		[loading, setLoading] = useState(true),
		[errorMessage, setErrorMessage] = useState(undefined),
		[successMessage, setSuccessMessage] = useState(undefined),
		[errorUpdateRentalMessage, setErrorUpdateRentalMessage] =
			useState(undefined),
		[isEditing, setIsEditing] = useState(false),
		[confirmDelete, setConfirmDelete] = useState(false);

	const { rentalId } = useParams();
	const navigate = useNavigate();

	// fetching the rental
	useEffect(() => {
		axios
			.get(`${import.meta.env.VITE_MONGODB_BASEURL}/rentals/${rentalId}`)
			.then((res) => {
				setRental(res.data);
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
	const [description, setDescription] = useState(rental.description);
	const [country, setCountry] = useState(rental.country);
	const handleDescriptionInput = (e) => setDescription(e.target.value);
	const handleCountry = (e) => setCountry(e.target.value);

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
			description: description,
			country: country,
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
							<BackButton />
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
									<Row className='mb-5'>
										<Col>
											<div className={styles.Rental_item_thumbnail}>
												<div className={styles.Rental_item_thumbnail_score}>
													<RentalCardScore
														review_scores_rating={
															rental.review_scores_rating || 0
														}
													/>
												</div>
												<RentalCardImage
													picture_url={rental.picture_url}
													rentalName={
														rental.name ? rental.name : 'Name unknown'
													}
												/>
											</div>
										</Col>
										<Col>
											<div className={styles.Rental_item_characteristics}>
												<p>
													<strong>ID</strong>
													{rental.id ? rental.id : 'id unknown'}
												</p>
												<strong>Country</strong>
												{isEditing ? (
													<>
														<input
															type='text'
															name='country'
															id='country'
															defaultValue={rental.country}
															onChange={handleCountry}
														/>
													</>
												) : (
													<p>
														{rental.country
															? rental.country
															: 'country unknown'}
													</p>
												)}
												<p>
													<strong>City</strong>

													{rental.city ? rental.city : 'City unknown'}
													{rental.neighbourhood
														? ' 📍 ' + rental.neighbourhood
														: null}
												</p>
											</div>
										</Col>
									</Row>
									<Row>
										<Col
											lg='8'
											xl='8'
											className='px-4 mb-4'>
											<h3>Description</h3>
											{isEditing ? (
												<>
													<textarea
														name='description'
														id='description'
														defaultValue={rental.description}
														onChange={handleDescriptionInput}
													/>
												</>
											) : (
												<p>
													{rental.description
														? rental.description
														: 'No description'}
												</p>
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
														confirmDelete && setConfirmDelete(false)
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
