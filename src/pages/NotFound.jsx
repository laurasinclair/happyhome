import Hero from '@components/Hero'
import Footer from '@components/Footer'

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
