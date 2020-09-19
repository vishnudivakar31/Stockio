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
import Checkbox from '@material-ui/core/Checkbox'
import Pagination from '@material-ui/lab/Pagination'
import { fetchAllStocks, searchStock, savemyStocks } from '../actions'
import { connect } from 'react-redux'
import { TableHead, TableRow } from '@material-ui/core';

class StockUniverse extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            editingMode: false,
            selectedStocks: [],
            currentPage: 0
        }
        this.searchStock = this.searchStock.bind(this)
        this.enterPressed = this.enterPressed.bind(this)
        this.setLoading = this.setLoading.bind(this)
        this.checkStock = this.checkStock.bind(this)
        this.paginationChange = this.paginationChange.bind(this)
        this.discard = this.discard.bind(this)
        this.save = this.save.bind(this)
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

    checkStock(stock) {
        let newStock = Object.assign({}, stock)
        newStock['stock_type'] = newStock.type
        delete newStock.type
        let selectedStocks = this.state.selectedStocks
        if(selectedStocks.filter(stocks => stock.symbol === stocks.symbol).length > 0) {
            selectedStocks = selectedStocks.filter(stocks => stock.symbol !== stocks.symbol)
            this.setState({
                selectedStocks,
                editingMode: selectedStocks.length > 0
            })
        } else {
            selectedStocks.push(newStock)
            this.setState({
                selectedStocks,
                editingMode: selectedStocks.length > 0
            })
        }
    }

    discard() {
        this.setState({
            selectedStocks: [],
            editingMode: false
        })
    }

    save() {
        let payload = {
            stocks: this.state.selectedStocks,
            user_token: this.props.user_token
        }
        this.props.savemyStocks(payload)
    }

    paginationChange(event, page) {
        this.setState({
            currentPage: ((page - 1) * 9)
        })
    }

    render() {
        let length = this.props.stocks.data ? this.props.stocks.data.length : 0
        let stocks = this.props.stocks.data ? this.props.stocks.data.slice(this.state.currentPage, this.state.currentPage + 10) : []
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
                        <Button color='inherit' disabled={!this.state.editingMode} onClick={this.save}>Save</Button>
                        <Button color='secondary' disabled={!this.state.editingMode} onClick={this.discard}>Discard</Button>
                        <div style={{marginLeft: '1%'}}>Total: {length}</div>
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
                                    <TableCell>Watching?</TableCell>
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
                                        <TableCell>
                                            <Checkbox
                                                key={row.symbol}
                                                color='primary'
                                                checked={this.state.selectedStocks.find(stock => stock.symbol === row.symbol) !== undefined}
                                                onClick={() => this.checkStock(row)}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Pagination 
                        count = {Math.ceil(length / 9)}
                        onChange = {this.paginationChange}
                        variant = 'outlined'
                        color = 'primary'
                        showFirstButton
                        showLastButton
                        style={{marginTop: '0.5%', display: 'flex', justifyContent: 'center'}}
                    />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user_token: state.userReducer.user_token,
        stocks: state.stockReducer.stocks,
        myStocks: state.stockReducer.myStocks
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchAllStocks: payload => dispatch(fetchAllStocks(payload)),
        searchStock: payload => dispatch(searchStock(payload)),
        savemyStocks: payload => dispatch(savemyStocks(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StockUniverse)

