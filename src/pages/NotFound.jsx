import { Container, Row, Col } from 'react-bootstrap'
import styles from './NotFound.module.sass'
import { Hero } from '@components/layout'

export default function NotFound () {
	return (
		<main className={styles.notfound + ' main'}>	
			<Container fluid>
				<Row>
					<Col className={styles.layout}>
						<h1>404</h1>
						<p>Page not found.</p>
					</Col>
				</Row>
			</Container>
		</main>
	)
}
