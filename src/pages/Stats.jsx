import { Container, Row, Col } from 'react-bootstrap'
import React, { useState, useEffect } from 'react'
import { useRentalsContext } from '../components/RentalsContext'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import logo from '/src/assets/images/logo_happyhome_dark.svg'
import styles from './styles/Stats.module.sass'
import classNames from 'classnames'

ChartJS.register(ArcElement, Tooltip, Legend)

export default function Stats() {
	ChartJS.defaults.font.size = 16
	ChartJS.defaults.color = '#111DA4'
	ChartJS.defaults.font.family = 'CircularStd, Arial, Helvetica, sans-serif'
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
		layout: {
			padding: 10,
		},
		plugins: {
			legend: {
				display: true, // Set display to true
				position: 'bottom',
				align: 'start',
				maxWidth: 40,
				fullSize: false,
				labels: {
					...ChartJS.overrides['doughnut'].plugins.legend.labels,
					usePointStyle: true,
					pointStyle: 'circle',
					textAlign: 'left',
					padding: 12,
					boxWidth: 20,
				},
			},
			tooltip: {
				backgroundColor: '#000',
				// borderColor: '#000',
				borderWidth: 0,
				titleColor: '#fff',
				bodyColor: '#fff',
				padding: 18,
				labelMargin: 100,
				caretSize: 0,
				pointStyle: 'circle',
				usePointStyle: true,
			},
		},
	}

	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')
	const { rentals, setRentals } = useRentalsContext()

	useEffect(() => {
		if (rentals && rentals.length > 0) {
			setLoading(false)
			setError('')
		}
	}, [rentals])

	const rentalsPerCountry = rentals.reduce((acc, rental) => {
		if (rental && rental.country) {
			acc[rental.country] = (acc[rental.country] || 0) + 1
		}
		return acc
	}, {})

	const rentalsPerCity = rentals.reduce((acc, rental) => {
		if (rental && rental.city) {
			acc[rental.city] = (acc[rental.city] || 0) + 1
		}
		return acc
	}, {})

	const [countriesData, setCountriesData] = useState({
		labels: Object.keys(rentalsPerCountry),
		datasets: [
			{
				label: '',
				data: [],
				clip: { left: 5, top: false, right: -2, bottom: 0 },
				hoverOffset: 14,
				backgroundColor: ['#253EC4', '#E8D3D5', '#DF927A', '#F5DF85', '#AFCFD9', '#101883'],
				borderWidth: 0,
			},
		],
	})

	const [citiesData, setCitiesData] = useState({
		labels: Object.keys(rentalsPerCity),
		datasets: [
			{
				label: '',
				data: [],
				backgroundColor: ['#253EC4', '#E8D3D5', '#DF927A', '#F5DF85', '#AFCFD9', '#101883'],
				borderWidth: 0,
			},
		],
	})

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
			}))

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
			}))
		}
	}, [rentals])

	return (
		<>
			<Row className={classNames('gx4', 'gx-xl-5', styles.stats)}>
				{loading ? (
					<Col>
						<div>Loading...</div>
					</Col>
				) : error ? (
					<Col>
						<div>{error}</div>
					</Col>
				) : (
					rentals && (
						<>
							<Col md="6" lg="4">
								<div className={classNames(styles.statsBlock, 'bg-white')}>
									<h3 className="mb-4">{rentals.length} rentals</h3>

									<div>
										{rentals && rentals.map((rental, index) => <img src={logo} width="8%" alt="Rental" />)}
									</div>
								</div>
							</Col>
							<Col md="6" lg="4">
								<div className={classNames(styles.statsBlock, 'bg-white')}>
									<h3 className="mb-4">Rentals per country</h3>
									<div>
										<Doughnut data={countriesData} width={100} height={100} />
									</div>

									<div className="d-none">
										{Object.entries(rentalsPerCountry).map(([country, count], index) => (
											<div key={index}>
												{country}: {count}
											</div>
										))}
									</div>
								</div>
							</Col>
							<Col md="6" lg="4">
								<div className={classNames(styles.statsBlock, 'bg-white')}>
									<h3 className="mb-4">Rentals per city</h3>
									<div>
										<Doughnut data={citiesData} width={100} height={100} />
									</div>

									<div className="d-none">
										{Object.entries(rentalsPerCity).map(([city, count]) => (
											<div key={city}>
												{city}: {count}
											</div>
										))}
									</div>
								</div>
							</Col>
						</>
					)
				)}
			</Row>
		</>
	)
}
