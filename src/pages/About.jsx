import { Container, Row, Col } from 'react-bootstrap'
import { Hero, UnsplashImage } from '@components'

export default function About(props) {
	return (
		<main className="main about">
			<Container fluid>
				<Row>
					<Col>
						<Hero title="About" lead="Lorem ipsum dolor sit, amet consectetur adipisicing elit." />
					</Col>
				</Row>
				<Row>
					<Col>
						<UnsplashImage index="1" name="aa" />
						<UnsplashImage index="2" />
						<UnsplashImage index="3" />
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
