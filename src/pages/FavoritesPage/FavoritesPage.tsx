import { Helmet } from 'react-helmet'
import { useSelector } from 'react-redux'

import ProductCard from 'blocks/ProductCard'
import { PageWrapper } from 'App.styled'
import { selectFavoritesIds } from 'features/App/Favorites/selectors'
import { dummyProducts } from 'pages/dummyProducts'
import { ProductGroupContainer } from './styled'

const FavoritesPage: React.FC = () => {
  const idsInFavorites = useSelector(selectFavoritesIds)

  return (
    <>
      <Helmet>
        <title>Главная - KPL Market</title>
      </Helmet>

      <PageWrapper>
        <h2>Избранное</h2>

        {idsInFavorites.length ? (
          <ProductGroupContainer>
            {dummyProducts
              .filter((p) => idsInFavorites.includes(p.id))
              .map((p) => (
                <ProductCard key={p.id} {...p} hideLikes />
              ))}
          </ProductGroupContainer>
        ) : (
          <p>Пока в избранном ничего нет</p>
        )}
      </PageWrapper>
    </>
  )
}

export default FavoritesPage
