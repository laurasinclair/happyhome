import NavBar from '../NavBar/NavBar'
import Hero from '../Hero/Hero'
import Footer from '../Footer/Footer'

import './Main.sass'

export default function Main (props) {
	return (
		<main id="main" className="main">
			<NavBar />
		
			<Hero 
				title="!"
				text="..."
			/>

			<Footer 
			repositoryLink="#"
			repositoryLinkDesc="Repository link"
			/>
		</main>
	)
}
