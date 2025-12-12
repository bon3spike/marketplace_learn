import { ButtonHTMLAttributes, ReactNode } from 'react'
import styled from 'styled-components'

import colors from 'consts/colors'

export interface I_ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  type?: 'primary' | 'secondary' | 'ghost'
  block?: boolean
  children: ReactNode
}

export const Button = styled(
  ({
    children,
    type = 'primary',
    disabled,
    block = false,
    onClick = () => {},
    ...props
  }: I_ButtonProps) => (
    <button {...props} type="button" onClick={!disabled ? onClick : () => {}}>
      {children}
    </button>
  )
)<I_ButtonProps>`
  user-select: none;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  border-radius: 5px;
  display: inline-flex;
  align-items: center;
  width: ${({ block }) => (block ? '100%' : 'fit-content')};
  justify-content: ${({ block }) => (block ? 'center' : 'initial')};
  font-size: 14px;
  font-weight: 500;
  padding: 10px 22px;
  letter-spacing: 0.36px;
  border: 1px solid ${({ type }) => (type === 'ghost' ? colors.primary : 'transparent')};

  background-color: ${({ type, disabled }) => {
    if (disabled) return '#c2c2c2'

    switch (type) {
      case 'primary':
        return colors.primary
      case 'secondary':
        return colors.secondary
      case 'ghost':
        return 'transparent'
      default:
        return colors.primary
    }
  }};
`

export default Button
