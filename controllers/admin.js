const errorHandling = require('../handleErrors/error_handling');
const validators = require('../validations/joi_validator');
const Joi = require('joi');
const dbConnection = require('../config/db_config');

exports.createEditExam = async (req, res) => {
    try {
        const schema = Joi.object({
            exam_name: Joi.string().required(),
            exam_id: Joi.number(),
            no_of_questions: Joi.number().required(),
            no_of_questions_for_exam: Joi.number().required(),
            passing_percentage: Joi.number().required(),
            status: Joi.number().required().valid(1, 2),
            exam_date: Joi.date().required(),
            questions_arr: Joi.array().required()
        });

        let isValid = await validators.validateSchema(schema, req, res);
        console.log(isValid, ' isValid ');

        if (isValid) {
            req.body.questions_arr.forEach((elem) => {
                let correct_ans = 0;
                elem.answers_arr.forEach((ele) => {
                    if (ele.is_correct) {
                        correct_ans++;
                    }
                });
                if (correct_ans == 0 || correct_ans > 1) {
                    return errorHandling("The Questions Array is not Valid!", res);
                }
                correct_ans = 0;
                // }
            });

            let questions_arr = JSON.stringify(req.body.questions_arr);

            if (req.body.exam_id) {
                let examData = await dbConnection(`SELECT exam_id FROM exam_list WHERE exam_id = ?`, [req.body.exam_id], 1);
                if (examData && examData.length > 0) {
                    let updateExam = await dbConnection(`UPDATE exam_list SET exam_name = ?, no_of_questions = ? ,exam_questions= ?, passing_percentage= ? ,exam_answres=?,status= ? ,exam_date = ? WHERE exam_id = ?`, [
                        req.body.exam_name,
                        req.body.no_of_questions,
                        req.body.no_of_questions_for_exam,
                        req.body.passing_percentage,
                        questions_arr,
                        req.body.status,
                        new Date(req.body.exam_date),
                        req.body.exam_id
                    ]);

                    if (updateExam.affectedRows > 0) {
                        return res.send({
                            is_error: 0,
                            message: "The Exam questions are Updated",
                            status: 200
                        })
                    } else {
                        return errorHandling("Something went Wrong!!", res);
                    }
                } else {
                    return errorHandling("Exam data not found!", res);
                }
            } else {
                let insert_exam = `INSERT INTO exam_list(exam_name, no_of_questions, exam_questions, passing_percentage, exam_answres, status, exam_date) VALUES (?, ?, ?, ?, ?, ?, ?)`;
                let dataInserted = await dbConnection(insert_exam, [
                    req.body.exam_name,
                    req.body.no_of_questions,
                    req.body.no_of_questions_for_exam,
                    req.body.passing_percentage,
                    questions_arr,
                    req.body.status,
                    new Date(req.body.exam_date)
                ], 1);
                if (dataInserted.insertId) {
                    return res.send({
                        is_error: 0,
                        message: "The Exam questions are added",
                        status: 200
                    })
                } else {
                    return errorHandling("Something went Wrong!!", res);
                }
            }
        }

    } catch (err) {
        return errorHandling(err.message, res);
    }
}

exports.searchExam = async (req, res) => {
    try {
        const schema = Joi.object({
            exam_name: Joi.string(),
            no_of_questions: Joi.number(),
            passing_percentage: Joi.number(),
            status: Joi.number().valid(1, 2),
            order_by: Joi.number()
        });

        let isValid = await validators.validateSchema(schema, req, res);
        console.log(isValid, ' isValid ');
        if (isValid) {
            let extra_query = ``;
            let search_arr = []
            if (req && req.body && req.body.status) {
                extra_query += ` AND status = ?`;
                search_arr.push(req.body.status);
            }
            if (req && req.body && req.body.exam_name) {
                extra_query += ` AND exam_name = ?`;
                search_arr.push(req.body.exam_name);
            }
            if (req && req.body && req.body.order_by) {
                extra_query += ` ORDER BY ${req.body.order_by == 1 ? 'exam_name' : 'no_of_questions'}`
            }
            let search_sql = `SELECT * FROM exam_list WHERE 1 ${extra_query}`;
            let examList = await dbConnection(search_sql, search_arr, 1);
            if (examList && examList.length > 0) {
                examList.forEach((elem) => {
                    elem.exam_answres = JSON.parse(elem.exam_answres)
                })
                res.send({
                    is_error: 0,
                    message: 'Exam List found',
                    data: examList,
                    status: 200
                })
            } else {
                res.send({
                    is_error: 0,
                    message: 'Exam List Not found',
                    data: examList,
                    status: 200
                })
            }
        }
    } catch (err) {
        console.log(err);
        return errorHandling(err.message, res);
    }
}