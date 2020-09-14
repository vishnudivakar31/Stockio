import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'

class Homepage extends Component {
    constructor(props) {
        super(props)
        this.login = this.login.bind(this)
    }
    login() {
        if(this.username_input && this.password_input) {
            let username = this.username_input.value
            let password = this.password_input.value
            if(username.length === 0 || password.length === 0) {
                
            }
        } else {
            
        }
    }
    render() {
        return (
            <div className="homepage">
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

export default Homepage
