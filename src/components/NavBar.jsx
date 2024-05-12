import { Container, Row, Col } from 'react-bootstrap'
import styles from './styles/NavBar.module.sass'
import { Logo, Button } from '@components'
import React, { useState, useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'

export default function NavBar({ toggleSidebar }) {
	const [stickyClass, setStickyClass] = useState('')

	const prevScrollY = useRef(0);

	useEffect(() => {
        const stickNavbar = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > prevScrollY.current + 20) {
                setStickyClass(styles.navbar_sticky);
            } else if (currentScrollY < prevScrollY.current - 20) {
                setStickyClass('');
            }
            prevScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', stickNavbar);

        return () => {
            window.removeEventListener('scroll', stickNavbar);
        };
    }, []);

	return (
		<nav className={styles.navbar + ' ' + stickyClass}>
			<Container fluid>
				<Row>
					<Col className="m-0 p-0 d-flex align-items-center justify-content-between">
						<NavLink to='/'>
							<Logo size="xs" hasText />
						</NavLink>

						<a href="#" className={styles.navbar_menuToggle} onClick={toggleSidebar}>
							<svg width="30" height="30" viewBox="0 0 46 40" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M37.375 20C37.375 21.38 36.087 22.5 34.5 22.5H11.5C9.913 22.5 8.625 21.38 8.625 20C8.625 18.62 9.913 17.5 11.5 17.5H34.5C36.087 17.5 37.375 18.62 37.375 20Z" fill="white" />
								<path d="M37.375 10C37.375 11.38 36.087 12.5 34.5 12.5H11.5C9.913 12.5 8.625 11.38 8.625 10C8.625 8.62 9.913 7.5 11.5 7.5H34.5C36.087 7.5 37.375 8.62 37.375 10Z" fill="white" />
								<path d="M37.375 30C37.375 31.38 36.087 32.5 34.5 32.5H11.5C9.913 32.5 8.625 31.38 8.625 30C8.625 28.62 9.913 27.5 11.5 27.5H34.5C36.087 27.5 37.375 28.62 37.375 30Z" fill="white" />
							</svg>
						</a>
					</Col>
				</Row>
			</Container>
		</nav>
	)
}
