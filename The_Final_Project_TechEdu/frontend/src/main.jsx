// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import StoreContextProvider from './context/StoreContext.jsx'
import store from './store.jsx'
import { Provider } from 'react-redux';
import ContextProvider from './context/ContextProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StoreContextProvider>
    <ContextProvider>
        <Provider store={store}>
            <BrowserRouter>  
                <App />
            </BrowserRouter>
        </Provider>
    </ContextProvider>
</StoreContextProvider>

)
