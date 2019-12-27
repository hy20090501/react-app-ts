import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import { connect } from 'react-redux' // 引入connect
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { isLogin } from './utils/auth'
import './App.less';

import Login from './components/login/index'
import Container from './components/container'
import { routes } from './routes'

interface Props extends RouteComponentProps<any> {
    flag?: any,
    session?: any
}

class App extends React.Component<Props, any> {
    constructor(props: Props){
        super(props);
        this.state = {
            collapsed: false,
        };
    }
    render() {
        const { session } = this.props;
        return (
            <Router>
                <Switch>
                    <Route exact path="/login">
                        <Login />
                    </Route>
                    <WrappedRoute path="/" session={session}>
                        <Container routes={routes} />
                    </WrappedRoute>
                    {/*<Route path="*" render={*/}
                        {/*() => {*/}
                            {/*return (*/}
                                {/*<div>*/}
                                    {/*404*/}
                                {/*</div>*/}
                            {/*)*/}
                        {/*}*/}
                    {/*}/>*/}
                </Switch>
            </Router>
        )
    }
}

const data = (state:any) => {
    return {
        // permission: state.global.permission,
        session: state.global.session,
        // menuList: state.global.menuList
    }
}

export default withRouter(connect(
    data,
    null
)(App))

function WrappedRoute({ children, ...rest } : any) {
    let { session } = rest;
    return (
        <Route
            {...rest}
            render={({ location }) =>
                isLogin(session) ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
}
// import React from 'react';
// import logo from './logo.svg';
// import './App.css';
//
// const App: React.FC = () => {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }
//
// export default App;

