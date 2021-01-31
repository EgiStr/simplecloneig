import React from 'react'
import Content from './components/Content'
import Navbar from './components/Navbar'


function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="container">
        <Content username="m.jawa_" captions="i don't understand" imageUrl="https://lh3.googleusercontent.com/2Fz6Fn5zq_hh75oNLsyNqyGSHzPopHojN77Eu6GImw_3bb4JteONR_K8lnCY2nRbZQV9RD7ACVYvTHEEoW6oGt2GNkAVXzsGdHl1XI9JWwr9ojo3N7t5mYgqaux8lESdvi4mJTti4Ok=w400" />
        <Content username="EgiStr" captions="yes i'm sorry" imageUrl="https://lh3.googleusercontent.com/2Fz6Fn5zq_hh75oNLsyNqyGSHzPopHojN77Eu6GImw_3bb4JteONR_K8lnCY2nRbZQV9RD7ACVYvTHEEoW6oGt2GNkAVXzsGdHl1XI9JWwr9ojo3N7t5mYgqaux8lESdvi4mJTti4Ok=w400" />
      </div>
    </div>


  )
}

export default App
