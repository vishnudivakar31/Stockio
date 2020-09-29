import React, { Component } from 'react'
import TrendingUpIcon from '@material-ui/icons/TrendingUp'
import TrendingDownIcon from '@material-ui/icons/TrendingDown'
import TrendingFlatIcon from '@material-ui/icons/TrendingFlat';

class Variance extends Component {
    render() {
        const name = this.props.name
        const currentHigh = parseFloat(this.props.currentHigh).toFixed(2)
        const prevHigh = parseFloat(this.props.prevHigh).toFixed(2)
        const variance = this.props.variance.toFixed(2)
        const color = this.props.color
        let icon = <TrendingFlatIcon color={color} />
        if(variance > 0) icon = <TrendingUpIcon color={color} />
        else if (variance < 0) icon = <TrendingDownIcon color={color} />
        
        return(
            <div style={{ color, borderBottom: '1px solid #dfe6e9', marginRight: '2%', marginTop: '2%', borderRight: '1px solid #dfe6e9', padding: '2%', width: '120px' }}>
                <div style={{ display: "flex", fontSize: '18px' }}>
                    <div>{name}</div>
                    <div>{icon}</div>
                </div>
                <div style={{ fontSize: '12px' }}>Variance: {variance}%</div>
                <div style={{ fontSize: '12px', color: 'black' }}>Current Price: ${currentHigh}</div>
                <div style={{ fontSize: '12px', color: 'black' }}>Previous Price: ${prevHigh}</div>
            </div>
        )
    }
}

export default Variance
