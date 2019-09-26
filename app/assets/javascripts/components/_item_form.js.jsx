class ItemForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            description: ''
        }

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDescChange = this.handleDescChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log("Name is : "+this.state.name+ " / Description is : "+this.state.description);
        this.props.onSubmit({
            name: this.state.name,
            description: this.state.description
        });
        this.setState({name: '', description: ''});
    }

    handleNameChange(event) {
        this.setState({name: event.target.value});
    }

    handleDescChange(event) {
        this.setState({description: event.target.value});
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" value={this.state.name} onChange={this.handleNameChange} placeholder="Enter new name... " />
                    <input type="text" value={this.state.description} onChange={this.handleDescChange} placeholder="Enter its description..." />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}