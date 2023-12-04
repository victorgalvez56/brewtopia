import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const ExploreIcon = (props: SvgProps & { focused: boolean }) => (
  <Svg width={32} height={20} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <Path
      d="M22 8a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM10 8a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
      fill={props.focused ? "#FF7558" : "#49484D"}
    />
    <Path
      d="m31.134 10-10.2 2h-9.8l-10.2-2 2.867-5.267c.733-1.266 2.067-2.066 3.533-2.066h17.467c1.467 0 2.8.8 3.533 2.066l2.8 5.267Z"
      fill={props.focused ? "#FF7558" : "#49484D"}
    />
    <Path
      d="M25.334 20a6.667 6.667 0 1 0 0-13.333 6.667 6.667 0 0 0 0 13.333ZM6.667 20a6.667 6.667 0 1 0 0-13.333 6.667 6.667 0 0 0 0 13.333Z"
      fill={props.focused ? "#FF7558" : "#49484D"}
    />
    <Path
      d="M16 15.333a3.333 3.333 0 1 0 0-6.666 3.333 3.333 0 0 0 0 6.666Z"
      fill={props.focused ? "#FF7558" : "#49484D"}
    />
    <Path
      d="M16 13.333a1.333 1.333 0 1 0 0-2.666 1.333 1.333 0 0 0 0 2.666ZM25.334 18a4.667 4.667 0 1 0 0-9.333 4.667 4.667 0 0 0 0 9.333ZM6.667 18a4.667 4.667 0 1 0 0-9.333 4.667 4.667 0 0 0 0 9.333Z"
      fill="#fff"
    />
  </Svg>
)

ExploreIcon.defaultProps = {
  focused: false,
}

export default ExploreIcon
