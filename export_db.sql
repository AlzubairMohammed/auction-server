-- MySQL dump 10.13  Distrib 8.0.36, for Linux (x86_64)
--
-- Host: localhost    Database: auction
-- ------------------------------------------------------
-- Server version	8.0.36-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin_roles`
--

DROP TABLE IF EXISTS `admin_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin_roles` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `admin_id` bigint unsigned NOT NULL,
  `role_id` bigint unsigned NOT NULL,
  `name` varchar(255) NOT NULL,
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `admin_roles_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_roles`
--

LOCK TABLES `admin_roles` WRITE;
/*!40000 ALTER TABLE `admin_roles` DISABLE KEYS */;
/*!40000 ALTER TABLE `admin_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admins` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admins`
--

LOCK TABLES `admins` WRITE;
/*!40000 ALTER TABLE `admins` DISABLE KEYS */;
INSERT INTO `admins` VALUES (1,'محمد','$2a$10$g1yK92hbur2pU//bvF57XOMLVEmiVsHODH/8MpJEUoS09Yc/bdKTS','dev.alzuabir4@gmail.com','2024-05-05 12:26:14','2024-05-05 12:26:14');
/*!40000 ALTER TABLE `admins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `areas`
--

DROP TABLE IF EXISTS `areas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `areas` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `areas`
--

LOCK TABLES `areas` WRITE;
/*!40000 ALTER TABLE `areas` DISABLE KEYS */;
INSERT INTO `areas` VALUES (1,'الرياض','2024-05-06 05:02:19','2024-05-06 05:02:19');
/*!40000 ALTER TABLE `areas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auctions`
--

DROP TABLE IF EXISTS `auctions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auctions` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `assignment_number` varchar(255) NOT NULL,
  `auction_type` enum('type1','type2','type3') NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `name` varchar(255) NOT NULL,
  `user_id` bigint unsigned NOT NULL,
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `auctions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auctions`
--

LOCK TABLES `auctions` WRITE;
/*!40000 ALTER TABLE `auctions` DISABLE KEYS */;
INSERT INTO `auctions` VALUES (4,'12322','type1','2024-05-05','2024-05-05','اولاد ابراهيم',3,'2024-05-05 12:52:26','2024-05-05 12:52:26'),(5,'8','type2','2024-04-09','2024-05-13','Hala',3,'2024-05-06 05:29:26','2024-05-06 05:29:26'),(6,'2024-05','type2','2024-05-13','2024-05-20','تجربة البرنامج',3,'2024-05-06 10:55:26','2024-05-06 10:55:26'),(7,'20231','type2','2024-05-13','2024-05-15','مزاد مبارك',3,'2024-05-06 19:31:34','2024-05-06 19:31:34'),(8,'1234567891011','type2','2024-05-13','2024-05-20','مزاد روابي الرياض',3,'2024-05-06 20:01:02','2024-05-06 20:01:02'),(9,'22','type1','2024-05-10','2024-05-30','سس',3,'2024-05-07 09:50:18','2024-05-07 09:50:18'),(10,'2023','type1','2024-05-10','2024-05-11','مزاد القمم',3,'2024-05-07 12:28:20','2024-05-07 12:28:20'),(11,'23244','type1','2024-05-08','2024-05-08','مزاد الابداع',2,'2024-05-08 13:35:43','2024-05-08 13:35:43');
/*!40000 ALTER TABLE `auctions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cities`
--

DROP TABLE IF EXISTS `cities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cities` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `area_id` bigint unsigned NOT NULL,
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `area_id` (`area_id`),
  CONSTRAINT `cities_ibfk_1` FOREIGN KEY (`area_id`) REFERENCES `areas` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cities`
--

LOCK TABLES `cities` WRITE;
/*!40000 ALTER TABLE `cities` DISABLE KEYS */;
INSERT INTO `cities` VALUES (1,'الخرج',1,'2024-05-06 05:02:35','2024-05-06 05:02:35'),(2,'الخرج',1,'2024-05-08 08:13:10','2024-05-08 08:13:10');
/*!40000 ALTER TABLE `cities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comparisons_evaluation_properties`
--

DROP TABLE IF EXISTS `comparisons_evaluation_properties`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comparisons_evaluation_properties` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comparisons_evaluation_properties`
--

LOCK TABLES `comparisons_evaluation_properties` WRITE;
/*!40000 ALTER TABLE `comparisons_evaluation_properties` DISABLE KEYS */;
INSERT INTO `comparisons_evaluation_properties` VALUES (1,'السعر','2024-05-06 11:55:33','2024-05-06 11:55:33'),(2,'ظروف السوق','2024-05-06 11:55:33','2024-05-06 11:55:33'),(3,'شروط التمويل','2024-05-06 11:55:33','2024-05-06 11:55:33'),(4,'الاستخدام','2024-05-06 11:55:33','2024-05-06 11:55:33'),(5,'عدد الشوارع','2024-05-06 11:55:33','2024-05-06 11:55:33'),(6,'المرجح الموزون','2024-05-06 11:55:33','2024-05-06 11:55:33'),(7,'السعر','2024-05-06 13:35:35','2024-05-06 13:35:35'),(8,'المرجح الموزون','2024-05-06 13:35:35','2024-05-06 13:35:35'),(9,'المرجح الموزون','2024-05-06 13:36:27','2024-05-06 13:36:27'),(10,'السعر','2024-05-06 13:36:27','2024-05-06 13:36:27'),(11,'السعر','2024-05-06 13:48:07','2024-05-06 13:48:07'),(12,'المرجح الموزون','2024-05-06 13:48:07','2024-05-06 13:48:07'),(13,'السعر','2024-05-06 13:48:47','2024-05-06 13:48:47'),(14,'المرجح الموزون','2024-05-06 13:48:47','2024-05-06 13:48:47'),(15,'السعر','2024-05-07 09:46:20','2024-05-07 09:46:20'),(16,'ظروف السوق','2024-05-07 09:46:20','2024-05-07 09:46:20'),(17,'شروط التمويل','2024-05-07 09:46:20','2024-05-07 09:46:20'),(18,'المرجح الموزون','2024-05-07 09:46:20','2024-05-07 09:46:20'),(19,'السعر','2024-05-07 09:46:24','2024-05-07 09:46:24'),(20,'ظروف السوق','2024-05-07 09:46:24','2024-05-07 09:46:24'),(21,'شروط التمويل','2024-05-07 09:46:24','2024-05-07 09:46:24'),(22,'المرجح الموزون','2024-05-07 09:46:24','2024-05-07 09:46:24'),(23,'ظروف السوق','2024-05-07 09:46:41','2024-05-07 09:46:41'),(24,'السعر','2024-05-07 09:46:41','2024-05-07 09:46:41'),(25,'شروط التمويل','2024-05-07 09:46:41','2024-05-07 09:46:41'),(26,'المرجح الموزون','2024-05-07 09:46:41','2024-05-07 09:46:41'),(27,'السعر','2024-05-07 09:46:42','2024-05-07 09:46:42'),(28,'ظروف السوق','2024-05-07 09:46:42','2024-05-07 09:46:42'),(29,'شروط التمويل','2024-05-07 09:46:42','2024-05-07 09:46:42'),(30,'المرجح الموزون','2024-05-07 09:46:42','2024-05-07 09:46:42'),(31,'السعر','2024-05-07 09:46:56','2024-05-07 09:46:56'),(32,'شروط التمويل','2024-05-07 09:46:56','2024-05-07 09:46:56'),(33,'ظروف السوق','2024-05-07 09:46:56','2024-05-07 09:46:56'),(34,'المرجح الموزون','2024-05-07 09:46:56','2024-05-07 09:46:56'),(35,'السعر','2024-05-07 10:40:48','2024-05-07 10:40:48'),(36,'شروط التمويل','2024-05-07 10:40:48','2024-05-07 10:40:48'),(37,'ظروف السوق','2024-05-07 10:40:48','2024-05-07 10:40:48'),(38,'المرجح الموزون','2024-05-07 10:40:48','2024-05-07 10:40:48');
/*!40000 ALTER TABLE `comparisons_evaluation_properties` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comparisons_evaluation_realestates`
--

DROP TABLE IF EXISTS `comparisons_evaluation_realestates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comparisons_evaluation_realestates` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `comparisons_evaluation_id` bigint unsigned NOT NULL,
  `meter_price` decimal(10,2) DEFAULT NULL,
  `weighted` int DEFAULT NULL,
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `comparisons_evaluation_id` (`comparisons_evaluation_id`),
  CONSTRAINT `comparisons_evaluation_realestates_ibfk_1` FOREIGN KEY (`comparisons_evaluation_id`) REFERENCES `comparisons_evaluations` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comparisons_evaluation_realestates`
--

LOCK TABLES `comparisons_evaluation_realestates` WRITE;
/*!40000 ALTER TABLE `comparisons_evaluation_realestates` DISABLE KEYS */;
INSERT INTO `comparisons_evaluation_realestates` VALUES (1,1,0.00,50,'2024-05-06 11:55:33','2024-05-06 11:55:33'),(2,1,0.00,50,'2024-05-06 11:55:33','2024-05-06 11:55:33'),(3,1,0.00,0,'2024-05-06 11:55:33','2024-05-06 11:55:33'),(4,2,1.00,1,'2024-05-06 13:35:35','2024-05-06 13:35:35'),(5,2,0.00,0,'2024-05-06 13:35:35','2024-05-06 13:35:35'),(6,3,1.00,1,'2024-05-06 13:36:27','2024-05-06 13:36:27'),(7,3,0.00,0,'2024-05-06 13:36:27','2024-05-06 13:36:27'),(8,4,2.00,2,'2024-05-06 13:48:07','2024-05-06 13:48:07'),(9,4,0.00,0,'2024-05-06 13:48:07','2024-05-06 13:48:07'),(10,5,2.00,2,'2024-05-06 13:48:47','2024-05-06 13:48:47'),(11,5,0.00,0,'2024-05-06 13:48:47','2024-05-06 13:48:47'),(12,6,0.00,0,'2024-05-07 10:40:48','2024-05-07 10:40:48'),(13,6,0.00,0,'2024-05-07 10:40:48','2024-05-07 10:40:48'),(14,6,0.00,0,'2024-05-07 10:40:48','2024-05-07 10:40:48');
/*!40000 ALTER TABLE `comparisons_evaluation_realestates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comparisons_evaluation_realestates_properties`
--

DROP TABLE IF EXISTS `comparisons_evaluation_realestates_properties`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comparisons_evaluation_realestates_properties` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `comparisons_evaluation_properties_id` bigint unsigned NOT NULL,
  `comparisons_evaluation_realestate_id` bigint unsigned NOT NULL,
  `percentage` int NOT NULL,
  `value` varchar(255) NOT NULL,
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `comparisons_evaluation_properties_id` (`comparisons_evaluation_properties_id`),
  KEY `comparisons_evaluation_realestate_id` (`comparisons_evaluation_realestate_id`),
  CONSTRAINT `comparisons_evaluation_realestates_properties_ibfk_1` FOREIGN KEY (`comparisons_evaluation_properties_id`) REFERENCES `comparisons_evaluation_properties` (`id`) ON DELETE CASCADE,
  CONSTRAINT `comparisons_evaluation_realestates_properties_ibfk_2` FOREIGN KEY (`comparisons_evaluation_realestate_id`) REFERENCES `comparisons_evaluation_realestates` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comparisons_evaluation_realestates_properties`
--

LOCK TABLES `comparisons_evaluation_realestates_properties` WRITE;
/*!40000 ALTER TABLE `comparisons_evaluation_realestates_properties` DISABLE KEYS */;
INSERT INTO `comparisons_evaluation_realestates_properties` VALUES (1,5,1,0,'','2024-05-06 11:55:33','2024-05-06 11:55:33'),(2,4,1,0,'','2024-05-06 11:55:33','2024-05-06 11:55:33'),(3,3,1,0,'','2024-05-06 11:55:33','2024-05-06 11:55:33'),(4,2,1,0,'','2024-05-06 11:55:33','2024-05-06 11:55:33'),(5,1,1,0,'','2024-05-06 11:55:33','2024-05-06 11:55:33'),(6,5,2,0,'','2024-05-06 11:55:33','2024-05-06 11:55:33'),(7,4,2,0,'','2024-05-06 11:55:33','2024-05-06 11:55:33'),(8,3,2,0,'','2024-05-06 11:55:33','2024-05-06 11:55:33'),(9,2,2,0,'','2024-05-06 11:55:33','2024-05-06 11:55:33'),(10,1,2,0,'','2024-05-06 11:55:33','2024-05-06 11:55:33'),(11,5,3,0,'0','2024-05-06 11:55:33','2024-05-06 11:55:33'),(12,4,3,0,'سكني','2024-05-06 11:55:33','2024-05-06 11:55:33'),(13,3,3,0,'0','2024-05-06 11:55:33','2024-05-06 11:55:33'),(14,2,3,0,'0','2024-05-06 11:55:33','2024-05-06 11:55:33'),(15,1,3,0,'4000','2024-05-06 11:55:33','2024-05-06 11:55:33'),(16,7,4,1,'','2024-05-06 13:35:35','2024-05-06 13:35:35'),(17,7,5,0,'1','2024-05-06 13:35:35','2024-05-06 13:35:35'),(18,10,6,1,'','2024-05-06 13:36:27','2024-05-06 13:36:27'),(19,10,7,0,'1','2024-05-06 13:36:27','2024-05-06 13:36:27'),(20,11,8,2,'','2024-05-06 13:48:07','2024-05-06 13:48:07'),(21,11,9,0,'2','2024-05-06 13:48:07','2024-05-06 13:48:07'),(22,13,10,2,'','2024-05-06 13:48:47','2024-05-06 13:48:47'),(23,13,11,0,'2','2024-05-06 13:48:47','2024-05-06 13:48:47'),(24,36,12,0,'','2024-05-07 10:40:48','2024-05-07 10:40:48'),(25,37,12,0,'','2024-05-07 10:40:48','2024-05-07 10:40:48'),(26,35,12,0,'','2024-05-07 10:40:48','2024-05-07 10:40:48'),(27,36,13,0,'','2024-05-07 10:40:48','2024-05-07 10:40:48'),(28,37,13,0,'','2024-05-07 10:40:48','2024-05-07 10:40:48'),(29,35,13,0,'','2024-05-07 10:40:48','2024-05-07 10:40:48'),(30,36,14,0,'0','2024-05-07 10:40:48','2024-05-07 10:40:48'),(31,37,14,0,'0','2024-05-07 10:40:48','2024-05-07 10:40:48'),(32,35,14,0,'0','2024-05-07 10:40:48','2024-05-07 10:40:48');
/*!40000 ALTER TABLE `comparisons_evaluation_realestates_properties` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comparisons_evaluations`
--

DROP TABLE IF EXISTS `comparisons_evaluations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comparisons_evaluations` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `meter_price` decimal(10,2) DEFAULT NULL,
  `total_price` decimal(10,2) DEFAULT NULL,
  `realestate_id` bigint unsigned NOT NULL,
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `realestate_id` (`realestate_id`),
  CONSTRAINT `comparisons_evaluations_ibfk_1` FOREIGN KEY (`realestate_id`) REFERENCES `realestates` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comparisons_evaluations`
--

LOCK TABLES `comparisons_evaluations` WRITE;
/*!40000 ALTER TABLE `comparisons_evaluations` DISABLE KEYS */;
INSERT INTO `comparisons_evaluations` VALUES (1,0.00,0.00,1,'2024-05-06 11:55:33','2024-05-06 11:55:33'),(2,0.01,22.50,2,'2024-05-06 13:35:35','2024-05-06 13:35:35'),(3,0.01,22.50,2,'2024-05-06 13:36:27','2024-05-06 13:36:27'),(4,0.04,90.00,3,'2024-05-06 13:48:07','2024-05-06 13:48:07'),(5,0.04,90.00,2,'2024-05-06 13:48:47','2024-05-06 13:48:47'),(6,0.00,0.00,4,'2024-05-07 10:40:48','2024-05-07 10:40:48');
/*!40000 ALTER TABLE `comparisons_evaluations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `components`
--

DROP TABLE IF EXISTS `components`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `components` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `user_id` bigint unsigned DEFAULT NULL,
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `components_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `components`
--

LOCK TABLES `components` WRITE;
/*!40000 ALTER TABLE `components` DISABLE KEYS */;
INSERT INTO `components` VALUES (1,'دورات المياه',NULL,'2024-05-06 06:49:07','2024-05-06 06:49:07'),(2,'مسبح',NULL,'2024-05-06 06:49:22','2024-05-06 06:49:22'),(3,'مسبح',NULL,'2024-05-07 12:18:04','2024-05-07 12:18:04');
/*!40000 ALTER TABLE `components` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cost_evaluations`
--

DROP TABLE IF EXISTS `cost_evaluations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cost_evaluations` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `realestate_id` bigint unsigned NOT NULL,
  `total_cost` decimal(10,2) NOT NULL,
  `building_cost` decimal(10,2) NOT NULL,
  `building_cost_after_depreciation` decimal(10,2) NOT NULL,
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `realestate_id` (`realestate_id`),
  CONSTRAINT `cost_evaluations_ibfk_1` FOREIGN KEY (`realestate_id`) REFERENCES `realestates` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cost_evaluations`
--

LOCK TABLES `cost_evaluations` WRITE;
/*!40000 ALTER TABLE `cost_evaluations` DISABLE KEYS */;
INSERT INTO `cost_evaluations` VALUES (1,1,1288300.00,991000.00,914693.00,'2024-05-06 11:11:23','2024-05-06 11:11:23'),(2,4,1205005.00,964000.00,1048354.35,'2024-05-08 08:54:48','2024-05-08 08:54:48');
/*!40000 ALTER TABLE `cost_evaluations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `depreciations`
--

DROP TABLE IF EXISTS `depreciations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `depreciations` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `cost_evaluation_id` bigint unsigned NOT NULL,
  `realestate_life_span` int NOT NULL,
  `realestate_expected_life_span` int NOT NULL,
  `type` enum('const','expanded') NOT NULL,
  `depreciation_rate` int NOT NULL,
  `depreciation_value` decimal(10,2) NOT NULL,
  `realestate_expanded_life_span` int DEFAULT NULL,
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `cost_evaluation_id` (`cost_evaluation_id`),
  CONSTRAINT `depreciations_ibfk_1` FOREIGN KEY (`cost_evaluation_id`) REFERENCES `cost_evaluations` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `depreciations`
--

LOCK TABLES `depreciations` WRITE;
/*!40000 ALTER TABLE `depreciations` DISABLE KEYS */;
INSERT INTO `depreciations` VALUES (1,1,25,35,'expanded',29,373607.00,10,'2024-05-06 11:11:23','2024-05-06 11:11:23'),(2,2,25,40,'expanded',13,156650.65,5,'2024-05-08 08:54:48','2024-05-08 08:54:48');
/*!40000 ALTER TABLE `depreciations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `direct_capitalization_evaluations`
--

DROP TABLE IF EXISTS `direct_capitalization_evaluations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `direct_capitalization_evaluations` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `cross_income` decimal(10,2) NOT NULL,
  `operation_income_rate` int NOT NULL,
  `capitalization_rate` int NOT NULL,
  `realestate_total_value` decimal(10,2) NOT NULL,
  `net_income` decimal(10,2) NOT NULL,
  `operation_cost` decimal(10,2) NOT NULL,
  `realestate_id` bigint unsigned NOT NULL,
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `realestate_id` (`realestate_id`),
  CONSTRAINT `direct_capitalization_evaluations_ibfk_1` FOREIGN KEY (`realestate_id`) REFERENCES `realestates` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `direct_capitalization_evaluations`
--

LOCK TABLES `direct_capitalization_evaluations` WRITE;
/*!40000 ALTER TABLE `direct_capitalization_evaluations` DISABLE KEYS */;
INSERT INTO `direct_capitalization_evaluations` VALUES (1,500000.00,5,8,5937500.00,475000.00,25000.00,2,'2024-05-06 11:20:58','2024-05-06 11:20:58'),(2,100000.00,5,8,1187500.00,95000.00,5000.00,4,'2024-05-06 19:38:50','2024-05-06 19:38:50'),(3,1.00,1,1,99.00,0.99,0.01,2,'2024-05-07 07:48:12','2024-05-07 07:48:12'),(4,100000.00,5,8,1187500.00,95000.00,5000.00,4,'2024-05-07 09:48:29','2024-05-07 09:48:29');
/*!40000 ALTER TABLE `direct_capitalization_evaluations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `direct_cost_components`
--

DROP TABLE IF EXISTS `direct_cost_components`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `direct_cost_components` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `direct_cost_id` bigint unsigned NOT NULL,
  `name` varchar(255) NOT NULL,
  `area` int NOT NULL,
  `meter_price` decimal(10,2) NOT NULL,
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `direct_cost_id` (`direct_cost_id`),
  CONSTRAINT `direct_cost_components_ibfk_1` FOREIGN KEY (`direct_cost_id`) REFERENCES `direct_costs` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `direct_cost_components`
--

LOCK TABLES `direct_cost_components` WRITE;
/*!40000 ALTER TABLE `direct_cost_components` DISABLE KEYS */;
INSERT INTO `direct_cost_components` VALUES (1,1,'الدور الارضي',200,2000.00,'2024-05-06 11:11:23','2024-05-06 11:11:23'),(2,1,'الدور الاول',200,2000.00,'2024-05-06 11:11:23','2024-05-06 11:11:23'),(3,1,'الملحق',100,1400.00,'2024-05-06 11:11:23','2024-05-06 11:11:23'),(4,1,'الاسوار',85,600.00,'2024-05-06 11:11:23','2024-05-06 11:11:23'),(5,2,'الدور الارضي',200,1500.00,'2024-05-08 08:54:48','2024-05-08 08:54:48'),(6,2,'الدور الارضي',200,1400.00,'2024-05-08 08:54:48','2024-05-08 08:54:48'),(7,2,'الدور الاول',150,1400.00,'2024-05-08 08:54:48','2024-05-08 08:54:48'),(8,2,'الملحق ',100,1200.00,'2024-05-08 08:54:48','2024-05-08 08:54:48'),(9,2,'الاسوار',90,600.00,'2024-05-08 08:54:48','2024-05-08 08:54:48');
/*!40000 ALTER TABLE `direct_cost_components` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `direct_costs`
--

DROP TABLE IF EXISTS `direct_costs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `direct_costs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `cost_evaluation_id` bigint unsigned NOT NULL,
  `direct_cost` decimal(10,2) NOT NULL,
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `cost_evaluation_id` (`cost_evaluation_id`),
  CONSTRAINT `direct_costs_ibfk_1` FOREIGN KEY (`cost_evaluation_id`) REFERENCES `cost_evaluations` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `direct_costs`
--

LOCK TABLES `direct_costs` WRITE;
/*!40000 ALTER TABLE `direct_costs` DISABLE KEYS */;
INSERT INTO `direct_costs` VALUES (1,1,991000.00,'2024-05-06 11:11:23','2024-05-06 11:11:23'),(2,2,964000.00,'2024-05-08 08:54:48','2024-05-08 08:54:48');
/*!40000 ALTER TABLE `direct_costs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `indirect_cost_components`
--

DROP TABLE IF EXISTS `indirect_cost_components`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `indirect_cost_components` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `indirect_cost_id` bigint unsigned NOT NULL,
  `name` varchar(255) NOT NULL,
  `percentage` int DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `indirect_cost_id` (`indirect_cost_id`),
  CONSTRAINT `indirect_cost_components_ibfk_1` FOREIGN KEY (`indirect_cost_id`) REFERENCES `indirect_costs` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `indirect_cost_components`
--

LOCK TABLES `indirect_cost_components` WRITE;
/*!40000 ALTER TABLE `indirect_cost_components` DISABLE KEYS */;
INSERT INTO `indirect_cost_components` VALUES (1,1,'اعمال فنية',5,NULL,'2024-05-06 11:11:23','2024-05-06 11:11:23'),(2,1,'عمال ادارية ',5,NULL,'2024-05-06 11:11:23','2024-05-06 11:11:23'),(3,1,'ارباح مطور',20,NULL,'2024-05-06 11:11:23','2024-05-06 11:11:23'),(4,2,'اعمال فنيه واداريه',NULL,NULL,'2024-05-08 08:54:48','2024-05-08 08:54:48'),(5,2,'ارباح المطور',25,NULL,'2024-05-08 08:54:48','2024-05-08 08:54:48');
/*!40000 ALTER TABLE `indirect_cost_components` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `indirect_costs`
--

DROP TABLE IF EXISTS `indirect_costs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `indirect_costs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `cost_evaluation_id` bigint unsigned NOT NULL,
  `indirect_cost` decimal(10,2) NOT NULL,
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `cost_evaluation_id` (`cost_evaluation_id`),
  CONSTRAINT `indirect_costs_ibfk_1` FOREIGN KEY (`cost_evaluation_id`) REFERENCES `cost_evaluations` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `indirect_costs`
--

LOCK TABLES `indirect_costs` WRITE;
/*!40000 ALTER TABLE `indirect_costs` DISABLE KEYS */;
INSERT INTO `indirect_costs` VALUES (1,1,297300.00,'2024-05-06 11:11:23','2024-05-06 11:11:23'),(2,2,241005.00,'2024-05-08 08:54:48','2024-05-08 08:54:48');
/*!40000 ALTER TABLE `indirect_costs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `managers`
--

DROP TABLE IF EXISTS `managers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `managers` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `managers`
--

LOCK TABLES `managers` WRITE;
/*!40000 ALTER TABLE `managers` DISABLE KEYS */;
/*!40000 ALTER TABLE `managers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `admin_id` bigint unsigned NOT NULL,
  `auction_id` bigint unsigned NOT NULL,
  `status` enum('pending','completed','cancelled') NOT NULL,
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `admin_id` (`admin_id`),
  KEY `auction_id` (`auction_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`admin_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`auction_id`) REFERENCES `auctions` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permissions`
--

DROP TABLE IF EXISTS `permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permissions` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text,
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permissions`
--

LOCK TABLES `permissions` WRITE;
/*!40000 ALTER TABLE `permissions` DISABLE KEYS */;
INSERT INTO `permissions` VALUES (1,'pr2',NULL,'2024-05-05 12:28:18','2024-05-05 12:28:18'),(2,'pr2',NULL,'2024-05-08 08:09:29','2024-05-08 08:09:29');
/*!40000 ALTER TABLE `permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `properties`
--

DROP TABLE IF EXISTS `properties`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `properties` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `type` enum('text','single','multiple') NOT NULL,
  `user_id` bigint unsigned DEFAULT NULL,
  `is_feature` tinyint(1) DEFAULT '0',
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `properties_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `properties`
--

LOCK TABLES `properties` WRITE;
/*!40000 ALTER TABLE `properties` DISABLE KEYS */;
INSERT INTO `properties` VALUES (2,'هل تتوفر كهرباء','single',NULL,0,'2024-05-06 20:05:38','2024-05-06 20:05:38'),(3,'ماهي الخدمات المتوفرخ','multiple',NULL,0,'2024-05-06 20:06:02','2024-05-06 20:06:02'),(4,'قريب من الخدمات','text',NULL,1,'2024-05-06 20:06:18','2024-05-06 20:06:18'),(5,'شوارع رئيسية','text',NULL,1,'2024-05-06 20:06:55','2024-05-06 20:06:55'),(9,'توفر الخدمات','multiple',NULL,0,'2024-05-07 09:57:48','2024-05-07 09:57:48');
/*!40000 ALTER TABLE `properties` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `properties_options`
--

DROP TABLE IF EXISTS `properties_options`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `properties_options` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `property_id` bigint unsigned NOT NULL,
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `property_id` (`property_id`),
  CONSTRAINT `properties_options_ibfk_1` FOREIGN KEY (`property_id`) REFERENCES `properties` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `properties_options`
--

LOCK TABLES `properties_options` WRITE;
/*!40000 ALTER TABLE `properties_options` DISABLE KEYS */;
INSERT INTO `properties_options` VALUES (1,'تتوفر خدمة الكهرباء والماء',5,'2024-05-06 20:06:55','2024-05-06 20:06:55'),(6,'كهرباء',9,'2024-05-07 09:57:48','2024-05-07 09:57:48'),(7,'ماء',9,'2024-05-07 09:57:48','2024-05-07 09:57:48'),(8,'هاتف',9,'2024-05-07 09:57:48','2024-05-07 09:57:48'),(9,'صرف صحي',9,'2024-05-07 09:57:48','2024-05-07 09:57:48');
/*!40000 ALTER TABLE `properties_options` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quarters`
--

DROP TABLE IF EXISTS `quarters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quarters` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `city_id` bigint unsigned NOT NULL,
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `city_id` (`city_id`),
  CONSTRAINT `quarters_ibfk_1` FOREIGN KEY (`city_id`) REFERENCES `cities` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quarters`
--

LOCK TABLES `quarters` WRITE;
/*!40000 ALTER TABLE `quarters` DISABLE KEYS */;
INSERT INTO `quarters` VALUES (1,'الروضة',1,'2024-05-06 05:02:54','2024-05-06 05:02:54');
/*!40000 ALTER TABLE `quarters` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `realestate_components`
--

DROP TABLE IF EXISTS `realestate_components`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `realestate_components` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `realestate_id` bigint unsigned NOT NULL,
  `component_id` bigint unsigned NOT NULL,
  `value` varchar(255) NOT NULL,
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `realestate_id` (`realestate_id`),
  KEY `component_id` (`component_id`),
  CONSTRAINT `realestate_components_ibfk_1` FOREIGN KEY (`realestate_id`) REFERENCES `realestates` (`id`) ON DELETE CASCADE,
  CONSTRAINT `realestate_components_ibfk_2` FOREIGN KEY (`component_id`) REFERENCES `components` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `realestate_components`
--

LOCK TABLES `realestate_components` WRITE;
/*!40000 ALTER TABLE `realestate_components` DISABLE KEYS */;
/*!40000 ALTER TABLE `realestate_components` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `realestate_documents`
--

DROP TABLE IF EXISTS `realestate_documents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `realestate_documents` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `number` varchar(255) NOT NULL,
  `area_number` varchar(255) NOT NULL,
  `block_number` varchar(255) NOT NULL,
  `graph_number` varchar(255) NOT NULL,
  `space` varchar(255) NOT NULL,
  `quarter_id` bigint unsigned NOT NULL,
  `north_desc` varchar(255) NOT NULL,
  `north_space` int NOT NULL,
  `west_desc` varchar(255) NOT NULL,
  `west_space` int NOT NULL,
  `east_desc` varchar(255) NOT NULL,
  `east_space` int NOT NULL,
  `south_desc` varchar(255) NOT NULL,
  `south_space` int NOT NULL,
  `note` text,
  `path` varchar(255) DEFAULT NULL,
  `date` timestamp NOT NULL,
  `realestate_id` bigint unsigned NOT NULL,
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `realestate_id` (`realestate_id`),
  KEY `quarter_id` (`quarter_id`),
  CONSTRAINT `realestate_documents_ibfk_1` FOREIGN KEY (`realestate_id`) REFERENCES `realestates` (`id`),
  CONSTRAINT `realestate_documents_ibfk_2` FOREIGN KEY (`quarter_id`) REFERENCES `quarters` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `realestate_documents`
--

LOCK TABLES `realestate_documents` WRITE;
/*!40000 ALTER TABLE `realestate_documents` DISABLE KEYS */;
INSERT INTO `realestate_documents` VALUES (1,'1223','34353','53533','25555','1000',1,'عمارة',800,'مستشفى الحياة',1000,'شارع خالد بن الوليد',1000,'برحة',1000,'','','2024-05-06 00:00:00',1,'2024-05-06 10:03:31','2024-05-06 10:03:31'),(2,'123463222','2','22','3253','500',1,'شارع عرض 25',50,'شارع عرض 30',25,'شارع عرض 15',25,'جار',50,'','','2024-05-15 00:00:00',2,'2024-05-06 10:59:14','2024-05-06 10:59:14'),(3,'5545454','3','2323','22','500',1,'شارع عرض 25',25,'شارع عرض 50',25,'شارع عرض 25',50,'شارع عرض 25',50,'','','2024-05-09 00:00:00',3,'2024-05-06 11:25:09','2024-05-06 11:25:09'),(4,'1232522','2222','333','25421','5000',1,'ش',5,'ش',55,'ش',55,'ش',55,'','','2024-05-15 00:00:00',4,'2024-05-06 19:33:20','2024-05-06 19:33:20'),(5,'253221','222','23','222','2000',1,'بيبيسب',25,'25',25,'سيبسيب',25,'سيبسي',25,'','','2024-05-16 00:00:00',5,'2024-05-06 19:35:50','2024-05-06 19:35:50'),(6,'1234567891011','1','2','3','6000',1,'شارع',25,'شارع',50,'شارع',50,'شارع',50,'','','2024-05-06 00:00:00',6,'2024-05-06 20:03:36','2024-05-06 20:03:36'),(7,'23424','12342','2342','23311','2000',1,'1',1,'1',1,'2',1,'1',1,'','','2024-05-08 00:00:00',12,'2024-05-08 13:37:33','2024-05-08 13:37:33');
/*!40000 ALTER TABLE `realestate_documents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `realestate_feature_options`
--

DROP TABLE IF EXISTS `realestate_feature_options`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `realestate_feature_options` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `realestate_id` bigint unsigned NOT NULL,
  `realestate_feature_id` bigint unsigned NOT NULL,
  `value` tinyint(1) NOT NULL,
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `realestate_id` (`realestate_id`),
  KEY `realestate_feature_id` (`realestate_feature_id`),
  CONSTRAINT `realestate_feature_options_ibfk_1` FOREIGN KEY (`realestate_id`) REFERENCES `realestates` (`id`) ON DELETE CASCADE,
  CONSTRAINT `realestate_feature_options_ibfk_2` FOREIGN KEY (`realestate_feature_id`) REFERENCES `realestate_features` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `realestate_feature_options`
--

LOCK TABLES `realestate_feature_options` WRITE;
/*!40000 ALTER TABLE `realestate_feature_options` DISABLE KEYS */;
/*!40000 ALTER TABLE `realestate_feature_options` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `realestate_features`
--

DROP TABLE IF EXISTS `realestate_features`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `realestate_features` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `realestate_features`
--

LOCK TABLES `realestate_features` WRITE;
/*!40000 ALTER TABLE `realestate_features` DISABLE KEYS */;
/*!40000 ALTER TABLE `realestate_features` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `realestate_files`
--

DROP TABLE IF EXISTS `realestate_files`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `realestate_files` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `path` varchar(255) NOT NULL,
  `realestate_id` bigint unsigned NOT NULL,
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `realestate_id` (`realestate_id`),
  CONSTRAINT `realestate_files_ibfk_1` FOREIGN KEY (`realestate_id`) REFERENCES `realestates` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `realestate_files`
--

LOCK TABLES `realestate_files` WRITE;
/*!40000 ALTER TABLE `realestate_files` DISABLE KEYS */;
INSERT INTO `realestate_files` VALUES (1,'uploads/realestates/2024-05-06T10-03-31-607Z-0bdc53549cac7426d0a26c7ee1cd0302_400x400.jpeg','0bdc53549cac7426d0a26c7ee1cd0302_400x400.jpeg',1,'2024-05-06 10:03:31','2024-05-06 10:03:31'),(2,'uploads/realestates/2024-05-06T10-59-14-890Z-Ø§ÙØ²ÙØ§ÙØ© Ø¹Ø¨Ø¯Ø§ÙØ¹Ø§ÙÙ.pdf','Ø§ÙØ²ÙØ§ÙØ© Ø¹Ø¨Ø¯Ø§ÙØ¹Ø§ÙÙ.pdf',2,'2024-05-06 10:59:14','2024-05-06 10:59:14'),(3,'uploads/realestates/2024-05-06T11-25-09-955Z-Ø´Ø¹Ø§Ø± ÙÙÙÙØ´Ù.pdf','Ø´Ø¹Ø§Ø± ÙÙÙÙØ´Ù.pdf',3,'2024-05-06 11:25:09','2024-05-06 11:25:09'),(4,'uploads/realestates/2024-05-06T19-33-20-937Z-1715019522409.jpg','1715019522409.jpg',4,'2024-05-06 19:33:20','2024-05-06 19:33:20'),(5,'uploads/realestates/2024-05-06T19-35-50-294Z-1715019522409.jpg','1715019522409.jpg',5,'2024-05-06 19:35:50','2024-05-06 19:35:50'),(6,'uploads/realestates/2024-05-06T20-03-36-087Z-ÙØ§ØªÙØ±Ø© Ø¶Ø±ÙØ¨ÙØ©.png','ÙØ§ØªÙØ±Ø© Ø¶Ø±ÙØ¨ÙØ©.png',6,'2024-05-06 20:03:36','2024-05-06 20:03:36'),(12,'uploads/realestates/2024-05-08T13-37-33-139Z-0bdc53549cac7426d0a26c7ee1cd0302_400x400.jpeg','0bdc53549cac7426d0a26c7ee1cd0302_400x400.jpeg',12,'2024-05-08 13:37:33','2024-05-08 13:37:33');
/*!40000 ALTER TABLE `realestate_files` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `realestate_images`
--

DROP TABLE IF EXISTS `realestate_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `realestate_images` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `path` varchar(255) NOT NULL,
  `realestate_id` bigint unsigned DEFAULT NULL,
  `realestate_images_description_id` bigint unsigned DEFAULT NULL,
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `realestate_id` (`realestate_id`),
  KEY `realestate_images_description_id` (`realestate_images_description_id`),
  CONSTRAINT `realestate_images_ibfk_1` FOREIGN KEY (`realestate_id`) REFERENCES `realestates` (`id`) ON DELETE CASCADE,
  CONSTRAINT `realestate_images_ibfk_2` FOREIGN KEY (`realestate_images_description_id`) REFERENCES `realestate_images_descriptions` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `realestate_images`
--

LOCK TABLES `realestate_images` WRITE;
/*!40000 ALTER TABLE `realestate_images` DISABLE KEYS */;
INSERT INTO `realestate_images` VALUES (1,'uploads/realestates/2024-05-06T20-08-00-741Z-ebbe692b-afd9-49c5-9a79-8802894def62.jpeg',4,1,'2024-05-06 20:08:00','2024-05-06 20:08:00'),(2,'uploads/realestates/2024-05-06T20-08-00-741Z-8bc0d46f-a250-4fcf-8db7-b6825ec0aef9 (1).jpeg',4,2,'2024-05-06 20:08:00','2024-05-06 20:08:00'),(3,'uploads/realestates/2024-05-08T11-52-11-407Z-0bdc53549cac7426d0a26c7ee1cd0302_400x400.jpeg',1,4,'2024-05-08 11:52:11','2024-05-08 11:52:11'),(4,'uploads/realestates/2024-05-08T11-52-11-407Z-0bdc53549cac7426d0a26c7ee1cd0302_400x400.jpeg',1,3,'2024-05-08 11:52:11','2024-05-08 11:52:11'),(5,'uploads/realestates/2024-05-08T11-52-11-902Z-0bdc53549cac7426d0a26c7ee1cd0302_400x400.jpeg',1,5,'2024-05-08 11:52:11','2024-05-08 11:52:11'),(6,'uploads/realestates/2024-05-08T11-52-11-902Z-0bdc53549cac7426d0a26c7ee1cd0302_400x400.jpeg',1,6,'2024-05-08 11:52:11','2024-05-08 11:52:11'),(7,'uploads/realestates/2024-05-08T13-38-08-857Z-0bdc53549cac7426d0a26c7ee1cd0302_400x400.jpeg',12,7,'2024-05-08 13:38:08','2024-05-08 13:38:08'),(8,'uploads/realestates/2024-05-08T13-38-08-857Z-0bdc53549cac7426d0a26c7ee1cd0302_400x400.jpeg',12,8,'2024-05-08 13:38:08','2024-05-08 13:38:08');
/*!40000 ALTER TABLE `realestate_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `realestate_images_descriptions`
--

DROP TABLE IF EXISTS `realestate_images_descriptions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `realestate_images_descriptions` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `description` text NOT NULL,
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `realestate_images_descriptions`
--

LOCK TABLES `realestate_images_descriptions` WRITE;
/*!40000 ALTER TABLE `realestate_images_descriptions` DISABLE KEYS */;
INSERT INTO `realestate_images_descriptions` VALUES (1,'صور خارجية','2024-05-06 20:08:00','2024-05-06 20:08:00'),(2,'صور داخلية','2024-05-06 20:08:00','2024-05-06 20:08:00'),(3,'صور خارجية','2024-05-08 11:52:11','2024-05-08 11:52:11'),(4,'صور داخلية','2024-05-08 11:52:11','2024-05-08 11:52:11'),(5,'صور خارجية','2024-05-08 11:52:11','2024-05-08 11:52:11'),(6,'صور داخلية','2024-05-08 11:52:11','2024-05-08 11:52:11'),(7,'صور خارجية','2024-05-08 13:38:08','2024-05-08 13:38:08'),(8,'صور داخلية','2024-05-08 13:38:08','2024-05-08 13:38:08');
/*!40000 ALTER TABLE `realestate_images_descriptions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `realestate_licenses`
--

DROP TABLE IF EXISTS `realestate_licenses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `realestate_licenses` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `number` int NOT NULL,
  `issuance_place_id` bigint unsigned NOT NULL,
  `realestate_type_id` bigint unsigned NOT NULL,
  `date` date NOT NULL,
  `path` varchar(255) NOT NULL,
  `note` text,
  `realestate_id` bigint unsigned NOT NULL,
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `realestate_id` (`realestate_id`),
  KEY `issuance_place_id` (`issuance_place_id`),
  KEY `realestate_type_id` (`realestate_type_id`),
  CONSTRAINT `realestate_licenses_ibfk_1` FOREIGN KEY (`realestate_id`) REFERENCES `realestates` (`id`),
  CONSTRAINT `realestate_licenses_ibfk_2` FOREIGN KEY (`issuance_place_id`) REFERENCES `cities` (`id`),
  CONSTRAINT `realestate_licenses_ibfk_3` FOREIGN KEY (`realestate_type_id`) REFERENCES `realestate_types` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `realestate_licenses`
--

LOCK TABLES `realestate_licenses` WRITE;
/*!40000 ALTER TABLE `realestate_licenses` DISABLE KEYS */;
INSERT INTO `realestate_licenses` VALUES (1,1234,1,1,'2024-05-06','','',1,'2024-05-06 10:03:31','2024-05-06 10:03:31'),(2,23236663,1,2,'2024-05-12','','',2,'2024-05-06 10:59:14','2024-05-06 10:59:14'),(3,255,1,2,'2024-05-16','','',3,'2024-05-06 11:25:09','2024-05-06 11:25:09'),(4,755,1,1,'2024-05-09','','',4,'2024-05-06 19:33:20','2024-05-06 19:33:20'),(5,785685,1,2,'2024-05-15','','',5,'2024-05-06 19:35:50','2024-05-06 19:35:50'),(6,256255,1,2,'2024-05-15','','',6,'2024-05-06 20:03:36','2024-05-06 20:03:36'),(7,23423,1,2,'2024-05-08','','',12,'2024-05-08 13:37:33','2024-05-08 13:37:33');
/*!40000 ALTER TABLE `realestate_licenses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `realestate_owners`
--

DROP TABLE IF EXISTS `realestate_owners`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `realestate_owners` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `identity_number` int NOT NULL,
  `nationality` varchar(255) NOT NULL,
  `ownership_percentage` int NOT NULL,
  `realestate_id` bigint unsigned NOT NULL,
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `realestate_id` (`realestate_id`),
  CONSTRAINT `realestate_owners_ibfk_1` FOREIGN KEY (`realestate_id`) REFERENCES `realestates` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `realestate_owners`
--

LOCK TABLES `realestate_owners` WRITE;
/*!40000 ALTER TABLE `realestate_owners` DISABLE KEYS */;
/*!40000 ALTER TABLE `realestate_owners` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `realestate_properties`
--

DROP TABLE IF EXISTS `realestate_properties`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `realestate_properties` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `realestate_id` bigint unsigned NOT NULL,
  `property_id` bigint unsigned NOT NULL,
  `value` varchar(255) DEFAULT NULL,
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `realestate_id` (`realestate_id`),
  KEY `property_id` (`property_id`),
  CONSTRAINT `realestate_properties_ibfk_1` FOREIGN KEY (`realestate_id`) REFERENCES `realestates` (`id`) ON DELETE CASCADE,
  CONSTRAINT `realestate_properties_ibfk_2` FOREIGN KEY (`property_id`) REFERENCES `properties` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `realestate_properties`
--

LOCK TABLES `realestate_properties` WRITE;
/*!40000 ALTER TABLE `realestate_properties` DISABLE KEYS */;
INSERT INTO `realestate_properties` VALUES (2,4,2,NULL,'2024-05-06 20:08:00','2024-05-06 20:08:00'),(3,4,3,NULL,'2024-05-06 20:08:00','2024-05-06 20:08:00'),(4,4,4,NULL,'2024-05-06 20:08:00','2024-05-06 20:08:00'),(5,4,5,NULL,'2024-05-06 20:08:00','2024-05-06 20:08:00'),(6,1,2,NULL,'2024-05-08 11:52:11','2024-05-08 11:52:11'),(7,1,3,NULL,'2024-05-08 11:52:11','2024-05-08 11:52:11'),(8,1,4,NULL,'2024-05-08 11:52:11','2024-05-08 11:52:11'),(9,1,5,NULL,'2024-05-08 11:52:11','2024-05-08 11:52:11'),(10,1,9,NULL,'2024-05-08 11:52:11','2024-05-08 11:52:11'),(11,1,2,NULL,'2024-05-08 11:52:11','2024-05-08 11:52:11'),(12,1,3,NULL,'2024-05-08 11:52:11','2024-05-08 11:52:11'),(13,1,4,NULL,'2024-05-08 11:52:11','2024-05-08 11:52:11'),(14,1,5,NULL,'2024-05-08 11:52:11','2024-05-08 11:52:11'),(15,1,9,NULL,'2024-05-08 11:52:11','2024-05-08 11:52:11'),(16,12,3,NULL,'2024-05-08 13:38:08','2024-05-08 13:38:08'),(17,12,2,NULL,'2024-05-08 13:38:08','2024-05-08 13:38:08'),(18,12,5,NULL,'2024-05-08 13:38:08','2024-05-08 13:38:08'),(19,12,4,NULL,'2024-05-08 13:38:08','2024-05-08 13:38:08'),(20,12,9,NULL,'2024-05-08 13:38:08','2024-05-08 13:38:08');
/*!40000 ALTER TABLE `realestate_properties` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `realestate_types`
--

DROP TABLE IF EXISTS `realestate_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `realestate_types` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `realestate_types`
--

LOCK TABLES `realestate_types` WRITE;
/*!40000 ALTER TABLE `realestate_types` DISABLE KEYS */;
INSERT INTO `realestate_types` VALUES (1,'عمارة','2024-05-06 05:04:42','2024-05-06 05:04:42'),(2,'فيلا','2024-05-06 05:04:56','2024-05-06 05:04:56');
/*!40000 ALTER TABLE `realestate_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `realestates`
--

DROP TABLE IF EXISTS `realestates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `realestates` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `customer_name` varchar(255) NOT NULL,
  `owner_name` varchar(255) NOT NULL,
  `owner_number` varchar(255) NOT NULL,
  `customer_number` varchar(255) NOT NULL,
  `auction_id` bigint unsigned NOT NULL,
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `auction_id` (`auction_id`),
  CONSTRAINT `realestates_ibfk_1` FOREIGN KEY (`auction_id`) REFERENCES `auctions` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `realestates`
--

LOCK TABLES `realestates` WRITE;
/*!40000 ALTER TABLE `realestates` DISABLE KEYS */;
INSERT INTO `realestates` VALUES (1,'محمد','علي','052283832','050233222',4,'2024-05-06 10:03:31','2024-05-06 10:03:31'),(2,'عبدالعالم العمر','صالح الغامدي','0562233401','0552233401',6,'2024-05-06 10:59:14','2024-05-06 10:59:14'),(3,'سعيد الزهراني','عبدالله صالح الراجحي','0552233401','0552233401',5,'2024-05-06 11:25:09','2024-05-06 11:25:09'),(4,'مزاد الطاسان','علي عبدالله الطاسان','0552233401','0552233401',7,'2024-05-06 19:33:20','2024-05-06 19:33:20'),(5,'فيلا النرجس','سعيد قاسم احمد','0552233401','0552233401',7,'2024-05-06 19:35:50','2024-05-06 19:35:50'),(6,'نوره بنت متعب الخالدي','نوره بنت متعب الخالدي','0552233401','0552233401',8,'2024-05-06 20:03:36','2024-05-06 20:03:36'),(12,'الزبير محمد','محمود طه','0502342','05229292',11,'2024-05-08 13:37:33','2024-05-08 13:37:33');
/*!40000 ALTER TABLE `realestates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role_permissions`
--

DROP TABLE IF EXISTS `role_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role_permissions` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `role_id` bigint unsigned NOT NULL,
  `permission_id` bigint unsigned NOT NULL,
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `role_id` (`role_id`),
  KEY `permission_id` (`permission_id`),
  CONSTRAINT `role_permissions_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE,
  CONSTRAINT `role_permissions_ibfk_2` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_permissions`
--

LOCK TABLES `role_permissions` WRITE;
/*!40000 ALTER TABLE `role_permissions` DISABLE KEYS */;
INSERT INTO `role_permissions` VALUES (2,2,1,'2024-05-05 12:28:32','2024-05-05 12:28:32'),(3,3,1,'2024-05-06 05:39:26','2024-05-06 05:39:26');
/*!40000 ALTER TABLE `role_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'مدخل بيانات','2024-05-05 12:27:47','2024-05-05 12:27:47'),(2,'مدخل بيانات','2024-05-05 12:28:32','2024-05-05 12:28:32'),(3,'مدخل بيانات','2024-05-06 05:39:26','2024-05-06 05:39:26');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `scans`
--

DROP TABLE IF EXISTS `scans`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `scans` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `lat` varchar(255) NOT NULL,
  `lng` varchar(255) NOT NULL,
  `user_id` bigint unsigned NOT NULL,
  `realestate_id` bigint unsigned NOT NULL,
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `realestate_id` (`realestate_id`),
  CONSTRAINT `scans_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `scans_ibfk_2` FOREIGN KEY (`realestate_id`) REFERENCES `realestates` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `scans`
--

LOCK TABLES `scans` WRITE;
/*!40000 ALTER TABLE `scans` DISABLE KEYS */;
INSERT INTO `scans` VALUES (1,'5.2323','4.2333',2,4,'2024-05-06 20:08:00','2024-05-06 20:08:00'),(2,'5.2323','4.2333',2,1,'2024-05-08 11:52:11','2024-05-08 11:52:11'),(3,'5.2323','4.2333',2,1,'2024-05-08 11:52:11','2024-05-08 11:52:11'),(4,'5.2323','4.2333',2,12,'2024-05-08 13:38:08','2024-05-08 13:38:08');
/*!40000 ALTER TABLE `scans` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_roles`
--

DROP TABLE IF EXISTS `user_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_roles` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `role_id` bigint unsigned NOT NULL,
  `user_id` bigint unsigned NOT NULL,
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `role_id` (`role_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `user_roles_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE,
  CONSTRAINT `user_roles_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_roles`
--

LOCK TABLES `user_roles` WRITE;
/*!40000 ALTER TABLE `user_roles` DISABLE KEYS */;
INSERT INTO `user_roles` VALUES (2,2,3,'2024-05-05 12:28:58','2024-05-05 12:28:58');
/*!40000 ALTER TABLE `user_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `admin_id` bigint unsigned NOT NULL,
  `password` varchar(255) NOT NULL,
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `admin_id` (`admin_id`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`admin_id`) REFERENCES `admins` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (2,'الزبير محمد','dev.alzubair@gmail.com',NULL,1,'$2a$10$1ptcPgMZnG2hBCMYXi0EweMr6ROTZ9uq5GVdLoh7.TwCKb8Idsgau','2024-05-05 12:27:15','2024-05-05 12:27:15'),(3,'الزبير محمد','dev.alzubair1@gmail.com',NULL,1,'$2a$10$DM/xIcJA8N70sSrqmO/Nm.MwYa0wgUJGQ9ANqEk05qasCbX/Z70Z.','2024-05-05 12:28:57','2024-05-05 12:28:57');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-09 13:10:35
