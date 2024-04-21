import { HouseDoorFill, InfoCircleFill } from 'react-bootstrap-icons'
import { NavLink } from 'react-router-dom'
import './SideBar.sass'

export default function SideBar() {
	const sidebarLinks = [
		{
			id: 0,
			icon: HouseDoorFill,
			linkText: 'Home',
			url: '/',
		},
		{
			id: 1,
			icon: InfoCircleFill,
			linkText: 'About',
			url: '/about',
		},
		{
			id: 1,
			icon: InfoCircleFill,
			linkText: 'Contact',
			url: '/contact',
		},
	]

	const LinksList = () => (
		<ul>
			{sidebarLinks.map((item) => (
				<li key={item.id} className="sidebar_link">
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
			<div id="sidebar" className="sidebar">
				<LinksList />
			</div>
		</>
	)
}
