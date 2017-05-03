
class Timer extends React.Component {
	
	constructor(props) {
		super(props);

		this.state = {time : new Date().toLocaleTimeString()}
	}

	render() {
		return (
			<div className="timer">
				{this.state.time}
				
			</div>
		);
	}

	updateTime() {
		this.setState({time: new Date().toLocaleTimeString()})
	}
};

let el = <Timer />;

 
ReactDOM.render(
	el,

	document.getElementById('content')
);