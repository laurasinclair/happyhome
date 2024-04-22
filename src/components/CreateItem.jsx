import styles from './CreateItem.module.sass'
import { Container, Row, Col } from 'react-bootstrap'
import { useState } from 'react'

export default function CreateItem({ handleAddRental }) {
	const [name, setName] = useState('')
	const [country, setCountry] = useState('')
	const [city, setCity] = useState('')
	const [description, setDescription] = useState('')
	const [review_scores_rating, setScore] = useState(25)

	const handleNameInput = (e) => setName(e.target.value)
	const handleCountryInput = (e) => setCountry(e.target.value)
	const handleCityInput = (e) => setCity(e.target.value)
	const handleDescriptionInput = (e) => setDescription(e.target.value)
	const handleScoreInput = (e) => {
		console.log(e.target.value)
		setScore(e.target.value)
	}

	const handleSubmit = (e) => {
		e.preventDefault()

		const newId = Math.floor(Math.random() * 100000000)
		handleAddRental({ name, country, city, description, id: newId, review_scores_rating })

		setName('')
		setCountry('')
		setCity('')
		setDescription('')
		setScore(50)
	}

	return (
		<>
			<section className={styles.createitem}>
                <h3>Add a new flat</h3>
				<form>
					<Row className="mb-3">
						<Col>
							<div>
								<label htmlFor="name">Name</label>

								<input name="name" type="text" placeholder="Rental name" value={name} onChange={handleNameInput} required />
							</div>
							<div>
								<label htmlFor="country">Country</label>

								<input name="country" type="text" placeholder="Country" value={country} onChange={handleCountryInput} required />
							</div>
						</Col>

						<Col>
							<div>
								<label htmlFor="city">City</label>

								<input name="city" type="text" placeholder="City" value={city} onChange={handleCityInput} />
							</div>
							<div>
								<label htmlFor="description">Description</label>

								<textarea name="description" type="description" placeholder="This flat is fantastic because..." value={description} onChange={handleDescriptionInput} />
							</div>
						</Col>
					</Row>

					<Row>
						<Col md="6">
							<div>
								<label htmlFor="score">Rating</label>
								<div>{review_scores_rating / 20}</div>
								<input type="range" min="1" max="100" value={review_scores_rating} name="score" onChange={handleScoreInput} />
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
