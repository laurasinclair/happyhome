import { StarFill } from 'react-bootstrap-icons'
import styles from './RentalCard.module.sass'
import { useState, useEffect } from 'react'

export default function RentalCardScore({ review_scores_rating }) {
	const [ratingStyle, setRatingStyle] = useState('')
	useEffect(() => {
		if (review_scores_rating !== undefined) {
			if (review_scores_rating <= 50) {
				setRatingStyle(styles.rentalcard_score_bad)
			} else if (review_scores_rating > 50 && review_scores_rating < 75) {
				setRatingStyle(styles.rentalcard_score_okay)
			} else if (review_scores_rating >= 75) {
				setRatingStyle(styles.rentalcard_score_good)
			}
		}
	}, [review_scores_rating])

	return (
		<>
			{review_scores_rating && (
				<p className={`${styles.rentalcard_score} ${ratingStyle}`}>
					<StarFill size="15" />
					<span>{(review_scores_rating / 20).toFixed(1)}</span>/5
				</p>
			)}
		</>
	)
}
