import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const CornerTopRigth = (props: SvgProps) => (
  <Svg width={70} height={98} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M63 94.5a3.5 3.5 0 1 0 7 0V3.49A3.49 3.49 0 0 0 66.51 0H4.9a4.9 4.9 0 1 0 0 9.8H59a4 4 0 0 1 4 4v80.7Z"
      fill="#FF7558"
    />
  </Svg>
)

export default CornerTopRigth
