import { Hero, Footer } from '@components';

export default function NotFound (props) {
	return (
		<main className="main">	
			<Hero 
				pageTitle="404"
				leadParagraph="Page not found."
			/>
		</main>
	)
}
