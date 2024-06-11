import React, { useState, useEffect } from 'react';

import { Row, Col } from 'react-bootstrap';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import classNames from 'classnames';
import axios from 'axios';

import styles from './index.module.sass';
import useBreakpoints from '/src/context/useBreakpoints';
import { Loading, Block } from '@components';
import { House } from '@components/elements/Icons';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Stats() {
	const { xs, sm, md, lg, xl } = useBreakpoints();

	// https://www.chartjs.org/docs/latest/configuration
	ChartJS.defaults.font.size = 16;
	ChartJS.defaults.color = '#111DA4';
	ChartJS.defaults.font.family = 'CircularStd, Arial, Helvetica, sans-serif';

	const chartOptions = {
		cutout: '70%',
		maintainAspectRatio: false,
		plugins: {
			legend: {
				position: (lg && 'right') || 'bottom',
				labels: {
					usePointStyle: true,
					pointStyle: 'circle',
					padding: 18,
					boxWidth: 50,
				},
			},
			tooltip: {
				backgroundColor: '#000',
				borderWidth: 0,
				titleColor: 'white',
				bodyColor: 'white',
				padding: 18,
				caretSize: 0,
				usePointStyle: true,
				pointStyle: 'circle',
			},
		},
	};

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(undefined);
	const [rentals, setRentals] = useState([]);

	const fetchRentals = async () => {
		try {
			const response = await axios.get(
				`${import.meta.env.VITE_MONGODB_BASEURL}/rentals`
			);
			const { allRentals } = response.data;
			setRentals(allRentals);
			setLoading(false);
		} catch (error) {
			console.error('❌', error.message);
		}
	};

	useEffect(() => {
		fetchRentals();
	}, []);

	useEffect(() => {
		if (rentals && rentals.length > 0) {
			setLoading(false);
			setError(undefined);
		}
	}, [rentals]);

	const rentalsPerCountry =
		rentals &&
		rentals.reduce((acc, rental) => {
			if (rental && rental.country) {
				acc[rental.country] = (acc[rental.country] || 0) + 1;
			}
			return acc;
		}, {});

	const rentalsPerCity =
		rentals &&
		rentals.reduce((acc, rental) => {
			if (rental && rental.city) {
				acc[rental.city] = (acc[rental.city] || 0) + 1;
			}
			return acc;
		}, {});

	const [countriesData, setCountriesData] = useState({
		labels: Object.keys(rentalsPerCountry),
		datasets: [
			{
				label: '',
				data: [],
				// clip: { left: 5, top: false, right: -2, bottom: 0 },
				// hoverOffset: 14,
				backgroundColor: [
					'#253EC4',
					'#E8D3D5',
					'#DF927A',
					'#F5DF85',
					'#AFCFD9',
					'#101883',
				],
				borderWidth: 0,
			},
		],
	});

	const [citiesData, setCitiesData] = useState({
		labels: Object.keys(rentalsPerCity),

		datasets: [
			{
				backgroundColor: [
					'#253EC4',
					'#E8D3D5',
					'#DF927A',
					'#F5DF85',
					'#AFCFD9',
					'#101883',
				],
				borderWidth: 0,
			},
		],
	});

	const returnColor = (index) => {
		// const number = Math.floor(Math.random() * 3) / 1;
		// return number === 0 ? '#253EC4' : (number === 1) ? '#E8D3D5' : '#DF927A';

		return index % 9 === 0
			? '#BDC1F8' // $primary
			: index % 3 === 0
			? '#E8D3D5' // $secondary-light-2
			: index % 2 === 1
			? '#253EC4' // $primary-light-2
			: '#DF927A' // $secondary
	};

	useEffect(() => {
		if (rentals && rentals.length > 0) {
			setCountriesData((prevData) => ({
				...prevData,
				labels: Object.keys(rentalsPerCountry),
				datasets: [
					{
						...prevData.datasets[0],
						label: `Rentals`,
						data: Object.values(rentalsPerCountry),
					},
				],
			}));

			setCitiesData((prevData) => ({
				...prevData,
				labels: Object.keys(rentalsPerCity),
				datasets: [
					{
						...prevData.datasets[0],
						label: `Rentals`,
						data: Object.values(rentalsPerCity),
					},
				],
			}));
		}
	}, [rentals]);

	return (
		<>
			{loading ? (
				<Loading />
			) : error ? (
				<div>{error}</div>
			) : (
				rentals && (
					<Row>
						<Col sm={12}>
							<Block className={styles.stats_block}>
								<Row>
									<Col
										lg={4}
										className={styles.stats_block_label}>
										<h3
											className={classNames(
												'display-h2',
												'mt-lg-5',
												styles.stats_block_label_title
											)}>
											You're managing <span>{rentals.length}</span> rentals
										</h3>
									</Col>
									<Col
										lg={8}
										className={styles.stats_block_chart}>
										{rentals &&
											rentals.map((rental, index) => (
												<House
													color={returnColor(index)}
													key={rental._id + index}
													size={
														(xl && '5%') ||
														(lg && '7%') ||
														(md && '5%') ||
														(sm && '7%') ||
														'10%'
													}
												/>
											))}
									</Col>
								</Row>
							</Block>
						</Col>
						<Col sm={6}>
							<Block className={styles.stats_block}>
								<Row className='flex-column justify-content-between'>
									<Col className={styles.stats_block_label}>
										<h3
											className={classNames(
												'display-h2',
												styles.stats_block_label_title
											)}>
											Where in the <span>world</span> are your rentals?
										</h3>
									</Col>
									<Col
										className={classNames(
											styles.stats_block_chart,
											styles.stats_block_chart_countries
										)}>
										<Doughnut
											options={chartOptions}
											data={countriesData}
											redraw={true}
											updateMode={'show'}
										/>
									</Col>
								</Row>
							</Block>
						</Col>

						<Col sm={6}>
							<Block className={styles.stats_block}>
								<Row className='flex-column justify-content-between h-100'>
									<Col className={styles.stats_block_label}>
										<h3
											className={classNames(
												'display-h2',
												styles.stats_block_label_title
											)}>
											Which <span>city</span> are your rentals in?
										</h3>
									</Col>
									<Col
										className={classNames(
											styles.stats_block_chart,
											styles.stats_block_chart_cities
										)}>
										<Doughnut
											options={chartOptions}
											data={citiesData}
										/>
									</Col>
								</Row>
							</Block>
						</Col>
					</Row>
				)
			)}
		</>
	);
}
