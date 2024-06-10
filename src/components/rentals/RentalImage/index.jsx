import { useState, useEffect } from 'react'

// import styles from './index.module.sass'
import placeholder from '@img/placeholder_image.jpg'

export default function RentalImage({ rentalName, picture_url }) {
	const [imageUrl, setImageUrl] = useState(placeholder)

	useEffect(() => {
		if (picture_url && picture_url.thumbnail) {
			setImageUrl(`https://a0.muscache.com/im/pictures/${picture_url.filename}`)
		} else if (picture_url && !picture_url.thumbnail) {
			setImageUrl(picture_url)
		}
	}, [picture_url])

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
