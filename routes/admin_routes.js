const express = require('express');
const routes = express.Router();
const admin = require('../controllers/admin');

routes.post('/create_edit_exam', admin.createEditExam);
routes.post('/search_exam', admin.searchExam);

module.exports = routes;