import { Container, Row, Col } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { useRentalsContext } from '@context';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import logo from '/src/assets/images/logo_happyhome_dark.svg';
import styles from './index.module.sass';
import { Loading } from '@components';
import { useMediaPredicate } from "react-media-hook";
import classNames from 'classnames';
import axios from 'axios';

ChartJS.register(ArcElement, Tooltip, Legend);

const House = (props) => (
	<svg
		width={props.width}
		height={props.height}
		viewBox='0 0 74 74'
		fill={props.fill}
		className={props.className}
		xmlns='http://www.w3.org/2000/svg'>
		<g clipPath='url(#clip0_21_9)'>
			<path
				fillRule='evenodd'
				clipRule='evenodd'
				d='M3.91225 28.62L32.9123 1.62941C35.2158 -0.514494 38.7842 -0.51449 41.0877 1.62941L70.0878 28.62C71.3073 29.7551 72 31.3461 72 33.0121V68C72 71.3137 69.3137 74 66 74H8C4.68629 74 2 71.3137 2 68V33.0121C2 31.3461 2.6927 29.7551 3.91225 28.62ZM25.3333 41.9239C28.1348 41.9239 30.4058 39.6802 30.4058 36.9124C30.4058 34.1446 28.1348 31.9009 25.3333 31.9009C22.5319 31.9009 20.2609 34.1446 20.2609 36.9124C20.2609 39.6802 22.5319 41.9239 25.3333 41.9239ZM49.6812 41.9239C52.4826 41.9239 54.7536 39.6802 54.7536 36.9124C54.7536 34.1446 52.4826 31.9009 49.6812 31.9009C46.8797 31.9009 44.6087 34.1446 44.6087 36.9124C44.6087 39.6802 46.8797 41.9239 49.6812 41.9239ZM26.3557 47.0557C27.968 45.9529 30.18 46.3502 31.2962 47.9432C34.3002 52.2301 40.7143 52.2301 43.7183 47.9432C44.8345 46.3502 47.0465 45.9529 48.6588 47.0557C50.2711 48.1585 50.6733 50.3439 49.5571 51.9369C43.7292 60.2538 31.2853 60.2538 25.4574 51.9369C24.3412 50.3439 24.7434 48.1585 26.3557 47.0557Z'
				fill={props.fill}
			/>
		</g>
		<defs>
			<clipPath id='clip0_21_9'>
				<rect
					width='74'
					height='74'
					fill={props.fill}
				/>
			</clipPath>
		</defs>
	</svg>
);

export default function Stats() {
	const mobileViewport = useMediaPredicate("(max-width: 728px)");

	// https://www.chartjs.org/docs/latest/configuration

	ChartJS.defaults.font.size = 16;
	ChartJS.defaults.color = '#111DA4';
	ChartJS.defaults.font.family = 'CircularStd, Arial, Helvetica, sans-serif';
	ChartJS.overrides['doughnut'] = {
		cutout: '70%',
		// spacing: 10,
		// borderAlign: 'inner',
		// borderRadius: 4,
		// borderJoinStyle: 'round',
		// offset: 10,
		// hoverBorderJoinStyle: 'round',

		options: {
			aspectRatio: 1.8,
		},
		// layout: {
		// 	padding: 0,
		// },
		plugins: {
			legend: {
				display: true,
				position: mobileViewport ? 'bottom' : 'right',
				align: 'center',
				maxWidth: 180,
				// fullSize: false,
				labels: {
					...ChartJS.overrides['doughnut'].plugins.legend.labels,
					usePointStyle: true,
					pointStyle: 'circle',
					textAlign: 'left',
					padding: 18,
					// boxWidth: 50,
				},
			},
			tooltip: {
				backgroundColor: '#000',
				// borderColor: '#000',
				borderWidth: 0,
				titleColor: 'white',
				bodyColor: 'white',
				padding: 18,
				// labelMargin: 100,
				caretSize: 0,
				pointStyle: 'circle',
				usePointStyle: true,
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
	}, [])

	useEffect(() => {
		if (rentals && rentals.length > 0) {
			setLoading(false);
			setError(undefined);
		}
	}, [rentals]);

	const rentalsPerCountry = rentals && rentals.reduce((acc, rental) => {
		if (rental && rental.country) {
			acc[rental.country] = (acc[rental.country] || 0) + 1;
		}
		return acc;
	}, {});

	const rentalsPerCity = rentals && rentals.reduce((acc, rental) => {
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
				clip: { left: 5, top: false, right: -2, bottom: 0 },
				hoverOffset: 14,
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
				label: '',
				data: [],
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
			<Row className={classNames('gx4', styles.stats)}>
				{loading ? (
					<Col>
						<Loading />
					</Col>
				) : error ? (
					<Col>
						<div>{error}</div>
					</Col>
				) : (
					rentals && (
						<>
							<Col sm='12'>
								<div className={styles.stats_block}>
									<Row>
										<Col
											md='6'
											lg='4'
											className={styles.stats_block_label}>
											<h3 className='mb-4'>
												You're managing <span>{rentals.length}</span> rentals
											</h3>
										</Col>
										<Col
											md='6'
											lg='8'
											className={styles.stats_block_chart}>
											{rentals &&
												rentals.map((rental, index) => (
													<House
														fill={
															index % 3 === 0
																? '#253EC4'
																: index % 3 === 1
																? '#E8D3D5'
																: '#DF927A'
														}
														key={rental.name + index}
														width={mobileViewport ? '10%' : '5%'}
													/>
												))}
										</Col>
									</Row>
								</div>
							</Col>
							<Col sm='6'>
								<div className={styles.stats_block}>
									<Row>
										<Col
											md='12'
											className={styles.stats_block_label}>
											<h3 className='mb-4'>
												Were in the <span>world</span> are your rentals?
											</h3>
										</Col>
										<Col
											md='12'
											className={classNames(
												styles.stats_block_chart,
												styles.stats_block_chart_countries
											)}>
											<Doughnut data={countriesData} />
										</Col>
									</Row>
								</div>
							</Col>

							<Col sm='6'>
								<div className={styles.stats_block}>
									<Row>
										<Col
											md='12'
											className={styles.stats_block_label}>
											<h3 className='mb-4'>
												Which <span>city</span> are your rentals in?
											</h3>
										</Col>
										<Col
											md='12'
											className={classNames(
												styles.stats_block_chart,
												styles.stats_block_chart_cities
											)}>
											<Doughnut data={citiesData} />
										</Col>
									</Row>
								</div>
							</Col>
						</>
					)
				)}
			</Row>
		</>
	);
}
