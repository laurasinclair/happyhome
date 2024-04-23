import React, { useState } from 'react'

export default function UnsplashImage({ name, index }) {
	const [unsplashImage, setImageUrl] = useState('???')

	function loadImage() {
		const url = 'https://api.unsplash.com/search/photos?query=hippo&page=2&client_id=482IFLBmLCZUSRJAKS453o-0vaF6t1jLvbOUa40iYZo'

		let homeImageUrl = ''
		fetch(url)
			.then((response) => {
				return response.json()
			})
			.then((data) => {
				console.log('index:', index, 'url:', data.results[index].urls.regular)
				homeImageUrl = data.results[index].urls.regular // adjust index later
				setImageUrl(homeImageUrl)
			})
			.catch((error) => {
				console.error('index:', index, 'Error fetching data from Unsplash:', error)
				return null
			})
	}

	loadImage()

	return (
		<>
			<img src={unsplashImage} alt={name + ' | ' + window.appName} style={{borderRadius: '6px'}} />
		</>
	)
}
