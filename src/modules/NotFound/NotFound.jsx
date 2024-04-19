import Hero from '/src/modules/Hero/Hero'
import Footer from '/src/modules/Footer/Footer'

export default function NotFound (props) {
	return (
		<main id="main" className="main">	
			<Hero 
				pageTitle="404"
				leadParagraph="Page not found."
			/>
		</main>
	)
}
