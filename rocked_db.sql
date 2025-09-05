-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 05, 2025 at 02:31 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `rocked_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `exam_list`
--

CREATE TABLE `exam_list` (
  `exam_id` int(11) NOT NULL,
  `exam_name` varchar(255) NOT NULL,
  `no_of_questions` int(11) NOT NULL DEFAULT 0,
  `exam_questions` int(11) NOT NULL DEFAULT 0,
  `passing_percentage` int(11) NOT NULL DEFAULT 0,
  `exam_answres` mediumtext DEFAULT NULL,
  `status` int(11) NOT NULL COMMENT '1- Draft, 2- Published',
  `exam_date` datetime DEFAULT NULL,
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `exam_list`
--

INSERT INTO `exam_list` (`exam_id`, `exam_name`, `no_of_questions`, `exam_questions`, `passing_percentage`, `exam_answres`, `status`, `exam_date`, `updated_at`) VALUES
(1, 'Science', 70, 20, 40, '[{\"is_multiple\":1,\"id\":1,\"question\":\"What is science\",\"answers_arr\":[{\"option_id\":1,\"option_val\":\"test 1\",\"is_correct\":1},{\"option_id\":2,\"option_val\":\"test 2\",\"is_correct\":0},{\"option_id\":3,\"option_val\":\"test 3\",\"is_correct\":0},{\"option_id\":4,\"option_val\":\"test 4\",\"is_correct\":0}]},{\"is_multiple\":1,\"id\":2,\"question\":\"What is Physics\",\"answers_arr\":[{\"option_id\":1,\"option_val\":\"test 1\",\"is_correct\":0},{\"option_id\":2,\"option_val\":\"test 2\",\"is_correct\":0},{\"option_id\":3,\"option_val\":\"test 3\",\"is_correct\":1},{\"option_id\":4,\"option_val\":\"test 4\",\"is_correct\":0}]},{\"is_multiple\":0,\"id\":3,\"question\":\"What is Chemistry\",\"answers_arr\":[{\"option_id\":1,\"option_val\":\"test 1\",\"is_correct\":1}]}]', 1, '2025-09-05 00:00:00', '2025-09-05 17:35:51'),
(2, 'Maths', 50, 20, 30, '[{\"is_multiple\":1,\"id\":1,\"question\":\"What is science\",\"answers_arr\":[{\"option_id\":1,\"option_val\":\"test 1\",\"is_correct\":1},{\"option_id\":2,\"option_val\":\"test 2\",\"is_correct\":0},{\"option_id\":3,\"option_val\":\"test 3\",\"is_correct\":0},{\"option_id\":4,\"option_val\":\"test 4\",\"is_correct\":0}]},{\"is_multiple\":1,\"id\":2,\"question\":\"What is Physics\",\"answers_arr\":[{\"option_id\":1,\"option_val\":\"test 1\",\"is_correct\":0},{\"option_id\":2,\"option_val\":\"test 2\",\"is_correct\":0},{\"option_id\":3,\"option_val\":\"test 3\",\"is_correct\":1},{\"option_id\":4,\"option_val\":\"test 4\",\"is_correct\":0}]},{\"is_multiple\":0,\"id\":3,\"question\":\"What is Chemistry\",\"answers_arr\":[{\"option_id\":1,\"option_val\":\"test 1\",\"is_correct\":1}]}]', 1, '2025-09-05 00:00:00', '2025-09-05 17:03:20'),
(3, 'Social', 40, 20, 30, '[{\"is_multiple\":1,\"id\":1,\"question\":\"What is science\",\"answers_arr\":[{\"option_id\":1,\"option_val\":\"test 1\",\"is_correct\":1},{\"option_id\":2,\"option_val\":\"test 2\",\"is_correct\":0},{\"option_id\":3,\"option_val\":\"test 3\",\"is_correct\":0},{\"option_id\":4,\"option_val\":\"test 4\",\"is_correct\":0}]},{\"is_multiple\":1,\"id\":2,\"question\":\"What is Physics\",\"answers_arr\":[{\"option_id\":1,\"option_val\":\"test 1\",\"is_correct\":0},{\"option_id\":2,\"option_val\":\"test 2\",\"is_correct\":0},{\"option_id\":3,\"option_val\":\"test 3\",\"is_correct\":1},{\"option_id\":4,\"option_val\":\"test 4\",\"is_correct\":0}]},{\"is_multiple\":0,\"id\":3,\"question\":\"What is Chemistry\",\"answers_arr\":[{\"option_id\":1,\"option_val\":\"test 1\",\"is_correct\":1}]}]', 1, '2025-09-05 00:00:00', '2025-09-05 17:04:28');

-- --------------------------------------------------------

--
-- Table structure for table `user_submissions`
--

CREATE TABLE `user_submissions` (
  `sub_id` int(11) NOT NULL,
  `user_email` varchar(255) DEFAULT NULL,
  `exam_id` int(11) NOT NULL,
  `status` int(11) NOT NULL COMMENT '1- Passed, 2- Failed',
  `date_added` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_submissions`
--

INSERT INTO `user_submissions` (`sub_id`, `user_email`, `exam_id`, `status`, `date_added`) VALUES
(18, 'a@gmail.com', 1, 1, '2025-09-05 17:53:04');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `exam_list`
--
ALTER TABLE `exam_list`
  ADD PRIMARY KEY (`exam_id`),
  ADD KEY `status` (`status`);

--
-- Indexes for table `user_submissions`
--
ALTER TABLE `user_submissions`
  ADD PRIMARY KEY (`sub_id`),
  ADD KEY `exam_id` (`exam_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `exam_list`
--
ALTER TABLE `exam_list`
  MODIFY `exam_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `user_submissions`
--
ALTER TABLE `user_submissions`
  MODIFY `sub_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `user_submissions`
--
ALTER TABLE `user_submissions`
  ADD CONSTRAINT `user_submissions_ibfk_1` FOREIGN KEY (`exam_id`) REFERENCES `exam_list` (`exam_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
