-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: localhost    Database: cuivet-api
-- ------------------------------------------------------
-- Server version	8.0.29

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
-- Table structure for table `anamnesis`
--

DROP TABLE IF EXISTS `anamnesis`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `anamnesis` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `visitId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `visitId` (`visitId`),
  CONSTRAINT `anamnesis_ibfk_1` FOREIGN KEY (`visitId`) REFERENCES `visit` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `anamnesis`
--

LOCK TABLES `anamnesis` WRITE;
/*!40000 ALTER TABLE `anamnesis` DISABLE KEYS */;
/*!40000 ALTER TABLE `anamnesis` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `anamnesis_item`
--

DROP TABLE IF EXISTS `anamnesis_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `anamnesis_item` (
  `id` int NOT NULL AUTO_INCREMENT,
  `booleanResponse` tinyint(1) DEFAULT NULL,
  `textResponse` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `anamnesisId` int DEFAULT NULL,
  `anamnesisQuestionId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `anamnesisId` (`anamnesisId`),
  KEY `anamnesisQuestionId` (`anamnesisQuestionId`),
  CONSTRAINT `anamnesis_item_ibfk_1` FOREIGN KEY (`anamnesisId`) REFERENCES `anamnesis` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `anamnesis_item_ibfk_2` FOREIGN KEY (`anamnesisQuestionId`) REFERENCES `anamnesis_question` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `anamnesis_item`
--

LOCK TABLES `anamnesis_item` WRITE;
/*!40000 ALTER TABLE `anamnesis_item` DISABLE KEYS */;
/*!40000 ALTER TABLE `anamnesis_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `anamnesis_question`
--

DROP TABLE IF EXISTS `anamnesis_question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `anamnesis_question` (
  `id` int NOT NULL AUTO_INCREMENT,
  `question` varchar(255) DEFAULT NULL,
  `isBooleanResponse` tinyint(1) DEFAULT NULL,
  `isTextResponse` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `anamnesis_question`
--

LOCK TABLES `anamnesis_question` WRITE;
/*!40000 ALTER TABLE `anamnesis_question` DISABLE KEYS */;
INSERT INTO `anamnesis_question` VALUES (1,'¿Presenta lesiones expuestas? Describa cuales',1,1,'2024-10-30 14:44:48','2024-10-30 14:44:48'),(2,'¿El pulso es correcto?',1,0,'2024-10-30 14:44:48','2024-10-30 14:44:48'),(3,'¿Cómo ve el estado de la mascota en general?',0,1,'2024-10-30 14:44:48','2024-10-30 14:44:48');
/*!40000 ALTER TABLE `anamnesis_question` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clinical_record`
--

DROP TABLE IF EXISTS `clinical_record`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clinical_record` (
  `id` int NOT NULL AUTO_INCREMENT,
  `reasonConsultation` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `petId` int DEFAULT NULL,
  `vetId` int DEFAULT NULL,
  `veterinaryId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `petId` (`petId`),
  KEY `vetId` (`vetId`),
  KEY `veterinaryId` (`veterinaryId`),
  CONSTRAINT `clinical_record_ibfk_1` FOREIGN KEY (`petId`) REFERENCES `pet` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `clinical_record_ibfk_2` FOREIGN KEY (`vetId`) REFERENCES `vet` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `clinical_record_ibfk_3` FOREIGN KEY (`veterinaryId`) REFERENCES `veterinary` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10000 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clinical_record`
--

LOCK TABLES `clinical_record` WRITE;
/*!40000 ALTER TABLE `clinical_record` DISABLE KEYS */;
/*!40000 ALTER TABLE `clinical_record` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `complementary_study`
--

DROP TABLE IF EXISTS `complementary_study`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `complementary_study` (
  `id` int NOT NULL AUTO_INCREMENT,
  `url` varchar(255) DEFAULT NULL,
  `observation` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `presumptiveDiagnosisId` int DEFAULT NULL,
  `complementaryStudyTypeId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `presumptiveDiagnosisId` (`presumptiveDiagnosisId`),
  KEY `complementaryStudyTypeId` (`complementaryStudyTypeId`),
  CONSTRAINT `complementary_study_ibfk_1` FOREIGN KEY (`presumptiveDiagnosisId`) REFERENCES `presumptive_diagnosis` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `complementary_study_ibfk_2` FOREIGN KEY (`complementaryStudyTypeId`) REFERENCES `complementary_study_type` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `complementary_study`
--

LOCK TABLES `complementary_study` WRITE;
/*!40000 ALTER TABLE `complementary_study` DISABLE KEYS */;
/*!40000 ALTER TABLE `complementary_study` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `complementary_study_type`
--

DROP TABLE IF EXISTS `complementary_study_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `complementary_study_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `complementary_study_type`
--

LOCK TABLES `complementary_study_type` WRITE;
/*!40000 ALTER TABLE `complementary_study_type` DISABLE KEYS */;
INSERT INTO `complementary_study_type` VALUES (1,'Ecografía','2024-10-30 14:44:48','2024-10-30 14:44:48'),(2,'Rayos','2024-10-30 14:44:48','2024-10-30 14:44:48'),(3,'Tomografía','2024-10-30 14:44:48','2024-10-30 14:44:48'),(4,'Citología vaginal','2024-10-30 14:44:48','2024-10-30 14:44:48'),(5,'Coprocultivo','2024-10-30 14:44:48','2024-10-30 14:44:48'),(6,'Coproparasitológico (parasitológico seriado)','2024-10-30 14:44:48','2024-10-30 14:44:48'),(7,'Funcional de materia fecal','2024-10-30 14:44:48','2024-10-30 14:44:48'),(8,'Cultivo de hongos','2024-10-30 14:44:48','2024-10-30 14:44:48'),(9,'Cultivo, identificación y antibiograma','2024-10-30 14:44:48','2024-10-30 14:44:48'),(10,'Urocultivo (orina completa, identificación, antibiograma)','2024-10-30 14:44:48','2024-10-30 14:44:48'),(11,'Antibiograma','2024-10-30 14:44:48','2024-10-30 14:44:48'),(12,'Espermocultivo','2024-10-30 14:44:48','2024-10-30 14:44:48'),(13,'Espermograma','2024-10-30 14:44:48','2024-10-30 14:44:48'),(14,'Hemocultivo automatizado','2024-10-30 14:44:48','2024-10-30 14:44:48'),(15,'Hisopado ótico directo','2024-10-30 14:44:48','2024-10-30 14:44:48'),(16,'Raspado de piel','2024-10-30 14:44:48','2024-10-30 14:44:48'),(17,'Sangre oculta en materia fecal (colorimétrico)','2024-10-30 14:44:48','2024-10-30 14:44:48'),(18,'Ácido fólico veterinario','2024-10-30 14:44:48','2024-10-30 14:44:48'),(19,'Adrenocorticotropina (ACTH)','2024-10-30 14:44:48','2024-10-30 14:44:48'),(20,'Cortisol libre urinario (CLU)','2024-10-30 14:44:48','2024-10-30 14:44:48'),(21,'Cortisol plasmático','2024-10-30 14:44:48','2024-10-30 14:44:48'),(22,'Cortisol post ACTH','2024-10-30 14:44:48','2024-10-30 14:44:48'),(23,'Cortisol post dexametasona','2024-10-30 14:44:48','2024-10-30 14:44:48'),(24,'Estradiol','2024-10-30 14:44:48','2024-10-30 14:44:48'),(25,'Fosfatasa ácida prostática','2024-10-30 14:44:48','2024-10-30 14:44:48'),(26,'Insulina (insulinemia)','2024-10-30 14:44:48','2024-10-30 14:44:48'),(27,'Progesterona','2024-10-30 14:44:48','2024-10-30 14:44:48'),(28,'Testosterona','2024-10-30 14:44:48','2024-10-30 14:44:48'),(29,'Tirotrofina (TSH)','2024-10-30 14:44:48','2024-10-30 14:44:48'),(30,'Tiroxina efectiva (T4 Libre)','2024-10-30 14:44:48','2024-10-30 14:44:48'),(31,'Tiroxina total (T4)','2024-10-30 14:44:48','2024-10-30 14:44:48'),(32,'Tiroxina total post estimulación TRH (6 horas)','2024-10-30 14:44:48','2024-10-30 14:44:48'),(33,'Triiodotironina (T3)','2024-10-30 14:44:48','2024-10-30 14:44:48'),(34,'TSH post TRH','2024-10-30 14:44:48','2024-10-30 14:44:48'),(35,'25-Hidroxivitamina D total','2024-10-30 14:44:48','2024-10-30 14:44:48'),(36,'Vitamina B12','2024-10-30 14:44:48','2024-10-30 14:44:48'),(37,'Ac. Antinucleares (FAN)','2024-10-30 14:44:48','2024-10-30 14:44:48'),(38,'Ac . anti Músculo Estriado (IFI)','2024-10-30 14:44:48','2024-10-30 14:44:48'),(39,'Babesia (PCR)','2024-10-30 14:44:48','2024-10-30 14:44:48'),(40,'Brucelosis canina (aglutinación simple)','2024-10-30 14:44:48','2024-10-30 14:44:48'),(41,'Brucelosis canina (hemocultivo)','2024-10-30 14:44:48','2024-10-30 14:44:48'),(42,'Brucelosis canina (PCR)','2024-10-30 14:44:48','2024-10-30 14:44:48'),(43,'Criptococcus neoformans','2024-10-30 14:44:48','2024-10-30 14:44:48'),(44,'Dirofilaria (IC)','2024-10-30 14:44:48','2024-10-30 14:44:48'),(45,'Distemper canino (IC)','2024-10-30 14:44:48','2024-10-30 14:44:48'),(46,'Distemper canino (IFI)','2024-10-30 14:44:48','2024-10-30 14:44:48'),(47,'Distemper canino (PCR)','2024-10-30 14:44:48','2024-10-30 14:44:48'),(48,'Erlichiosis canina (IFI - IC)','2024-10-30 14:44:48','2024-10-30 14:44:48'),(49,'Erlichiosis canina (PCR)','2024-10-30 14:44:48','2024-10-30 14:44:48'),(50,'Hepatitis canina','2024-10-30 14:44:48','2024-10-30 14:44:48'),(51,'Hepatozoon canis (PCR)','2024-10-30 14:44:48','2024-10-30 14:44:48'),(52,'Herpes canino (IFI)','2024-10-30 14:44:48','2024-10-30 14:44:48'),(53,'Leishmaniasis (IC)','2024-10-30 14:44:48','2024-10-30 14:44:48'),(54,'Leishmania con titulación IgG','2024-10-30 14:44:48','2024-10-30 14:44:48'),(55,'Leptospirosis (microaglutinación con serovares)','2024-10-30 14:44:48','2024-10-30 14:44:48'),(56,'Leptospirosis equina','2024-10-30 14:44:48','2024-10-30 14:44:48'),(57,'Microfilariosis (test de Knott)','2024-10-30 14:44:48','2024-10-30 14:44:48'),(58,'Mycoplasma (PCR)','2024-10-30 14:44:48','2024-10-30 14:44:48'),(59,'Neosporosis (IFI)','2024-10-30 14:44:48','2024-10-30 14:44:48'),(60,'Parvovirus (IFI - IC)','2024-10-30 14:44:48','2024-10-30 14:44:48'),(61,'Parvovirus canino (PCR)','2024-10-30 14:44:48','2024-10-30 14:44:48'),(62,'Peritonitis infecciosa felina (IC)','2024-10-30 14:44:48','2024-10-30 14:44:48'),(63,'Toxoplasmosis Ac. IgG (memoria inmunológica)','2024-10-30 14:44:48','2024-10-30 14:44:48'),(64,'Toxoplasmosis Ac. IgM (infección reciente)','2024-10-30 14:44:48','2024-10-30 14:44:48'),(65,'Virus inmunodeficiencia felina (VIF) y virus de leucemia felina (VILEF)','2024-10-30 14:44:48','2024-10-30 14:44:48');
/*!40000 ALTER TABLE `complementary_study_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `diagnosis`
--

DROP TABLE IF EXISTS `diagnosis`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `diagnosis` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `visitId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `visitId` (`visitId`),
  CONSTRAINT `diagnosis_ibfk_1` FOREIGN KEY (`visitId`) REFERENCES `visit` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `diagnosis`
--

LOCK TABLES `diagnosis` WRITE;
/*!40000 ALTER TABLE `diagnosis` DISABLE KEYS */;
/*!40000 ALTER TABLE `diagnosis` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `diagnosis_item`
--

DROP TABLE IF EXISTS `diagnosis_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `diagnosis_item` (
  `id` int NOT NULL AUTO_INCREMENT,
  `observation` varchar(255) DEFAULT NULL,
  `diagnosisResult` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `diagnosisTypeId` int DEFAULT NULL,
  `diagnosisId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `diagnosisTypeId` (`diagnosisTypeId`),
  KEY `diagnosisId` (`diagnosisId`),
  CONSTRAINT `diagnosis_item_ibfk_1` FOREIGN KEY (`diagnosisTypeId`) REFERENCES `diagnosis_type` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `diagnosis_item_ibfk_2` FOREIGN KEY (`diagnosisId`) REFERENCES `diagnosis` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `diagnosis_item`
--

LOCK TABLES `diagnosis_item` WRITE;
/*!40000 ALTER TABLE `diagnosis_item` DISABLE KEYS */;
/*!40000 ALTER TABLE `diagnosis_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `diagnosis_item_treatment`
--

DROP TABLE IF EXISTS `diagnosis_item_treatment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `diagnosis_item_treatment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `frecuencyInterval` int DEFAULT NULL,
  `frecuencyDuration` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `diagnosisItemId` int DEFAULT NULL,
  `treatmentOptionId` int DEFAULT NULL,
  `drugId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `diagnosisItemId` (`diagnosisItemId`),
  KEY `treatmentOptionId` (`treatmentOptionId`),
  KEY `drugId` (`drugId`),
  CONSTRAINT `diagnosis_item_treatment_ibfk_1` FOREIGN KEY (`diagnosisItemId`) REFERENCES `diagnosis_item` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `diagnosis_item_treatment_ibfk_2` FOREIGN KEY (`treatmentOptionId`) REFERENCES `treatment_option` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `diagnosis_item_treatment_ibfk_3` FOREIGN KEY (`drugId`) REFERENCES `drug` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `diagnosis_item_treatment`
--

LOCK TABLES `diagnosis_item_treatment` WRITE;
/*!40000 ALTER TABLE `diagnosis_item_treatment` DISABLE KEYS */;
/*!40000 ALTER TABLE `diagnosis_item_treatment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `diagnosis_type`
--

DROP TABLE IF EXISTS `diagnosis_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `diagnosis_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `diagnosis_type`
--

LOCK TABLES `diagnosis_type` WRITE;
/*!40000 ALTER TABLE `diagnosis_type` DISABLE KEYS */;
INSERT INTO `diagnosis_type` VALUES (1,'Arritmia','2024-10-30 14:44:48','2024-10-30 14:44:48'),(2,'Infección Urinaria','2024-10-30 14:44:48','2024-10-30 14:44:48'),(3,'Fractura Expuesta','2024-10-30 14:44:48','2024-10-30 14:44:48');
/*!40000 ALTER TABLE `diagnosis_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `drug`
--

DROP TABLE IF EXISTS `drug`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `drug` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `drugTypeId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `drugTypeId` (`drugTypeId`),
  CONSTRAINT `drug_ibfk_1` FOREIGN KEY (`drugTypeId`) REFERENCES `drug_type` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `drug`
--

LOCK TABLES `drug` WRITE;
/*!40000 ALTER TABLE `drug` DISABLE KEYS */;
INSERT INTO `drug` VALUES (1,'Ketorolac Sublingual 100ml','2024-10-30 14:44:48','2024-10-30 14:44:48',1),(2,'Ibuprofeno 600ml','2024-10-30 14:44:48','2024-10-30 14:44:48',2),(3,'Rifocina','2024-10-30 14:44:48','2024-10-30 14:44:48',3);
/*!40000 ALTER TABLE `drug` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `drug_type`
--

DROP TABLE IF EXISTS `drug_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `drug_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `drug_type`
--

LOCK TABLES `drug_type` WRITE;
/*!40000 ALTER TABLE `drug_type` DISABLE KEYS */;
INSERT INTO `drug_type` VALUES (1,'Antibiotico','2024-10-30 14:44:45','2024-10-30 14:44:45'),(2,'Vacuna','2024-10-30 14:44:45','2024-10-30 14:44:45'),(3,'Desparacitante','2024-10-30 14:44:45','2024-10-30 14:44:45');
/*!40000 ALTER TABLE `drug_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hair_color`
--

DROP TABLE IF EXISTS `hair_color`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hair_color` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hair_color`
--

LOCK TABLES `hair_color` WRITE;
/*!40000 ALTER TABLE `hair_color` DISABLE KEYS */;
INSERT INTO `hair_color` VALUES (1,'Negro','2024-10-30 14:44:48','2024-10-30 14:44:48'),(2,'Blanco','2024-10-30 14:44:48','2024-10-30 14:44:48'),(3,'Chocolate','2024-10-30 14:44:48','2024-10-30 14:44:48'),(4,'Amarillo','2024-10-30 14:44:48','2024-10-30 14:44:48'),(5,'Gris','2024-10-30 14:44:48','2024-10-30 14:44:48'),(6,'Dorado','2024-10-30 14:44:48','2024-10-30 14:44:48');
/*!40000 ALTER TABLE `hair_color` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hair_length`
--

DROP TABLE IF EXISTS `hair_length`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hair_length` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hair_length`
--

LOCK TABLES `hair_length` WRITE;
/*!40000 ALTER TABLE `hair_length` DISABLE KEYS */;
INSERT INTO `hair_length` VALUES (1,'Corto','De 1 a 4 cm','2024-10-30 14:44:48','2024-10-30 14:44:48'),(2,'Medio','De 4 a 6 cm','2024-10-30 14:44:48','2024-10-30 14:44:48'),(3,'Largo','Más de 6 cm','2024-10-30 14:44:48','2024-10-30 14:44:48');
/*!40000 ALTER TABLE `hair_length` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `person`
--

DROP TABLE IF EXISTS `person`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `person` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `dni` int DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `person_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `person`
--

LOCK TABLES `person` WRITE;
/*!40000 ALTER TABLE `person` DISABLE KEYS */;
INSERT INTO `person` VALUES (1,'SERGIO','BARELLA','3515521098','Lafinur 3129',17382467,'https://firebasestorage.googleapis.com/v0/b/cuivet-5596d.appspot.com/o/persons%2FThu%20Oct%2031%202024%2013%3A42%3A14%20GMT-0300%20(hora%20est%C3%A1ndar%20de%20Argentina)?alt=media&token=9489de5d-4b99-467c-8fa2-96017318b10b','2024-10-30 14:48:18','2024-10-31 16:42:16',1),(2,'JORGE IGNACIO','BARBARA','45641328','SDAD 1321',1,'https://firebasestorage.googleapis.com/v0/b/cuivet-5596d.appspot.com/o/persons%2FWed%20Oct%2030%202024%2019%3A14%3A18%20GMT-0300%20(hora%20est%C3%A1ndar%20de%20Argentina)?alt=media&token=f87f617b-8619-4f27-93a4-10fcb41d3516','2024-10-30 15:06:19','2024-10-30 22:14:19',2),(3,'MARTINA','BARELLA','3513026921','Lafinur 3129',41002701,'https://firebasestorage.googleapis.com/v0/b/cuivet-5596d.appspot.com/o/persons%2FThu%20Oct%2031%202024%2013%3A48%3A35%20GMT-0300%20(hora%20est%C3%A1ndar%20de%20Argentina)?alt=media&token=54698f5a-6e57-418c-9373-3c9afb43dd02','2024-10-30 15:07:54','2024-10-31 16:48:40',3),(4,'EDGARDO ARTURO ','BORELLO','45648651','asdasad',2,NULL,'2024-10-31 14:05:12','2024-10-31 14:05:12',4),(5,'MARIA EUGENIA','FRATTIN','3513026921','Lfinur 3129',5,NULL,'2024-11-01 15:29:28','2024-11-01 15:29:28',5);
/*!40000 ALTER TABLE `person` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pet`
--

DROP TABLE IF EXISTS `pet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pet` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `birth` datetime DEFAULT NULL,
  `isMale` tinyint(1) DEFAULT NULL,
  `castrationDate` datetime DEFAULT NULL,
  `haveChip` tinyint(1) DEFAULT NULL,
  `aspects` varchar(255) DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `tutorId` int DEFAULT NULL,
  `raceId` int DEFAULT NULL,
  `hairColorId` int DEFAULT NULL,
  `hairLengthId` int DEFAULT NULL,
  `petSizeId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tutorId` (`tutorId`),
  KEY `raceId` (`raceId`),
  KEY `hairColorId` (`hairColorId`),
  KEY `hairLengthId` (`hairLengthId`),
  KEY `petSizeId` (`petSizeId`),
  CONSTRAINT `pet_ibfk_1` FOREIGN KEY (`tutorId`) REFERENCES `tutor` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `pet_ibfk_2` FOREIGN KEY (`raceId`) REFERENCES `race` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `pet_ibfk_3` FOREIGN KEY (`hairColorId`) REFERENCES `hair_color` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `pet_ibfk_4` FOREIGN KEY (`hairLengthId`) REFERENCES `hair_length` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `pet_ibfk_5` FOREIGN KEY (`petSizeId`) REFERENCES `pet_size` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pet`
--

LOCK TABLES `pet` WRITE;
/*!40000 ALTER TABLE `pet` DISABLE KEYS */;
INSERT INTO `pet` VALUES (2,'Balu','2018-08-22 03:00:00',1,NULL,0,NULL,'https://firebasestorage.googleapis.com/v0/b/cuivet-5596d.appspot.com/o/pets%2FThu%20Oct%2031%202024%2014%3A12%3A50%20GMT-0300%20(hora%20est%C3%A1ndar%20de%20Argentina)?alt=media&token=481537b0-6f84-497d-9840-b8773ea4ee96','2024-10-31 17:12:42','2024-10-31 17:12:51',1,1,6,1,2);
/*!40000 ALTER TABLE `pet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pet_association`
--

DROP TABLE IF EXISTS `pet_association`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pet_association` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `petId` int DEFAULT NULL,
  `veterinaryId` int DEFAULT NULL,
  `vetId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `petId` (`petId`),
  KEY `veterinaryId` (`veterinaryId`),
  KEY `vetId` (`vetId`),
  CONSTRAINT `pet_association_ibfk_1` FOREIGN KEY (`petId`) REFERENCES `pet` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `pet_association_ibfk_2` FOREIGN KEY (`veterinaryId`) REFERENCES `veterinary` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `pet_association_ibfk_3` FOREIGN KEY (`vetId`) REFERENCES `vet` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pet_association`
--

LOCK TABLES `pet_association` WRITE;
/*!40000 ALTER TABLE `pet_association` DISABLE KEYS */;
INSERT INTO `pet_association` VALUES (2,'2024-10-31 17:13:18','2024-10-31 17:13:18',2,2,1);
/*!40000 ALTER TABLE `pet_association` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pet_size`
--

DROP TABLE IF EXISTS `pet_size`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pet_size` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pet_size`
--

LOCK TABLES `pet_size` WRITE;
/*!40000 ALTER TABLE `pet_size` DISABLE KEYS */;
INSERT INTO `pet_size` VALUES (1,'Pequeño','2024-10-30 14:44:48','2024-10-30 14:44:48'),(2,'Mediano','2024-10-30 14:44:48','2024-10-30 14:44:48'),(3,'Grande','2024-10-30 14:44:48','2024-10-30 14:44:48'),(4,'Gigante','2024-10-30 14:44:48','2024-10-30 14:44:48');
/*!40000 ALTER TABLE `pet_size` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `physical_exam`
--

DROP TABLE IF EXISTS `physical_exam`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `physical_exam` (
  `id` int NOT NULL AUTO_INCREMENT,
  `temperature` double DEFAULT NULL,
  `weight` double DEFAULT NULL,
  `pulse` double DEFAULT NULL,
  `mucousMembrane` varchar(255) DEFAULT NULL,
  `bodyCondition` int DEFAULT NULL,
  `observation` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `visitId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `visitId` (`visitId`),
  CONSTRAINT `physical_exam_ibfk_1` FOREIGN KEY (`visitId`) REFERENCES `visit` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `physical_exam`
--

LOCK TABLES `physical_exam` WRITE;
/*!40000 ALTER TABLE `physical_exam` DISABLE KEYS */;
/*!40000 ALTER TABLE `physical_exam` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `presumptive_diagnosis`
--

DROP TABLE IF EXISTS `presumptive_diagnosis`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `presumptive_diagnosis` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `visitId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `visitId` (`visitId`),
  CONSTRAINT `presumptive_diagnosis_ibfk_1` FOREIGN KEY (`visitId`) REFERENCES `visit` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `presumptive_diagnosis`
--

LOCK TABLES `presumptive_diagnosis` WRITE;
/*!40000 ALTER TABLE `presumptive_diagnosis` DISABLE KEYS */;
/*!40000 ALTER TABLE `presumptive_diagnosis` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `presumptive_diagnosis_item`
--

DROP TABLE IF EXISTS `presumptive_diagnosis_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `presumptive_diagnosis_item` (
  `id` int NOT NULL AUTO_INCREMENT,
  `observation` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `presumptiveDiagnosisId` int DEFAULT NULL,
  `diagnosisTypeId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `presumptiveDiagnosisId` (`presumptiveDiagnosisId`),
  KEY `diagnosisTypeId` (`diagnosisTypeId`),
  CONSTRAINT `presumptive_diagnosis_item_ibfk_1` FOREIGN KEY (`presumptiveDiagnosisId`) REFERENCES `presumptive_diagnosis` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `presumptive_diagnosis_item_ibfk_2` FOREIGN KEY (`diagnosisTypeId`) REFERENCES `diagnosis_type` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `presumptive_diagnosis_item`
--

LOCK TABLES `presumptive_diagnosis_item` WRITE;
/*!40000 ALTER TABLE `presumptive_diagnosis_item` DISABLE KEYS */;
/*!40000 ALTER TABLE `presumptive_diagnosis_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prognosis`
--

DROP TABLE IF EXISTS `prognosis`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prognosis` (
  `id` int NOT NULL AUTO_INCREMENT,
  `observation` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `visitId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `visitId` (`visitId`),
  CONSTRAINT `prognosis_ibfk_1` FOREIGN KEY (`visitId`) REFERENCES `visit` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prognosis`
--

LOCK TABLES `prognosis` WRITE;
/*!40000 ALTER TABLE `prognosis` DISABLE KEYS */;
/*!40000 ALTER TABLE `prognosis` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `race`
--

DROP TABLE IF EXISTS `race`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `race` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `specieId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `specieId` (`specieId`),
  CONSTRAINT `race_ibfk_1` FOREIGN KEY (`specieId`) REFERENCES `specie` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1104 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `race`
--

LOCK TABLES `race` WRITE;
/*!40000 ALTER TABLE `race` DISABLE KEYS */;
INSERT INTO `race` VALUES (1,'Labrador','2024-10-30 14:44:48','2024-10-30 14:44:48',1),(2,'Golden','2024-10-30 14:44:48','2024-10-30 14:44:48',1),(3,'Colly','2024-10-30 14:44:48','2024-10-30 14:44:48',1),(4,'Jack Russell','2024-10-30 14:44:48','2024-10-30 14:44:48',1),(5,'Caniche','2024-10-30 14:44:48','2024-10-30 14:44:48',1),(6,'Sin Raza','2024-10-30 14:44:48','2024-10-30 14:44:48',1),(100,'Abisinio','2024-10-30 14:44:48','2024-10-30 14:44:48',2),(101,'Bombay','2024-10-30 14:44:48','2024-10-30 14:44:48',2),(102,'Balinés','2024-10-30 14:44:48','2024-10-30 14:44:48',2),(103,'Persa','2024-10-30 14:44:48','2024-10-30 14:44:48',2),(104,'Sin Raza','2024-10-30 14:44:48','2024-10-30 14:44:48',2),(200,'Canario','2024-10-30 14:44:48','2024-10-30 14:44:48',3),(201,'Loro','2024-10-30 14:44:48','2024-10-30 14:44:48',3),(202,'Catita','2024-10-30 14:44:48','2024-10-30 14:44:48',3),(203,'Sin Raza','2024-10-30 14:44:48','2024-10-30 14:44:48',3),(300,'Holland Lop','2024-10-30 14:44:48','2024-10-30 14:44:48',4),(301,'Netherland Dwarf','2024-10-30 14:44:48','2024-10-30 14:44:48',4),(302,'Lionhead','2024-10-30 14:44:48','2024-10-30 14:44:48',4),(303,'Sin Raza','2024-10-30 14:44:48','2024-10-30 14:44:48',4),(400,'Sirio','2024-10-30 14:44:48','2024-10-30 14:44:48',5),(401,'Ruso','2024-10-30 14:44:48','2024-10-30 14:44:48',5),(402,'Roborowski','2024-10-30 14:44:48','2024-10-30 14:44:48',5),(403,'Sin Raza','2024-10-30 14:44:48','2024-10-30 14:44:48',5),(500,'Abyssinian','2024-10-30 14:44:48','2024-10-30 14:44:48',6),(501,'Peruvian','2024-10-30 14:44:48','2024-10-30 14:44:48',6),(502,'Sin Raza','2024-10-30 14:44:48','2024-10-30 14:44:48',6),(600,'Iguana','2024-10-30 14:44:48','2024-10-30 14:44:48',7),(601,'Gecko Leopardo','2024-10-30 14:44:48','2024-10-30 14:44:48',7),(602,'Dragón Barbudo','2024-10-30 14:44:48','2024-10-30 14:44:48',7),(603,'Sin Raza','2024-10-30 14:44:48','2024-10-30 14:44:48',7),(700,'Goldfish','2024-10-30 14:44:48','2024-10-30 14:44:48',8),(701,'Betta','2024-10-30 14:44:48','2024-10-30 14:44:48',8),(702,'Guppy','2024-10-30 14:44:48','2024-10-30 14:44:48',8),(703,'Sin Raza','2024-10-30 14:44:48','2024-10-30 14:44:48',8),(800,'Hurón estándar','2024-10-30 14:44:48','2024-10-30 14:44:48',9),(801,'Hurón albino','2024-10-30 14:44:48','2024-10-30 14:44:48',9),(802,'Hurón sable','2024-10-30 14:44:48','2024-10-30 14:44:48',9),(900,'Pura Sangre','2024-10-30 14:44:48','2024-10-30 14:44:48',10),(901,'Árabe','2024-10-30 14:44:48','2024-10-30 14:44:48',10),(902,'Cuarto de Milla','2024-10-30 14:44:48','2024-10-30 14:44:48',10),(903,'Sin Raza','2024-10-30 14:44:48','2024-10-30 14:44:48',10),(1000,'Vietnamita','2024-10-30 14:44:48','2024-10-30 14:44:48',11),(1001,'Berkshire','2024-10-30 14:44:48','2024-10-30 14:44:48',11),(1002,'Sin Raza','2024-10-30 14:44:48','2024-10-30 14:44:48',11),(1100,'Holstein','2024-10-30 14:44:48','2024-10-30 14:44:48',12),(1101,'Jersey','2024-10-30 14:44:48','2024-10-30 14:44:48',12),(1102,'Angus','2024-10-30 14:44:48','2024-10-30 14:44:48',12),(1103,'Sin Raza','2024-10-30 14:44:48','2024-10-30 14:44:48',12);
/*!40000 ALTER TABLE `race` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `birth` datetime DEFAULT NULL,
  `isMale` tinyint(1) DEFAULT NULL,
  `raceId` int DEFAULT NULL,
  `specieId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `visitId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `visitId` (`visitId`),
  CONSTRAINT `review_ibfk_1` FOREIGN KEY (`visitId`) REFERENCES `visit` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `specie`
--

DROP TABLE IF EXISTS `specie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `specie` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `specie`
--

LOCK TABLES `specie` WRITE;
/*!40000 ALTER TABLE `specie` DISABLE KEYS */;
INSERT INTO `specie` VALUES (1,'Perro','2024-10-30 14:44:48','2024-10-30 14:44:48'),(2,'Gato','2024-10-30 14:44:48','2024-10-30 14:44:48'),(3,'Ave','2024-10-30 14:44:48','2024-10-30 14:44:48'),(4,'Conejo','2024-10-30 14:44:48','2024-10-30 14:44:48'),(5,'Hámster','2024-10-30 14:44:48','2024-10-30 14:44:48'),(6,'Cobayo','2024-10-30 14:44:48','2024-10-30 14:44:48'),(7,'Reptil','2024-10-30 14:44:48','2024-10-30 14:44:48'),(8,'Pez','2024-10-30 14:44:48','2024-10-30 14:44:48'),(9,'Hurón','2024-10-30 14:44:48','2024-10-30 14:44:48'),(10,'Caballo','2024-10-30 14:44:48','2024-10-30 14:44:48'),(11,'Cerdo','2024-10-30 14:44:48','2024-10-30 14:44:48'),(12,'Vaca','2024-10-30 14:44:48','2024-10-30 14:44:48');
/*!40000 ALTER TABLE `specie` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `treatment_option`
--

DROP TABLE IF EXISTS `treatment_option`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `treatment_option` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `treatmentTypeId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `treatmentTypeId` (`treatmentTypeId`),
  CONSTRAINT `treatment_option_ibfk_1` FOREIGN KEY (`treatmentTypeId`) REFERENCES `treatment_type` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=206 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `treatment_option`
--

LOCK TABLES `treatment_option` WRITE;
/*!40000 ALTER TABLE `treatment_option` DISABLE KEYS */;
INSERT INTO `treatment_option` VALUES (1,'Antiinflamatorio','2024-10-30 14:44:48','2024-10-30 14:44:48',1),(2,'Hipnótico/Sedante','2024-10-30 14:44:48','2024-10-30 14:44:48',1),(3,'Antipirético/Antifebril','2024-10-30 14:44:48','2024-10-30 14:44:48',1),(4,'Analgésico','2024-10-30 14:44:48','2024-10-30 14:44:48',1),(5,'Anestésico','2024-10-30 14:44:48','2024-10-30 14:44:48',1),(6,'Antibiótico','2024-10-30 14:44:48','2024-10-30 14:44:48',1),(7,'Anticolinérgico','2024-10-30 14:44:48','2024-10-30 14:44:48',1),(8,'Anticonceptivo','2024-10-30 14:44:48','2024-10-30 14:44:48',1),(9,'Anticonvulsivo','2024-10-30 14:44:48','2024-10-30 14:44:48',1),(10,'Antidiabético','2024-10-30 14:44:48','2024-10-30 14:44:48',1),(11,'Antiemético','2024-10-30 14:44:48','2024-10-30 14:44:48',1),(12,'Antihelmíntico','2024-10-30 14:44:48','2024-10-30 14:44:48',1),(13,'Antihipertensivo','2024-10-30 14:44:48','2024-10-30 14:44:48',1),(14,'Antihistamínico','2024-10-30 14:44:48','2024-10-30 14:44:48',1),(15,'Antineoplásico','2024-10-30 14:44:48','2024-10-30 14:44:48',1),(16,'Antimicótico','2024-10-30 14:44:48','2024-10-30 14:44:48',1),(17,'Antídoto','2024-10-30 14:44:48','2024-10-30 14:44:48',1),(18,'Cardiotónico','2024-10-30 14:44:48','2024-10-30 14:44:48',1),(19,'Broncodilatador','2024-10-30 14:44:48','2024-10-30 14:44:48',1),(20,'Quimioterápico','2024-10-30 14:44:48','2024-10-30 14:44:48',1),(100,'Castración','2024-10-30 14:44:48','2024-10-30 14:44:48',2),(101,'Cirugía de obstrucción intestinal','2024-10-30 14:44:48','2024-10-30 14:44:48',2),(102,'Cirugía de hernia','2024-10-30 14:44:48','2024-10-30 14:44:48',2),(103,'Cirugía de cataratas','2024-10-30 14:44:48','2024-10-30 14:44:48',2),(104,'Cirugía traumatologica','2024-10-30 14:44:48','2024-10-30 14:44:48',2),(105,'Caudotomía','2024-10-30 14:44:48','2024-10-30 14:44:48',2),(106,'Destartraje','2024-10-30 14:44:48','2024-10-30 14:44:48',2),(107,'Esplenectomía','2024-10-30 14:44:48','2024-10-30 14:44:48',2),(108,'Otohematomas','2024-10-30 14:44:48','2024-10-30 14:44:48',2),(109,'Adenomas Perianales','2024-10-30 14:44:48','2024-10-30 14:44:48',2),(110,'Cistotomia','2024-10-30 14:44:48','2024-10-30 14:44:48',2),(111,'Cesárea','2024-10-30 14:44:48','2024-10-30 14:44:48',2),(112,'Extripación de ovarios','2024-10-30 14:44:48','2024-10-30 14:44:48',2),(113,'Extracción de tumor','2024-10-30 14:44:48','2024-10-30 14:44:48',2),(200,'Hepatitis infecciosa','2024-10-30 14:44:48','2024-10-30 14:44:48',3),(201,'Parvovirus/Moquillo','2024-10-30 14:44:48','2024-10-30 14:44:48',3),(202,'Tos de las perreras','2024-10-30 14:44:48','2024-10-30 14:44:48',3),(203,'Polivalente','2024-10-30 14:44:48','2024-10-30 14:44:48',3),(204,'Antirrábica','2024-10-30 14:44:48','2024-10-30 14:44:48',3),(205,'Polivalente rábica','2024-10-30 14:44:48','2024-10-30 14:44:48',3);
/*!40000 ALTER TABLE `treatment_option` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `treatment_type`
--

DROP TABLE IF EXISTS `treatment_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `treatment_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `treatment_type`
--

LOCK TABLES `treatment_type` WRITE;
/*!40000 ALTER TABLE `treatment_type` DISABLE KEYS */;
INSERT INTO `treatment_type` VALUES (1,'Médico','2024-10-30 14:44:48','2024-10-30 14:44:48'),(2,'Quirúrgico','2024-10-30 14:44:48','2024-10-30 14:44:48'),(3,'Preventivo','2024-10-30 14:44:48','2024-10-30 14:44:48');
/*!40000 ALTER TABLE `treatment_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tutor`
--

DROP TABLE IF EXISTS `tutor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tutor` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `tutor_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tutor`
--

LOCK TABLES `tutor` WRITE;
/*!40000 ALTER TABLE `tutor` DISABLE KEYS */;
INSERT INTO `tutor` VALUES (1,'2024-10-30 15:07:54','2024-10-30 15:07:54',3);
/*!40000 ALTER TABLE `tutor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(150) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'o@o.com','$2a$10$CX9wUGMaG3lAQM/JZD0jnOfijuAbSi94LM01L1co6LbFvMUJsnQYS','2024-10-30 14:48:18','2024-10-30 14:48:18'),(2,'v@v.com','$2a$10$kHz8qQwFaNhpGZ36p5z8Y.rAiTRumZ53hfoeLANBuOxa3tbO.ISLO','2024-10-30 15:06:19','2024-10-30 15:06:19'),(3,'t@t.com','$2a$10$Af1N8W/nF5JsabUquA9BQOX3HMby2UbWowUS6reHe3i3OC1QXikG.','2024-10-30 15:07:54','2024-10-30 15:07:54'),(4,'v1@v1.com','$2a$10$yPHNtsl0TgrxZE6OljXTduswJUWHLS6rq5IbQNx6GeSapvyLZbCh6','2024-10-31 14:05:12','2024-10-31 14:05:12'),(5,'v2@v2.com','$2a$10$BkiorH/Ey7.6sUssXYS0buoRiZdX3C81FH7WLguVEJt48k0FNSzy2','2024-11-01 15:29:28','2024-11-01 15:29:28');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vaccination`
--

DROP TABLE IF EXISTS `vaccination`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vaccination` (
  `id` int NOT NULL AUTO_INCREMENT,
  `placementDate` datetime DEFAULT NULL,
  `nextDate` datetime DEFAULT NULL,
  `weight` double DEFAULT NULL,
  `observation` varchar(255) DEFAULT NULL,
  `signed` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `drugId` int DEFAULT NULL,
  `petId` int DEFAULT NULL,
  `vetId` int DEFAULT NULL,
  `veterinaryId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `drugId` (`drugId`),
  KEY `petId` (`petId`),
  KEY `vetId` (`vetId`),
  KEY `veterinaryId` (`veterinaryId`),
  CONSTRAINT `vaccination_ibfk_1` FOREIGN KEY (`drugId`) REFERENCES `drug` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `vaccination_ibfk_2` FOREIGN KEY (`petId`) REFERENCES `pet` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `vaccination_ibfk_3` FOREIGN KEY (`vetId`) REFERENCES `vet` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `vaccination_ibfk_4` FOREIGN KEY (`veterinaryId`) REFERENCES `veterinary` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vaccination`
--

LOCK TABLES `vaccination` WRITE;
/*!40000 ALTER TABLE `vaccination` DISABLE KEYS */;
/*!40000 ALTER TABLE `vaccination` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vet`
--

DROP TABLE IF EXISTS `vet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vet` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `lat` float DEFAULT NULL,
  `lng` float DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `vetOwnerId` int DEFAULT NULL,
  `veterinaryId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `vetOwnerId` (`vetOwnerId`),
  KEY `veterinaryId` (`veterinaryId`),
  CONSTRAINT `vet_ibfk_1` FOREIGN KEY (`vetOwnerId`) REFERENCES `vet_owner` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `vet_ibfk_2` FOREIGN KEY (`veterinaryId`) REFERENCES `veterinary` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vet`
--

LOCK TABLES `vet` WRITE;
/*!40000 ALTER TABLE `vet` DISABLE KEYS */;
INSERT INTO `vet` VALUES (1,'La Cucha','4803880','Av. Colón 2183, X5003 DCF, Córdoba, Argentina',NULL,-31.4055,-64.2114,'2024-10-30 14:54:45','2024-11-01 15:31:13',1,2),(2,'Narices Frías','48656365','Hipólito Vieytes, Alberdi 271, X5002 JGE, Córdoba','https://firebasestorage.googleapis.com/v0/b/cuivet-5596d.appspot.com/o/vets%2FWed%20Oct%2030%202024%2012%3A05%3A07%20GMT-0300%20(hora%20est%C3%A1ndar%20de%20Argentina)?alt=media&token=c29988cc-f071-4bf4-8b4b-6f1758808a82',-31.409,-64.2135,'2024-10-30 14:55:57','2024-10-31 17:22:07',1,NULL),(3,'Mundo Bicho','4845628','Bv. Los Granaderos 3070, X5009 Córdoba, Argentina',NULL,-31.3736,-64.2163,'2024-10-30 14:57:00','2024-10-30 14:57:00',1,NULL),(4,'Suma','6541535','José Roque Funes 1660, X5009 LFR, Córdoba, Argentina',NULL,-31.3735,-64.2392,'2024-10-30 14:58:35','2024-10-30 14:58:35',1,NULL),(5,'Pecos','323213','Arturo M. Bas 345, Centro, X5000KLG Córdoba, Argentina','https://firebasestorage.googleapis.com/v0/b/cuivet-5596d.appspot.com/o/vets%2FWed%20Oct%2030%202024%2012%3A01%3A28%20GMT-0300%20(hora%20est%C3%A1ndar%20de%20Argentina)?alt=media&token=cf8d76bc-fb05-4f5c-ab96-eaf32adee8ac',-31.4178,-64.1936,'2024-10-30 15:01:30','2024-10-30 15:01:30',1,NULL),(6,'Veterinaria Kanus','2123213','Av. Fernando Fader 3571, X5009ABC Córdoba, Argentina','https://firebasestorage.googleapis.com/v0/b/cuivet-5596d.appspot.com/o/vets%2FWed%20Oct%2030%202024%2012%3A02%3A20%20GMT-0300%20(hora%20est%C3%A1ndar%20de%20Argentina)?alt=media&token=413e7093-99ba-4318-b904-5378f5fd503a',-31.3797,-64.2269,'2024-10-30 15:02:21','2024-10-30 15:02:21',1,NULL),(7,'Animal Life','48206652','Damian Garat 2630, X5008AHO Córdoba, Argentina','https://firebasestorage.googleapis.com/v0/b/cuivet-5596d.appspot.com/o/vets%2FWed%20Oct%2030%202024%2012%3A04%3A20%20GMT-0300%20(hora%20est%C3%A1ndar%20de%20Argentina)?alt=media&token=3c162daf-741f-48d7-93a3-37bb47d82a33',-31.3613,-64.2053,'2024-10-30 15:04:11','2024-10-30 15:04:21',1,NULL);
/*!40000 ALTER TABLE `vet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vet_hours`
--

DROP TABLE IF EXISTS `vet_hours`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vet_hours` (
  `id` int NOT NULL AUTO_INCREMENT,
  `dayOfWeek` varchar(255) DEFAULT NULL,
  `openTime` time DEFAULT NULL,
  `closeTime` time DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `vetId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `vetId` (`vetId`),
  CONSTRAINT `vet_hours_ibfk_1` FOREIGN KEY (`vetId`) REFERENCES `vet` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vet_hours`
--

LOCK TABLES `vet_hours` WRITE;
/*!40000 ALTER TABLE `vet_hours` DISABLE KEYS */;
INSERT INTO `vet_hours` VALUES (1,'Lunes',NULL,NULL,'2024-10-30 14:54:45','2024-11-01 15:31:13',1),(2,'Martes',NULL,NULL,'2024-10-30 14:54:45','2024-11-01 15:31:13',1),(3,'Miércoles',NULL,NULL,'2024-10-30 14:54:45','2024-11-01 15:31:13',1),(4,'Jueves',NULL,NULL,'2024-10-30 14:54:45','2024-11-01 15:31:13',1),(5,'Viernes',NULL,NULL,'2024-10-30 14:54:45','2024-11-01 15:31:13',1),(6,'Sábado',NULL,NULL,'2024-10-30 14:54:45','2024-11-01 15:31:13',1),(7,'Domingo',NULL,NULL,'2024-10-30 14:54:45','2024-11-01 15:31:13',1),(8,'Lunes',NULL,NULL,'2024-10-30 14:55:57','2024-10-31 17:22:07',2),(9,'Martes',NULL,NULL,'2024-10-30 14:55:57','2024-10-31 17:22:07',2),(10,'Miércoles',NULL,NULL,'2024-10-30 14:55:57','2024-10-31 17:22:07',2),(11,'Jueves',NULL,NULL,'2024-10-30 14:55:57','2024-10-31 17:22:07',2),(12,'Viernes',NULL,NULL,'2024-10-30 14:55:57','2024-10-31 17:22:07',2),(13,'Sábado',NULL,NULL,'2024-10-30 14:55:57','2024-10-31 17:22:07',2),(14,'Domingo',NULL,NULL,'2024-10-30 14:55:57','2024-10-31 17:22:07',2),(15,'Lunes','08:00:00','20:00:00','2024-10-30 14:57:00','2024-10-30 14:57:00',3),(16,'Martes','08:00:00','20:00:00','2024-10-30 14:57:00','2024-10-30 14:57:00',3),(17,'Miércoles','08:00:00','20:00:00','2024-10-30 14:57:00','2024-10-30 14:57:00',3),(18,'Jueves','08:00:00','20:00:00','2024-10-30 14:57:00','2024-10-30 14:57:00',3),(19,'Viernes','08:00:00','20:00:00','2024-10-30 14:57:00','2024-10-30 14:57:00',3),(20,'Sábado',NULL,NULL,'2024-10-30 14:57:00','2024-10-30 14:57:00',3),(21,'Domingo',NULL,NULL,'2024-10-30 14:57:00','2024-10-30 14:57:00',3),(22,'Lunes','07:00:00','20:00:00','2024-10-30 14:58:35','2024-10-30 14:58:35',4),(23,'Martes','07:00:00','20:00:00','2024-10-30 14:58:35','2024-10-30 14:58:35',4),(24,'Miércoles','07:00:00','20:00:00','2024-10-30 14:58:35','2024-10-30 14:58:35',4),(25,'Jueves','07:00:00','20:00:00','2024-10-30 14:58:35','2024-10-30 14:58:35',4),(26,'Viernes','07:00:00','20:00:00','2024-10-30 14:58:35','2024-10-30 14:58:35',4),(27,'Sábado','07:00:00','20:00:00','2024-10-30 14:58:35','2024-10-30 14:58:35',4),(28,'Domingo','07:00:00','14:00:00','2024-10-30 14:58:35','2024-10-30 14:58:35',4),(29,'Lunes','07:00:00','20:00:00','2024-10-30 15:01:30','2024-10-30 15:01:30',5),(30,'Martes','07:00:00','20:00:00','2024-10-30 15:01:30','2024-10-30 15:01:30',5),(31,'Miércoles','07:00:00','20:00:00','2024-10-30 15:01:30','2024-10-30 15:01:30',5),(32,'Jueves','07:00:00','20:00:00','2024-10-30 15:01:30','2024-10-30 15:01:30',5),(33,'Viernes','07:00:00','20:00:00','2024-10-30 15:01:30','2024-10-30 15:01:30',5),(34,'Sábado',NULL,NULL,'2024-10-30 15:01:30','2024-10-30 15:01:30',5),(35,'Domingo',NULL,NULL,'2024-10-30 15:01:30','2024-10-30 15:01:30',5),(36,'Lunes','07:00:00','20:00:00','2024-10-30 15:02:21','2024-10-30 15:02:21',6),(37,'Martes','07:00:00','20:00:00','2024-10-30 15:02:21','2024-10-30 15:02:21',6),(38,'Miércoles','07:00:00','20:00:00','2024-10-30 15:02:21','2024-10-30 15:02:21',6),(39,'Jueves','07:00:00','20:00:00','2024-10-30 15:02:21','2024-10-30 15:02:21',6),(40,'Viernes',NULL,NULL,'2024-10-30 15:02:21','2024-10-30 15:02:21',6),(41,'Sábado',NULL,NULL,'2024-10-30 15:02:21','2024-10-30 15:02:21',6),(42,'Domingo',NULL,NULL,'2024-10-30 15:02:21','2024-10-30 15:02:21',6),(43,'Lunes','08:00:00','20:00:00','2024-10-30 15:04:11','2024-10-30 15:04:21',7),(44,'Martes','08:00:00','20:00:00','2024-10-30 15:04:11','2024-10-30 15:04:21',7),(45,'Miércoles','08:00:00','20:00:00','2024-10-30 15:04:11','2024-10-30 15:04:21',7),(46,'Jueves','08:00:00','20:00:00','2024-10-30 15:04:11','2024-10-30 15:04:21',7),(47,'Viernes','08:00:00','20:00:00','2024-10-30 15:04:11','2024-10-30 15:04:21',7),(48,'Sábado','08:00:00','15:00:00','2024-10-30 15:04:11','2024-10-30 15:04:21',7),(49,'Domingo',NULL,NULL,'2024-10-30 15:04:11','2024-10-30 15:04:21',7);
/*!40000 ALTER TABLE `vet_hours` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vet_owner`
--

DROP TABLE IF EXISTS `vet_owner`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vet_owner` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `vet_owner_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vet_owner`
--

LOCK TABLES `vet_owner` WRITE;
/*!40000 ALTER TABLE `vet_owner` DISABLE KEYS */;
INSERT INTO `vet_owner` VALUES (1,'2024-10-30 14:48:18','2024-10-30 14:48:18',1);
/*!40000 ALTER TABLE `vet_owner` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `veterinary`
--

DROP TABLE IF EXISTS `veterinary`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `veterinary` (
  `id` int NOT NULL AUTO_INCREMENT,
  `mp` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `veterinary_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `veterinary`
--

LOCK TABLES `veterinary` WRITE;
/*!40000 ALTER TABLE `veterinary` DISABLE KEYS */;
INSERT INTO `veterinary` VALUES (1,2041,'2024-10-30 15:06:20','2024-10-30 15:06:20',2),(2,1234,'2024-10-31 14:05:14','2024-10-31 14:05:14',4),(3,2068,'2024-11-01 15:29:29','2024-11-01 15:29:29',5);
/*!40000 ALTER TABLE `veterinary` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `veterinary_association`
--

DROP TABLE IF EXISTS `veterinary_association`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `veterinary_association` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `vetId` int DEFAULT NULL,
  `veterinaryId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `vetId` (`vetId`),
  KEY `veterinaryId` (`veterinaryId`),
  CONSTRAINT `veterinary_association_ibfk_1` FOREIGN KEY (`vetId`) REFERENCES `vet` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `veterinary_association_ibfk_2` FOREIGN KEY (`veterinaryId`) REFERENCES `veterinary` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `veterinary_association`
--

LOCK TABLES `veterinary_association` WRITE;
/*!40000 ALTER TABLE `veterinary_association` DISABLE KEYS */;
INSERT INTO `veterinary_association` VALUES (4,'2024-11-01 15:30:40','2024-11-01 15:30:40',1,1);
/*!40000 ALTER TABLE `veterinary_association` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `visit`
--

DROP TABLE IF EXISTS `visit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `visit` (
  `id` int NOT NULL AUTO_INCREMENT,
  `control` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `clinicalRecordId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `clinicalRecordId` (`clinicalRecordId`),
  CONSTRAINT `visit_ibfk_1` FOREIGN KEY (`clinicalRecordId`) REFERENCES `clinical_record` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `visit`
--

LOCK TABLES `visit` WRITE;
/*!40000 ALTER TABLE `visit` DISABLE KEYS */;
/*!40000 ALTER TABLE `visit` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-01 17:14:17
