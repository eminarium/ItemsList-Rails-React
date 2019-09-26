class Item extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            description: '',
            editable: false
        }

        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDescChange = this.handleDescChange.bind(this);
    }

    handleNameChange(event) {
        this.setState({ name: event.target.value });
    }

    handleDescChange(event) {
        this.setState({ description: event.target.value });
    }

    handleDelete(id) {
        console.log("Single item deleted !");
        this.props.onDelete(id);
    }

    handleEdit(item) {
        console.log("Single item edited !");
        this.props.onEdit(item);
        this.setState({editable: !this.state.editable});
    }

    render() {
        const name = this.state.editable ? <input type="text" defaultValue={this.props.item.name} onChange={this.handleNameChange} /> : <h3>{this.props.item.name}</h3>
        const description = this.state.editable ? <input type="text" defaultValue={this.props.item.description} onChange={this.handleDescChange} /> : <p>{this.props.item.description}</p>        
        return (
            <div>
                {name}
                {description}
                <button onClick={this.handleDelete.bind(this, this.props.item.id)}>Delete</button>
                <button onClick={this.handleEdit.bind(this, {id: this.props.item.id, name: this.state.name, description: this.state.description})}>
                    {" "}
                    {this.state.editable ? "Submit" : "Edit"}
                </button>
            </div>
        );
    }
}