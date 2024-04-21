import { Container, Row, Col } from 'react-bootstrap'
import { Logo, Hero } from '@components';
import { FlatList } from '@pages';

import './HomePage.sass'

export default function Home(props) {
	return (
		<main id="home" className="home">
			<Container fluid>
				<Row>
					<Col>
						<Hero 
							title="So many flats" 
							lead="Lorem ipsum dolor sit, amet consectetur adipisicing elit."
						/>
					</Col>
				</Row>
			</Container>

			<FlatList />
		</main>
	)
}
