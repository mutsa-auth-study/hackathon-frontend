import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Main from "./pages/Main"
import Location from "./pages/Location"
import Mypage from "./pages/Mypage"
import PrivateRoute from "./privateRoute"
import { useRecoilValue } from "recoil"
import { user } from "./store/atom/user"
import Review from "./components/Review"
import Search from "./pages/Search"

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
            <PrivateRoute authenticated={isLogin} component={<Search />} />
          }
        />
        <Route
          path="/location/:id"
          element={
            <PrivateRoute authenticated={isLogin} component={<Review />} />
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
