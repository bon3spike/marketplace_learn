import { Helmet } from 'react-helmet'
import { ProductGroup, ProductGroupContainer, PageWrapper } from './styled'
import ProductCard from 'blocks/ProductCard'
import { dummyProducts } from 'pages/dummyProducts'

const HomePage: React.FC = () => {
    return <>
        <Helmet>
         <title>Главная - MW Marketplace </title> 
        </Helmet>

        <PageWrapper>
          <ProductGroup>
            <h2>Рекомендуемые товары</h2>

            <ProductGroupContainer>
              {dummyProducts.map((p) => (
                <ProductCard
                  {...p}
                  key={p.id}
                  // isLiked = {idsInFavorites.includes(p.id)}
                />
              ))}

            </ProductGroupContainer>
          </ProductGroup>
        </PageWrapper>
  </>
}

export default HomePage
