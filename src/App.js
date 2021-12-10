// React
import { useState, useEffect } from 'react';

// Bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Alert from 'react-bootstrap/Alert';

// Project code
import { Recipe } from './Recipe'

const recipeUrl = "https://raw.githubusercontent.com/raywenderlich/recipes/master/Recipes.json";

function App() {
    const [recipes, setRecipes] = useState([]);
    const [loadingDone, setLoadingDone] = useState(false);
    const [error, setError] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(0);

    function handleException(error) {
        console.log(error);
        setError(error);
        setLoadingDone(true);
    }

    useEffect(() => {
        fetch(recipeUrl)
            .then(res => {
                console.log(res);
                if(res.status === 200) {
                    return res.json()
                }
                throw new Error("Fetch error " + res.status + ": " + res.text());
            }, handleException)
            .then(
                (result) => {
                    setRecipes(result);
                    setLoadingDone(true);
                }, handleException);
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
                {recipeUrl}
                <br/>
                {error.message}
                <br/>
                {error.stack}
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

export default App;
