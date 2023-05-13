import { css } from '@emotion/react'

export const pokemonList = css`
  list-style-type: none;
  padding: 0;
  margin: 0;
  background-color: hsla(0, 0%, 100%, 0.3);
  width: 150px;
  border-radius: 8px;
  border: 1px solid hsla(0, 0%, 100%, 0.4);

  overflow-x: hidden;

  margin-bottom: 1rem;

  & > li {
    &:hover {
      background-color: hsla(0, 0%, 100%, 0.3);
      border-radius: 3px;
    }
  }

  a {
    padding: 8px;
    display: block;
  }
`

export const buttonContainer = css`
  > button:nth-child(1) {
    margin-right: 0.5rem;
  }
`
