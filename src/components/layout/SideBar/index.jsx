import { Table, HouseDoor, InfoCircle } from 'react-bootstrap-icons';
import { NavLink } from 'react-router-dom';
import { Logo } from '@components';
import styles from './index.module.sass';
import { useRef } from 'react';
import classNames from 'classnames';

export default function SideBar({ isActive, toggleSidebar }) {
	const sidebarLinks = [
		{
			id: 0,
			icon: Table,
			linkText: 'Dashboard',
			url: '/',
		},
		{
			id: 1,
			icon: HouseDoor,
			iconSize: 22,
			linkText: 'Rentals',
			url: '/rentals',
		},
		{
			id: 2,
			icon: InfoCircle,
			iconSize: 21,
			linkText: 'About',
			url: '/about',
		},
	];

	const LinksList = () => (
		<ul className={styles.sidebar_links}>
			{sidebarLinks.map((item) => (
				<li
					key={item.id}
					className={styles.sidebar_links_link}>
					<NavLink to={item.url}>
						<div className={styles.sidebar_links_link_icon}>
							<item.icon size={item.iconSize} />
						</div>
						<span>{item.linkText}</span>
					</NavLink>
				</li>
			))}
		</ul>
	);

	return (
		<>
			<div
				className={classNames(styles.sidebar, { [styles.toggled]: isActive })}>
				<div>
					<NavLink to='/'>
						<Logo
							size='xs'
							className={classNames(styles.logo, 'mb-0 mb-md-5')}
						/>
					</NavLink>

					<LinksList />
				</div>

				<a
					href='#'
					onClick={toggleSidebar}
					className={styles.menu}>
					<svg
						width='30'
						height='30'
						viewBox='0 0 46 40'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'>
						<path
							d='M37.375 20C37.375 21.38 36.087 22.5 34.5 22.5H11.5C9.913 22.5 8.625 21.38 8.625 20C8.625 18.62 9.913 17.5 11.5 17.5H34.5C36.087 17.5 37.375 18.62 37.375 20Z'
							fill='white'
						/>
						<path
							d='M37.375 10C37.375 11.38 36.087 12.5 34.5 12.5H11.5C9.913 12.5 8.625 11.38 8.625 10C8.625 8.62 9.913 7.5 11.5 7.5H34.5C36.087 7.5 37.375 8.62 37.375 10Z'
							fill='white'
						/>
						<path
							d='M37.375 30C37.375 31.38 36.087 32.5 34.5 32.5H11.5C9.913 32.5 8.625 31.38 8.625 30C8.625 28.62 9.913 27.5 11.5 27.5H34.5C36.087 27.5 37.375 28.62 37.375 30Z'
							fill='white'
						/>
					</svg>
				</a>
			</div>
		</>
	);
}
