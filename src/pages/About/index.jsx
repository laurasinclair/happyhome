import { Container, Row, Col } from 'react-bootstrap';
import { Hero } from '@components';

export default function About(props) {
	return (
		<Container fluid>
			<Row>
				<Col>
					<Hero title='About this project' />
				</Col>
			</Row>

			<section>
				<Row>
					<Col
						md='10'
						lg='8'
						xl='6'>
						<div>
							<p className='mb-4'>
								<a
									href='https://github.com/laurasinclair/happyhome'
									className='wavy d-block'
									target='_blank'>
									GitHub repository
								</a>
							</p>

							<p className='lead'>
								All done with my little hands, this dashboard was built and
								designed to provide a user-friendly interface for managing rental properties.
							</p>
							<p>It includes features such as:</p>
							<ul className='list-arrow'>
								<li>Viewing rentals.</li>
								<li>Adding, editing, and deleting information about rentals</li>
								<li>Sorting/Filtering flats</li>
							</ul>
						</div>
					</Col>
				</Row>

				<h2>Technologies used</h2>
				<Row>
					<Col md='6'>
						<h3>Frontend</h3>
						<ul className='list-arrow'>
							<li>React.js</li>
							<li>Vite </li>
							<li>Axios </li>
							<li>
								Bootstrap - for grid system and layout helpers (margin,
								padding). Everything else is custom ❤️
							</li>
							<li>React Router (for client-side routing)</li>
							<li>Node.js environment</li>
							<li>Netlify (for frontend deployment)</li>
						</ul>
					</Col>

					<Col md='6'>
						<h3>Backend</h3>
						<ul className='list-arrow'>
							<li>Express.js</li>
							<li>Mongoose </li>
							<li>CRUD operations (GET/POST/PUT/DELETE) </li>
							<li>Middleware for handling errors </li>
							<li>Dotenv </li>
							<li>Vercel (for backend deployment) </li>
						</ul>

						<h3>Database</h3>
						<ul className='list-arrow'>
							<li>MongoDB</li>
							<li>MongoDB Atlas </li>
						</ul>
					</Col>
				</Row>
			</section>
		</Container>
	);
}
