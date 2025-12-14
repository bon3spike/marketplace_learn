import styled from 'styled-components'

import { Link } from 'react-router-dom'

import { Z_INDEX_LEVEL_2 } from 'consts'
import { paths } from 'routes/helpers'
import colors from 'consts/colors'

import search from './img/search.svg'
import orders from './img/orders.svg'
import favorites from './img/favorites.svg'
import notifications from './img/notifications.svg'
import cart from './img/cart.svg'

export interface I_CountProps {
  count?: number;
}

export const Wrapper = styled.div`
  padding: 14px 20px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  transition: margin 0.2s ease-out;
  background-color: #fff;
  min-height: 52px;
  z-index: ${Z_INDEX_LEVEL_2};
`

export const LeftSide = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`

export const Logo = styled.img`
  width: 120px;
  height: auto;
  display: block;
`

export const Burger = styled.div`
  width: 20px;
  height: 20px;
  padding: 4px 0;
  margin-right: 10px;

  div {
    position: relative;
    display: block;
    width: 18px;
    height: 2px;
    margin: 0 1px;
    background-color: #fff;
  }

  div:not(:first-child) {
    margin-top: 3px;
  }
`
export const SearchWrapper = styled.div`
  width: 100%;
  border: 2px solid ${colors.primary};
  border-radius: 4px;
  display: flex;
  align-items: center;
  padding: 0 20px 0 10px;
  max-width: 560px;
  margin: 0 20px;

  input {
    font-size: 16px;
    line-height: 40px;
    padding: 0;
    width: 100%;
  }
`
export const BtnSearch = styled.button`
  cursor: pointer;
  width: 20px;
  height: 20px;
  border: none;
  background: url(${search}) no-repeat center;
  background-size: contain;
`

const badgeMixin = `
  position: relative;
  &::after {
    background-color: ${colors.red};
    color: #fff;
    border-radius: 50%;
    position: absolute;
    top: -8px;
    right: -10px;
    width: 18px;
    height: 18px;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

export const BtnOrders = styled((props: I_CountProps) => (
  <div {...props}>
    <Link to={paths.accountSettings} />
  </div>
))`
  cursor: pointer;
  width: 20px;
  height: 20px;
  background: url(${orders}) no-repeat center;
  background-size: contain;
  margin-left: 12px;
  ${badgeMixin};

  &::after {
    content: ${({ count }) => (count ? `"${count}"` : '""')};
  }
`

export const BtnFavorites = styled((props: I_CountProps) => (
  <div {...props}>
    <Link to={paths.favorites} />
  </div>
))`
  cursor: pointer;
  width: 20px;
  height: 20px;
  background: url(${favorites}) no-repeat center;
  background-size: contain;
  margin-left: 20px;
  ${badgeMixin};

  &::after {
    content: ${({ count }) => (count ? `"${count}"` : '""')};
  }
`

export const BtnNotifications = styled.div<I_CountProps>`
  cursor: pointer;
  width: 20px;
  height: 20px;
  background: url(${notifications}) no-repeat center;
  background-size: contain;
  margin: 0 0 0 20px;
  ${badgeMixin};

  &::after {
    content: ${({ count }) => (count ? `"${count}"` : '""')};
  }
`

export const BtnCart = styled((props: I_CountProps) => (
  <div {...props}>
    <Link to={paths.cart} />
  </div>
))`
  cursor: pointer;
  width: 20px;
  height: 20px;
  background: url(${cart}) no-repeat center;
  background-size: contain;
  margin: 0 20px 0 24px;
  ${badgeMixin};

  &::after {
    content: ${({ count }) => (count ? `"${count}"` : '""')};
  }
`

export const RightSide = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  gap: 12px;
`

export const UserProfileDropDown = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 160px;
  font-size: 14px;

  hr {
    margin: 8px 0;
    border: none;
    border-top: 1px solid #e0e0e0;
  }
`
