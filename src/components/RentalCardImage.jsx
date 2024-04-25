import styles from './RentalCard.module.sass'
import { useState, useEffect } from 'react'
import placeholder from '@img/placeholder_image.jpg'

export default function RentalCardImage({ rentalName, image }) {
	const [imageUrl, setImageUrl] = useState(placeholder)

	useEffect(() => {
		if (image) {
			setImageUrl(`https://a0.muscache.com/im/pictures/${image.filename}`)
		}
	}, [image])

	return (
		<>
			<img
				src={imageUrl}
				alt={rentalName}
				onError={() => {
					if (imageUrl !== placeholder) setImageUrl(placeholder)
				}}
			/>
		</>
	)
}
