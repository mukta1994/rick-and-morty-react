import React, {  } from 'react';

class SearchList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			filtered: []
		};
		this.handleChange = this.handleChange.bind(this);
	}
	
	componentDidMount() {
    this.setState({
      filtered: this.props.items
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      filtered: nextProps.items
    });
  }
	
	handleChange(e) {
    let currentList = [];
    let newList = [];
		
    if (e.target.value !== "") {
      currentList = this.props.items;
      newList = currentList.filter(item => {
        const lc = item.name.toLowerCase();
        const filter = e.target.value.toLowerCase();
        return lc.includes(filter);
      });
      console.log(newList,"lc")

    } else {
      newList = this.props.items;
    }
    this.setState({
      filtered: newList
    });
  }
	
	render() {
		return (
			<div>
				<input type="text" className="input" onChange={this.handleChange} placeholder="Search..." />
					{/* <ul>
						{this.state.filtered.map(item => (
							<li key={item}>
								{item} &nbsp;
								
							</li>
						))}
					</ul> */}
				</div>
		)
	}
}

export default SearchList;

