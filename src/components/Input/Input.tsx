import { forwardRef, InputHTMLAttributes } from 'react'
import styled from 'styled-components'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  isGhost?: boolean
}

const StyledInput = styled.input<InputProps>`
  width: 100%;
  border: ${({ isGhost }) => (isGhost ? 'none' : '1px solid #c8c8c8')};
  background-color: transparent;
  outline: none;
  font-size: 16px;
  padding: 0 8px;
  line-height: 40px;

  &::placeholder {
    color: #9aa0a6;
  }
`

const Input = forwardRef<HTMLInputElement, InputProps>(({ isGhost = false, ...props }, ref) => (
  <StyledInput ref={ref} isGhost={isGhost} {...props} />
))

export default Input
