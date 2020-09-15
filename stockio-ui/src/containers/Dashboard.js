import React, { Component } from 'react'

class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.navItems = ['Dashboard', 'Watchlist', 'Stock universe', 'Settings', 'Signout']
        this.state = {
            selectedNavLink: 0
        }
        this.navtileClick = this.navtileClick.bind(this)
    }

    navtileClick(index) {
        this.setState({
            selectedNavLink: index
        })
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
                    Board
                </div>
            </div>
        )
    }
}

export default Dashboard
