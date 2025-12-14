import styled from 'styled-components'

export const Wrapper = styled.div`
  position: relative;
  display: inline-flex;
`

export const DropdownWrapper = styled.div<{ toLeft?: boolean }>`
  position: absolute;
  top: calc(100% + 8px);
  ${({ toLeft }) => (toLeft ? 'right: 0;' : 'left: 0;')}
  min-width: 180px;
  background: #fff;
  border-radius: 8px;
  padding: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  z-index: 100;
`
