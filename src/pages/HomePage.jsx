import { Container, Row, Col } from 'react-bootstrap'
import { Hero } from '@components';
import { Dashboard } from '@pages';

export default function HomePage({rentalsData}) {
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

			<Dashboard rentalsData={rentalsData} />
		</main>
	)
}
