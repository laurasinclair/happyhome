import {Container, Row, Col} from 'react-bootstrap'
import styles from './NavBar.module.sass'
import { Logo } from '@components';

export default function NavBar (props) {
	return (
		<nav className={styles.navbar}>
			<Container fluid>
				<Row>
					<Col>		
						<Logo size="xs" hasText />
					</Col>
				</Row>
			</Container>
		</nav>
	)
}
