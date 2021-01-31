import React, { useState } from 'react'
import Content from './components/Content'
import Navbar from './components/Navbar'
import Message from './components/Message'
import Profile from './components/Profile'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'


function App() {
  const [contents] = useState([
    {
      avatar: "",
      username: "m.jawa_",
      caption: "i hope i can to finish this project",
      imageUrl: "https://lh3.googleusercontent.com/2Fz6Fn5zq_hh75oNLsyNqyGSHzPopHojN77Eu6GImw_3bb4JteONR_K8lnCY2nRbZQV9RD7ACVYvTHEEoW6oGt2GNkAVXzsGdHl1XI9JWwr9ojo3N7t5mYgqaux8lESdvi4mJTti4Ok=w2400"
    },
    {
      avatar: "",
      username: "hasan",
      caption: "kumaha anjeun ",
      imageUrl: "https://lh3.googleusercontent.com/2Fz6Fn5zq_hh75oNLsyNqyGSHzPopHojN77Eu6GImw_3bb4JteONR_K8lnCY2nRbZQV9RD7ACVYvTHEEoW6oGt2GNkAVXzsGdHl1XI9JWwr9ojo3N7t5mYgqaux8lESdvi4mJTti4Ok=w2400"
    }
  ]);

  return (
    <div style={{backgroundColor : "#ffebee"}}>
      <Router>
        <Navbar />
        <div className="container">
          <Switch>
            <Route path="/" exact>
              {
                contents.map(content => (
                  <Content
                    username={content.username}
                    captions={content.caption}
                    imageUrl={content.imageUrl}
                    avatar={content.avatar}
                  />
                ))
              }
            </Route>
            <Route path="/message" component={Message} />
            <Route path="/username" component={Profile} />
          </Switch>
        </div>
      </Router>
    </div>
  )
}

export default App
