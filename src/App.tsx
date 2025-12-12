import { Suspense } from 'react'

import PublicRoutes from 'routes/PublicRoutes'
//import PrivateRoutes from 'routes/PrivateRoutes'

const App: React.FC = () => {
  return (
    <Suspense fallback={null}>
      <PublicRoutes />
      {/*<PrivateRoutes /> */}
    </Suspense>
  )
}

export default App
