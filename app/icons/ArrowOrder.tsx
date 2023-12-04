import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"

const ArrowOrder = (props: SvgProps) => (
  <Svg width={21} height={16} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <G clipPath="url(#a)" fill="#4F4F4F">
      <Path d="M14.29 15.71a.997.997 0 0 0 .33.21.94.94 0 0 0 .76 0 .998.998 0 0 0 .33-.21l4-4a1.004 1.004 0 1 0-1.42-1.42L16 12.59V1a1 1 0 0 0-2 0v11.59l-2.29-2.3a1.004 1.004 0 0 0-1.42 1.42l4 4ZM5.714.29a1 1 0 0 0-.33-.21.94.94 0 0 0-.76 0 1 1 0 0 0-.33.21l-4 4a1.004 1.004 0 0 0 1.42 1.42l2.29-2.3V15a1 1 0 1 0 2 0V3.41l2.29 2.3a1.004 1.004 0 1 0 1.42-1.42l-4-4Z" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h21v16H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)

export default ArrowOrder
