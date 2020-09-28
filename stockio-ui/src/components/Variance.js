import React, { Component } from 'react'
import TrendingUpIcon from '@material-ui/icons/TrendingUp'
import TrendingDownIcon from '@material-ui/icons/TrendingDown'
import TrendingFlatIcon from '@material-ui/icons/TrendingFlat';

class Variance extends Component {
    render() {
        const name = this.props.name
        const currentHigh = this.props.currentHigh
        const prevHigh = this.props.prevHigh
        const variance = this.props.variance
        const color = this.props.color
        let icon = <TrendingFlatIcon color={color} />
        if(variance > 0) icon = <TrendingUpIcon color={color} />
        else if (variance < 0) icon = <TrendingDownIcon color={color} />
        
        return(
            <div style={{ color, borderBottom: '1 px solid #dfe6e9' }}>
                <div style={{ display: "flex" }}>
                    <div>{name}</div>
                    <div>{icon}</div>
                </div>
                <div>Variance: {variance}%</div>
                <div>Current Price: ${currentHigh}</div>
                <div>Previous Price: ${prevHigh}</div>
            </div>
        )
    }
}

export default Variance
