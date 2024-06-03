import { Container, Row, Col } from 'react-bootstrap'
import styles from './Footer.module.sass'

export default function Footer ({repositoryLink, repositoryLinkDesc}) {
	return (
		<footer className={styles.footer}>
			<Container fluid>
				<Row>
					<Col>
						<p>
							Made with 💙 by <a href={repositoryLink} className="wavy" target="_blank">Laura Sinclair</a>
						</p>
					</Col>
				</Row>
			</Container>
		</footer>
	)
}
