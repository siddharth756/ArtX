import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import store from "../store/store.jsx"
import { Provider } from "react-redux"
import { AuthProvider } from '../context/AuthContext.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <Provider store={store}>
      <App />
    </Provider>
    </GoogleOAuthProvider>
  </AuthProvider>,
)
