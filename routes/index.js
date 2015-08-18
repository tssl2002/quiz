var express = require('express');
var router = express.Router();
var quizController = require('../controllers/quizController');
var commentController = require('../controllers/commentController');
var sessionController = require('../controllers/sessionController');

router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' , errors : [] });
});

router.param('quizId', quizController.load);
router.param('commentId', commentController.load);

//Rutas de quizController

router.get('/quizes', 							quizController.index);
router.get('/quizes/:quizId(\\d+)', 			quizController.show);
router.get('/quizes/:quizId(\\d+)/answer',		quizController.answer);
router.get('/quizes/new',						sessionController.loggerReq, quizController.new);
router.get('/quizes/:quizId(\\d+)/edit',        sessionController.loggerReq, quizController.edit);
router.post('/quizes/create',					sessionController.loggerReq, quizController.create);
router.put('/quizes/:quizId(\\d+)',             sessionController.loggerReq, quizController.update);
router.get('/author',                           quizController.author);
router.get('/quizes/:quizId(\\d+)/delete',      sessionController.loggerReq, quizController.delete);
router.delete('/quizes/:quizId(\\d+)',			sessionController.loggerReq, quizController.delete);

//Rutas de commentController

router.get('/quizes/:quizId(\\d+)/comments/new',     commentController.new);
router.post('/quizes/:quizId(\\d+)/comments',        commentController.create);
router.get('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish', sessionController.loggerReq,commentController.publish);

//Rutas de Login/Logout

router.get('/login',  sessionController.new);
router.post('/login',  sessionController.create);
router.delete('/logout',  sessionController.destroy);


router.get('/quizes/statistics', quizController.statistic);



module.exports = router;
