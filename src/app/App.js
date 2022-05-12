import React from "react"
import NavBar from "./components/ui/navBar"
import { Route, Switch, Redirect } from "react-router-dom"
import Main from "./layouts/main"
import Users from "./layouts/users"
import Login from "./layouts/login"

function App() {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/login/:type?" component={Login} />
        <Route path="/users/:userId?" component={Users} />
        <Redirect to="/" />
      </Switch>
    </div>
  )
}

export default App
