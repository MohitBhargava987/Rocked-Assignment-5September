const express = require('express');
const routes = express.Router();
const users = require('../controllers/users');
const authHeader = require('../middleware/auth');

routes.post('/get_exam_data', authHeader, users.getExamData);
routes.post('/submit_exam', authHeader, users.submitExam);

module.exports = routes;