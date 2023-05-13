import type { CSSProperties } from 'react'

interface BackArrowProps {
  colour?: string
  style?: CSSProperties
}

export const BackArrow: React.FC<BackArrowProps> = ({
  colour = '#000',
  style: extraStyles
}) => {
  return (
    <span style={extraStyles} css>
      <svg
        width="25px"
        height="25px"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="Complete">
          <g id="arrow-left">
            <g>
              <polyline
                data-name="Right"
                fill="none"
                id="Right-2"
                points="7.6 7 2.5 12 7.6 17"
                stroke={colour}
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
              />

              <line
                fill="none"
                stroke={colour}
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                x1="21.5"
                x2="4.8"
                y1="12"
                y2="12"
              />
            </g>
          </g>
        </g>
      </svg>
    </span>
  )
}
