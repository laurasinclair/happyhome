import { Container, Row, Col } from 'react-bootstrap'
import { Hero } from '@components'
import { useState, useEffect } from 'react'
const breakingBadUrl = 'https://api.breakingbadquotes.xyz/v1/quotes'

export default function About(props) {
	const [quotes, setQuotes] = useState([])

	useEffect(() => {
		fetch(breakingBad)
			.then((resp) => {
				console.log(resp.json)
				return resp.json()
			})
			.then((data) => {
				console.log(data)
				setQuotes([data])
			})
			.catch((err) => 'Error')
	}, [])

	return (
		<main className="main about">
			<Container fluid>
				<Row>
					<Col>
						<Hero title="About" lead="Lorem ipsum dolor sit, amet consectetur adipisicing elit." />
					</Col>
				</Row>
				<Row>
					<Col md="8" className="px-4">
						<div className="quote">
							{quotes.map((e, i) => {
								return (
									<div key={i}>
									<h3>{e[i].quote}</h3>
									<p>{e[i].author}</p>
									</div>
								)
							})}
						</div>
					</Col>
				</Row>

				<Row className="d-none">
					<Col>
						<div>
							<p>This project was developed as part of a bootcamp group project.</p>

							<p>
								The dashboard is designed to provide a user-friendly interface for managing rental properties, tenants, and other administrative tasks. It includes features such as:
								<ul>
									<li>Viewing and updating property listings</li>
									<li>Viewing and processing rental payments </li>
									<li>Managing tenant information</li>
								</ul>
								<h3>Technologies Used</h3>
								<ul>
									<li>React: The core library for building the dashboard's interactive UI.</li>
									<li>Sass/CSS: For styling the application with an organized and efficient approach.</li>
									<li>Managing tenant information</li>
									<li>Vite: For fast development and build times. </li>
									<li>Netlify: For deploying and hosting the application seamlessly.</li>
									<li>JSON Dataset: Provided by the bootcamp, it serves as the data source for the application.</li>
								</ul>
								<h3>Future Improvements</h3>
								<ul>
									<li>More comprehensive reporting and analytics </li>
									<li>A more customizable and user-friendly interface</li>
								</ul>
							</p>

							<p> Thank you for checking out the project! Feel free to explore the code and reach out with any feedback or questions.</p>
						</div>
					</Col>
				</Row>
			</Container>
		</main>
	)
}
