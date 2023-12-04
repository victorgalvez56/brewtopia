import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const MedalIcon = (props: SvgProps) => (
  <Svg width={15} height={20} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <Path
      d="M7.143 18.572a5.714 5.714 0 1 0 0-11.429 5.714 5.714 0 0 0 0 11.428Zm0 1.428a7.143 7.143 0 1 1 0-14.286 7.143 7.143 0 0 1 0 14.286Z"
      fill="#FF7558"
    />
    <Path
      d="M8.571 1.429H5.714v4.464a6.4 6.4 0 0 1 1.429-.179c.436 0 .911.06 1.428.179V1.429Zm1.43 0V6.33a20.05 20.05 0 0 1 1.75.758l.87-5.66h-2.62Zm-5.715 0h-2.62l.871 5.66a20.023 20.023 0 0 1 1.749-.758V1.43ZM.833 0h12.62a.715.715 0 0 1 .706.823l-1.302 8.463c-2.54-1.429-4.444-2.143-5.714-2.143-1.27 0-3.174.714-5.714 2.143L.127.823A.714.714 0 0 1 .833 0Z"
      fill="#FF7558"
    />
  </Svg>
)

export default MedalIcon
