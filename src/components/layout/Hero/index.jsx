import { Container, Row, Col } from 'react-bootstrap';
import classNames from 'classnames';

import { Logo } from '@components';
import styles from './index.module.sass';

export default function Hero({ size = 'm', title, category, leadText, hasLogo }) {
    const sizeClasses = {
        s: styles['hero-small'],
        m: styles['hero-medium'],
        l: styles['hero-large'],
    };

    const heroSizeClass = sizeClasses[size] || sizeClasses.s;

    const heroContainerClass = classNames(styles.hero, heroSizeClass);

    return (
        <div className={heroContainerClass}>
            <Container className="gx-5" fluid>
                <Row>
                    <Col sm={9} lg={8}>
                        {category && <h3 className={styles['mb-3']}>{category}</h3>}
                        {hasLogo && <Logo size='s' hasText />}
                        <h1 className={styles['mt-2']}>{title}</h1>
                        {leadText && <p className="lead">{leadText}</p>}
                    </Col>
                </Row>
            </Container>
        </div>
    );
}