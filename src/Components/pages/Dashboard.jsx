import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import Table from 'react-bootstrap/Table';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

function CardCreate() {
    return (
        <div className='cards' style={{
            width: '70%',
            margin: '15%', // Center horizontally
            minHeight: '0vh', // 50% of the viewport height
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            display: 'inline-block'
        }}>
            <p>This is the main page, dashboard where user can access the relevant info about tickets</p>

            <Tabs
                defaultActiveKey="profile"
                id="justify-tab-example"
                className="mb-3"
                justify
            >
                <Tab eventKey="home" title="Open">
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Title</th>
                                <th>Category</th>
                                <th>Priority</th>
                                <th>Created by:</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Mark</td>
                                <td>IT</td>
                                <td>Normal</td>
                                <td>Username</td>
                                <td><Button>Takeover</Button></td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Jacob</td>
                                <td>HR</td>
                                <td>High</td>
                                <td>Username 2</td>
                                <td><Button>Takeover</Button></td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>Larry the Bird</td>
                                <td>Marketing</td>
                                <td>Critical</td>
                                <td>Username 3</td>
                                <td><Button>Takeover</Button></td>

                            </tr>
                        </tbody>
                    </Table>
                </Tab>
                <Tab eventKey="profile" title="Assigned to me">
                <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Title</th>
                                <th>Category</th>
                                <th>Priority</th>
                                <th>Created by:</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Mark</td>
                                <td>IT</td>
                                <td>Normal</td>
                                <td>Username</td>
                                <td><Button>Takeover</Button></td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Jacob</td>
                                <td>HR</td>
                                <td>High</td>
                                <td>Username 2</td>
                                <td><Button>Takeover</Button></td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>Larry the Bird</td>
                                <td>Marketing</td>
                                <td>Critical</td>
                                <td>Username 3</td>
                                <td><Button>Takeover</Button></td>

                            </tr>
                        </tbody>
                    </Table>
                </Tab>
                <Tab eventKey="longer-tab" title="All tickets">
                <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Title</th>
                                <th>Category</th>
                                <th>Priority</th>
                                <th>Created by:</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Mark</td>
                                <td>IT</td>
                                <td>Normal</td>
                                <td>Username</td>
                                <td><Button>Takeover</Button></td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Jacob</td>
                                <td>HR</td>
                                <td>High</td>
                                <td>Username 2</td>
                                <td><Button>Takeover</Button></td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>Larry the Bird</td>
                                <td>Marketing</td>
                                <td>Critical</td>
                                <td>Username 3</td>
                                <td><Button>Takeover</Button></td>

                            </tr>
                        </tbody>
                    </Table>
                </Tab>
            </Tabs>

        </div>
    );
}

export default CardCreate;