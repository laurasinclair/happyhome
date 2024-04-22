import { Container, Row, Col } from 'react-bootstrap'
import { Hero } from '@components';
import { Dashboard } from '@pages';

import './HomePage.sass'

export default function Home(props) {
	return (
		<main className="home">
			<Container fluid>
				<Row>
					<Col>
						<Hero 
							title="Admin dashboard" 
							size="m"
						/>
					</Col>
				</Row>
			</Container>

			<Dashboard />
		</main>
	)
}
