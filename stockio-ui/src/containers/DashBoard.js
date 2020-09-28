import React, { Component } from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import TopVolumeChart from '../components/Doughnut'
import RatesChart from '../components/CustomBarChart'
import Variance from '../components/Variance'
import { TableHead, TableRow } from '@material-ui/core';
import { connect } from 'react-redux'
import { getCurrentRate, fetchMyStocks, computeTopVolumeStocks, computeRatesChart, computeRatesVariation } from '../actions'

class DashBoard extends Component {
    componentDidMount() {
        this.props.fetchMyStocks(this.props.user_token)
    } 
    componentDidUpdate(prevProps) {
        if(prevProps.myStocks !== this.props.myStocks) {
            this.props.getCurrentRate({user_token: this.props.user_token})
        }
        if(prevProps.current_rate !== this.props.current_rate) {
            this.props.computeTopVolumeStocks()
            this.props.computeRatesChart()
            this.props.computeRatesVariation()
        }
    }
    render() {
        const currentRate = this.props.current_rate
        return (
            <div className="current_rate">
                <div className="charts">
                    <div className="title">Charts</div>
                    <div style={{display: 'flex', marginLeft: '1%', marginRight: '1%'}}>
                        <div style={{borderRight: '1px solid #dfe6e9'}}>
                            <TopVolumeChart
                                title="Top stocks based on volume"
                                subtitle={`${this.props.topVolumeChartData.length} stocks, check table below to find actual volume.`}
                                data={this.props.topVolumeChartData}
                            />
                        </div>
                        <div style={{paddingLeft: '1%', paddingRight: '1%', borderRight: '1px solid #dfe6e9'}}>
                            <RatesChart
                                title="Stock rates distribution"
                                subtitle={`${this.props.ratesChartData.length} stocks, chart shows open, high, low, close rates for each stock`}
                                data={this.props.ratesChartData}
                            />
                        </div>
                        <div style={{paddingLeft: '1%', paddingRight: '1%'}}>
                            <div style={{fontSize: '18px', fontWeight: 'normal'}}>Stock Growth</div>
                            <div style={{fontSize: '12px', fontWeight: 'lighter'}}>Check variance value to understand growth rate</div>
                            {
                                this.props.rateVarianceData.map((item, index) => (
                                    <Variance
                                        key={index}
                                        name={item.name}
                                        currentHigh={item.current}
                                        prevHigh={item.prev}
                                        variance={item.variance}
                                        color={item.color}
                                    />
                                ))
                            }
                        </div>
                    </div>
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
        myStocks: state.stockReducer.myStocks,
        topVolumeChartData: state.chartReducer.topVolumeStocks,
        ratesChartData: state.chartReducer.ratesChartData,
        rateVarianceData: state.chartReducer.rateVarianceData
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchMyStocks: payload => dispatch(fetchMyStocks(payload)),
        getCurrentRate: payload => dispatch(getCurrentRate(payload)),
        computeTopVolumeStocks: payload => dispatch(computeTopVolumeStocks(payload)),
        computeRatesChart: payload => dispatch(computeRatesChart(payload)),
        computeRatesVariation: payload => dispatch(computeRatesVariation(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard)
