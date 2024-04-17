import {Container, Row, Col} from 'react-bootstrap'
import './Footer.sass'

export default function Footer (props) {
	return (
		<footer className="footer">
			<Container fluid>
				<Row>
					<Col>
						<p>
							<a href={props.repositoryLink} className="wavy">{props.repositoryLinkDesc}</a>
						</p>
					</Col>
					<Col>
						footer
					</Col>
				</Row>
			</Container>
		</footer>
	)
}
