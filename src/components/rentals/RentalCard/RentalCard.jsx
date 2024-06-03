import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import { Trash, Pen } from 'react-bootstrap-icons';
import { Button, RentalCardScore, RentalCardImage } from '@components';
import styles from './RentalCard.module.sass';

export default function RentalCard({ rental, deleteRental }) {
	const {
		id,
		name,
		country,
		city,
		description,
		neighbourhood,
		review_scores_rating,
		picture_url,
	} = rental;

	// it's just prettier
	function truncate(str) {
		return str && str.length > 100 ? str.substring(0, 100) + ' (...)' : str;
	}

	return (
		<div className={styles.rentalcard}>
			<RentalCardScore review_scores_rating={review_scores_rating} />
			<Link to={`/rentals/${id}`}>
				<div className={styles.rentalcard_body}>
					<p>{name}</p>
					<p>{id}</p>
					{country && <p>{country}</p>}
					{city && (
						<p>
							{city}
							{neighbourhood ? ' 📍 ' + neighbourhood : null}
						</p>
					)}
				</div>
			</Link>

			<div className={styles.rentalcard_footer}>
				<Button
					text='Edit'
					type='primary'
					iconRight={<Pen />}
					className="d-inline-flex"
				/>
				<Button
					text='Delete'
					type='secondary'
					iconRight={<Trash />}
					onClick={(e) => {
						e.preventDefault();
						deleteRental(id);
					}}
					className="d-inline-flex"
				/>
			</div>
		</div>
	);
}
