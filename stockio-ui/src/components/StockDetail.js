import React, { Component } from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button'
import { TableHead, TableRow } from '@material-ui/core';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend} from 'recharts'

class StockDetail extends Component {
    render() {
        const name = this.props.name
        let current_rate = this.props.current_rate
        let history = this.props.history.reverse()
        
        let minOpen = Number.MAX_VALUE
        let minHigh = Number.MAX_VALUE
        let minLow = Number.MAX_VALUE
        let minClose = Number.MAX_VALUE

        let maxOpen = Number.MIN_VALUE
        let maxHigh = Number.MIN_VALUE
        let maxLow = Number.MIN_VALUE
        let maxClose = Number.MIN_VALUE

        current_rate.open = parseFloat(current_rate.open).toFixed(2)
        current_rate.high = parseFloat(current_rate.high).toFixed(2)
        current_rate.low = parseFloat(current_rate.low).toFixed(2)
        current_rate.close = parseFloat(current_rate.close).toFixed(2)

        history = history.map(item => {
            item.open = parseFloat(item.open).toFixed(2)
            item.high = parseFloat(item.high).toFixed(2)
            item.low = parseFloat(item.low).toFixed(2)
            item.close = parseFloat(item.close).toFixed(2)
            
            if(item.open < minOpen) minOpen = item.open
            if(item.high < minHigh) minHigh = item.high
            if(item.low < minLow) minLow = item.low
            if(item.close < minClose) minClose = item.close

            if(item.open > maxOpen) maxOpen = item.open
            if(item.high > maxHigh) maxHigh = item.high
            if(item.low > maxLow) maxLow = item.low
            if(item.close > maxClose) maxClose = item.close

            return item
        })
        return(
            <div style={{ padding: '1%' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1%' }}>
                    <div style={{ fontSize: '20px', marginRight: '2%' }}>{name}</div>
                    <Button variant='text' size='small' color='secondary' onClick={this.props.closeDetails}>Go back</Button>
                </div>
                <div style={{ display: 'flex' }}>
                    <div style={{ width: '70%', overflow: 'scroll' }}>
                        <div style={{ fontSize: '25px' }}>Stock Trend</div>
                        <div style={{ fontSize: '10px', marginBottom: '1%', fontWeight: 'lighter' }}>Scroll to view entire chart</div>
                        <BarChart
                            width={1500}
                            height={500}
                            data={history}
                        >
                            <XAxis dataKey='datetime' allowDataOverflow />
                            <YAxis type='number' allowDataOverflow domain={['dataMin', 'dataMax + 10']}/>
                            <Tooltip />
                            <Legend />
                            <Bar type="monotone" dataKey="open" stackId="1" stroke="#0984e3" fill="#0984e3" />
                            <Bar type="monotone" dataKey="high" stackId="2" stroke="#00b894" fill="#00b894" />
                            <Bar type="monotone" dataKey="low" stackId="3" stroke="#d63031" fill="#d63031" />
                            <Bar type="monotone" dataKey="close" stackId="4" stroke="#b2bec3" fill="#b2bec3" />
                        </BarChart>
                    </div>
                    <div style={{marginLeft: '1%', borderLeft: '1px solid #dfe6e9', paddingLeft: '1%', width: '30%' }}>
                    <div style={{ fontSize: '25px', marginBotton: '1%' }}>Overview.</div>
                        <div style={{ fontSize: '15px' }}>Insight - Current</div>
                        <div style={{ fontSize: '10px', marginBottom: '1%', fontWeight: 'lighter' }}>Shows current open, high, low, close</div>
                        <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                            <div style={{ marginRight: '2%', color: '#0984e3' }}>open: ${current_rate.open}</div>
                            <div style={{ marginRight: '2%', color: '#00b894' }}>high: ${current_rate.high}</div>
                            <div style={{ marginRight: '2%', color: '#d63031' }}>low: ${current_rate.low}</div>
                            <div style={{ marginRight: '2%', color: '#b2bec3' }}>close: ${current_rate.close}</div>
                        </div>
                        <div style={{ fontSize: '15px', marginTop: '2%', borderTop: '1px solid #dfe6e9' }}>Insight - Maximum</div>
                        <div style={{ fontSize: '10px', marginBottom: '1%', fontWeight: 'lighter' }}>Shows maximum open, high, low, close</div>
                        <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                            <div style={{ marginRight: '2%', color: '#0984e3' }}>open: ${maxOpen}</div>
                            <div style={{ marginRight: '2%', color: '#00b894' }}>high: ${maxHigh}</div>
                            <div style={{ marginRight: '2%', color: '#d63031' }}>low: ${maxLow}</div>
                            <div style={{ marginRight: '2%', color: '#b2bec3' }}>close: ${maxClose}</div>
                        </div>
                        <div style={{ fontSize: '15px', marginTop: '2%', borderTop: '1px solid #dfe6e9' }}>Insight - Minimum</div>
                        <div style={{ fontSize: '10px', marginBottom: '1%', fontWeight: 'lighter' }}>Shows minimum open, high, low, close</div>
                        <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                            <div style={{ marginRight: '2%', color: '#0984e3' }}>open: ${minOpen}</div>
                            <div style={{ marginRight: '2%', color: '#00b894' }}>high: ${minHigh}</div>
                            <div style={{ marginRight: '2%', color: '#d63031' }}>low: ${minLow}</div>
                            <div style={{ marginRight: '2%', color: '#b2bec3' }}>close: ${minClose}</div>
                        </div>
                    </div>
                </div>
                <div style={{ fontSize: '15px', marginBottom: '1%' }}>Trend Timeline</div>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Datetime</TableCell>
                                <TableCell>Open</TableCell>
                                <TableCell>High</TableCell>
                                <TableCell>Low</TableCell>
                                <TableCell>Close</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {history.map((row, index) => (
                                <TableRow key={`${index}`}>
                                    <TableCell>{row.datetime}</TableCell>
                                    <TableCell>${row.open}</TableCell>
                                    <TableCell>${row.high}</TableCell>
                                    <TableCell>${row.low}</TableCell>
                                    <TableCell>${row.close}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        )
    }
}

export default StockDetail
