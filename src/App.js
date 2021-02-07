import React, { useState } from 'react'
import Content from './components/Content'
import Navbar from './components/Navbar'
import Message from './components/Message'
import Profile from './components/Profile'
import Login from './components/Login'
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
      caption: "Hei ACAB ! @ultras.terraces#ultrasid#ultrashooliganid #ultras #againstmodernfootball #hooligans #footballfans #fans #ultraslife #ultrastyle #ultra #fans #staduim #ultrasmentality #acab #acab #1312",
      imageUrl: "https://lh3.googleusercontent.com/2Fz6Fn5zq_hh75oNLsyNqyGSHzPopHojN77Eu6GImw_3bb4JteONR_K8lnCY2nRbZQV9RD7ACVYvTHEEoW6oGt2GNkAVXzsGdHl1XI9JWwr9ojo3N7t5mYgqaux8lESdvi4mJTti4Ok=w2400"
    }
  ]);

  const myStyle = {
    backgroundColor: "#ffebee",
    paddingBottom: "20px",

  }
  return (
    <Router>
      <Navbar />
      <div style={myStyle}>
        <div className="container">
          <Switch>
            <Route path="/" exact>
              <div className="row">
                <div className="col s8">
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
                </div>
              </div>
            </Route>
            <Route path="/message" component={Message} />
            <Route path="/profile" component={Profile} />
            <Route path="/login" component={Login} />
          </Switch>
        </div>
      </div>
    </Router>
  )
}

export default App
