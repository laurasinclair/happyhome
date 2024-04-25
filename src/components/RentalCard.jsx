import { Trash, Pen } from 'react-bootstrap-icons'
import { Button, RentalCardScore, RentalCardImage } from '@components'
import { Row, Col } from 'react-bootstrap'
import styles from './RentalCard.module.sass'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function RentalCard({ rental }) {
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
					<RentalCardImage image={picture_url} rentalName={name} />
				</Link>
			</div>
			<Link to={`/rentals/${id}`}>
				<div className={styles.rentalcard_body}>
					<h3>{name}</h3>
					<p>
						<strong>ID:</strong> {id}
					</p>
					<p>
						<strong>Country:</strong> {country}
					</p>
					<p>
						<strong>City:</strong> {city}
						{neighbourhood ? ' 📍 ' + neighbourhood : null}
					</p>
					<p>{truncate(rental.description)}</p>
				</div>
			</Link>

			<div className={styles.rentalcard_footer}>
				<Row>
					<Col className="pe-md-1">
						<Button text="Edit" type="primary" fullWidth iconRight={<Pen />} />
					</Col>
					<Col className="ps-md-1">
						<Button
							text="Delete"
							type="secondary"
							fullWidth
							iconRight={<Trash />}
							onClick={(e) => {
								e.preventDefault()
								deleteRental(id)
								console.log('delete button clicked')
							}}
						/>
					</Col>
				</Row>
			</div>
		</div>
	)
}
