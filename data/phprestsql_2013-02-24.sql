-- phpMyAdmin SQL Dump
-- version 3.2.4
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Feb 24, 2013 at 12:28 PM
-- Server version: 5.1.44
-- PHP Version: 5.3.1

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `phprestsql`
--

-- --------------------------------------------------------

--
-- Table structure for table `project`
--

CREATE TABLE IF NOT EXISTS `project` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` text CHARACTER SET latin1 NOT NULL,
  `description` text CHARACTER SET latin1 NOT NULL,
  `picture` text CHARACTER SET latin1 NOT NULL,
  `owner_id` bigint(11) NOT NULL,
  `funding` int(11) NOT NULL,
  `tstamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `owner_id` (`owner_id`),
  KEY `owner_id_2` (`owner_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `project`
--

INSERT INTO `project` (`id`, `title`, `description`, `picture`, `owner_id`, `funding`, `tstamp`) VALUES
(0, 'Art fair', 'support creativity by helping us organize the next coming art fair at Al Saadiat island ! ', 'http://distilleryimage8.s3.amazonaws.com/25caa47c1c8a11e2b3ea12313813ffc5_7.jpg', 1, 500, '2013-02-23 15:34:04'),
(1, 'House maintenance ', 'A House of a small family at Abu Dhabi Sheikh Zayed street in need for maintenance. Join us on this humanitarian mission', 'http://distilleryimage9.s3.amazonaws.com/ae96dcd89aff11e180c9123138016265_6.jpg', 1, 300, '2013-02-23 15:34:04'),
(2, 'Construction site', 'Labor forces needed at Massafeh district for building new factory building', 'http://distilleryimage0.s3.amazonaws.com/bc13c1a6f8dc11e19b6b22000a1e9e0a_6.jpg', 2, 1460, '2013-02-23 15:34:04'),
(3, 'School yard cleaning', 'help make our school green! Join community good people to clean the english school yard at Abu Dhabi', 'http://distilleryimage0.s3.amazonaws.com/ba34c7be483611e297b922000a1fa527_7.jpg', 4, 45, '2013-02-24 16:28:33');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `project`
--
ALTER TABLE `project`
  ADD CONSTRAINT `project_ibfk_1` FOREIGN KEY (`owner_id`) REFERENCES `user` (`id`) ON DELETE CASCADE;
