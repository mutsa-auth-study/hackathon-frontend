import { Navigate } from "react-router-dom"
import useAlert from "./hooks/useAlert"
import { AlertMessage } from "./constants/AlertMessage"

function PrivateRoute({ authenticated, component: Component }) {
  const alert = useAlert()

  return authenticated ? (
    Component
  ) : (
    <Navigate to="/" {...alert(AlertMessage.needLogin)} />
  )
}

export default PrivateRoute
