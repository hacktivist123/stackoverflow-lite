import chai from 'chai';

import chaiHttp from 'chai-http';

import app from '../app';

import questionsdb from '../models/questionsdb';

import answersdb from '../models/answersdb';

const should = chai.should();

chai.use(chaiHttp);

describe('GET /api/v1', () => {
  it('it should return a status of 200', (done) => {
    chai.request(app)
      .get('/api/v1')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});

//= ============ Questions ===================================

describe('GET /api/v1/questions', () => {
  it('it should return a response of 200', (done) => {
    chai.request(app)
      .get('/api/v1/questions')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('it should return an array', (done) => {
    chai.request(app)
      .get('/api/v1/questions')
      .end((err, res) => {
        res.body.should.be.an('array');
        done();
      });
  });
});

describe('GET /api/v1/questions/:questionId', () => {
  it('it should return a response of 200 when question is found', (done) => {
    chai.request(app)
      .get('/api/v1/questions/1')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('it should return an object', (done) => {
    chai.request(app)
      .get('/api/v1/questions/1')
      .end((err, res) => {
        res.body.should.be.an('object');
        done();
      });
  });

  it('question.id should match req.params.id', (done) => {
    chai.request(app)
      .get('/api/v1/questions/1')
      .end((err, res) => {
        const response = res.body.question;
        res.body.should.be.an('object');
        response.should.have.property('id').eql(1);
        done();
      });
  });

  it('it should return a response of 404 when question is not found', (done) => {
    chai.request(app)
      .get('/api/v1/questions/100')
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
});

describe('POST /api/v1/questions', () => {
  const question = {
    id: 4,
    authorId: 1,
    title: 'Question 4',
    content: 'This is a sample question.',
    date: '1-08-2018',
    upvotes: 0,
    downvote: 0,
  };

  it('it should return a response of 201', (done) => {
    chai.request(app)
      .post('/api/v1/questions/')
      .send(question)
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });

  it('it should return a confirmation message', (done) => {
    chai.request(app)
      .post('/api/v1/questions/')
      .send(question)
      .end((err, res) => {
        res.body.should.have.property('status').eql('Question added successfully');
        done();
      });
  });
});

//= ============ Answers ============

describe('GET /api/v1/questions/:questionId/answers', () => {
  it('it should return an array', (done) => {
    chai.request(app)
      .get('/api/v1/questions/1/answers')
      .end((err, res) => {
        res.body.should.be.an('array');
        done();
      });
  });

  it('it should return a response of 404 when answer is not found', (done) => {
    chai.request(app)
      .get('/api/v1/questions/10/answers')
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
});

describe('POST /api/v1/questions/:questionId/answers', () => {
  const answer = {
    id: 1,
    questionId: 1,
    authorId: 1,
    content: 'This is a sample answer.',
    date: '1-08-2018',
    upvotes: 0,
    downvotes: 0,
    accepted: true,
  };

  it('it should return a response of 201 when answer is added successfully', (done) => {
    chai.request(app)
      .post('/api/v1/questions/1/answers')
      .send(answer)
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });

  it('it should return a confirmation message', (done) => {
    chai.request(app)
      .post('/api/v1/questions/1/answers')
      .send(answer)
      .end((err, res) => {
        res.body.should.have.property('status').eql('Answer added successfully');
        done();
      });
  });

  it('it should return a response of 404 when unable to add answer', (done) => {
    chai.request(app)
      .post('/api/v1/questions/10/answers')
      .send(answer)
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
});

describe('Catch all /api/v1', () => {
  it('it should display an error for any unrecognized endpoints to the api/v1 route', (done) => {
    chai.request(app)
      .get('/api/v1/err')
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('message').eql('Command not understood');
        done();
      });
  });
});

describe('Catch all /', () => {
  it('it should return a status of 200', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('it should display an error for any unrecognized endpoints', (done) => {
    chai.request(app)
      .get('/err')
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('message').eql('Request not understood');
        done();
      });
  });
});
