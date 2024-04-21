import {Container, Row, Col} from 'react-bootstrap'
import Hero from '@components/Hero'
import FlatList from '@pages/FlatList'
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
