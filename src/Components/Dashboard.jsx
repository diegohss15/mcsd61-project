import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';

function CardCreate() {
    return (
        <div>
        <Card style={{ width: '42rem' }}>
            <Card.Header>
            <Nav variant="pills" defaultActiveKey="#first" >
                    <Nav.Item>
                        <Nav.Link href="#first">New</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="#open">Open</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="#unassigned">Unassigned</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="#assignedme">Assigned to me</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="#all">All tickets</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="#link">Link</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="#disabled" disabled>
                            Disabled
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
            </Card.Header>
            <Card.Body>
                <Card.Title>New tickets</Card.Title>
                <Card.Text>
                    Here are the content of new tickets
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
        </Card>
        </div>
    );
}

export default CardCreate;