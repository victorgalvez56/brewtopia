import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const CornerBottomLeft = (props: SvgProps) => (
  <Svg width={70} height={98} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7 3.825a3.5 3.5 0 1 0-7 0V94.5A3.5 3.5 0 0 0 3.5 98h61.616a4.884 4.884 0 1 0 0-9.767H11a4 4 0 0 1-4-4V3.824Z"
      fill="#FF7558"
    />
  </Svg>
)

export default CornerBottomLeft
