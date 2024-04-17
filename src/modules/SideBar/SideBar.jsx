import { HouseDoorFill, InfoCircleFill } from 'react-bootstrap-icons';
import './SideBar.sass'

export default function SideBar() {
	const sidebarLinks = [
		{
			id: 0,
			icon: HouseDoorFill,
			linkText: 'Home',
			url: '#'
		},
		{
			id: 1,
			icon: InfoCircleFill,
			linkText: 'About',
			url: '#'
		}
	  ];
	  
	  const LinksList = () => (
		<ul>
		  {sidebarLinks.map(item => (
			<li key={item.id} className="sidebar_link">
			  <a href={item.url}>
				<item.icon />
			 	{item.linkText}
			  </a>
			</li>
		  ))}
		</ul>
	  );
	  
	return (
		<>
            <div id="sidebar" className="sidebar">
				<LinksList />
            </div>
		</>
	)
}