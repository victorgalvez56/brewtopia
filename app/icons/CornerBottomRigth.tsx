import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const CornerBottomRigth = (props: SvgProps) => (
  <Svg width={70} height={98} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M55.02 88.232H4.882a4.884 4.884 0 0 0 0 9.767h60.254C67.823 98 70 95.801 70 93.116V3.826a3.5 3.5 0 1 0-7 0v80.406a4 4 0 0 1-4 4h-3.98Z"
      fill="#FF7558"
    />
  </Svg>
)

export default CornerBottomRigth
