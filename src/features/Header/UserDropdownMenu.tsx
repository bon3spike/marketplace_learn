import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { paths } from 'routes/helpers'
import DropdownPanel from 'components/DropdownPanel'
import UserAvatar from './UserAvatar'
import { UserProfileDropDown } from './styled'

const selectUserDataFallback = () => ({
  nameFirst: 'Гость',
  nameLast: '',
  displayName: 'Профиль',
})

const UserDropdownMenu: React.FC = () => {
    const navigate = useNavigate()

    const { nameFirst, nameLast, displayName } = useSelector(selectUserDataFallback)

    const handleLogout = useCallback(() => navigate(paths.logout), [ navigate ] )

    return (
        <DropdownPanel
        toggler={(props: any) => <UserAvatar onClick={props.onClick} />}
        toLeft

    >
        <UserProfileDropDown>
            <div>
                <strong>
                    {displayName || (nameFirst + ' ' + nameLast)}
                </strong>
            </div>

            <hr />

            <div>Заказы</div>
            <div>Возвраты</div>
            <div>Избранное</div>
            <div>Справка</div>
            <div>Поддержка</div>
            <div>Настройка</div>
        

            <hr />

            <div onClick={handleLogout}>Выйти</div>
        </UserProfileDropDown>
    </DropdownPanel>

    )
}


export default UserDropdownMenu
