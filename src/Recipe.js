// Bootstrap
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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

export { Recipe, Step, Ingredient };
