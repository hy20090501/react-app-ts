import React from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import LoginForm from './loginForm'
import { login } from '../../api'
import { setSession } from '../../actions/common'
interface Props {
    setSession?: any,
    history?: any
}
class Login extends React.Component<Props, any> {
    handleSubmit = (e : any) => {
        login(e).then(data=>{
            this.props.setSession(data);
            this.props.history.push('/app/home');
        });
    }

    render() {
        return (
            <LoginForm handleSubmit={this.handleSubmit}/>
        );
    }
}

export default withRouter(connect(null, { setSession })(Login));
