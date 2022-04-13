import Box from '@mui/material/Box'
import { Button } from '@mui/material'
import { Typography } from '@mui/material'

export const MySpeedDial = ({
  handleOnClick,
}: {
  handleOnClick: (e?: React.MouseEvent<HTMLButtonElement>) => any,
}) => {

  return (
    <Box sx={{ height: 600, transform: 'translateZ(0px)', flexGrow: 1 }}>
      <Button
        sx={{ position: 'absolute', bottom: 16, right: 16, width: 64, height: 64, borderRadius: 32 }}
        size="large"
        color="primary"
        variant='contained'
        onClick={handleOnClick}
      >
        <Typography variant="h3" align="center" component="p" >+</Typography>
      </Button>
    </Box>
  )
}

export default MySpeedDial
