import * as React from "react"
import Svg, { SvgProps, Mask, Path } from "react-native-svg"

const ScannerBeersIcon = (props: SvgProps) => (
  <Svg width={22} height={23} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <Mask id="a" fill="#fff">
      <Path fillRule="evenodd" clipRule="evenodd" d="M0 0v6.667h1.5V1.5h5.167V0H0Z" />
    </Mask>
    <Path fillRule="evenodd" clipRule="evenodd" d="M0 0v6.667h1.5V1.5h5.167V0H0Z" fill="#fff" />
    <Path
      d="M0 0v-2h-2v2h2Zm0 6.667h-2v2h2v-2Zm1.5 0v2h2v-2h-2Zm0-5.167v-2h-2v2h2Zm5.167 0v2h2v-2h-2Zm0-1.5h2v-2h-2v2ZM0 2v-4 4Zm2 4.667V0h-4v6.667h4Zm-.5-2H0v4h1.5v-4ZM-.5 1.5v5.167h4V1.5h-4Zm7.167-2H1.5v4h5.167v-4Zm-2 .5v1.5h4V0h-4ZM1.5 2h5.167v-4H1.5v4ZM0 2h1.5v-4H0v4Z"
      fill="#fff"
      mask="url(#a)"
    />
    <Mask id="b" fill="#fff">
      <Path fillRule="evenodd" clipRule="evenodd" d="M21 0h-6.667v1.5H19.5v5.167H21V0Z" />
    </Mask>
    <Path fillRule="evenodd" clipRule="evenodd" d="M21 0h-6.667v1.5H19.5v5.167H21V0Z" fill="#fff" />
    <Path
      d="M21 0h2v-2h-2v2Zm-6.667 0v-2h-2v2h2Zm0 1.5h-2v2h2v-2Zm5.167 0h2v-2h-2v2Zm0 5.167h-2v2h2v-2Zm1.5 0v2h2v-2h-2ZM19 0h4-4Zm-4.667 2H21v-4h-6.667v4Zm2-.5V0h-4v1.5h4Zm3.167-2h-5.167v4H19.5v-4Zm2 7.167V1.5h-4v5.167h4Zm-.5-2h-1.5v4H21v-4ZM19 1.5v5.167h4V1.5h-4ZM19 0v1.5h4V0h-4Z"
      fill="#fff"
      mask="url(#b)"
    />
    <Mask id="c" fill="#fff">
      <Path fillRule="evenodd" clipRule="evenodd" d="M21 22v-6.667h-1.5V20.5h-5.167V22H21Z" />
    </Mask>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M21 22v-6.667h-1.5V20.5h-5.167V22H21Z"
      fill="#fff"
    />
    <Path
      d="M21 22v2h2v-2h-2Zm0-6.667h2v-2h-2v2Zm-1.5 0v-2h-2v2h2Zm0 5.167v2h2v-2h-2Zm-5.167 0v-2h-2v2h2Zm0 1.5h-2v2h2v-2ZM21 20v4-4Zm-2-4.667V22h4v-6.667h-4Zm.5 2H21v-4h-1.5v4Zm2 3.167v-5.167h-4V20.5h4Zm-7.167 2H19.5v-4h-5.167v4Zm2-.5v-1.5h-4V22h4Zm3.167-2h-5.167v4H19.5v-4Zm1.5 0h-1.5v4H21v-4Z"
      fill="#fff"
      mask="url(#c)"
    />
    <Mask id="d" fill="#fff">
      <Path fillRule="evenodd" clipRule="evenodd" d="M0 22h6.667v-1.5H1.5v-5.167H0V22Z" />
    </Mask>
    <Path fillRule="evenodd" clipRule="evenodd" d="M0 22h6.667v-1.5H1.5v-5.167H0V22Z" fill="#fff" />
    <Path
      d="M0 22h-2v2h2v-2Zm0 0h2-2Zm6.667 0v2h2v-2h-2Zm0-1.5h2v-2h-2v2Zm-5.167 0h-2v2h2v-2Zm0-5.167h2v-2h-2v2Zm-1.5 0v-2h-2v2h2ZM0 20.5h2-2ZM2 22h-4 4Zm4.667-2H0v4h6.667v-4Zm-2 .5V22h4v-1.5h-4Zm-3.167 2h5.167v-4H1.5v4Zm-2-7.167V20.5h4v-5.167h-4Zm.5 2h1.5v-4H0v4ZM2 20.5v-5.167h-4V20.5h4ZM2 22v-1.5h-4V22h4Z"
      fill="#fff"
      mask="url(#d)"
    />
    <Path
      d="m12.098 2.655-2.925-.003a.522.522 0 0 0 .001 1.042l.133-.004-.621 4.409-1.397 2.1a.549.549 0 0 0-.09.284l.012 7.737a1.546 1.546 0 0 0 1.556 1.556l3.775.004a1.545 1.545 0 0 0 1.437-.957c.077-.189.116-.391.115-.596l-.004-7.737a.55.55 0 0 0-.092-.283l-1.4-2.104-.631-4.41.132.004a.529.529 0 0 0 .52-.52.525.525 0 0 0-.521-.522Zm.961 13.899-4.817-.006-.004-4.085 4.817.005.004 4.086Zm-.518 2.193-3.775-.004a.516.516 0 0 1-.522-.522v-.64l4.816.006v.64a.522.522 0 0 1-.52.52Zm-.949-10.38c.013.075.04.147.083.21l1.378 2.072v.786l-4.816-.005-.001-.786 1.373-2.069a.535.535 0 0 0 .082-.21l.662-4.67h.567l.672 4.672Z"
      fill="#fff"
    />
  </Svg>
)

export default ScannerBeersIcon
