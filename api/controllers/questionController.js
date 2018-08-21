import database from '../models/database';

const { questionsdb } = database;

class Questions {
  
  static getAllQuestions(req, res) {
    return res.send(
      questionsdb,
    );
  }
  
  static getQuestionById(req, res) {
    const requestId = Number(req.params.questionId);
    
    questionsdb.forEach((question) => {
      if (question.id === requestId){
          return res.json({
          question,
     });
 };
    return res.status(404).json('Question not found');
  });
}
  static postQuestion(req, res) {
    const { authorId, title, content, date } = req.body;
    
    const id = questionsdb[questionsdb.length - 1].id + 1;
    
    const question = { id, authorId, title, content, date };
    
    questionsDB.push(question);
    
    return res.status(201).json({
      "status": "Question added successfully" 
    });
  }

export default Questions;
