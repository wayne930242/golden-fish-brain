import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

export const MySnackbarAlert = ({ children, open, onClose }: { children: React.ReactNode, open: boolean, onClose: () => any }) => {
  return (
    <Snackbar sx={{ width: '90%' }} open={open} autoHideDuration={6000} onClose={onClose}>
      <Alert onClose={onClose} severity="error" sx={{ width: '100%' }}>
        {children}
      </Alert>
    </Snackbar>
  )
}