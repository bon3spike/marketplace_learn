import styled from 'styled-components'

const Avatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #1a6aff;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
`

const UserAvatar: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => (
  <Avatar {...props}>MW</Avatar>
)

export default UserAvatar
