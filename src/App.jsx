import NavBar from './modules/NavBar/NavBar'
import Home from './modules/Home/Home'
import About from './modules/About/About'
import SideBar from './modules/SideBar/SideBar'
import NotFound from './modules/NotFound/NotFound'
import Footer from '/src/modules/Footer/Footer'
import Hero from '/src/modules/Hero/Hero'

import { Routes, Route } from "react-router-dom";
import './App.sass'

function App() {
	window.appName = "Pretty Cool App";

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
