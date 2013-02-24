# ************************************************************
# Sequel Pro SQL dump
# Version 4004
#
# http://www.sequelpro.com/
# http://code.google.com/p/sequel-pro/
#
# Host: 127.0.0.1 (MySQL 5.6.10)
# Database: phprestsql
# Generation Time: 2013-02-24 05:21:49 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table project
# ------------------------------------------------------------

DROP TABLE IF EXISTS `project`;

CREATE TABLE `project` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` text CHARACTER SET latin1 NOT NULL,
  `description` text CHARACTER SET latin1 NOT NULL,
  `picture` text CHARACTER SET latin1 NOT NULL,
  `owner_id` bigint(11) NOT NULL,
  `funding` int(11) NOT NULL,
  `tstamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `owner_id` (`owner_id`),
  KEY `owner_id_2` (`owner_id`),
  CONSTRAINT `project_ibfk_1` FOREIGN KEY (`owner_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `project` WRITE;
/*!40000 ALTER TABLE `project` DISABLE KEYS */;

INSERT INTO `project` (`id`, `title`, `description`, `picture`, `owner_id`, `funding`, `tstamp`)
VALUES
	(0,'Art fair','support creativity by helping us organize the next coming art fair at Al Saadiat island ! ','http://distilleryimage8.s3.amazonaws.com/25caa47c1c8a11e2b3ea12313813ffc5_7.jpg',1,500,'2013-02-23 15:34:04'),
	(1,'House maintenance ','A House of a small family at Abu Dhabi Sheikh Zayed street in need for maintenance. Join us on this humanitarian mission','http://distilleryimage9.s3.amazonaws.com/ae96dcd89aff11e180c9123138016265_6.jpg',1,300,'2013-02-23 15:34:04'),
	(2,'Construction site','Labor forces needed at Massafeh district for building new factory building','http://distilleryimage0.s3.amazonaws.com/bc13c1a6f8dc11e19b6b22000a1e9e0a_6.jpg',2,1460,'2013-02-23 15:34:04'),
	(3,'School yard clearning','help make our school green! join community good people to clean the english school yard at Abu Dhabi','http://distilleryimage0.s3.amazonaws.com/ba34c7be483611e297b922000a1fa527_7.jpg',4,45,'2013-02-23 15:37:49');

/*!40000 ALTER TABLE `project` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table project_task_user
# ------------------------------------------------------------

DROP TABLE IF EXISTS `project_task_user`;

CREATE TABLE `project_task_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `project_id` int(11) NOT NULL,
  `task_id` int(11) NOT NULL,
  `user_id` bigint(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `task_id` (`task_id`),
  CONSTRAINT `project_task_user_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `project_task_user_ibfk_2` FOREIGN KEY (`task_id`) REFERENCES `task` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `project_task_user` WRITE;
/*!40000 ALTER TABLE `project_task_user` DISABLE KEYS */;

INSERT INTO `project_task_user` (`id`, `project_id`, `task_id`, `user_id`)
VALUES
	(1,1,1,1),
	(2,1,2,2),
	(3,2,1,5),
	(4,3,1,5),
	(5,2,2,NULL);

/*!40000 ALTER TABLE `project_task_user` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table project_user_fund
# ------------------------------------------------------------

DROP TABLE IF EXISTS `project_user_fund`;

CREATE TABLE `project_user_fund` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `project_id` int(11) NOT NULL,
  `user_id` bigint(11) NOT NULL,
  `funding_amount` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `project_user_fund_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `project_user_fund` WRITE;
/*!40000 ALTER TABLE `project_user_fund` DISABLE KEYS */;

INSERT INTO `project_user_fund` (`id`, `project_id`, `user_id`, `funding_amount`)
VALUES
	(1,1,1,20),
	(2,1,3,30),
	(3,1,5,100),
	(4,2,1,150);

/*!40000 ALTER TABLE `project_user_fund` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table project_comments
# ------------------------------------------------------------

DROP TABLE IF EXISTS `project_comments`;

CREATE TABLE `project_comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `project_id` int(11) NOT NULL,
  `user_id` bigint(11) NOT NULL,
  `comment` text NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `project_comments_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`) ON DELETE CASCADE,
  CONSTRAINT `project_comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) 
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `project_comments` WRITE;
/*!40000 ALTER TABLE `project_comments` DISABLE KEYS */;

INSERT INTO `project_comments` (`project_id`, `user_id`, `comment`)
VALUES
	(1,1,'Count me in !'),
	(1,3,'The project seems pretty interesting. Can I donate my brushes ?'),
	(2,2,'whatever');

/*!40000 ALTER TABLE `project_comments` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table task
# ------------------------------------------------------------

DROP TABLE IF EXISTS `task`;

CREATE TABLE `task` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(30) NOT NULL,
  `resource_num` int(11) NOT NULL,
  `karma` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `task` WRITE;
/*!40000 ALTER TABLE `task` DISABLE KEYS */;

INSERT INTO `task` (`id`, `title`, `resource_num`, `karma`)
VALUES
	(1,'invitation designing',2,1),
	(2,'paintings hanging',5,2),
	(3,'collect trash',1,3);

/*!40000 ALTER TABLE `task` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table user
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` bigint(11) NOT NULL,
  `name` mediumtext NOT NULL,
  `karma` int(11) NOT NULL,
  `userpicture` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;

INSERT INTO `user` (`id`, `name`, `karma`, `userpicture`)
VALUES
	(1,'Ahmed',2,'http://www.thenational.ae/deployedfiles/Assets/Richmedia/Image/AD200910712119896AR.jpg'),
	(2,'John',11,'http://images.askmen.com/sports/keywords/personal-trainer_965841.jpg'),
	(3,'Mia',3,'http://www.sca.com/PageFiles/15/sca-personal-care-2011.jpg?epslanguage=en'),
	(4,'Paul',15,'http://www.wired.com/images_blogs/gadgetlab/2009/07/js-personal-supercomputer.jpg'),
	(5,'Mary',22,'http://womantalks.com/var/ezflow_site/storage/images/wd2/content/money/saving-money/top-5-personal-finance-resource_numine/638048-1-eng-US/Top-5-Personal-Finance-resource_numine_full_article_vertical.jpg');

/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
