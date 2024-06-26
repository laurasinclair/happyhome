import { Row, Col } from 'react-bootstrap';

import { BoxArrowUpRight } from 'react-bootstrap-icons';

import { Hero, Container } from '@components';

export default function About() {
	return (
		<Container>
			<Hero title='About this project' />

			<section>
				<Row>
					<Col
						md={10}
						lg={8}
						xl={6}>
						<div className='mb-4'>
							<p className='lead'>
								All done with my little hands, this dashboard was built and
								designed to provide a user-friendly interface for managing rental properties.
							</p>
						</div>

						<div className='my-5'>
							<p>
								<a
									href='https://github.com/laurasinclair/happyhome'
									className='wavy d-block'
									target='_blank'>
									GitHub repository <BoxArrowUpRight size={13} />
								</a>
							</p>
						</div>

						<h2>Technologies used</h2>
						<h3>Frontend</h3>
						<ul className='list-arrow'>
							<li>React.js</li>
							<li>Vite </li>
							<li>Axios </li>
							<li>
								Bootstrap - for grid system and layout helpers. Everything else
								is custom ❤️
							</li>
							<li>React Router (for client-side routing)</li>
							<li>Node.js environment</li>
							<li>Netlify </li>
						</ul>

						<h3>Backend</h3>
						<ul className='list-arrow'>
							<li>Express.js</li>
							<li>Mongoose </li>
							<li>CRUD operations (GET/POST/PUT/DELETE) </li>
							<li>Middleware for handling errors </li>
							<li>Dotenv </li>
							<li>Vercel </li>
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
