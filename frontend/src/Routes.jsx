import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Main from "./pages/Main"
import Location from "./pages/Location"
import Mypage from "./pages/Mypage"
import Search from "./pages/Search"
import PrivateRoute from "./privateRoute"
import { useRecoilValue } from "recoil"
import { user } from "./store/atom/user"

function Router() {
  const isLogin = useRecoilValue(user).accessToken
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route
          path="/location"
          element={
            <PrivateRoute authenticated={isLogin} component={<Location />} />
          }
        />
        <Route
          path="/mypage"
          element={
            <PrivateRoute authenticated={isLogin} component={<Mypage />} />
          }
        />
        <Route
          path="/exam"
          element={
            <PrivateRoute authenticated={isLogin} component={<Searc  h />} />
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
