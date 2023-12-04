import * as React from "react"
import Svg, { SvgProps, Path, Defs, Pattern, Use, Image } from "react-native-svg"

const Intro5 = (props: SvgProps) => (
  <Svg
    width={246}
    height={173}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}
  >
    <Path
      opacity={0.3}
      transform="rotate(-68.873 0 90.801)"
      fill="url(#a)"
      d="M0 90.801h97.345v225.536H0z"
    />
    <Defs>
      <Pattern id="a" patternContentUnits="objectBoundingBox" width={1} height={1}>
        <Use xlinkHref="#b" transform="matrix(.01724 0 0 .00744 0 -.017)" />
      </Pattern>
      <Image
        id="b"
        width={58}
        height={139}
        xlinkHref="data:image/png;base64,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"
      />
    </Defs>
  </Svg>
)

export default Intro5
