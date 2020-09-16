import React, { Component } from 'react'
import StockUniverse from './StockUniverse'
import { connect } from 'react-redux'
import { signout } from '../actions'
import { withRouter } from 'react-router'

class HomePage extends Component {
    constructor(props) {
        super(props)
        this.navItems = ['Dashboard', 'Watchlist', 'Stock universe', 'Settings', 'Signout']
        this.state = {
            selectedNavLink: 0
        }
        this.navtileClick = this.navtileClick.bind(this)
        this.renderBoard = this.renderBoard.bind(this)
    }

    componentDidMount() {
        if(!this.props.user_token || this.props.user_token.length === 0) {
            this.props.history.goBack()
        }
    }

    componentDidUpdate(prevProps) {
        if(prevProps.user_token !== this.props.user_token && this.props.user_token.length === 0) {
            this.props.history.goBack()
        }
    }

    navtileClick(index) {
        this.setState({
            selectedNavLink: index
        })
        if(index === 4) {
            this.props.signout()
        }
    }

    renderBoard() {
        if(this.state.selectedNavLink === 2) {
            return <StockUniverse />
        } else {
            return <div />
        }
    }

    render() {
        return (
            <div className='dashboard'>
                <div className='navigation-bar'>
                    <div className='brand'>Stockio</div>
                    {this.navItems.map((item, index) => {
                        let className = `nav-tile ${this.state.selectedNavLink === index ? 'active' : 'deactive'}`
                        return <div className={className} key={index} onClick={() => this.navtileClick(index)}>{item}</div>
                    })}
                    <div>
                        <div className='about'>About</div>
                        <ul>
                            <li>Stockio helps you to stay in touch with the financial market especially
                            equity invovled in US NASDAQ. You can view all stocks in NASDAQ, search 
                            them and add them to your watchlist.
                            </li>
                            <li>
                                With watchlist, you will be receiving real-time pricing of your equities.
                            </li>
                            <li>
                                Dashboard will be showing various insights for your equities.
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="navigation-board">
                    <div className="title">{this.navItems[this.state.selectedNavLink]}</div>
                    {
                        this.renderBoard()
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user_token: state.userReducer.user_token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signout: () => dispatch(signout())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomePage))
