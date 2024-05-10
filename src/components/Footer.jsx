import { BoxArrowUpRight } from 'react-bootstrap-icons';
import { Container, Row, Col } from 'react-bootstrap'
import styles from './styles/Footer.module.sass'

export default function Footer ({repositoryLink, repositoryLinkDesc}) {
	return (
		<footer className={styles.footer}>
			<Container fluid>
				<Row>
					<Col>
						<p>
							<a href={repositoryLink} className="wavy" target="_blank">{repositoryLinkDesc} <BoxArrowUpRight size="15"/></a>
						</p>
						<em>(additional content?)</em>
					</Col>
				</Row>
			</Container>
		</footer>
	)
}
