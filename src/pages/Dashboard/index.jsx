import { Container, Row, Col } from 'react-bootstrap';
import { Funnel, SortDown, Pen, Trash } from 'react-bootstrap-icons';
import React, { useState, useEffect } from 'react';
import { RentalCardScore, Filter, Button } from '@components';
import { Hero } from '@components/layout';
import { useRentalsContext } from '@context';
import styles from './Dashboard.module.sass';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

export default function Dashboard() {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');
	const { rentals, setRentals } = useRentalsContext();

	useEffect(() => {
		if (rentals && rentals.length > 0) {
			setLoading(false);
			setError('');
		}
	}, [rentals]);

	const deleteRental = (rentalId) => {
		try {
			const findIndex = rentals.findIndex((rental) => rental.id === rentalId);
			const tempRentals = [...rentals];
			tempRentals.splice(findIndex, 1);
			setRentals(tempRentals);
			localStorage.setItem('rentalsInLocalStorage', JSON.stringify(rentals));

			console.table({
				'rentals.length': rentals.length,
				'index of deleted item:': findIndex,
			});
		} catch (error) {
			setError('Error deleting rental:', error);
		}
	};

	const handleAddRental = (newRental) => {
		try {
			const tempRentals = [...rentals];
			tempRentals.unshift(newRental);
			setRentals(tempRentals);
			localStorage.setItem('rentalsInLocalStorage', JSON.stringify(rentals));

			console.table({
				'rentals.length': rentals.length,
				'added item:': newRental.id,
			});
		} catch (error) {
			console.error('Error adding rental:', error);
		}
	};

	return (
		<>
			<Container fluid>
				<Row>
					<Col>
						<Hero
							title='Admin dashboard'
							size='m'
						/>
					</Col>
				</Row>

				{/* <Stats/> */}

				<Row>
					<Col className='d-flex justify-content-between align-items-center mb-4'>
						<Button>Add rental</Button>

						<div className='d-flex justify-content-between align-items-center'>
							<input
								type='text'
								name='Search'
								id=''
								placeholder='Search'
							/>

							<Button className='ms-3'>
								<Funnel size='20' />
							</Button>
							<Button className='ms-1'>
								<SortDown size='20' />
							</Button>
						</div>
					</Col>
				</Row>

				<Row className='gx4 gx-xl-5'>
					<Col>
						<div className={styles.dashboard_grid}>
							<div
								className={classNames(
									styles.dashboard_grid_header,
									styles.dashboard_grid_row
								)}>
								<div
									className={classNames(
										styles.dashboard_grid_col,
										styles.dashboard_grid_id
									)}>
									ID
								</div>
								<div
									className={classNames(
										styles.dashboard_grid_col,
										styles.dashboard_grid_name
									)}>
									Name
								</div>
								<div
									className={classNames(
										styles.dashboard_grid_col,
										styles.dashboard_grid_city
									)}>
									City
								</div>
								<div
									className={classNames(
										styles.dashboard_grid_col,
										styles.dashboard_grid_country
									)}>
									Country
								</div>
								<div
									className={classNames(
										styles.dashboard_grid_col,
										styles.dashboard_grid_score
									)}>
									Score
								</div>
								<div
									className={classNames(
										styles.dashboard_grid_col,
										styles.dashboard_grid_actions
									)}>
									Actions
								</div>
							</div>
							<div className={styles.dashboard_grid_body}>
								{loading ? (
									<div>Loading...</div>
								) : error ? (
									<div>{error}</div>
								) : (
									rentals &&
									rentals.map((rental, index) => {
										return (
											<>
												<div className={styles.dashboard_grid_row}>
													<div
														className={classNames(
															styles.dashboard_grid_col,
															styles.dashboard_grid_id
														)}>
														<Link to={`rentals/${rental.id}`}>{rental.id}</Link>
													</div>
													<div
														className={classNames(
															styles.dashboard_grid_col,
															styles.dashboard_grid_name
														)}>
														<Link to={`rentals/${rental.id}`}>{rental.name}</Link>
													</div>
													<div
														className={classNames(
															styles.dashboard_grid_col,
															styles.dashboard_grid_city
														)}>
														<Link to={`rentals/${rental.id}`}>{rental.city}</Link>
													</div>
													<div
														className={classNames(
															styles.dashboard_grid_col,
															styles.dashboard_grid_country
														)}>
														<Link to={`rentals/${rental.id}`}>{rental.country}</Link>
													</div>
													<div
														className={classNames(
															styles.dashboard_grid_col,
															styles.dashboard_grid_score
														)}>
														<Link to={`rentals/${rental.id}`}><RentalCardScore
															review_scores_rating={rental.review_scores_rating}
														/></Link>
													</div>
													<div
														className={classNames(
															styles.dashboard_grid_col,
															styles.dashboard_grid_space
														)}>
														<Button
															type='primary'
															className={styles.dashboard_grid_btn}
															to={`rentals/${rental.id}`}>
															<Pen size='18' />
														</Button>

														<Button
															text='Delete'
															type='secondary'
															onClick={(e) => {
																e.preventDefault();
																deleteRental(id);
															}}
															className={styles.dashboard_grid_btn}>
															<Trash size='18' />
														</Button>
													</div>
												</div>
											</>
										);
									})
								)}
							</div>
						</div>
					</Col>
				</Row>
			</Container>
		</>
	);
}
