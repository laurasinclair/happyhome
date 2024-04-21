import { BoxArrowUpRight } from 'react-bootstrap-icons';
import { Container, Row, Col } from 'react-bootstrap'
import styles from './Footer.module.sass'

export default function Footer (props) {
	return (
		<footer className={styles.footer}>
			<Container fluid>
				<Row>
					<Col>
						<p>
							<a href={props.repositoryLink} className="wavy">{props.repositoryLinkDesc} <BoxArrowUpRight size="15"/></a>
						</p>
						<em>(additional content?)</em>
					</Col>
				</Row>
			</Container>
		</footer>
	)
}
