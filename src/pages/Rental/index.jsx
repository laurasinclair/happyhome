import { Hero } from '@components/layout';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { Trash, Pen } from 'react-bootstrap-icons';
import styles from './index.module.sass';
import {
	Button,
	BackButton,
	RentalCardScore,
	RentalCardImage,
	Loading,
	Error,
} from '@components';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Rental() {
	const [rental, setRental] = useState({});
	const { rentalId } = useParams();
	const [loading, setLoading] = useState(true);
	const [errorMessage, setErrorMessage] = useState(undefined);

	const navigate = useNavigate();

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
					'❌ There was a problem displaying this rental.', err.message
				);
			});
	}, []);

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
												<p>
													<strong>Country</strong>
													{rental.country ? rental.country : 'country unknown'}
												</p>
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
											<p>
												{rental.description
													? rental.description
													: 'No description'}
											</p>
										</Col>
									</Row>
									<Row className='mt-4'>
										<Col className='pe-md-1'>
											<Button
												text='Edit'
												type='primary'
												fullWidth
												iconRight={<Pen />}
											/>
										</Col>
										<Col className='ps-md-1'>
											<Button
												text='Delete'
												link='/'
												type='secondary'
												fullWidth
												iconRight={<Trash />}
												onClick={(e) => {
													e.preventDefault();
													deleteRental(rental._id);
													navigate('/rentals');
												}}
											/>
										</Col>
									</Row>
								</div>
							</>
						)
					)}
				</Container>
			</section>
		</>
	);
}
