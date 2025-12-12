import styled, { createGlobalStyle } from 'styled-components'

import { FOOTER_HEIGHT } from 'consts/index'
import colors from 'consts/colors'

export const AppStyles = createGlobalStyle`
  html,
  body,
  #root {
    height: 100%;
  }

  body {
    margin: 0;
    min-width: 320px;
    font-family: 'Montserrat', sans-serif;
    font-size: 16px;
    font-weight: normal;
    line-height: 1.3;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: ${colors.primary};
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  ul,
  li {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  img {
    display: block;
    max-width: 100%;
    height: auto;
  }
  h1, .h1 {
    font-size: 26px;
  }

  h2, .h2 {
    font-size: 22px;
  }

  h3, .h3 {
    font-size: 18px;
  }

  h4, .h4 {
    font-size: 16px;
  }

  p, li {
    line-height: 21px;
  }

`

export const AppLayout = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

export const PageWrapper = styled.main`
  flex: 1;
  width: 100%;
  padding: 20px;
`

export const Footer = styled.footer`
  height: ${FOOTER_HEIGHT}px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors.primary};
  color: #fff;
  font-size: 14px;
`
