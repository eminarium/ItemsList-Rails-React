class ItemsContainer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            items: []
        }

        this.handleNewSubmit = this.handleNewSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    componentDidMount() {
        console.log("ItemsContainer Component Mounted !");

        fetch('http://localhost:3000/api/v1/items.json')
            .then((result) => result.json())
            .then((result) => {
                console.log(result);
                this.setState({ items: result });
            });
    }

    handleEdit(item) {
        fetch('http://localhost:3000/api/v1/items/' + item.id, {
            method: 'PUT',
            body: JSON.stringify({id: item.id, name: item.name, description: item.description}),
            headers: new Headers({
                'Content-type': 'application/json'
            })
        })
        .then((response) => response.json())
        .then(data => {
            console.log("Item edited in ItemsContainer !" + this.state.items.count);
            const itemIndex = this.state.items.findIndex(x => x.id === data.id);
            const newItems = this.state.items;
            newItems[itemIndex] = data;
            this.setState({ items: newItems });
        })
        .catch(error => {
            console.log(error);
        });
    }

    handleDelete(id) {
        fetch('http://localhost:3000/api/v1/items/' + id, {
            method: 'DELETE',
            body: JSON.stringify({ id: id }),
            headers: new Headers({
                'Content-type': 'application/json'
            })
        })
        .then(data => {
            console.log("Item deleted in ItemsContainer !");
            const newItems = this.state.items.filter((item) => {
                return item.id != id;
            })
            this.setState({items: newItems});

            //const itemIndex = this.state.items.findIndex(x => x.id === id);
            //const items = this.state.items
            //items.splice(itemIndex, 1);
            //this.setState({ items: items });
        })
        .catch(error => {
            console.log(error);
        });
      }

    handleNewSubmit(item) {
        fetch('http://localhost:3000/api/v1/items', {
            method: 'POST',
            body: JSON.stringify({ name: item.name, description: item.description }),
            headers: new Headers({
                'Content-type': 'application/json'
            })
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            const newState = this.state.items.concat(data);
            this.setState({ items: newState });
        })
        .catch(error => console.log(error));
    }

    render() {

        return (
            <div>
                <ItemForm onSubmit={this.handleNewSubmit} />
                {
                    this.state.items.map((item) => {
                        return (<Item key={item.id} item={item} onDelete={this.handleDelete} onEdit={this.handleEdit} />);
                    })
                }
            </div>
        );
    }

}