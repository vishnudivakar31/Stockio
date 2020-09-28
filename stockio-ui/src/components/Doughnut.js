import React, { Component } from 'react'
import { PieChart, Pie, Legend, Tooltip, Cell } from 'recharts'

class Doughnut extends Component {
    render() {
        const title = this.props.title
        const subtitle = this.props.subtitle
        const data = this.props.data
        return(
            <div>
				<div style={{fontSize: '18px', fontWeight: 'normal'}}>{title}</div>
				<div style={{fontSize: '12px', fontWeight: 'lighter'}}>{subtitle}</div>
				<PieChart width={500} height={320}>
					<Pie dataKey='value' data={data} innerRadius='65%'>
						{
							data.map((entry, index) => (
								<Cell key={index} fill={entry.color} />
							))
						}
					</Pie>
					<Tooltip />
					<Legend />
				</PieChart>
			</div> 
        )
    }
}

export default Doughnut
