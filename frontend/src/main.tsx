
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <GoogleOAuthProvider clientId="881522653272-5ojid6g80osrtscnvi2iftugdtfqda78.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
    
)
