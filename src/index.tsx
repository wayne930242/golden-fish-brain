import ReactDOM from 'react-dom/client'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { DynamoDBClient, DynamoDBClientConfig } from "@aws-sdk/client-dynamodb"

import "./index.css";
import App from './App'
import theme from './theme'

const configuration: DynamoDBClientConfig = {
  region: process.env.REACT_APP_DYMANODB_REGION,
  credentials: {
    accessKeyId: process.env.REACT_APP_DYNANODB_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_DYMANODB_SECRET_ACCESS_KEY,
  },
}

export const client = new DynamoDBClient(configuration)

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <ThemeProvider theme={theme}>
    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
    <CssBaseline />
    <App />
  </ThemeProvider>
)
