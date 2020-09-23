import React, { Component } from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import { TableHead, TableRow } from '@material-ui/core';
import { connect } from 'react-redux'
import { getCurrentRate, fetchMyStocks } from '../actions'

class DashBoard extends Component {
    componentDidMount() {
        this.props.fetchMyStocks(this.props.user_token)
    } componentDidUpdate(prevProps) {
        if(prevProps.myStocks !== this.props.myStocks) {
            this.props.getCurrentRate({user_token: this.props.user_token})
        }
    }
    render() {
        const currentRate = this.props.current_rate
        return (
            <div className="current_rate">
                <div className="charts">
                <div className="title">Charts</div>
                </div>
                <div className="watchlist">
                    <div className="title">Stock WatchList</div>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Open</TableCell>
                                    <TableCell>High</TableCell>
                                    <TableCell>Low</TableCell>
                                    <TableCell>Close</TableCell>
                                    <TableCell>Volume</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {currentRate.map((row, index) => (
                                    <TableRow key={`${index}`}>
                                        <TableCell>{row.name}</TableCell>
                                        <TableCell>${row.current_rate.open}</TableCell>
                                        <TableCell>${row.current_rate.high}</TableCell>
                                        <TableCell>${row.current_rate.low}</TableCell>
                                        <TableCell>${row.current_rate.close}</TableCell>
                                        <TableCell>{row.current_rate.volume}</TableCell>
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
        current_rate: state.stockReducer.currentRate,
        myStocks: state.stockReducer.myStocks
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchMyStocks: payload => dispatch(fetchMyStocks(payload)),
        getCurrentRate: payload => dispatch(getCurrentRate(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard)
