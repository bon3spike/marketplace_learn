import { Suspense } from 'react'

import PublicRoutes from 'routes/PublicRoutes'
//import PrivateRoutes from 'routes/PrivateRoutes'
import Header from 'features/Header'
import { AppStyles, Footer} from 'App.styled'


const App: React.FC = () => {
  return <>
      <AppStyles />

      <Header/>

      <Suspense fallback={'...Loading...'}>
        <PublicRoutes />
        {/*<PrivateRoutes /> */}    
      </Suspense>

      <Footer>
        <div>Маркетплейс HorseMarta</div>
      </Footer>

  </>
}

export default App
