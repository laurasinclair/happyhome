import styles from './styles/RentalCard.module.sass'
import { useState, useEffect } from 'react'
import placeholder from '@img/placeholder_image.jpg'

export default function RentalCardImage({ rentalName, image }) {
	const [imageUrl, setImageUrl] = useState(placeholder)

	useEffect(() => {
		if (image && image.filename) {
			setImageUrl(`https://a0.muscache.com/im/pictures/${image.filename}`)
		} else if (image) {
			setImageUrl(image)
		}
	}, [image])

	return (
		<>
			<img
				src={imageUrl}
				alt={rentalName}
			/>
		</>
	)
}
