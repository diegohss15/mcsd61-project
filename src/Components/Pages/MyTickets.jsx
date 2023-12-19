import React, { useEffect, useState } from 'react';
import { addDoc, doc, updateDoc, collection, getDocs, query, where, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../../firebase';
import { useParams, useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import AppNavbar from '../Navbar';
import ReactPaginate from 'react-paginate';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MyTickets = () => {
  const { ticketId } = useParams();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);
  const [answer, setAnswer] = useState('');
  const [componentKey, setComponentKey] = useState(0); 
  const navigate = useNavigate();

  const ticketsPerPage = 1;

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      setUser(authUser);

      if (!authUser) {
        navigate('/');
      }
    });

    return () => {
      unsubscribe();
    };
  }, [navigate]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const q = query(
            collection(db, 'tickets'),
            where('createdBy', '==', auth.currentUser?.email),
            where('status', 'in', ['New!', 'In Progress'])
          );
          
        const querySnapshot = await getDocs(q);
  
        const ticketData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  
        const answerPromises = ticketData.map(async (ticket) => {
          const answerQuery = query(collection(db, 'ticketanswers'), where('ticketId', '==', ticket.id));
          const answerSnapshot = await getDocs(answerQuery);
          const answerData = answerSnapshot.docs.map((doc) => doc.data());
          const answer = answerData.length > 0 ? answerData : [{ answer: 'Ticket not started' }];
  
          return { ...ticket, TicketAnswer: answer };
        });
  
        const ticketsWithAnswers = await Promise.all(answerPromises);
        setTickets(ticketsWithAnswers);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchTickets();
  }, [componentKey]);
  

  const handleAnswerChange = (event) => {
    setAnswer(event.target.value);
  };

  const handleSendAnswer = async () => {
    try {
      if (!answer) {
        console.error('Answer cannot be empty');
        return;
      }

      const { displayName, email } = auth.currentUser;
      const timestamp = serverTimestamp();

      const docRef = await addDoc(collection(db, 'ticketanswers'), {
        ticketId: tickets[pageNumber].id,
        answer,
        timestamp,
        user: {
          name: displayName,
          email,
        },
      });

      console.log('Answer sent successfully. Document ID:', docRef.id);

      toast.success('Updated Success!', { position: 'top-right' });

      setAnswer('');

      setComponentKey((prevKey) => prevKey + 1);
    } catch (error) {
      console.error('Error sending answer:', error);

      toast.error('Error updating answer!', { position: 'top-right' });
    }
  };

  const handleCloseTicket = async () => {
    try {
      if (!tickets[pageNumber]) {
        console.error('Ticket not found');
        return;
      }

      const ticketId = tickets[pageNumber].id;

      // Check if the ticket is already closed
      if (tickets[pageNumber].status === 'Closed') {
        console.warn('Ticket is already closed');
        return;
      }

      // Update ticket status to 'Closed'
      const ticketRef = doc(db, 'tickets', ticketId);
      await updateDoc(ticketRef, {
        status: 'Closed',
      });

      // Update the state to closed status
      setTickets((prevTickets) =>
        prevTickets.map((ticket, index) =>
          index === pageNumber ? { ...ticket, status: 'Closed' } : ticket
        )
      );

      console.log('Ticket closed successfully.');
      toast.success('Ticket closed successfully!', { position: 'top-right' });
    } catch (error) {
      console.error('Error closing ticket:', error);
      toast.error('Error closing ticket!', { position: 'top-right' });
    }
  };

  const pageCount = Math.ceil(tickets.length / ticketsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  if (!user) {
    return null;
  }

  return (
    <div key={componentKey}> 
      <AppNavbar />
      <Container className="mt-4 d-flex justify-content-center">
        <div className="cards">
          {tickets.length > 0 && (
            <>
              {tickets
                .slice(pageNumber * ticketsPerPage, (pageNumber + 1) * ticketsPerPage)
                .map((ticket) => (
                  <div key={ticket.id}>
                    {/* Ticket Details Card */}
                    <Card className="custom-card" style={{ width: '42rem' }}>
                      <Card.Header>
                        <Card.Title>Ticket Details</Card.Title>
                      </Card.Header>
                      <Card.Body>
                        <Card.Text>
                          <strong>Title:</strong> {ticket.title}
                          <br />
                          <strong>Category:</strong> {ticket.category}
                          <br />
                          <strong>Priority:</strong> {ticket.priority}
                          <br />
                          <strong>Description:</strong> {ticket.description}
                          <br />
                          <strong>Assigned To:</strong> {ticket.assignTo}
                          <br/>
                          <strong>Status:</strong> {ticket.status}
                        </Card.Text>
                      </Card.Body>
                    </Card>

                    {/* Ticket Answer Cards */}
                    {Array.isArray(ticket.TicketAnswer) ? (
                      ticket.TicketAnswer
                        .filter(answer => answer.timestamp)
                        .sort((a, b) => a.timestamp - b.timestamp)
                        .map((answer, index) => (
                          <Card key={index} className="custom-card" style={{ width: '42rem', marginTop: '20px' }}>
                            <Card.Header>
                              <Card.Title>Answer {index + 1} - {answer.timestamp ? new Date(answer.timestamp.seconds * 1000).toLocaleString() : 'N/A'}</Card.Title>
                            </Card.Header>
                            <Card.Body>
                              <Card.Text>
                                <p>{answer.answer}</p>
                              </Card.Text>
                              <small className="text-muted">Answered by: {answer.user?.email || 'N/A'}</small>
                            </Card.Body>
                          </Card>
                        ))
                    ) : (
                      <Card className="custom-card" style={{ width: '42rem', marginTop: '20px' }}>
                        <Card.Header>
                          <Card.Title>Answer - {ticket.TicketAnswer.timestamp ? new Date(ticket.TicketAnswer.timestamp.seconds * 1000).toLocaleString() : 'N/A'}</Card.Title>
                        </Card.Header>
                        <Card.Body>
                          <Card.Text>
                            <p>{ticket.TicketAnswer.answer}</p>
                          </Card.Text>
                          <small className="text-muted">Created by: {ticket.TicketAnswer.user?.email || 'N/A'}</small>
                        </Card.Body>
                      </Card>
                    )}

                    {/* Answer Form */}
                    <form className="mt-3">
                      <div className="form-group">
                        <label htmlFor="answer">New Answer:</label>
                        <textarea
                          className="form-control"
                          id="answer"
                          rows="3"
                          value={answer}
                          onChange={handleAnswerChange}
                          disabled={ticket.status === 'Closed'} // Disable textarea if status is Closed
                        ></textarea>
                      </div>
                      <button
                        type="button"
                        className="btn btn-primary mr-2"
                        onClick={handleSendAnswer}
                        disabled={ticket.status === 'Closed'} // Disable button if status is Closed
                      >
                        Send Answer
                      </button>
                      <button
                        type="button"
                        className={`btn ${ticket.status === 'Closed' ? 'btn-secondary' : 'btn-danger'}`}
                        onClick={handleCloseTicket}
                      >
                        {ticket.status === 'Closed' ? 'Ticket Closed' : 'Close Ticket'}
                      </button>
                    </form>

                    <br />
                  </div>
                ))}
              {pageCount > 1 && (
                <ReactPaginate
                  previousLabel={<button className="btn-pagination">Previous</button>}
                  nextLabel={<button className="btn-pagination">Next</button>}
                  pageCount={pageCount}
                  onPageChange={changePage}
                  containerClassName={'pagination justify-content-center'}
                  previousLinkClassName={'page-link'}
                  nextLinkClassName={'page-link'}
                  disabledClassName={'disabled'}
                  activeClassName={'active'}
                />
              )}
            </>
          )}

          {!loading && tickets.length === 0 && (
            <Card className="custom-card" style={{ width: '42rem' }}>
              <Card.Body>
                <Card.Text>No tickets created by you.</Card.Text>
              </Card.Body>
            </Card>
          )}
        </div>
      </Container>

      <ToastContainer />
    </div>
  );
};

export default MyTickets;
