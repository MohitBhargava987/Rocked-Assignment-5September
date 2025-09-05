const errorHandling = require('../handleErrors/error_handling');
const validators = require('../validations/joi_validator');
const Joi = require('joi');
const dbConnection = require('../config/db_config');

exports.getExamData = async (req, res) => {
    try {
        const schema = Joi.object({
            exam_id: Joi.number().required()
        });
        let isValid = await validators.validateSchema(schema, req, res);

        if (isValid) {
            let search_sql = `SELECT * FROM exam_list WHERE exam_id = ?`;
            let examData = await dbConnection(search_sql, [req.body.exam_id], 1);
            if (examData && examData.length > 0) {
                examData.forEach((elem) => {
                    elem.exam_answres = JSON.parse(elem.exam_answres)
                })
                res.send({
                    is_error: 0,
                    message: 'Exam Data found',
                    data: examData,
                    status: 200
                })
            } else {
                res.send({
                    is_error: 0,
                    message: 'Exam Data Not found',
                    data: examData,
                    status: 200
                })
            }
        }

    } catch (err) {
        console.log(err);
        return errorHandling(err.message, res);
    }
}

exports.submitExam = async (req, res) => {
    try {
        const schema = Joi.object({
            exam_id: Joi.number().required(),
            user_answers: Joi.array().required()
        });
        let isValid = await validators.validateSchema(schema, req, res);
        console.log(isValid, 'isValidisValid');

        if (isValid) {
            let search_sql = `SELECT * FROM exam_list WHERE exam_id = ?`;
            let examData = await dbConnection(search_sql, [req.body.exam_id], 1);
            if (examData && examData.length > 0) {

                let alreadySubmitted = await dbConnection(`SELECT sub_id FROM user_submissions WHERE exam_id = ?  AND user_email LIKE ?`, [req.body.exam_id, req.headers.email]);
                if (alreadySubmitted && alreadySubmitted.length > 0) {
                    return res.send({
                        is_error: 1,
                        status: 400,
                        message: "The user has already submitted this exam"
                    })
                }

                examData[0].exam_answres = JSON.parse(examData[0].exam_answres)

                let temp_arr = [];
                examData[0].exam_answres.forEach((elem) => {
                    temp_arr.push({
                        ques_name: elem.question,
                        total_ans: elem.answers_arr.length
                    })
                });

                let user_answers = req.body.user_answers;
                temp_arr.forEach((elem, index) => {
                    if (!user_answers[index]) {
                        return res.send({
                            is_error: 1,
                            code: 400,
                            message: "Not valid questions submitted for this exam"
                        })
                    }
                    if (elem.ques_name != user_answers[index].question || elem.total_ans != user_answers[index].answers_arr.length) {
                        return res.send({
                            is_error: 1,
                            code: 400,
                            message: "Not valid questions submitted for this exam"
                        })
                    }
                })


                let total_questions = examData[0].exam_answres.length;
                let correct_answers = 0;

                user_answers.forEach((elem, index) => {
                    let ind = elem.answers_arr.findIndex((ele) => ele.is_correct == 1);
                    let true_ind = examData[0].exam_answres[index].answers_arr.findIndex((ele) => ele.is_correct == 1);
                    if (ind == true_ind) {
                        correct_answers++;
                    }
                });

                let percent = (correct_answers / total_questions) * 100;
                let insertData = await dbConnection(`INSERT INTO user_submissions(user_email, exam_id, status) VALUES (?, ?, ?)`, [
                    req.headers.email,
                    req.body.exam_id,
                    Math.floor(percent) < examData[0].passing_percent ? 2 : 1
                ]);
                if (insertData.insertId) {
                    return res.send({
                        is_error: 0,
                        message: "User Exam submitted!!",
                        status: 200
                    })
                } else {
                    return errorHandling("Something went Wrong!!", res);
                }
            } else {
                res.send({
                    is_error: 0,
                    message: 'Exam Data Not found',
                    data: examData,
                    status: 200
                })
            }
        }

    } catch (err) {
        console.log(err);
        return errorHandling(err.message, res);
    }
}