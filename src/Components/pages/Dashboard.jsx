import { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ReactPaginate from 'react-paginate';

 {/* Query from Firebase, collect up to 10 items per page */}

function CardCreate() {
    const [tasks, setTasks] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const tasksPerPage = 10;

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'tickets'));
                const taskData = [];
                querySnapshot.forEach((doc) => {
                    taskData.push({ id: doc.id, ...doc.data() });
                });
                setTasks(taskData);
            } catch (error) {
                console.error('Error fetching tasks: ', error);
            }
        };

        fetchTasks();
    }, []);

    const pagesVisited = pageNumber * tasksPerPage;
    const displayedTasks = tasks.slice(
        pagesVisited,
        pagesVisited + tasksPerPage
    );

    const pageCount = Math.ceil(tasks.length / tasksPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

     {/* End of Query from Firebase */}


    return (
        <div className="cards" style={{ width: '70%', margin: '15%', minHeight: '0vh', display: 'flex', alignItems: 'center', justifyContent: 'center', display: 'inline-block' }}>
            <Tabs defaultActiveKey="home" id="justify-tab-example" className="mb-3" justify>
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
                            {displayedTasks.map((task, index) => (
                                <tr key={task.id}>
                                    <td>{index + 1}</td>
                                    <td>{task.title}</td>
                                    <td>{task.category}</td>
                                    <td>{task.priority}</td>
                                    <td>{task.createdBy}</td>
                                    <td><Button>Takeover</Button></td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    {/* React Pages */}

                    <ReactPaginate
                        previousLabel={
                            <Button variant="outline-secondary" style={{ marginRight: '5px' }} className="btn-pagination">
                                Previous
                            </Button>
                        }
                        nextLabel={
                            <Button variant="outline-secondary" style={{ marginLeft: '5px' }} className="btn-pagination">
                                Next
                            </Button>
                        }
                        pageCount={pageCount}
                        onPageChange={changePage}
                        containerClassName={'pagination'}
                        previousLinkClassName={'previous'}
                        nextLinkClassName={'next'}
                        disabledClassName={'disabled'}
                        activeClassName={'active'}
                        pageClassName={'page-item'}
                        pageLinkClassName={'page-link'}
                        marginPagesDisplayed={1}
                        pageRangeDisplayed={2}
                        subContainerClassName={'pages pagination'}
                    />
                    {/* React Pages */}

                </Tab>

                <Tab eventKey="assigned" title="Assigned to me">
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
                            {/* Area designed for tasks assigned to the user (Login system must work first) */}
                        </tbody>
                    </Table>
                </Tab>
                <Tab eventKey="all" title="All tickets">
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
                            {/* Display all available tasks */}
                        </tbody>
                    </Table>
                </Tab>
            </Tabs>
        </div>
    );
}

export default CardCreate;
