import React from 'react'
import Content from './components/Content'
import Navbar from './components/Navbar'


function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="row">
        <div className="col s9">
          <Content username="m.jawa_" captions="i don't understand" />
          <Content username="EgiStr" captions="yes i'm sorry" imageUrl=""/>
        </div>
      </div>

    </div>

  )
}

export default App
