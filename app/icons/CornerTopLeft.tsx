import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const CornerTopLeft = (props: SvgProps) => (
  <Svg width={70} height={98} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M65.112 9.8A4.9 4.9 0 0 0 65.1 0H3.5A3.5 3.5 0 0 0 0 3.5v91a3.5 3.5 0 0 0 7 .01V13.8a4 4 0 0 1 4-4h54.112Z"
      fill="#FF7558"
    />
  </Svg>
)

export default CornerTopLeft
