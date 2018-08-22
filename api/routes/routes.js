import express from 'express';

import questionsController from '../controllers/questionController';

import answersController from '../controllers/answersController';

const router = express.Router();

router.get('/', (req, res) => {
  const welcome = '<h1>Welcome to the stackoverflow-lite API Version 1.0</h1>';

  res.status(200).send(welcome);
});

// For questions

router.get('/questions', questionsController.getAllQuestions);

router.get('/questions/:questionId', questionsController.getQuestionById);

router.post('/questions/', questionsController.postQuestion);

//  For Answers

router.post('/questions/:questionId/answers', answersController.postAnswer);

router.get('/questions/:questionId/answers', answersController.getAnswers);

// Catch errors

router.all('*', (req, res) => {
  res.status(400).json('Command not understood');
});

export default router;
