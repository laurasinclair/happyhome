import React, { useState } from 'react'
import { useEffect } from 'react'

export default function UnsplashImage({ name, index }) {
	const [unsplashImage, setImageUrl] = useState('???')
	useEffect(() => {
		const url = `https://api.unsplash.com/search/photos?query=hippo&page=2&client_id=${import.meta.env.VITE_UNSPLASH_CLIENT_ID}`
		fetch(url)
		.then(resp => resp.json())
		.then(data => setUnsplashImage)
	}, [])
	

	

	return (
		<>
			<img src={unsplashImage} alt={name + ' | ' + window.appName} style={{borderRadius: '6px'}} />
		</>
	)
}
