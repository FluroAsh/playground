import { css } from '@emotion/react'

const TRANSITION_DURATION = '200ms'
const COLORS = {
  innerBorder: 'hsla(0, 0%, 100%, 0.4)'
}

export const pokemonCard = (
  typeColor: string | undefined,
  isHovering: boolean
) => css`
  display: flex;
  flex-direction: column;
  transition: box-shadow ${TRANSITION_DURATION};
  line-height: 1.5rem;

  & div#name {
    font-size: 1.5rem;
    margin-bottom: 12px;
  }

  & > a {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  & > div#inner-content {
    text-align: center;
    padding: 1rem;
    background-color: hsla(0, 0%, 100%, 0.2);
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    border-left: 1px solid ${COLORS.innerBorder};
    border-right: 1px solid ${COLORS.innerBorder};
    border-bottom: 1px solid ${COLORS.innerBorder};
    transition: box-shadow ${TRANSITION_DURATION};
    ${isHovering && pokemonCardHovered(typeColor)};
  }
`

const pokemonCardHovered = (typeColor: string | undefined) => css`
  box-shadow: 0 0 20px 6px
    ${typeColor ? `${typeColor}80` : 'hsla(0, 0%, 100%, 0.3)'};
`

export const backButton = (
  typeColor: string | undefined,
  isHovering: boolean
) => css`
  background-color: ${typeColor ? `${typeColor}50` : 'hsla(0, 0%, 100%, 0.3)'};
  border: ${typeColor ? `1px solid ${typeColor}` : '1px solid #fff'};
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  transition: box-shadow ${TRANSITION_DURATION}, background-color 250ms;

  &:hover {
    background-color: ${typeColor ? typeColor : 'hsla(0, 0%, 100%, 0.6)'};
  }

  ${isHovering && pokemonCardHovered(typeColor)};
`
