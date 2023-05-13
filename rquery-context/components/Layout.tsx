import { css } from '@emotion/react'
import Head from 'next/head'

const layoutContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`

const Layout = ({
  children,
  title,
  description = 'React Query Pokemon Demo'
}: {
  children?: JSX.Element | JSX.Element[]
  title: string
  description?: string
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div css={layoutContainer}>{children}</div>
    </>
  )
}

export default Layout
