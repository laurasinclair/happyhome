import { useState } from 'react'
import Main from './components/Main/Main'
import SideBar from './components/SideBar/SideBar'
import './App.sass'


function App() {
	return (
		<>
		<div id="app">
			<SideBar />
			<Main />
		</div>
		</>
	)
}

export default App
