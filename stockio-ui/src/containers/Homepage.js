import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Snackbar from '@material-ui/core/Snackbar'
import { connect } from 'react-redux'
import { setUserToken } from '../actions'

class Homepage extends Component {
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
    }
    componentDidUpdate(prevProps) {
        console.log(this.props.user_token)
    }
    login() {
        if(this.username_input && this.password_input) {
            let username = this.username_input.value
            let password = this.password_input.value
            if(username.length === 0 || password.length === 0) {
                this.setSnackBar("username and password are mandatory for login")
            } else {
                this.props.setUserToken(`${username} ${password}`)
            }
        } else {
            this.setSnackBar("username and password are mandatory for login")
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
                    <Button color="secondary" style={{marginLeft: "2%", marginTop: "2%"}}>
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
                    <Button variant="contained" color="primary" style={{marginTop: "2%"}}>
                        Sign up
                    </Button>
                </Container>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user_token: state.user_token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setUserToken: token => dispatch(setUserToken(token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Homepage)
