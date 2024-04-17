import Hero from '../Hero/Hero'
import List from '../List/List'
import Footer from '../Footer/Footer'
import './Main.sass'

export default function Main (props) {
	return (
		<main id="main" className="main">		
			<Hero 
				title="!"
				text="..."
			/>


			<List 
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
