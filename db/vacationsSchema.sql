CREATE DATABASE  IF NOT EXISTS `vacationsDB` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `vacationsDB`;
-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: vacationsDB
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likes` (
  `user_id` int NOT NULL,
  `vacation_id` int NOT NULL,
  PRIMARY KEY (`user_id`,`vacation_id`),
  KEY `vacation_id` (`vacation_id`),
  CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`vacation_id`) REFERENCES `vacations` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
INSERT INTO `likes` VALUES (21,2),(21,4),(23,4),(21,5),(23,5),(21,6),(23,6),(21,7),(23,7),(21,8),(23,10),(21,11),(23,11),(21,12),(23,13);
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('regular','admin') NOT NULL DEFAULT 'regular',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (20,'admin','admin','admin@gmail.com','$2b$10$RVGjTUVtvxFM1dWkJgDv4OXB93R3eN47p5DENhdWadvyCCQCf6f6C','admin'),(21,'nati','alayo','nati@gmail.com','$2b$10$hU.ARSnVZEGbCQBk2HO/HuDX825n4VSDmNF7G9ZpvZoihoSKXr9iK','regular'),(22,'user1','test','user1@gmail.com','$2b$10$k4LybQwaIcFOmG2OHzKfuuoTOCd5N/g9DqixhHFVgMRCQrdea5qrO','regular'),(23,'user2','test','user2@gmail.com','$2b$10$J3SJnkBN1yOCbIBGXwHUnOksKIWwD6dL3NUkz/6K.wI9fTHh.dOKa','regular');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vacations`
--

DROP TABLE IF EXISTS `vacations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vacations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `destination` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `price` int NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vacations`
--

LOCK TABLES `vacations` WRITE;
/*!40000 ALTER TABLE `vacations` DISABLE KEYS */;
INSERT INTO `vacations` VALUES (2,'Rome, Italy','Explore the historic landmarks of Rome, including the Colosseum, Vatican City, and world-famous Italian cuisine.','2024-09-05','2024-09-12',1500,'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Trevi_Fountain%2C_Rome%2C_Italy_2_-_May_2007.jpg/1200px-Trevi_Fountain%2C_Rome%2C_Italy_2_-_May_2007.jpg'),(4,'Hilo, Hawaii','Discover the beauty of Hilo with its lush landscapes, volcanoes, and breathtaking beaches on the Big Island.','2024-05-20','2024-05-27',1600,'https://upload.wikimedia.org/wikipedia/commons/e/e0/Hilo.jpg'),(5,'Kyoto, Japan','Experience traditional Japanese culture in Kyoto, known for its temples, shrines, and stunning cherry blossoms.','2024-04-12','2024-04-19',2000,'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Chuurei-tou_Fujiyoshida_17025277650_c59733d6ba_o.jpg/800px-Chuurei-tou_Fujiyoshida_17025277650_c59733d6ba_o.jpg'),(6,'Barcelona, Spain','Enjoy the vibrant architecture, delicious tapas, and lively atmosphere of Barcelona, a Mediterranean gem.','2024-08-15','2024-08-22',1400,'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Aerial_view_of_Barcelona%2C_Spain_%2851227309370%29_%28cropped%29.jpg/1200px-Aerial_view_of_Barcelona%2C_Spain_%2851227309370%29_%28cropped%29.jpg'),(7,'Sydney, Australia','Visit iconic landmarks like the Sydney Opera House and Bondi Beach in Australia’s largest city.','2024-03-08','2024-03-15',1900,'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Sydney_Opera_House_and_Harbour_Bridge_Dusk_%282%29_2019-06-21.jpg/800px-Sydney_Opera_House_and_Harbour_Bridge_Dusk_%282%29_2019-06-21.jpg'),(8,'Cape Town, South Africa','Explore the stunning coastal city of Cape Town, with its scenic landscapes and rich cultural history.','2024-11-05','2024-11-12',1700,'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Ciudad_del_Cabo_desde_Cabeza_de_Le%C3%B3n%2C_Sud%C3%A1frica%2C_2018-07-22%2C_DD_20-23_PAN.jpg/850px-Ciudad_del_Cabo_desde_Cabeza_de_Le%C3%B3n%2C_Sud%C3%A1frica%2C_2018-07-22%2C_DD_20-23_PAN.jpg'),(9,'Paris, France','Experience the romance of Paris with its famous art, architecture, and delightful French cuisine.','2024-12-16','2024-12-17',1600,'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg/800px-La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg'),(10,'Banff, Canada','Discover the rugged beauty of Banff National Park, known for its snow-capped mountains and crystal lakes.','2024-02-01','2024-02-08',900,'https://upload.wikimedia.org/wikipedia/commons/c/c5/Moraine_Lake_17092005.jpg'),(11,'Reykjavik, Iceland','Witness the natural wonders of Iceland, including geysers, waterfalls, and the mesmerizing Northern Lights.','2024-01-15','2024-01-22',1300,'https://upload.wikimedia.org/wikipedia/commons/1/19/Reykjavik%2C_Iceland.jpg'),(12,'Queenstown, New Zealand','Adventure awaits in Queenstown, a paradise for outdoor enthusiasts and stunning lake views.','2024-10-10','2024-10-17',2000,'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Lake_Wakatipu_from_Queenstown_gondola.jpg/800px-Lake_Wakatipu_from_Queenstown_gondola.jpg'),(13,'Jerusalem, Israel','Visit the beautifull kotel','2024-12-01','2024-12-20',1000,'https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Dome_of_the_Rock_seen_from_the_Mount_of_Olives_%2812395649153%29_%28cropped%29.jpg/640px-Dome_of_the_Rock_seen_from_the_Mount_of_Olives_%2812395649153%29_%28cropped%29.jpg'),(22,'Tel Aviv, Israel.','Adventure awaits in this big city.\n','2024-12-08','2024-12-09',1000,'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Peta_Tikwa.jpg/1200px-Peta_Tikwa.jpg');
/*!40000 ALTER TABLE `vacations` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-15 15:01:43
