import styled from 'styled-components'

export const Wrapper = styled.div`
  position: relative;
  padding: 16px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  height: 100%;
`

export const LikeWrapper = styled.div`
  cursor: pointer;
  width: 30px;
  height: 30px;
  position: absolute;
  top: 8px;
  right: 8px;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    pointer-events: none;
  }
`

export const Image = styled.img`
  margin-bottom: 10px;
  width: 100%;
  height: 165px;
  border-radius: 4px;
  object-fit: cover;
`

export const PriceWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 8px;
  margin-bottom: 10px;
`

export const PriceRegular = styled.span`
  font-size: 18px;
  font-weight: 600;
`

export const PriceRegularWhenDiscounted = styled.span`
  font-size: 14px;
  color: #888;
  text-decoration: line-through;
`

export const PriceDiscounted = styled.span`
  font-size: 20px;
  font-weight: 700;
  color: #1a6aff;
`

export const Title = styled.h3`
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 600;
  a {
    color: inherit;
  }
`

export const Desc = styled.p`
  font-size: 14px;
  color: #444;
  min-height: 48px;
`
