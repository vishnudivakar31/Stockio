import React, { Component } from 'react'
import { BarChart, Bar, Legend, Tooltip, XAxis, YAxis } from 'recharts'

class CustomBarChart extends Component {
    render() {
        const title = this.props.title
        const subtitle = this.props.subtitle
        const data = this.props.data
        const color = ['#0984e3', '#00b894', '#d63031', '#b2bec3']
        return(
            <div>
				<div style={{fontSize: '18px', fontWeight: 'normal'}}>{title}</div>
				<div style={{fontSize: '12px', fontWeight: 'lighter', marginBottom: '1.5%' }}>{subtitle}</div>
				<BarChart width={500} height={320} data={data}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey='open' fill={color[0]} />
                    <Bar dataKey='high' fill={color[1]} />
                    <Bar dataKey='low' fill={color[2]} />
                    <Bar dataKey='close' fill={color[3]} />
                </BarChart>
			</div> 
        )
    }
}

export default CustomBarChart
