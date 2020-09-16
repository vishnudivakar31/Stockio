import React, { Component } from 'react'
import StockUniverse from './StockUniverse'
import { connect } from 'react-redux'
import { signout, fetchNews } from '../actions'
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
        this.renderNews = this.renderNews.bind(this)
    }

    componentDidMount() {
        if(!this.props.user_token || this.props.user_token.length === 0) {
            this.props.history.goBack()
        }
        this.newInterval = setInterval(() => {this.props.fetchNews(this.props.user_token)}, 3600000)
        this.props.fetchNews(this.props.user_token)
    }

    componentWillUnmount() {
        if(this.newInterval) {
            clearInterval(this.newInterval)
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

    renderNews() {
        const news = this.props.news &&  this.props.news.articles ? this.props.news.articles : []
        return (
            <div className="new-container">
                {news.map((item, index) => (
                    <div className="news-tile" key={index} onClick={() => window.open(item.url, "_blank")}>
                        <img className="news-photo" src={item.urlToImage} />
                        <div className="news-title">{item.title}</div>
                    </div>
                ))}
            </div>
        )
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
                        <div className='about'>Top Business News</div>
                        <div className='lastUpdated'>last updated at {this.props.updated_time}</div>
                        {this.renderNews()}
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
        user_token: state.userReducer.user_token,
        updated_time: state.newsReducer.lastUpdated,
        news: state.newsReducer.news
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signout: () => dispatch(signout()),
        fetchNews: (payload) => dispatch(fetchNews(payload))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomePage))
