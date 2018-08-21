import db from '../models/database';
import questionsDB from '../models/questionsdb';

const { answersdb } = db;

class Answers {
  static postAnswer(req, res) {
    const {authorId, content, time, upvotes, downvotes } = req.body;

    const questionId = Number(req.params.questionId);

    questionsDB.forEach((question) => {
      if (question.id === questionId) {
        const id = answersdb[answersdb.length - 1].id + 1;
       
        const answer = { 
          id, questionId, authorId, content, time, upvotes, downvotes,
        };

        answersdb.push(answer);
        return res.status(200).json('Answer added successfully');
      }
    });
    return res.status(404).json('Question not found');
  }

  static getAnswers(req, res) {
    const questionId = Number(req.params.questionId);

    const foundAnswers = [];

    answersdb.forEach((answer) => {
      if (Number(answer.questionId) === questionId) {
        foundAnswers.push(answer);
      }
    });
    if (foundAnswers.length > 0) {
      return res.send(
        foundAnswers,
      );
    }

    return res.status(404).json('Answer not found');
  }
}

export default Answers;
