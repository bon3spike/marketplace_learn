import { ChangeEvent, useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { paths } from 'routes/helpers'
import Button from 'components/Button'
import Input from 'components/Input'
import { selectIsLogged } from 'features/App/selector'
import UserDropdownMenu from './UserDropdownMenu'
import logoSvg from 'img/logo.svg'

import {
  Wrapper,
  LeftSide,
  Logo,
  SearchWrapper,
  BtnSearch,
  RightSide,
  BtnOrders,
  BtnFavorites,
  BtnNotifications,
  BtnCart,
  Burger,
} from './styled'


const Header: React.FC = () => {
    // const location = useLocation()

    const isLogged = useSelector(selectIsLogged)

    const [searchInput, setSearchInput] = useState<string>('')
    const counters = {
      orders: 1,
      favorites: 3,
      notifications: 4,
      cart: 5,
    }

    const changeSearchInput = useCallback((event: ChangeEvent<HTMLInputElement>) => {
      setSearchInput(event.target.value)
    }, [])
    

    // if (
    // location.pathname.includes{paths.login}
    // || location.pathname.includes(paths.register)
    // || location.pathname.includes(paths.requestPasswordRecovery)
    // || location.pathname.includes(paths.confirmPasswordRecovery)
    // ) return null

    return (
      <Wrapper>
        <LeftSide>
          <Link to={paths.home}>
            <Logo src={logoSvg} alt="MW Marketplace" />
          </Link>
          <Button>
            <Burger>
              <div />
              <div />
              <div />
            </Burger>
            <span>Каталог</span>
          </Button>
        </LeftSide>

        <SearchWrapper>
          <Input
            value={searchInput}
            onChange={changeSearchInput}
            isGhost
            placeholder="Поиск товаров"
          />

          <BtnSearch />
        </SearchWrapper>

        <RightSide>
          {isLogged ? (
            <>
              <BtnOrders count={counters.orders} />
              <BtnFavorites count={counters.favorites} />
              <BtnNotifications count={counters.notifications} />
              <BtnCart count={counters.cart} />
              <UserDropdownMenu />
            </>
          ) : (
            <Link to={paths.login}>&nbsp;&nbsp;&nbsp;Войти</Link>
          )}
        </RightSide>
      </Wrapper>
    )
}

export default Header
