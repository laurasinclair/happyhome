import {Container, Row, Col} from 'react-bootstrap'
import './Hero.sass'

export default function Hero (props) {
	return (
		<section id="hero" className="hero">
			<Container>
				<Row>
					<Col md='8' lg='7'>
						<h1>{props.pageTitle}</h1>
						<p className="lead">
							{props.leadParagraph}
						</p>
					</Col>
				</Row>
			</Container>
		</section>
	)
}
