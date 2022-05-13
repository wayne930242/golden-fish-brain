import MenuBookIcon from '@mui/icons-material/MenuBook'
import MoodBadIcon from '@mui/icons-material/MoodBad'
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied'
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt'

import { ICode } from "../interface"

const FamiliarIcon: React.ReactNode[] = [
  <MoodBadIcon color='error' />,
  <SentimentDissatisfiedIcon color='warning' />,
  <SentimentSatisfiedAltIcon color='success' />,
]

export const ReviewIcons = ({
  code,
}: {
  code: ICode,
}) => {
  return (
    <div>
      {code.reviewTime.length === 0 ? null
        : (<>
          {[0, 1, 2].includes(code.familiar[code.familiar.length - 1]) ? FamiliarIcon[code.familiar[code.familiar.length - 1]] : null}
          {code.hasPeeped[code.hasPeeped.length - 1] ? <MenuBookIcon sx={{ ml: 1 }} fontSize='small' color='primary' /> : null}
        </>)
      }
    </div>
  )
}