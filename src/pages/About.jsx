import { Container, Row, Col } from 'react-bootstrap'
import { Hero } from '@components/layout'

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
					<Col className="px-4">
						<p>This project was developed as part of a bootcamp group project.</p>

						<div className="mb-4">
							<p>
								The dashboard is designed to provide a user-friendly interface for managing rental properties, tenants, and other administrative tasks. It includes features such as:
							</p>
							<ul className="list-arrow">
								<li>Viewing and updating property listings</li>
								<li>Viewing and processing rental payments </li>
								<li>Managing tenant information</li>
							</ul>
						</div>

						<div className="mb-4">
							<h3>Technologies used</h3>
							<ul className="list-arrow">
								<li>React</li>
								<li>Sass/CSS: Bootstrap for grid + layout helpers, otherwise custom</li>
								<li>Vite </li>
								<li>Netlify</li>
								<li>JSON dataset: provided by the bootcamp, serves as the data source for the application.</li>
							</ul>
						</div>

						<div className="mb-4">
							<h3>Future Improvements</h3>
							<ul className="list-arrow">
								<li>More comprehensive reporting and analytics </li>
								<li>A more customizable and user-friendly interface</li>
							</ul>
						</div>
					</Col>
				</Row>
			</Container>
		</main>
	)
}
