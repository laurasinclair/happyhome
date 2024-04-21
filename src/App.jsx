import { Home, NotFound, About } from '@pages';
import { NavBar, SideBar, Footer } from '@components';
import { Routes, Route } from "react-router-dom";
import './App.sass'

window.appName = "Pretty Cool App";

function App() {
	return (
		<>
		<div id="app">
			<NavBar 
				logoUrl="./hamburger.png"
				logoWidth="30"
				logoHeight="30"
			/>

			<SideBar />

			<div id="page">				
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/about" element={<About />} />
					<Route path="*" element={<NotFound />} />
				</Routes>

				<Footer 
					repositoryLink="#"
					repositoryLinkDesc="Repository link"
				/>
			</div>
		</div>
		</>
	)
}

export default App
