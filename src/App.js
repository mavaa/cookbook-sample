// React
import { useState, useEffect } from 'react';

// Bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Alert from 'react-bootstrap/Alert';

const recipeUrl = "https://raw.githubusercontent.com/raywenderlich/recipes/master/Recipes.json";

function App() {
    const [recipes, setRecipes] = useState([]);
    const [loadingDone, setLoadingDone] = useState(false);
    const [error, setError] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => {
        fetch(recipeUrl)
            .then(res => res.json())
            .then(
                (result) => {
                    setRecipes(result);
                    setLoadingDone(true);
                },
                (error) => {
                    setError(error);
                    setLoadingDone(true);
                }
            );
    }, []);

    const menuItems = recipes.map((recipe, index) =>
        <MenuItem
            click={() => setSelectedIndex(index)}
            key={index}
            item={recipe}
            id={index}
            selected={index === selectedIndex}/>
    );

    var appContent = <p>Loading...</p>;

    if (error) {
        appContent =
            <Alert variant="danger">
                {error}
            </Alert>;
    }
    else if (loadingDone) {
        appContent =
            <Row>
                <Col xs="3">
                    <ListGroup>
                        {menuItems}
                    </ListGroup>
                </Col>
                <Col>
                    <Recipe data={recipes[selectedIndex]} />
                </Col>
            </Row>
    }

    return (
        <Container className="App my-3">
            {appContent}
        </Container>
    );
}

function MenuItem({id, item, selected, click}) {
    const classes = selected ? "active" : "";
    return (
        <ListGroup.Item className={classes} action onClick={click}>
            {item.name}
        </ListGroup.Item>
    );
}

function Recipe({data}) {
    console.log(data);
    return (
        <div>
            <Row>
                <h2>{data.name}</h2>
            </Row>
            <Row>
                <Col>
                    <img
                        src={data.imageURL}
                        className="rounded mx-auto d-block"
                        alt="Food preview"
                        style={{height: "250px"}} />
                </Col>
            </Row>
            <Row>
                <Col xs="3">
                    <b>Ingredients</b>
                    {data.ingredients.map((i, ix) => <Ingredient key={ix} data={i} />)}
                </Col>
                <Col className="mt-4">
                    <Row>
                        {data.steps.map((s, ix) => <Step key={ix} data={s} id={ix} />)}
                    </Row>
                </Col>
            </Row>
            <Row>
            </Row>
        </div>
    );
}

function Step({id, data}) {
    return (
        <div>
            <span>{id+1}. </span>
            <span>{data}</span>
        </div>
    );
}

function Ingredient({data}) {
    return (
        <div className="mt-2 border-bottom">
            <span>{data.quantity} </span>
            <span>{data.name}</span>
        </div>
    );
}

export default App;
