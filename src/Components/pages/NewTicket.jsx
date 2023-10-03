import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';

function NewTicket() {
    return (
    /** CSS from div - adding CSS style here make the code use this as a priority **/
        <div className='cards' style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
    {/** End of CSS from div **/}
            <Card className='custom-card' style={{ width: '42rem' }}>
                <Card.Header>
                    <Nav variant="pills" defaultActiveKey="#first" >
                        <Nav.Item>
                        <Link to="/" className="nav-link"> <Button variant="primary">Go back</Button></Link>
                        </Nav.Item>
                    </Nav>
                </Card.Header>
                <Card.Body>
                    <Card.Title>Create your task:</Card.Title>
                    <br />

                    <div style={{ display: 'flex', alignItems: 'center' }}>

                        <Form.Select aria-label="Default select example" required>
                            <option>Category</option>
                            <option value="1">IT</option>
                            <option value="2">Marketing</option>
                            <option value="3">HR</option>
                        </Form.Select>
                        &nbsp;&nbsp;&nbsp;
                        <Form.Select aria-label="Default select example">
                            <option>Priority</option>
                            <option value="1">Normal</option>
                            <option value="2">High</option>
                            <option value="3">Critical</option>
                        </Form.Select>

                    </div>
                    <Card.Text>
                        <br />
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="text" placeholder="Enter task title" required />

                            </Form.Group>

                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Describe your issue: </Form.Label>
                                <Form.Control as="textarea" rows={3} required />

                            </Form.Group>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Form.Select aria-label="Default select example">
                                    <option>Assign to:</option>
                                    <option value="1">User 1</option>
                                    <option value="2">User 2</option>
                                    <option value="3">User 3</option>
                                </Form.Select>

                            </div>
                            <br />
                            <>
                                <Form.Group controlId="formFileMultiple" className="mb-3">
                                    <Form.Label>Attachment</Form.Label>
                                    <Form.Control type="file" multiple />
                                </Form.Group>
                            </>
                            <Form.Group className="mb-3">
                                <Form.Text className="text-muted">
                                    <br />
                                    1 - We aim to solve all tickets in 24-hours.<br />
                                    2 - Ticket assignment doesn't always speed things up; it can actually slow them down. <br />
                                    3 - Critical Priority is limited! If you have no permission, request it from your supervisor.
                                </Form.Text>
                            </Form.Group>
                            <Button type="submit" variant="success"> Create Ticket </Button> &nbsp;&nbsp;&nbsp;
                            <Button variant="outline-danger"> Cancel </Button>
                        </Form>

                    </Card.Text>

                </Card.Body>
            </Card>

        </div>
    )
}

export default NewTicket;
