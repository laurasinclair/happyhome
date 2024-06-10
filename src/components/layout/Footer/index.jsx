import { Row, Col } from 'react-bootstrap'

import { Container } from '@components'
import styles from './index.module.sass'

export default function Footer ({repositoryLink, repositoryLinkDesc}) {
	return (
		<footer className={styles.footer}>
			<Container className="gx-5" fluid>
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
