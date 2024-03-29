import * as React from 'react'
import {createRoot} from 'react-dom/client'
import { Provider } from 'react-redux'

import './index.sass'

import { store } from './Redux/store'

import {App} from './Components/App'

const root = createRoot(document.getElementById('root'))


root.render(
	<Provider store = { store }>
			<App/>
	</Provider>
);
