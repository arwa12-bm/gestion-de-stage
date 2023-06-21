import Auth from "../../contexts/Auth"

const AuthRoute = ({path,component})=>{

const {isAuthtificated}=useContext(Auth)

    return isAuthtificated?(
        <Route exact path={path} component={component}/>)
            :(<Redirect to="/login"/>)

}
export default AuthRoute;