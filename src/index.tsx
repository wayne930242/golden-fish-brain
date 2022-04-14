import ReactDOM from 'react-dom/client'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import * as AWS from 'aws-sdk'
import { ConfigurationOptions } from 'aws-sdk'

import "./index.css";
import App from './App'
import theme from './theme'

const configuration: ConfigurationOptions = {
  region: process.env.REACT_APP_DYMANODB_REGION,
  secretAccessKey: process.env.REACT_APP_DYMANODB_SECRET_ACCESS_KEY,
  accessKeyId: process.env.REACT_APP_DYNANODB_ACCESS_KEY_ID,
}

AWS.config.update(configuration)

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <ThemeProvider theme={theme}>
    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
    <CssBaseline />
    <App />
  </ThemeProvider>
)
