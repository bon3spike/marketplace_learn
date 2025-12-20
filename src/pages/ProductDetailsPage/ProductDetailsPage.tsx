import { useCallback, useMemo } from 'react'
import { Helmet } from 'react-helmet'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import Button from 'components/Button'
import { addToFavorites, removeFromFavorites } from 'features/App/Favorites/reducer'
import { selectFavoritesIds } from 'features/App/Favorites/selectors'
import { paths } from 'routes/helpers'
import { dummyProducts } from 'pages/dummyProducts'
import { T_Dispatch } from 'store/types'
import { ReactComponent as HeartEmpty } from 'img/heart-empty.svg'
import { ReactComponent as HeartFilled } from 'img/heart-filled.svg'

import {
  Actions,
  Description,
  FavoriteButton,
  ImageWrapper,
  Info,
  PageWrapper,
  Price,
  Title,
  TitleRow,
  Wrapper,
} from './styled'

const ProductDetailsPage: React.FC = () => {
  const { idOrSlug } = useParams<{ idOrSlug: string }>()
  const navigate = useNavigate()
  const dispatch = useDispatch<T_Dispatch>()
  const favoritesIds = useSelector(selectFavoritesIds)

  const productDetails = useMemo(() => {
    if (!idOrSlug) return undefined
    return dummyProducts.find((product) => [String(product.id), product.slug].includes(idOrSlug))
  }, [idOrSlug])

  const isLiked = useMemo(
    () => (productDetails ? favoritesIds.includes(productDetails.id) : false),
    [favoritesIds, productDetails]
  )

  const handleFavorite = useCallback(() => {
    if (!productDetails) return
    const action = isLiked ? removeFromFavorites(productDetails.id) : addToFavorites(productDetails.id)
    dispatch(action)
  }, [dispatch, isLiked, productDetails])

  if (!productDetails) {
    return (
      <>
        <Helmet>
          <title>Товар не найден - MW Marketplace</title>
        </Helmet>
        <PageWrapper>
          <Wrapper>
            <Info>
              <Title>Товар не найден</Title>
              <Description>Похоже, товар был удалён или недоступен.</Description>
              <Button onClick={() => navigate(paths.home)}>Вернуться на главную</Button>
            </Info>
          </Wrapper>
        </PageWrapper>
      </>
    )
  }

  return (
    <>
      <Helmet>
        <title>{productDetails.title} - MW Marketplace</title>
      </Helmet>

      <PageWrapper>
        <Wrapper>
          <ImageWrapper>
            <img src={productDetails.imgSrc} alt={productDetails.title} />
          </ImageWrapper>

          <Info>
            <TitleRow>
              <Title>{productDetails.title}</Title>
              <FavoriteButton onClick={handleFavorite} aria-label="Добавить в избранное">
                {isLiked ? <HeartFilled /> : <HeartEmpty />}
              </FavoriteButton>
            </TitleRow>

            <Description>{productDetails.desc}</Description>

            <Price>{productDetails.priceDiscounted ?? productDetails.priceRegular} ₽</Price>

            <Actions>
              <Button type="secondary">Купить сейчас</Button>
              <Button>В корзину</Button>
            </Actions>
          </Info>
        </Wrapper>
      </PageWrapper>
    </>
  )
}

export default ProductDetailsPage
