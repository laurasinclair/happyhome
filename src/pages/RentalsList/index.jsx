import { Container, Row, Col } from 'react-bootstrap';
import {
	Funnel,
	SortDown,
	Pen,
	Trash,
	ChevronLeft,
	ChevronRight,
} from 'react-bootstrap-icons';
import React, { useState, useEffect } from 'react';
import { RentalCardScore, Button, Loading, Error } from '@components';
import { Hero } from '@components/layout';
import { useRentalsContext } from '@context';
import styles from './index.module.sass';
import classNames from 'classnames';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function RentalsList() {
	const [loading, setLoading] = useState(true);
	const [errorMessage, setErrorMessage] = useState('undefined');

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

	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [rentals, setRentals] = useState([]);
	const [rentalsPerPage, setRentalsPerPage] = useState(10);

	const fetchRentals = async (page) => {
		try {
			const response = await axios.get(
				`${
					'http://localhost:5005' || import.meta.env.VITE_MONGODB_BASEURL
				}/rentals?page=${page}&pageSize=${rentalsPerPage}`
			);
			const { paginatedRentals, totalPages } = response.data;
			setRentals(paginatedRentals);
			setTotalPages(totalPages);
			setLoading(false);
		} catch (error) {
			console.error('❌', error.message);
		}
	};

	const handleRentalsPerPage = (e) => {
		setRentalsPerPage(e.target.value);
	};

	useEffect(() => {
		fetchRentals(currentPage);
		paginationNumbers();
	}, [currentPage, handleRentalsPerPage]);

	const handlePrevPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	};

	const handleNextPage = () => {
		if (currentPage < totalPages) {
			setCurrentPage(currentPage + 1);
		}
	};

	const paginationNumbers = () => {
		let buttons = [];
		for (let i = 0; i < totalPages; i++) {
			buttons.push(
				<button
					className={classNames(styles.pagination_numbers,
						{[styles.pagination_numbers_current]: i + 1 === currentPage}
					)}
					key={i}
					onClick={() => setCurrentPage(i + 1)}>
					{i + 1}
				</button>
			);
		}
		return buttons;
	};

	return (
		<>
			<Container fluid>
				<Row>
					<Col>
						<Hero
							title='Properties list'
							size='m'
						/>
					</Col>
				</Row>

				<Row>
					<Col className='d-flex justify-content-between align-items-center mb-4'>
						<Button to='/add-rental'>Add rental</Button>

						<div className='d-flex justify-content-between align-items-center'>
							<input
								type='text'
								name='Search'
								id=''
								placeholder='Search'
								className='mb-0'
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

				<Row>
					<Col>
						<div className={styles.pagination_perPage}>
							Display
							<select
								name='rentalsPerPage'
								id='rentalsPerPage'
								defaultValue='Please choose'
								onChange={handleRentalsPerPage}
								className={styles.pagination_perPage_select}>
								<option value='10'>10</option>
								<option value='20'>20</option>
								<option value='50'>50</option>
							</select>
							rentals per page
						</div>
					</Col>
				</Row>

				<Row className='gx4 gx-xl-5'>
					<Col>
						<div className={styles.RentalsList_grid}>
							<div
								className={classNames(
									styles.RentalsList_grid_header,
									styles.RentalsList_grid_row
								)}>
								<div
									className={classNames(
										styles.RentalsList_grid_col,
										styles.RentalsList_grid_id
									)}>
									ID
								</div>
								<div
									className={classNames(
										styles.RentalsList_grid_col,
										styles.RentalsList_grid_name
									)}>
									Name
								</div>
								<div
									className={classNames(
										styles.RentalsList_grid_col,
										styles.RentalsList_grid_city
									)}>
									City
								</div>
								<div
									className={classNames(
										styles.RentalsList_grid_col,
										styles.RentalsList_grid_country
									)}>
									Country
								</div>
								<div
									className={classNames(
										styles.RentalsList_grid_col,
										styles.RentalsList_grid_score
									)}>
									Score
								</div>
								<div
									className={classNames(
										styles.RentalsList_grid_col,
										styles.RentalsList_grid_actions
									)}>
									Actions
								</div>
							</div>
							<div className={styles.RentalsList_grid_body}>
								{loading ? (
									<Loading />
								) : (
									rentals &&
									rentals.map((rental, index) => {
										return (
											<>
												<div
													className={styles.RentalsList_grid_row}
													key={rental._id + index}>
													<div
														className={classNames(
															styles.RentalsList_grid_col,
															styles.RentalsList_grid_id
														)}>
														<Link to={`./${rental._id}`}>{rental.id}</Link>
													</div>
													<div
														className={classNames(
															styles.RentalsList_grid_col,
															styles.RentalsList_grid_name
														)}>
														<Link to={`./${rental._id}`}>{rental.name}</Link>
													</div>
													<div
														className={classNames(
															styles.RentalsList_grid_col,
															styles.RentalsList_grid_city
														)}>
														<Link to={`./${rental._id}`}>{rental.city}</Link>
													</div>
													<div
														className={classNames(
															styles.RentalsList_grid_col,
															styles.RentalsList_grid_country
														)}>
														<Link to={`./${rental._id}`}>{rental.country}</Link>
													</div>
													<div
														className={classNames(
															styles.RentalsList_grid_col,
															styles.RentalsList_grid_score
														)}>
														<Link to={`./${rental._id}`}>
															<RentalCardScore
																review_scores_rating={
																	rental.review_scores_rating
																}
															/>
														</Link>
													</div>
													<div
														className={classNames(
															styles.RentalsList_grid_col,
															styles.RentalsList_grid_space
														)}>
														<Button
															type='primary'
															className={styles.RentalsList_grid_btn}
															to={`./${rental.id}`}>
															<Pen size='18' />
														</Button>

														<Button
															text='Delete'
															type='secondary'
															onClick={(e) => {
																e.preventDefault();
																deleteRental(rental._id);
															}}
															className={styles.RentalsList_grid_btn}>
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

				<Row>
					<Col>
						<div className={styles.pagination}>
							<button
								onClick={handlePrevPage}
								disabled={currentPage === 1}
								className={styles.pagination_arrows}>
								<ChevronLeft size='24' />
							</button>

							{paginationNumbers()}

							<button
								onClick={handleNextPage}
								disabled={currentPage === totalPages}
								className={styles.pagination_arrows}>
								<ChevronRight size='24' />
							</button>
						</div>
					</Col>
				</Row>
			</Container>
		</>
	);
}
