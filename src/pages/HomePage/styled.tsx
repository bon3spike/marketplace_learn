import styled from 'styled-components'

export const PageWrapper = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 24px;
  min-height: 100%;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.04);
`

export const ProductGroup = styled.div`
  margin-top: 20px;

  > *:first-child {
    margin-bottom: 10px;
  }
`

export const ProductGroupContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
  margin-top: 20px;
`
