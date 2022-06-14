import React from "react"
import NavBar from "./components/ui/navBar"
import { Route, Switch, Redirect } from "react-router-dom"
import Main from "./layouts/main"
import Users from "./layouts/users"
import Login from "./layouts/login"
import { ToastContainer } from "react-toastify"
import { ProfessionProvider } from "./hooks/useProfession"
import { QualityProvider } from "./hooks/useQuality"
import AuthProvider from "./hooks/useAuth"

function App() {
  return (
    <div>
      <AuthProvider>
        <NavBar />
        <QualityProvider>
          <ProfessionProvider>
            <Switch>
              <Route path="/login/:type?" component={Login} />
              <Route path="/users/:userId?/:edit?" component={Users} />
              <Route path="/" exact component={Main} />
              <Redirect to="/" />
            </Switch>
          </ProfessionProvider>
        </QualityProvider>
      </AuthProvider>
      <ToastContainer />
    </div>
  )
}

export default App
