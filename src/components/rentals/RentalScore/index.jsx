import { CircleFill } from 'react-bootstrap-icons'
import styles from './index.module.sass'
import { useState, useEffect } from 'react'
import classNames from 'classnames'

export default function RentalScore({ review_scores_rating }) {
	const [ratingStyle, setRatingStyle] = useState('')
	
	useEffect(() => {
		if (review_scores_rating !== undefined) {
			if (review_scores_rating <= 50) {
				setRatingStyle(styles.rentalScore_bad)
			} else if (review_scores_rating > 50 && review_scores_rating < 75) {
				setRatingStyle(styles.rentalScore_okay)
			} else if (review_scores_rating >= 75) {
				setRatingStyle(styles.rentalScore_good)
			}
		}
	}, [review_scores_rating])

	return (
		<>
			{review_scores_rating && (
				<div className={styles.rentalScore}>
					<CircleFill size={15} className={classNames(styles.rentalScore_icon, ratingStyle)} />
					<span>{(review_scores_rating / 20).toFixed(1)}</span>
				</div>
			)}
		</>
	)
}
