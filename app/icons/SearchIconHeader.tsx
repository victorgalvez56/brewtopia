import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const SearchIconHeader = (props: SvgProps) => (
  <Svg width={20} height={20} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <Path
      d="M7.344 14.689a7.31 7.31 0 0 0 4.83-1.825l1.403 2.938s.288.235.685.625c.406.381.94.896 1.452 1.435l1.425 1.46.634.678 2.225-2.225-.678-.634-1.46-1.425a36.85 36.85 0 0 1-1.435-1.452c-.39-.397-.625-.685-.625-.685l-2.938-1.403a7.31 7.31 0 0 0 1.827-4.832C14.689 3.296 11.393 0 7.344 0 3.296 0 0 3.296 0 7.344c0 4.05 3.296 7.345 7.344 7.345Z"
      fill="#fff"
    />
    <Path d="M7.25 12.5a5.25 5.25 0 1 0 0-10.5 5.25 5.25 0 0 0 0 10.5Z" fill="#FF7558" />
  </Svg>
)

export default SearchIconHeader
