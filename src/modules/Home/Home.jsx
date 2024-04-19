import Hero from '/src/modules/Hero/Hero'
import FlatList from '/src/modules/FlatList/FlatList'
import './Home.sass'

export default function Home (props) {
	return (
		<main id="home" className="home">
			<Hero 
				pageTitle="So many flats."
				leadParagraph="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero, saepe."
			/>
			<FlatList />
		</main>
	)
}
