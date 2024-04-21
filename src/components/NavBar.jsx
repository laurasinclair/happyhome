import {Container, Row, Col} from 'react-bootstrap'
import './NavBar.sass'

export default function NavBar (props) {
	return (
		<nav className="navbar">
			<Container fluid>
				<Row>
					<Col>
						<div className="navbar_logo">
							<img src={props.logoUrl} alt={window.appName} width={props.logoWidth} height={props.logoHeight} />
							<h2>{window.appName}</h2>
						</div>
					</Col>
				</Row>
			</Container>
		</nav>
	)
}
