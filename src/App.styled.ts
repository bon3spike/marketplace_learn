import styled, { createGlobalStyle } from 'styled-components'

import { HEADER_HEIGHT, FOOTER_HEIGHT } from 'consts/index'
import colors from 'consts/colors'

export const AppStyles = createGlobalStyle`
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

  main {
    min-height: calc(100vh - ${HEADER_HEIGHT + FOOTER_HEIGHT}px);
  }
`

export const PageWrapper = styled.div`
  min-height: calc(100vh - ${HEADER_HEIGHT + FOOTER_HEIGHT}px);
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
