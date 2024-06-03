import React from 'react';
import styles from './index.module.sass';
import { Container, Row, Col } from 'react-bootstrap';
import { Stats, Loading } from '@components';
import { Hero } from '@components/layout';
import { useRentalsContext } from '@context';
import { Link } from 'react-router-dom';
import { HouseAdd, Houses } from 'react-bootstrap-icons';

function Dashboard() {
	return (
		<Container fluid>
			<Row>
				<Col>
					<Hero
						title='Dashboard'
						size='m'
						leadText="Welcome aboard! Hope you're having a beautiful day."
					/>
				</Col>
			</Row>

			<section>
				<h2 className='mb-4'>Quick actions</h2>
				<Row>
					<Col xs='6'>
						<Link
							to='/rentals'
							className='cta'>
								<Houses size="38" className="mb-2" />
							Manage your rentals
						</Link>
					</Col>
					<Col xs='6'>
						<Link
							to='/add-rental'
							className='cta'>
							<HouseAdd size="38" className="mb-2" />
							Add a new rental
						</Link>
					</Col>
				</Row>
			</section>

			<section>
				<h2 className='mb-4'>Overview</h2>
				<Stats />
			</section>
		</Container>
	);
}

export default Dashboard;
