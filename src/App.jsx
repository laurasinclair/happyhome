import { useState } from 'react'
import NavBar from './components/NavBar/NavBar'
import Main from './components/Main/Main'
import SideBar from './components/SideBar/SideBar'
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
