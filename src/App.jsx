import { useState } from 'react'
import NavBar from './components/NavBar/NavBar'
import SideBar from './components/SideBar/SideBar'
import Hero from './components/Hero/Hero'
import Footer from './components/Footer/Footer'

function App() {
	return (
		<>
		<NavBar />

		<SideBar />
		
		<Hero 
			title="!"
			text="..."
		/>

		<Footer />
		</>
	)
}

export default App
