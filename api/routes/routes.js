import express from 'express';

import questionsController from '../controllers/questionsController';

import answersController from '../controllers/answersController';

const router = express.Router();

router.get('/', (req, res) => {
  const welcome = "<h1>Welcome to the StackOverflow-lite API Version 1.0</h1>  <h2>API Endpoints</h2>  These are the endpoints you can currently access.  <h2>GET /api/v1/questions/</h2>  This retrieves all the questions from the database.  <h2>GET /api/v1/questions/:id/</h2>  This retrieves a particular question by ID from the database.  <h2>POST /api/v1/questions/</h2>  This adds a question to the database.  <h2>POST /api/v1/questions/:id/answers/</h2>  This adds an answer to a question.  <h2>GET /api/v1/questions/:id/answers/</h2>  This retrieves all answers for a question.";
  
  res.status(200).send(welcome);
});

//For questions

router.get('/questions', questionsController.getAllQuestions);

router.get('/questions/:questionId', questionsController.getQuestionById);

router.post('/questions/', questionsController.postQuestion);

//For Answers

router.post('/questions/:questionId/answers', answersController.postAnswer);

router.get('/questions/:questionId/answers', answersController.getAnswers);

//Catch errors

router.all('*', (req, res) => {
  res.status(400).json({ "message": "Command not understood" });
});

export default router;