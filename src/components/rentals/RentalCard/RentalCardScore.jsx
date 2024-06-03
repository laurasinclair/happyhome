import { CircleFill } from 'react-bootstrap-icons'
import styles from './RentalCard.module.sass'
import { useState, useEffect } from 'react'
import classNames from 'classnames'

export default function RentalCardScore({ review_scores_rating }) {
	const [ratingStyle, setRatingStyle] = useState('')
	
	useEffect(() => {
		if (review_scores_rating !== undefined) {
			if (review_scores_rating <= 50) {
				setRatingStyle(styles.rating_bad)
			} else if (review_scores_rating > 50 && review_scores_rating < 75) {
				setRatingStyle(styles.rating_okay)
			} else if (review_scores_rating >= 75) {
				setRatingStyle(styles.rating_good)
			}
		}
	}, [review_scores_rating])

	return (
		<>
			{review_scores_rating && (
				<div className={styles.rating}>
					<CircleFill size="15" className={classNames(styles.rating_icon, ratingStyle)} />
					<span>{(review_scores_rating / 20).toFixed(1)}</span>
				</div>
			)}
		</>
	)
}
