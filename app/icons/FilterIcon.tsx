import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const FilterIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M20 7.765a3.765 3.765 0 0 1-7.41.94H4.94a.941.941 0 1 1 0-1.881h7.648a3.766 3.766 0 0 1 7.41.94Zm-5.647.012v-.024a1.882 1.882 0 1 1 0 .024ZM4 15.765a3.765 3.765 0 0 1 7.41-.942h7.649a.941.941 0 0 1 0 1.883H11.41A3.766 3.766 0 0 1 4 15.765Zm5.647-.013a.976.976 0 0 0 0 .025 1.882 1.882 0 1 1 0-.024Z"
      fill={props.fill || "#858487"}
    />
  </Svg>
)

export default FilterIcon
