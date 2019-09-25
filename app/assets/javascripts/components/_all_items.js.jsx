class AllItems extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            items: []
        }
    }

    componentDidMount() {
        console.log("Component Mounted !");

        fetch('http://localhost:3000/api/v1/items.json')
        .then((result) => result.json())
        .then((result) => {
            console.log(result);
            this.setState({ items: result});
        });
    }

    render() {

        const items = this.state.items.map((item) => {
            return (
                <div key={item.id}>
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                </div>
            );
        });

        return (
            <div>
                {items}
            </div>
        );
    }

}