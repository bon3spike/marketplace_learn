import { FC, MouseEvent, useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'

import { paths } from 'routes/helpers'
import Button from 'components/Button'
import { addToFavorites, removeFromFavorites } from 'features/App/Favorites/reducer'
import { selectFavoritesIds } from 'features/App/Favorites/selectors'
import { T_Dispatch } from 'store/types'
import { ReactComponent as HeartEmpty } from 'img/heart-empty.svg'
import { ReactComponent as HeartFilled } from 'img/heart-filled.svg'

import {
  Wrapper,
  LikeWrapper,
  Image,
  PriceWrapper,
  PriceRegularWhenDiscounted,
  PriceDiscounted,
  PriceRegular,
  Title,
  Desc,
  BtnsWrapper,
} from './styled'

interface ProductCardProps {
  id: number
  slug?: string
  imgSrc: string
  priceRegular: number
  priceDiscounted?: number
  title: string
  desc: string
  isLiked?: boolean
  hideLikes?: boolean
}

const ProductCard: FC<ProductCardProps> = ({
  id,
  slug,
  imgSrc,
  priceRegular,
  priceDiscounted,
  title,
  desc,
  isLiked,
  hideLikes = false,
}) => {
  const dispatch = useDispatch<T_Dispatch>()
  const location = useLocation()
  const idsInFavorites = useSelector(selectFavoritesIds)

  const productLink = useMemo(
    () => paths.productDetails.replace(':idOrSlug', slug || String(id)),
    [id, slug]
  )

  const isFavoritesPage = useMemo(() => location.pathname === paths.favorites, [location.pathname])
  const isLikedFromStore = useMemo(() => idsInFavorites.includes(id), [idsInFavorites, id])
  const isLikedFinal = isLiked ?? isLikedFromStore

  const handleFavorites = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      event.preventDefault()
      const { productId } = event.currentTarget.dataset
      if (!productId) return

      dispatch(isLikedFinal ? removeFromFavorites(+productId) : addToFavorites(+productId))
    },
    [dispatch, isLikedFinal]
  )

  const removeFavorite = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
      const { productId } = event.currentTarget.dataset
      if (!productId) return

      dispatch(removeFromFavorites(+productId))
    },
    [dispatch]
  )

  return (
    <Wrapper>
      {!(hideLikes || isFavoritesPage) && (
        <LikeWrapper
          data-product-id={String(id)}
          onClick={handleFavorites}
          aria-label="Добавить в избранное"
        >
          {isLikedFinal ? <HeartFilled /> : <HeartEmpty />}
        </LikeWrapper>
      )}

      <Link to={productLink}>
        <Image src={imgSrc} alt={title} />
      </Link>

      <PriceWrapper>
        {Number.isInteger(priceDiscounted) ? (
          <>
            <PriceDiscounted>{priceDiscounted} ₽</PriceDiscounted>
            <PriceRegularWhenDiscounted>{priceRegular} ₽</PriceRegularWhenDiscounted>
          </>
        ) : (
          <PriceRegular>{priceRegular} ₽</PriceRegular>
        )}
      </PriceWrapper>

      <Title className="h4">
        <Link to={productLink}>{title}</Link>
      </Title>

      <Desc>{desc}</Desc>

      <BtnsWrapper>
        <Button block>В корзину</Button>
        {isFavoritesPage && (
          <Button
            type="danger"
            block
            onClick={removeFavorite}
            data-product-id={String(id)}
          >
            Удалить
          </Button>
        )}
      </BtnsWrapper>
    </Wrapper>
  )
}

export default ProductCard
