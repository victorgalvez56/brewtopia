import * as React from "react"
import Svg, { SvgProps, Defs, G, Path } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: style, title */

const PinIcon = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 31.35 38.78" {...props}>
    <Defs></Defs>
    <G id="Capa_2" data-name="Capa 2">
      <G id="Capa_1-2" data-name="Capa 1">
        <Path
          d="M15.67 37.85a.94.94 0 0 1-.71-.33L4.87 25.69a14.74 14.74 0 1 1 25.54-10 14.66 14.66 0 0 1-3.93 10L16.39 37.52a.94.94 0 0 1-.72.33Z"
          fill="#fff"
        />
        <Path
          d="M15.67 1.87A13.81 13.81 0 0 1 25.8 25.06L15.67 36.91 5.58 25.08A13.81 13.81 0 0 1 15.67 1.87m0-1.87A15.67 15.67 0 0 0 4.15 26.29l10.1 11.83a1.9 1.9 0 0 0 1.42.65 1.9 1.9 0 0 0 1.43-.65L27.19 26.3A15.67 15.67 0 0 0 15.67 0Z"
          fill="#f8785e"
        />
        <Path
          d="M24.6 11.25a1.79 1.79 0 0 0-.21-.91C23.69 9 23 7.59 22.32 6.2A1.29 1.29 0 0 0 21 5.39H10.25a1.23 1.23 0 0 0-1.21.75l-2.12 4.28a1.68 1.68 0 0 0-.18.77v1.57a1.21 1.21 0 0 0 .41.91 2.62 2.62 0 0 0 3.24.31.38.38 0 0 1 .5 0 2.57 2.57 0 0 0 2.85 0 .41.41 0 0 1 .5 0 2.55 2.55 0 0 0 2.88 0 .36.36 0 0 1 .47 0 2.54 2.54 0 0 0 2.81 0 .5.5 0 0 1 .6 0 2.63 2.63 0 0 0 3.21-.34 1.16 1.16 0 0 0 .39-.91q-.01-.73 0-1.48Zm-1.1.75c0 .86-.07 1-.64 1.2a1.48 1.48 0 0 1-1.62-.46c-.18-.21-.34-.44-.52-.69-1.44 1.67-1.91 1.67-3.38 0l-.43.57a1.51 1.51 0 0 1-2.48 0c-.14-.18-.24-.51-.45-.5s-.28.33-.42.51a1.51 1.51 0 0 1-2.48 0c-.43-.57-.43-.57-.88 0a1.5 1.5 0 0 1-2.1.37.52.52 0 0 1-.24-.44 4.19 4.19 0 0 1 .5-2.56c.58-1 1.06-2 1.54-3.07a.72.72 0 0 1 .78-.44h10.21a.45.45 0 0 1 .48.28c.67 1.37 1.36 2.74 2 4.1A2.56 2.56 0 0 1 23.5 12ZM15.65 21h-5.44A1.12 1.12 0 0 1 9 19.76v-3.94c0-.29.06-.4.37-.39.77 0 .77 0 .77.76v3.37c0 .29.07.38.37.37h2.6c.32 0 .38-.11.37-.39v-3.68c0-.33.08-.44.42-.43.72 0 .72 0 .72.73v3.45c0 .26.08.32.33.32h6c.27 0 .34-.07.33-.35v-3.83c0-.25.08-.32.33-.32.78 0 .78 0 .78.78v3.56A1.1 1.1 0 0 1 21.13 21Z"
          fill="#f8785e"
        />
      </G>
    </G>
  </Svg>
)

export default PinIcon