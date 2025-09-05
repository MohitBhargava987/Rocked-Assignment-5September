**Rocked Test - Node.js Backend - Built with Node.js + Express.js
**

Supports Admin and User APIs

Uses dotenv for environment variables
CORS enabled
Joi for request validation
Centralized error handling

**Setup**
Clone repo - 
git clone https: //github.com/MohitBhargava987/Rocked-Assignment-5September.git - 
cd Rocked_test - 
npm install

**Create .env file**
PORT=3000
DB_USER=root
DB_NAME=rocked_db
DB_HOST=localhost
DB_PASSWORD=''

**Run**
node index.js

Server runs at http: //localhost:3000

**Import DB**
DB has also been pushed name with-> rocked_db.sql

I am also attaching the API Curls along with their purposes.
1. Add or Update the Exam Data

curl --location 'localhost: 3000/api/admin/create_edit_exam' \
--header 'Content-Type: application/json' \
--data '{
    "exam_name": "Science",
    "no_of_questions": 50,
    "no_of_questions_for_exam": 20,
    "passing_percentage": 30,
    "exam_date": "09-05-2025",
    "status": 1,
    "exam_id": 1,
    "questions_arr": [
        {
            "is_multiple": 1,
            "id": 1,
            "question": "What is science",
            "answers_arr": [
                {
                    "option_id": 1,
                    "option_val": "test 1",
                    "is_correct": 1
                },
                {
                    "option_id": 2,
                    "option_val": "test 2",
                    "is_correct": 0
                },
                {
                    "option_id": 3,
                    "option_val": "test 3",
                    "is_correct": 0
                },
                {
                    "option_id": 4,
                    "option_val": "test 4",
                    "is_correct": 0
                }
            ]
        },
        {
            "is_multiple": 1,
            "id": 2,
            "question": "What is Physics",
            "answers_arr": [
                {
                    "option_id": 1,
                    "option_val": "test 1",
                    "is_correct": 0
                },
                {
                    "option_id": 2,
                    "option_val": "test 2",
                    "is_correct": 0
                },
                {
                    "option_id": 3,
                    "option_val": "test 3",
                    "is_correct": 1
                },
                {
                    "option_id": 4,
                    "option_val": "test 4",
                    "is_correct": 0
                }
            ]
        },
        {
            "is_multiple": 0,
            "id": 3,
            "question": "What is Chemistry",
            "answers_arr": [
                {
                    "option_id": 1,
                    "option_val": "test 1",
                    "is_correct": 1
                }
            ]
        }
    ]
}'

2. Fetch the Exam List along with filters
curl --location 'localhost:3000/api/admin/search_exam' \
--header 'Content-Type: application/json' \
--data '{
    "status": 1,
    "order_by": 2
}'

3. Fetch Exam List for the user along with email sent in headers
curl --location 'localhost:3000/api/user/get_exam_data' \
--header 'email: a@gmail.com' \
--header 'Content-Type: application/json' \
--data '{
    "exam_id": 1
}'

4. Add submission to the of the exam with email sent in headers (I have added further validations of the array sent in request as well)
curl --location 'localhost:3000/api/user/submit_exam' \
--header 'email: a@gmail.com' \
--header 'Content-Type: application/json' \
--data '{
    "exam_id": 1,
    "user_answers": [
        {
            "is_multiple": 1,
            "id": 1,
            "question": "What is science",
            "answers_arr": [
                {
                    "option_id": 1,
                    "option_val": "test 1",
                    "is_correct": 0
                },
                {
                    "option_id": 2,
                    "option_val": "test 2",
                    "is_correct": 1
                },
                {
                    "option_id": 3,
                    "option_val": "test 3",
                    "is_correct": 0
                },
                {
                    "option_id": 4,
                    "option_val": "test 4",
                    "is_correct": 0
                }
            ]
        },
        {
            "is_multiple": 1,
            "id": 2,
            "question": "What is Physics",
            "answers_arr": [
                {
                    "option_id": 1,
                    "option_val": "test 1",
                    "is_correct": 0
                },
                {
                    "option_id": 2,
                    "option_val": "test 2",
                    "is_correct": 0
                },
                {
                    "option_id": 3,
                    "option_val": "test 3",
                    "is_correct": 1
                },
                {
                    "option_id": 4,
                    "option_val": "test 4",
                    "is_correct": 0
                }
            ]
        },
        {
            "is_multiple": 0,
            "id": 3,
            "question": "What is Chemistry",
            "answers_arr": [
                {
                    "option_id": 1,
                    "option_val": "test 1",
                    "is_correct": 1
                }
            ]
        }
    ]

}'
