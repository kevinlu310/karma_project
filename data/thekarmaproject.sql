-- phpMyAdmin SQL Dump
-- version 3.5.2.2
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Feb 23, 2013 at 09:17 AM
-- Server version: 5.5.27
-- PHP Version: 5.4.7

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `thekarmaproject`
--

-- --------------------------------------------------------

--
-- Table structure for table `project`
--

CREATE TABLE IF NOT EXISTS `project` (
  `ID` int(11) NOT NULL,
  `Title` text CHARACTER SET latin1 NOT NULL,
  `Description` text CHARACTER SET latin1 NOT NULL,
  `Picture` text CHARACTER SET latin1 NOT NULL,
  `Owner ID` int(11) NOT NULL,
  `Funding` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `Owner ID` (`Owner ID`),
  KEY `Owner ID_2` (`Owner ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `project`
--

INSERT INTO `project` (`ID`, `Title`, `Description`, `Picture`, `Owner ID`, `Funding`) VALUES
(0, 'Art fair', 'support creativity by helping us organize the next coming art fair at Al Saadiat island ! ', 'http://distilleryimage8.s3.amazonaws.com/25caa47c1c8a11e2b3ea12313813ffc5_7.jpg', 1, 500),
(1, 'House maintenance ', 'A House of a small family at Abu Dhabi Sheikh Zayed street in need for maintenance. Join us on this humanitarian mission', 'http://distilleryimage9.s3.amazonaws.com/ae96dcd89aff11e180c9123138016265_6.jpg', 1, 300),
(2, 'Construction site', 'Labor forces needed at Massafeh district for building new factory building', 'http://distilleryimage0.s3.amazonaws.com/bc13c1a6f8dc11e19b6b22000a1e9e0a_6.jpg', 2, 1460),
(3, 'School yard clearning', 'help make our school green! join community good people to clean the english school yard at Abu Dhabi', 'http://distilleryimage0.s3.amazonaws.com/ba34c7be483611e297b922000a1fa527_7.jpg', 4, 45);

-- --------------------------------------------------------

--
-- Table structure for table `projectcomments`
--

CREATE TABLE IF NOT EXISTS `projectcomments` (
  `Project ID` int(11) NOT NULL,
  `User ID` int(11) NOT NULL,
  `Comment` text NOT NULL,
  PRIMARY KEY (`Project ID`,`User ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `projectcomments`
--

INSERT INTO `projectcomments` (`Project ID`, `User ID`, `Comment`) VALUES
(1, 1, 'Count me in !'),
(1, 3, 'The project seems pretty interesting. Can I donate my brushes ?');

-- --------------------------------------------------------

--
-- Table structure for table `project_task_user`
--

CREATE TABLE IF NOT EXISTS `project_task_user` (
  `ID` int(11) NOT NULL,
  `Project ID` int(11) NOT NULL,
  `Task ID` int(11) NOT NULL,
  `User ID` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `User ID` (`User ID`),
  KEY `Task ID` (`Task ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `project_task_user`
--

INSERT INTO `project_task_user` (`ID`, `Project ID`, `Task ID`, `User ID`) VALUES
(1, 1, 1, 1),
(2, 1, 2, 2),
(3, 2, 1, 5),
(4, 3, 1, 5);

-- --------------------------------------------------------

--
-- Table structure for table `project_user_fund`
--

CREATE TABLE IF NOT EXISTS `project_user_fund` (
  `ID` int(11) NOT NULL,
  `Project ID` int(11) NOT NULL,
  `User ID` int(11) NOT NULL,
  `FundingAmount` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `User ID` (`User ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `project_user_fund`
--

INSERT INTO `project_user_fund` (`ID`, `Project ID`, `User ID`, `FundingAmount`) VALUES
(1, 1, 1, 20),
(2, 1, 3, 30),
(3, 1, 5, 100),
(4, 2, 1, 150);

-- --------------------------------------------------------

--
-- Table structure for table `task`
--

CREATE TABLE IF NOT EXISTS `task` (
  `ID` int(11) NOT NULL,
  `Title` varchar(30) NOT NULL,
  `Resources Num` int(11) NOT NULL,
  `Karma` int(11) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `task`
--

INSERT INTO `task` (`ID`, `Title`, `Resources Num`, `Karma`) VALUES
(1, 'invitation designing', 2, 1),
(2, 'paintings hanging', 5, 2),
(3, 'collect trash', 1, 3);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `ID` int(11) NOT NULL,
  `Name` mediumtext NOT NULL,
  `Karma` int(11) NOT NULL,
  `userpicture` text NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`ID`, `Name`, `Karma`, `userpicture`) VALUES
(1, 'Ahmed', 2, 'http://www.thenational.ae/deployedfiles/Assets/Richmedia/Image/AD200910712119896AR.jpg'),
(2, 'John', 11, 'http://images.askmen.com/sports/keywords/personal-trainer_965841.jpg'),
(3, 'Mia', 3, 'http://www.sca.com/PageFiles/15/sca-personal-care-2011.jpg?epslanguage=en'),
(4, 'Paul', 15, 'http://www.wired.com/images_blogs/gadgetlab/2009/07/js-personal-supercomputer.jpg'),
(5, 'Mary', 22, 'http://womantalks.com/var/ezflow_site/storage/images/wd2/content/money/saving-money/top-5-personal-finance-resources-online/638048-1-eng-US/Top-5-Personal-Finance-Resources-Online_full_article_vertical.jpg');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `project`
--
ALTER TABLE `project`
  ADD CONSTRAINT `project_ibfk_1` FOREIGN KEY (`Owner ID`) REFERENCES `user` (`ID`) ON DELETE CASCADE;

--
-- Constraints for table `project_task_user`
--
ALTER TABLE `project_task_user`
  ADD CONSTRAINT `project_task_user_ibfk_2` FOREIGN KEY (`Task ID`) REFERENCES `task` (`ID`) ON DELETE CASCADE,
  ADD CONSTRAINT `project_task_user_ibfk_1` FOREIGN KEY (`User ID`) REFERENCES `user` (`ID`) ON DELETE CASCADE;

--
-- Constraints for table `project_user_fund`
--
ALTER TABLE `project_user_fund`
  ADD CONSTRAINT `project_user_fund_ibfk_1` FOREIGN KEY (`User ID`) REFERENCES `user` (`ID`) ON DELETE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
