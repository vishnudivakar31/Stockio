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
import { fetchAllStocks } from '../actions'
import { connect } from 'react-redux'
import { TableHead, TableRow } from '@material-ui/core';

class StockUniverse extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: false
        }
    }

    componentDidMount() {
        this.props.fetchAllStocks(this.props.user_token)
        this.setState({
            loading:true
        })
    }

    componentDidUpdate(prevProps) {
        if(prevProps.stocks !== this.props.stocks) {
            this.setState({
                loading: false
            })
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
                    <Toolbar>
                        <div>
                            Stock Listings
                        </div>
                        <div style={{marginLeft: '1%'}}>Total: {stocks.length}</div>
                        <Button color='inherit'>Search</Button>
                        <Button color='inherit'>Save</Button>
                        <Button color='secondary'>Discard</Button>
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
        fetchAllStocks: payload => dispatch(fetchAllStocks(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StockUniverse)

