import React, { Component } from 'react'
import { fetchMyStocks, searchmyStocks } from '../actions'
import { connect } from 'react-redux'
import { TableHead, TableRow } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox'
import Pagination from '@material-ui/lab/Pagination'
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

class Watchlist extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            editingMode: false,
            selectedStocks: [],
            currentPage: 0,
            loadingMsg: ""
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
        this.setLoading(true, "Please wait, while we fetch your watchlist for you.")
        this.props.fetchMyStocks(this.props.user_token)
    }

    componentDidUpdate(prevProps) {
        if(prevProps.myStocks !== this.props.myStocks) {
            this.setLoading(false, "")
        }
    }

    setLoading(status, msg = "") {
        this.setState({
            loading: status,
            loadingMsg: msg
        })
    }

    enterPressed(event) {
        if(event.key === 'Enter') {
            this.searchStock()
        }
    }

    searchStock() {
        let searchText = this.searchBar.value ? this.searchBar.value : ""
        if(searchText.length === 0) {
            this.setLoading(true, "Please wait, while we are fetching your watchlist")
            this.props.fetchMyStocks(this.props.user_token)
        } else {
            this.setLoading(true, "Please wait, while we are searching your watchlist")
            this.props.searchmyStocks({
                searchText,
                user_token: this.props.user_token
            })
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
        // TODO
    }

    paginationChange(event, page) {
        this.setState({
            currentPage: ((page - 1) * 9)
        })
    }

    render() {
        let length = this.props.myStocks ? this.props.myStocks.length : 0
        const stocks = this.props.myStocks ? this.props.myStocks.slice(this.state.currentPage, this.state.currentPage + 10) : []
        return (
            <div className="stock-universe">
                <div style={{display: this.state.loading ? 'block' : 'none'}}>
                    <LinearProgress />
                    <div style={{padding: '1%'}}>{this.state.loadingMsg}</div>
                </div>
                <AppBar position='static'>
                    <Toolbar style={{whiteSpace: 'nowrap'}}>
                        <div>
                            Watch Listings
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
                        <Button color='inherit' disabled={!this.state.editingMode} onClick={this.save}>Delete selected</Button>
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
                                    <TableCell>Want to delete?</TableCell>
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
                                        <TableCell>{row.stock_type}</TableCell>
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
        myStocks: state.stockReducer.myStocks
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchMyStocks: payload => dispatch(fetchMyStocks(payload)),
        searchmyStocks: payload => dispatch(searchmyStocks(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Watchlist)
