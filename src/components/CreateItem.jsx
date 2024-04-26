import styles from './CreateItem.module.sass'
import { Container, Row, Col } from 'react-bootstrap'
import { useState } from 'react'

export default function CreateItem({ handleAddRental }) {
	const 	[name, setName] = useState(''),
			[country, setCountry] = useState(''),
			[city, setCity] = useState(''),
			[description, setDescription] = useState(''),
			[review_scores_rating, setScore] = useState(50),
			[image, setImage] = useState('')

	const 	handleNameInput = (e) => setName(e.target.value),
			handleCountryInput = (e) => setCountry(e.target.value),
			handleCityInput = (e) => setCity(e.target.value),
			handleDescriptionInput = (e) => setDescription(e.target.value),
			handleScoreInput = (e) => setScore(e.target.value),
			handleImageInput = (e) => setImage(e.target.value)

	const handleSubmit = (e) => {
		e.preventDefault()

		const newId = Math.floor(Math.random() * 100000000)
		handleAddRental({ 
			name: (name || 'Name not provided :('), 
			country, 
			city, 
			description: (description || 'Description not provided :('), 
			id: newId, 
			review_scores_rating, 
			image: image
		})

		setName('')
		setCountry('')
		setCity('')
		setDescription('')
		setScore(50)
		setImage('')
	}

	return (
		<>
			<section className={styles.createitem}>
                <h3>Add a new flat</h3>
				<form>
					<Row className="mb-3">
						<Col sm="6">
							<div>
								<label htmlFor="name">Name</label>

								<input name="name" type="text" placeholder="Rental name" value={name} onChange={handleNameInput} />
							</div>
						</Col>

						<Col sm="6">
							<div>
								<label htmlFor="country">Country</label>

								<input name="country" type="text" placeholder="Country" value={country} onChange={handleCountryInput} required />
							</div>
						</Col>

						<Col sm="6">
							<div>
								<label htmlFor="city">City</label>

								<input name="city" type="text" placeholder="City" value={city} onChange={handleCityInput} />
							</div>
						</Col>
						<Col sm="6">
							<div>
								<label htmlFor="image">Image url</label>

								<input name="image" type="text" placeholder="Image" value={image} onChange={handleImageInput} required />
							</div>
						</Col>
						<Col sm="12">
							<div>
								<label htmlFor="description">Description</label>

								<textarea name="description" type="description" placeholder="This flat is fantastic because..." value={description} onChange={handleDescriptionInput} />
							</div>
						</Col>
						<Col>
							<div>
								<label htmlFor="score">Rating</label>
								<p>{review_scores_rating / 20}</p>

								<input type="range" min="1" max="100" list="markers" value={review_scores_rating} name="score" onChange={handleScoreInput} />
							</div>
						</Col>
					</Row>

					<Row>
						<Col>
							<button className="btn-primary" type="submit" onClick={handleSubmit}>
								Add Flat
							</button>
						</Col>
					</Row>
				</form>
			</section>
		</>
	)
}
