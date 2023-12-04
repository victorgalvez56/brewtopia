import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const SendIcon = (props: SvgProps) => (
  <Svg
    style={{ marginTop: 6 }}
    width={36}
    height={31}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="m23.075 8.362-9.453 8.06a.814.814 0 0 0-.272.767l2.207 11.88c.19 1.101 1.635 1.391 2.233.447L35.354 1.883a1.22 1.22 0 0 0-1.123-1.87L1.586 2.541C.472 2.628.05 4.04.932 4.722l9.453 7.528a.814.814 0 0 0 .804.12l11.557-4.56a.325.325 0 0 1 .33.551Z"
      fill="#FF7558"
    />
  </Svg>
)

export default SendIcon
