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

export const ReviewIcon = ({ familiar, hasPeeped, time }: { familiar: number, hasPeeped: boolean, time?: number }) => {
  if (familiar === undefined || hasPeeped === undefined) return null
  return (
    <>
      {[0, 1, 2].includes(familiar) ? FamiliarIcon[familiar] : null}
      {hasPeeped ? <MenuBookIcon sx={{ ml: 1 }} fontSize='small' color='primary' /> : null}
      {time >= 2 ? <span>x {time}</span> : null}
    </>
  )
}

export const ReviewLastIcons = ({
  code,
}: {
  code: ICode,
}) => {
  return (
    <div>
      {code.reviewTime.length === 0
        ? null
        : (
          <ReviewIcon
            familiar={code.familiar[code.familiar.length - 1]}
            hasPeeped={code.hasPeeped[code.hasPeeped.length - 1]}
          />
        )
      }
    </div>
  )
}