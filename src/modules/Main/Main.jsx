import Hero from '/src/modules/Hero/Hero'
import FlatList from '/src/modules/FlatList/FlatList'
import Footer from '/src/modules/Footer/Footer'
import './Main.sass'

export default function Main (props) {
	return (
		<main id="main" className="main">		
			<Hero 
				pageTitle="So many flats."
				leadParagraph="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero, saepe."
			/>

			<FlatList 
			/>

			<Footer 
			repositoryLink="#"
			repositoryLinkDesc="Repository link"
			/>
		</main>
	)
}
