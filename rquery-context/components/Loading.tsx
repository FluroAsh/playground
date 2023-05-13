import { css } from '@emotion/react'

const loadingContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`

function Loading() {
  return <div css={loadingContainer}>Loading...</div>
}

export default Loading
