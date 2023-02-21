import * as React from 'react'
import {createRoot} from 'react-dom/client'

import './index.sass'

import {App} from './Components/App'

const root = createRoot(document.getElementById('root'))

const rerenderEntireTree = () =>{
	root.render(<App/>);
}


rerenderEntireTree()