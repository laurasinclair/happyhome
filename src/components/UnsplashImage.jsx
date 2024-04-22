import React from 'react'

export default function UnsplashImage() {

	function loadImage() {
		const url = 'https://api.unsplash.com/search/photos?query=home&per_page=20&client_id=482IFLBmLCZUSRJAKS453o-0vaF6t1jLvbOUa40iYZo'
		
        const homeImageUrl = ''
        fetch(url)
			.then((response) => {
				return response.json()
			})
			.then((data) => {
				console.log(data)

				for (let i = 0; i < data.results.length; i++) {
                    homeImageUrl = data.results[i].urls.thumb
				}
			})


			
	}


	// function unsplashImage(index) {
	// 	return fetch(unsplashUrl)
	// 	.then((response) => response.json()) // Parse the response as JSON
	// 	.then((data) => {
	// 		// Check if the index is within the range of the results array
	// 		if (index < data.results.length) {
	// 			// Return the thumbnail URL of the image at the specified index
	// 			const imageUrl = data.results[index].urls.thumb;
	// 			console.log('Image URL:', imageUrl); // Debugging: log the URL
	// 			return imageUrl;
	// 		} else {
	// 			console.error('Index out of range.');
	// 			return null; // Return null if the index is out of range
	// 		}
	// 	})
	// 	.catch((error) => {
	// 		console.error('Error fetching data from Unsplash:', error);
	// 		return null; // Return null if there is an error
	// 	});
	// } 

	// const [unsplashImage, setImageUrl] = useState(null);

    // useEffect(() => {
    //     // Call unsplashImage function and update the state with the fetched URL
    //     unsplashImage(index)
    //         .then((url) => {
    //             setImageUrl(url);
    //         });
    // }, [index, unsplashImage]);
  return (
    <div>UnsplashImage
        <img src={homeImageUrl} alt="" />
    </div>
  )
}
