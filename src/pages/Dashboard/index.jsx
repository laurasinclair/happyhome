import React from 'react';
import styles from './index.module.sass'
import { Col, Container, Row } from 'react-bootstrap';
import { Stats, Loading } from '@components';
import { Hero } from '@components/layout';
import { useRentalsContext } from '@context';

function Dashboard() {
	return (
		<Container fluid>
			<Row>
				<Col>
					<Hero
						title='Dashboard'
						size='m'
					/>
				</Col>
			</Row>

			<Stats />

			<Row>
				<Col></Col>
			</Row>
		</Container>
	);
}

export default Dashboard;
