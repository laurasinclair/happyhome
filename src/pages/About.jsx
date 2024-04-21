import { Hero, Footer } from '@components';
import './About.sass'

export default function About (props) {
	return (
		<main id="main" className="main">	
			<Hero 
				pageTitle="About"
				leadParagraph="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero, saepe."
			/>

			<Footer 
			repositoryLink="#"
			repositoryLinkDesc="Repository link"
			/>
		</main>
	)
}
