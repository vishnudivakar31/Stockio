import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Snackbar from '@material-ui/core/Snackbar'
import { connect } from 'react-redux'
import { login, loginError, signUp } from '../actions'
import { withRouter } from 'react-router'

class SecurityPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            snackbar: {
                enabled: false,
                message: ""
            }
        }
        this.closeSnackbar = this.closeSnackbar.bind(this)
        this.login = this.login.bind(this)
        this.setSnackBar = this.setSnackBar.bind(this)
        this.signup = this.signup.bind(this)
    }
    componentDidUpdate(prevProps) {
        if(prevProps.login_error !== this.props.login_error && this.props.login_error.length > 0) {
            this.setSnackBar(this.props.login_error)
            this.props.loginError("")
        }
        if(prevProps.user_token !== this.props.user_token && this.props.user_token.length > 0) {
            this.props.history.push("/dashboard")
        }
    }
    login() {
        if(this.username_input && this.password_input) {
            let username = this.username_input.value
            let password = this.password_input.value
            if(username.length === 0 || password.length === 0) {
                this.setSnackBar("username and password are mandatory for login")
            } else {
                this.props.login({username, password})
            }
        } else {
            this.setSnackBar("username and password are mandatory for login")
        }
    }
    signup() {
        if(this.signup_username_input && this.signup_email_input && this.signup_password_input &&
            this.signup_confirm_password_input) {
            let username = this.signup_username_input.value
            let email = this.signup_email_input.value
            let password = this.signup_password_input.value
            let confirm_password = this.signup_confirm_password_input.value
            let dob = this.signup_dob_input.value
            if(username.length === 0 || email.length === 0 || password.length === 0 ||
                confirm_password.length === 0 || dob.length === 0) {
                    this.setSnackBar("all fields are mandatory for signing up")
            } else if (password !== confirm_password) {
                this.setSnackBar("passwords are not matching, try again.")
            } else {
                this.props.signUp({
                    username,
                    email,
                    password,
                    dob
                })
            }
        } else {
            this.setSnackBar("all fields are mandatory for signing up")
        }
    }
    setSnackBar(message) {
        this.setState({
            snackbar: {
                enabled: true,
                message
            }
        })
    }
    closeSnackbar() {
        this.setState({
            snackbar: {
                enabled: false,
                message: ""
            }
        })
    }
    render() {
        return (
            <div className="homepage">
                <Snackbar
                    open={this.state.snackbar.enabled}
                    onClose={this.closeSnackbar}
                    message={this.state.snackbar.message}
                />
                <Container maxWidth="sm" className="homepage_console">
                    <div className="hompage_title">Welcome to stockio</div>
                    <TextField 
                        id="username_input" 
                        label="Username" 
                        fullWidth
                        size='small'
                        inputRef = {input => this.username_input = input}
                    />
                    <TextField
                        id="password_input"
                        label="Password"
                        type="password"
                        fullWidth
                        autoComplete="current-password"
                        size='small'
                        inputRef = {input => this.password_input = input}
                    />
                    <Button 
                        variant="contained" 
                        color="primary" 
                        style={{marginTop: "2%"}} 
                        onClick={this.login}
                    >
                        Log In
                    </Button>
                    <Button color="secondary" disabled style={{marginLeft: "2%", marginTop: "2%"}}>
                        Forgot Password?
                    </Button>
                    <div className="hompage_title" style={{marginTop: "2%"}}>Not a member yet? Well, Sign up.</div>
                    <TextField 
                        id="signup_username_input" 
                        label="Username" 
                        fullWidth
                        size='small'
                        inputRef = {input => this.signup_username_input = input}
                    />
                    <TextField 
                        id="signup_email_input" 
                        label="Email" 
                        fullWidth
                        size='small'
                        inputRef = {input => this.signup_email_input = input}
                    />
                    <TextField
                        id="signup_password_input"
                        label="Password"
                        type="password"
                        fullWidth
                        autoComplete="current-password"
                        size='small'
                        inputRef = {input => this.signup_password_input = input}
                    />
                    <TextField
                        id="signup_confirm_password_input"
                        label="Confirm password"
                        type="password"
                        fullWidth
                        autoComplete="current-password"
                        size='small'
                        inputRef = {input => this.signup_confirm_password_input = input}
                    />
                    <TextField
                        id="signup_dob_input"
                        label="Birthday"
                        type="date"
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputRef = {input => this.signup_dob_input = input}
                    />
                    <Button 
                        variant="contained" 
                        color="primary" 
                        style={{marginTop: "2%"}}
                        onClick={this.signup}
                    >
                        Sign up
                    </Button>
                </Container>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user_token: state.user_token,
        login_error: state.login_error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        login: payload => dispatch(login(payload)),
        loginError: payload => dispatch(loginError(payload)),
        signUp: payload => dispatch(signUp(payload))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SecurityPage))
