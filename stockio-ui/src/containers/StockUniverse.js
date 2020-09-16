import React, { Component } from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import LinearProgress from '@material-ui/core/LinearProgress'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Search from '@material-ui/icons/Search'
import { fetchAllStocks, searchStock } from '../actions'
import { connect } from 'react-redux'
import { TableHead, TableRow } from '@material-ui/core';

class StockUniverse extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: false,
        }
        this.searchStock = this.searchStock.bind(this)
        this.enterPressed = this.enterPressed.bind(this)
        this.setLoading = this.setLoading.bind(this)
    }

    componentDidMount() {
        this.props.fetchAllStocks(this.props.user_token)
        this.setLoading(true)
    }

    componentDidUpdate(prevProps) {
        if(prevProps.stocks !== this.props.stocks) {
            this.setLoading(false)
        }
    }

    setLoading(status) {
        this.setState({
            loading: status
        })
    }

    enterPressed(event) {
        if(event.key === 'Enter') {
            this.searchStock()
        }
    }

    searchStock() {
        if(this.searchBar && this.searchBar.value.length > 0) {
            this.setLoading(true)
            this.props.searchStock({ token: this.props.user_token, value: this.searchBar.value})
        } else {
            this.setLoading(true)
            this.props.fetchAllStocks(this.props.user_token)
        }
    }

    render() {
        const stocks = this.props.stocks.data ? this.props.stocks.data : []
        return (
            <div className="stock-universe">
                <div style={{display: this.state.loading ? 'block' : 'none'}}>
                    <LinearProgress />
                    <div style={{padding: '1%'}}>Please wait, while we fetch the stock options for you</div>
                </div>
                <AppBar position='static'>
                    <Toolbar style={{whiteSpace: 'nowrap'}}>
                        <div>
                            Stock Listings
                        </div>
                        <div style={{display:'flex', flex: 1, marginLeft: '1%', alignItems: 'center'}}>
                            <input
                                className='search-input'
                                placeholder="search"
                                ref={input => this.searchBar = input}
                                onKeyDown={this.enterPressed}
                            />
                            <Search 
                                style={{marginLeft: '1%', cursor: 'pointer'}}
                                onClick={this.searchStock}
                            />
                        </div>
                        <Button color='inherit'>Save</Button>
                        <Button color='secondary'>Discard</Button>
                        <div style={{marginLeft: '1%'}}>Total: {stocks.length}</div>
                    </Toolbar>
                </AppBar>
                <div className="stock-table">
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Symbol</TableCell>
                                    <TableCell>Currency</TableCell>
                                    <TableCell>Exchange</TableCell>
                                    <TableCell>Country</TableCell>
                                    <TableCell>Type</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {stocks.map((row, index) => (
                                    <TableRow key={`${index}`}>
                                        <TableCell>{row.name}</TableCell>
                                        <TableCell>{row.symbol}</TableCell>
                                        <TableCell>{row.currency}</TableCell>
                                        <TableCell>{row.exchange}</TableCell>
                                        <TableCell>{row.country}</TableCell>
                                        <TableCell>{row.type}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user_token: state.userReducer.user_token,
        stocks: state.stockReducer.stocks
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchAllStocks: payload => dispatch(fetchAllStocks(payload)),
        searchStock: payload => dispatch(searchStock(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StockUniverse)

