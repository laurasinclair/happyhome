import { HouseDoorFill, InfoCircleFill } from 'react-bootstrap-icons'
import { NavLink } from 'react-router-dom'
import styles from './SideBar.module.sass'
import classNames from 'classnames';

export default function SideBar({isActive}) {
	const sidebarClass = `${styles.sidebar} ${isActive ? styles.toggled : ''}`;

	const sidebarLinks = [
		{
			id: 0,
			icon: HouseDoorFill,
			linkText: 'Home',
			url: '/',
		},
		{
			id: 2,
			icon: InfoCircleFill,
			linkText: 'About',
			url: '/about',
		},
		{
			id: 3,
			icon: InfoCircleFill,
			linkText: 'Contact',
			url: '/contact',
		},
	]

	const LinksList = () => (
		<ul>
			{sidebarLinks.map((item) => (
				<li key={item.id} className={styles.sidebar_link}>
					<NavLink to={item.url}>
						<item.icon />
						{item.linkText}
					</NavLink>
				</li>
			))}
		</ul>
	)

	return (
		<>
			<div className={sidebarClass}>
				<LinksList />
			</div>
		</>
	)
}
