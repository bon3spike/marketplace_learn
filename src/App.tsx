import { Suspense } from 'react'

import PublicRoutes from 'routes/PublicRoutes'
//import PrivateRoutes from 'routes/PrivateRoutes'
import Header from 'features/Header'
import { AppStyles, Footer, AppLayout, PageWrapper } from 'App.styled'


const App: React.FC = () => {
  return (
    <>
      <AppStyles />
      <AppLayout>
        <Header />
        <PageWrapper>
          <Suspense fallback={'...Loading...'}>
            <PublicRoutes />
            {/*<PrivateRoutes /> */}    
          </Suspense>
        </PageWrapper>
        <Footer>
          <div>Маркетплейс HorseMarta</div>
        </Footer>
      </AppLayout>
    </>
  )
}

export default App
