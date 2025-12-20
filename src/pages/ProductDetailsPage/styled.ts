import styled from 'styled-components'

import colors from 'consts/colors'

export const PageWrapper = styled.div`
  padding: 24px 32px;
`

export const Wrapper = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 32px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.04);
  display: flex;
  gap: 40px;
  align-items: flex-start;
  min-height: 480px;
  margin: 0 auto;
`

export const ImageWrapper = styled.div`
  flex: 0 0 420px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
`

export const TitleRow = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`

export const Title = styled.h1`
  margin: 0;
  font-size: 28px;
`

export const FavoriteButton = styled.button.attrs({ type: 'button' })`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: transparent;
  border: 1px solid #e1e1e1;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: border-color 0.2s ease, background-color 0.2s ease;

  &:hover {
    border-color: ${colors.secondary};
    background-color: rgba(26, 106, 255, 0.08);
  }

  svg {
    width: 22px;
    height: 22px;
  }
`

export const Price = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: ${colors.secondary};
`

export const Description = styled.p`
  font-size: 16px;
  color: #555;
  line-height: 1.5;
`

export const Actions = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;

  button {
    min-width: 160px;
  }
`
