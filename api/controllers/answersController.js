import db from '../models/database';
import questionsDB from '../models/questionsdb';

const { answersDB } = db;

class Answers {
  
  static postAnswer(req, res) {
    const {
      authorId, content, date, upvotes, downvotes 
    } = req.body;

    const questionId = Number(req.params.questionId);
    
    questionsDB.forEach((question) => {
      if (question.id === questionId) {
        const id = answersDB[answersDB.length - 1].id + 1;
        const answer = {
          id, questionId, authorId, content, date, upvotes, downvotes 
        };
        answersDB.push(answer);
        return res.status(201).json({ status: 'Answer added successfully' });
      }
    });
    
    return res.status(404).json({ status: 'Question not found' });
  }
  
  static getAnswers(req, res) {
    const questionId = Number(req.params.questionId);
    
    const foundAnswers = [];
    
    answersDB.forEach((answer) => {
      if (Number(answer.questionId) === questionId) {
        foundAnswers.push(answer);
      }
    });
    
    if (foundAnswers.length > 0) {
      return res.send(
        foundAnswers
      );
    }
    
    return res.status(404).json({
      message: 'Answer not found'
    });
  }
}

export default Answers;