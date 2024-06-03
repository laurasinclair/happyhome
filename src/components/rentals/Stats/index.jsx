import { Container, Row, Col } from 'react-bootstrap'
import React, { useState, useEffect } from 'react'
import { useRentalsContext } from '@context'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import logo from '/src/assets/images/logo_happyhome_dark.svg'
import styles from './Stats.module.sass'
import classNames from 'classnames'

ChartJS.register(ArcElement, Tooltip, Legend)

const House = (props) => (
	<svg width={props.width} height={props.height} viewBox="0 0 74 74" fill={props.fill} className={props.className} xmlns="http://www.w3.org/2000/svg">
		<g clipPath="url(#clip0_21_9)">
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M3.91225 28.62L32.9123 1.62941C35.2158 -0.514494 38.7842 -0.51449 41.0877 1.62941L70.0878 28.62C71.3073 29.7551 72 31.3461 72 33.0121V68C72 71.3137 69.3137 74 66 74H8C4.68629 74 2 71.3137 2 68V33.0121C2 31.3461 2.6927 29.7551 3.91225 28.62ZM25.3333 41.9239C28.1348 41.9239 30.4058 39.6802 30.4058 36.9124C30.4058 34.1446 28.1348 31.9009 25.3333 31.9009C22.5319 31.9009 20.2609 34.1446 20.2609 36.9124C20.2609 39.6802 22.5319 41.9239 25.3333 41.9239ZM49.6812 41.9239C52.4826 41.9239 54.7536 39.6802 54.7536 36.9124C54.7536 34.1446 52.4826 31.9009 49.6812 31.9009C46.8797 31.9009 44.6087 34.1446 44.6087 36.9124C44.6087 39.6802 46.8797 41.9239 49.6812 41.9239ZM26.3557 47.0557C27.968 45.9529 30.18 46.3502 31.2962 47.9432C34.3002 52.2301 40.7143 52.2301 43.7183 47.9432C44.8345 46.3502 47.0465 45.9529 48.6588 47.0557C50.2711 48.1585 50.6733 50.3439 49.5571 51.9369C43.7292 60.2538 31.2853 60.2538 25.4574 51.9369C24.3412 50.3439 24.7434 48.1585 26.3557 47.0557Z"
				fill={props.fill}
			/>
		</g>
		<defs>
			<clipPath id="clip0_21_9">
				<rect width="74" height="74" fill={props.fill} />
			</clipPath>
		</defs>
	</svg>
)

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
							<Col sm="6" lg="4">
								<div className={classNames(styles.statsBlock, 'bg-white')}>
									<h3 className="mb-4">{rentals.length} rentals</h3>

									<div>
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
													width="9%"
												/>
											))}
									</div>
								</div>
							</Col>
							<Col sm="6" lg="4">
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
							<Col sm="6" lg="4">
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
