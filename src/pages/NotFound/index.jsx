import { Container } from 'react-bootstrap';

import styles from './index.module.sass';

export default function NotFound() {
	return (
		<Container
			fluid
			className={styles.notFound}>
			<h1>404</h1>
			<p>Page not found.</p>
		</Container>
	);
}
