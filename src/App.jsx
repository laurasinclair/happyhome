import { useState } from 'react'
import NavBar from './modules/NavBar/NavBar'
import Main from './modules/Main/Main'
import SideBar from './modules/SideBar/SideBar'
import './App.sass'


function App() {
	window.appName = "Pretty Cool App";

	return (
		<>
		<div id="app">
			<NavBar 
				logoUrl="./public/hamburger.png"
				logoWidth="50"
				logoHeight="50"
			/>
			<SideBar />
			<Main />
		</div>
		</>
	)
}

export default App
