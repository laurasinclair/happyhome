import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import { Trash, Pen } from 'react-bootstrap-icons'

import { Button, RentalCardScore, RentalCardImage } from '@components'

import styles from './styles/RentalCard.module.sass'

export default function RentalCard({ rental, deleteRental }) {
	const { 
		id, 
		name, 
		country, 
		city, 
		description, 
		neighbourhood, 
		review_scores_rating, 
		picture_url
	} = rental

	
	// it's just prettier
	function truncate(str) {
		return str && str.length > 100 ? str.substring(0, 100) + ' (...)' : str
	}

	return (
		<div className={styles.rentalcard}>
			<div className={styles.rentalcard_thumbnail}>
				<Link to={`/rentals/${id}`}>
					<RentalCardScore review_scores_rating={review_scores_rating} />
					<RentalCardImage picture_url={picture_url} rentalName={name} />
				</Link>
			</div>
			<Link to={`/rentals/${id}`}>
				<div className={styles.rentalcard_body}>
					<h3>{name}</h3>
					<p>
						<strong>ID:</strong> {id}
					</p>
					{country &&
					<p>
						<strong>Country:</strong> {country}
					</p>
					}
					{city &&
					<p>
						<strong>City:</strong> {city}
						{neighbourhood ? ' 📍 ' + neighbourhood : null}
					</p>
					}
					<p>{description && truncate(rental.description)}</p>
				</div>
			</Link>

			<div className={styles.rentalcard_footer}>
				<Row>
					<Col className="pe-lg-1">
						<Button text="Edit" type="primary" fullWidth iconRight={<Pen />} />
					</Col>
					<Col className="ps-lg-1">
						<Button
							text="Delete"
							type="secondary"
							fullWidth
							iconRight={<Trash />}
							onClick={(e) => {
								e.preventDefault()
								deleteRental(id)
							}}
						/>
					</Col>
				</Row>
			</div>
		</div>
	)
}
