import { addDoc, collection, serverTimestamp, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

const COMMENTS_COLLECTION = 'comments';

// Function to add a new comment to a ticket
export const addComment = async (ticketId, commentText) => {
  try {
    const commentData = {
      ticketId,
      commentText,
      createdAt: serverTimestamp(),
    };

    const docRef = await addDoc(collection(db, COMMENTS_COLLECTION), commentData);
    console.log('Comment added with ID: ', docRef.id);

    return docRef.id;
  } catch (error) {
    console.error('Error adding comment:', error);
    throw error;
  }
};

// Function to get all comments for a ticket
export const getCommentsForTicket = async (ticketId) => {
  try {
    const q = collection(db, COMMENTS_COLLECTION);
    const querySnapshot = await getDocs(q);
    
    const comments = [];
    querySnapshot.forEach((doc) => {
      const commentData = doc.data();
      if (commentData.ticketId === ticketId) {
        comments.push({ id: doc.id, ...commentData });
      }
    });

    return comments;
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error;
  }
};
