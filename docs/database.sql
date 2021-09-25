-- MySQL dump 10.13  Distrib 8.0.26, for Linux (x86_64)
--
-- Host: localhost    Database: viec_lam
-- ------------------------------------------------------
-- Server version	8.0.26

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
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `group_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=93 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can view log entry',1,'view_logentry'),(5,'Can add permission',2,'add_permission'),(6,'Can change permission',2,'change_permission'),(7,'Can delete permission',2,'delete_permission'),(8,'Can view permission',2,'view_permission'),(9,'Can add group',3,'add_group'),(10,'Can change group',3,'change_group'),(11,'Can delete group',3,'delete_group'),(12,'Can view group',3,'view_group'),(13,'Can add content type',4,'add_contenttype'),(14,'Can change content type',4,'change_contenttype'),(15,'Can delete content type',4,'delete_contenttype'),(16,'Can view content type',4,'view_contenttype'),(17,'Can add session',5,'add_session'),(18,'Can change session',5,'change_session'),(19,'Can delete session',5,'delete_session'),(20,'Can view session',5,'view_session'),(21,'Can add nguoi dung',6,'add_nguoidung'),(22,'Can change nguoi dung',6,'change_nguoidung'),(23,'Can delete nguoi dung',6,'delete_nguoidung'),(24,'Can view nguoi dung',6,'view_nguoidung'),(25,'Can add bang cap',7,'add_bangcap'),(26,'Can change bang cap',7,'change_bangcap'),(27,'Can delete bang cap',7,'delete_bangcap'),(28,'Can view bang cap',7,'view_bangcap'),(29,'Can add chuc danh',8,'add_chucdanh'),(30,'Can change chuc danh',8,'change_chucdanh'),(31,'Can delete chuc danh',8,'delete_chucdanh'),(32,'Can view chuc danh',8,'view_chucdanh'),(33,'Can add kinh nghiem',9,'add_kinhnghiem'),(34,'Can change kinh nghiem',9,'change_kinhnghiem'),(35,'Can delete kinh nghiem',9,'delete_kinhnghiem'),(36,'Can view kinh nghiem',9,'view_kinhnghiem'),(37,'Can add ky nang',10,'add_kynang'),(38,'Can change ky nang',10,'change_kynang'),(39,'Can delete ky nang',10,'delete_kynang'),(40,'Can view ky nang',10,'view_kynang'),(41,'Can add nganh nghe',11,'add_nganhnghe'),(42,'Can change nganh nghe',11,'change_nganhnghe'),(43,'Can delete nganh nghe',11,'delete_nganhnghe'),(44,'Can view nganh nghe',11,'view_nganhnghe'),(45,'Can add phuc loi',12,'add_phucloi'),(46,'Can change phuc loi',12,'change_phucloi'),(47,'Can delete phuc loi',12,'delete_phucloi'),(48,'Can view phuc loi',12,'view_phucloi'),(49,'Can add nha tuyen dung',13,'add_nhatuyendung'),(50,'Can change nha tuyen dung',13,'change_nhatuyendung'),(51,'Can delete nha tuyen dung',13,'delete_nhatuyendung'),(52,'Can view nha tuyen dung',13,'view_nhatuyendung'),(53,'Can add quan ly',14,'add_quanly'),(54,'Can change quan ly',14,'change_quanly'),(55,'Can delete quan ly',14,'delete_quanly'),(56,'Can view quan ly',14,'view_quanly'),(57,'Can add viec lam',15,'add_vieclam'),(58,'Can change viec lam',15,'change_vieclam'),(59,'Can delete viec lam',15,'delete_vieclam'),(60,'Can view viec lam',15,'view_vieclam'),(61,'Can add ung vien',16,'add_ungvien'),(62,'Can change ung vien',16,'change_ungvien'),(63,'Can delete ung vien',16,'delete_ungvien'),(64,'Can view ung vien',16,'view_ungvien'),(65,'Can add ung tuyen',17,'add_ungtuyen'),(66,'Can change ung tuyen',17,'change_ungtuyen'),(67,'Can delete ung tuyen',17,'delete_ungtuyen'),(68,'Can view ung tuyen',17,'view_ungtuyen'),(69,'Can add danh gia nha tuyen dung',18,'add_danhgianhatuyendung'),(70,'Can change danh gia nha tuyen dung',18,'change_danhgianhatuyendung'),(71,'Can delete danh gia nha tuyen dung',18,'delete_danhgianhatuyendung'),(72,'Can view danh gia nha tuyen dung',18,'view_danhgianhatuyendung'),(73,'Can add application',19,'add_application'),(74,'Can change application',19,'change_application'),(75,'Can delete application',19,'delete_application'),(76,'Can view application',19,'view_application'),(77,'Can add access token',20,'add_accesstoken'),(78,'Can change access token',20,'change_accesstoken'),(79,'Can delete access token',20,'delete_accesstoken'),(80,'Can view access token',20,'view_accesstoken'),(81,'Can add grant',21,'add_grant'),(82,'Can change grant',21,'change_grant'),(83,'Can delete grant',21,'delete_grant'),(84,'Can view grant',21,'view_grant'),(85,'Can add refresh token',22,'add_refreshtoken'),(86,'Can change refresh token',22,'change_refreshtoken'),(87,'Can delete refresh token',22,'delete_refreshtoken'),(88,'Can view refresh token',22,'view_refreshtoken'),(89,'Can add id token',23,'add_idtoken'),(90,'Can change id token',23,'change_idtoken'),(91,'Can delete id token',23,'delete_idtoken'),(92,'Can view id token',23,'view_idtoken');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bang_cap`
--

DROP TABLE IF EXISTS `bang_cap`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bang_cap` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `ten` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bang_cap`
--

LOCK TABLES `bang_cap` WRITE;
/*!40000 ALTER TABLE `bang_cap` DISABLE KEYS */;
INSERT INTO `bang_cap` VALUES (1,'Trung học phổ thông'),(2,'Cử nhân'),(3,'Trung cấp chuyên nghiệp'),(4,'Thạc sỹ'),(5,'Tiến sỹ');
/*!40000 ALTER TABLE `bang_cap` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chuc_danh`
--

DROP TABLE IF EXISTS `chuc_danh`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chuc_danh` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `ten` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chuc_danh`
--

LOCK TABLES `chuc_danh` WRITE;
/*!40000 ALTER TABLE `chuc_danh` DISABLE KEYS */;
/*!40000 ALTER TABLE `chuc_danh` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `danh_gia_nha_tuyen_dung`
--

DROP TABLE IF EXISTS `danh_gia_nha_tuyen_dung`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `danh_gia_nha_tuyen_dung` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `noi_dung` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `diem_danh_gia` double NOT NULL,
  `ngay_tao` date NOT NULL,
  `viec_lam_id` bigint DEFAULT NULL,
  `nha_tuyen_dung_id` bigint NOT NULL,
  `ung_vien_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `danh_gia_nha_tuyen_dung_viec_lam_id_441f2a14_fk_viec_lam_id` (`viec_lam_id`),
  KEY `danh_gia_nha_tuyen_d_nha_tuyen_dung_id_2f7fd05d_fk_nha_tuyen` (`nha_tuyen_dung_id`),
  KEY `danh_gia_nha_tuyen_d_ung_vien_id_0c36fee9_fk_ung_vien_` (`ung_vien_id`),
  CONSTRAINT `danh_gia_nha_tuyen_d_nha_tuyen_dung_id_2f7fd05d_fk_nha_tuyen` FOREIGN KEY (`nha_tuyen_dung_id`) REFERENCES `nha_tuyen_dung` (`nguoi_dung_id`),
  CONSTRAINT `danh_gia_nha_tuyen_d_ung_vien_id_0c36fee9_fk_ung_vien_` FOREIGN KEY (`ung_vien_id`) REFERENCES `ung_vien` (`nguoi_dung_id`),
  CONSTRAINT `danh_gia_nha_tuyen_dung_viec_lam_id_441f2a14_fk_viec_lam_id` FOREIGN KEY (`viec_lam_id`) REFERENCES `viec_lam` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `danh_gia_nha_tuyen_dung`
--

LOCK TABLES `danh_gia_nha_tuyen_dung` WRITE;
/*!40000 ALTER TABLE `danh_gia_nha_tuyen_dung` DISABLE KEYS */;
INSERT INTO `danh_gia_nha_tuyen_dung` VALUES (1,'Việc làm tuyệt vời',5,'2021-09-25',1,4,2),(2,'Việc làm tạm ổn',3,'2021-09-25',1,5,3),(3,'Không có nhà ăn',1,'2021-09-25',1,5,2),(4,'Không có bãi đậu xe',1,'2021-09-25',2,4,3);
/*!40000 ALTER TABLE `danh_gia_nha_tuyen_dung` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_admin_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext COLLATE utf8mb4_unicode_ci,
  `object_repr` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `action_flag` smallint unsigned NOT NULL,
  `change_message` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `content_type_id` int DEFAULT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_nguoi_dung_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_nguoi_dung_id` FOREIGN KEY (`user_id`) REFERENCES `nguoi_dung` (`id`),
  CONSTRAINT `django_admin_log_chk_1` CHECK ((`action_flag` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
INSERT INTO `django_admin_log` VALUES (1,'2021-09-25 13:37:14.687569','1','BangCap object (1)',1,'[{\"added\": {}}]',7,1),(2,'2021-09-25 13:37:25.242595','1','BangCap object (1)',2,'[]',7,1),(3,'2021-09-25 13:37:36.106784','2','BangCap object (2)',1,'[{\"added\": {}}]',7,1),(4,'2021-09-25 13:37:46.184532','3','BangCap object (3)',1,'[{\"added\": {}}]',7,1),(5,'2021-09-25 13:37:52.723007','4','BangCap object (4)',1,'[{\"added\": {}}]',7,1),(6,'2021-09-25 13:37:56.890563','5','BangCap object (5)',1,'[{\"added\": {}}]',7,1),(7,'2021-09-25 13:40:32.365251','1','KinhNghiem object (1)',1,'[{\"added\": {}}]',9,1),(8,'2021-09-25 13:40:55.427421','2','KinhNghiem object (2)',1,'[{\"added\": {}}]',9,1),(9,'2021-09-25 13:41:11.822071','3','KinhNghiem object (3)',1,'[{\"added\": {}}]',9,1),(10,'2021-09-25 13:41:39.145865','4','KinhNghiem object (4)',1,'[{\"added\": {}}]',9,1),(11,'2021-09-25 13:42:59.151274','1','KyNang object (1)',1,'[{\"added\": {}}]',10,1),(12,'2021-09-25 13:43:06.331362','2','KyNang object (2)',1,'[{\"added\": {}}]',10,1),(13,'2021-09-25 13:43:20.276070','3','KyNang object (3)',1,'[{\"added\": {}}]',10,1),(14,'2021-09-25 13:43:26.261474','4','KyNang object (4)',1,'[{\"added\": {}}]',10,1),(15,'2021-09-25 13:43:39.557891','1','NganhNghe object (1)',1,'[{\"added\": {}}]',11,1),(16,'2021-09-25 13:43:56.583542','2','NganhNghe object (2)',1,'[{\"added\": {}}]',11,1),(17,'2021-09-25 13:44:04.763581','3','NganhNghe object (3)',1,'[{\"added\": {}}]',11,1),(18,'2021-09-25 13:44:08.639286','4','NganhNghe object (4)',1,'[{\"added\": {}}]',11,1),(19,'2021-09-25 13:44:25.190374','1','PhucLoi object (1)',1,'[{\"added\": {}}]',12,1),(20,'2021-09-25 13:44:31.130834','2','PhucLoi object (2)',1,'[{\"added\": {}}]',12,1),(21,'2021-09-25 13:44:59.219635','3','PhucLoi object (3)',1,'[{\"added\": {}}]',12,1),(22,'2021-09-25 13:45:07.295292','4','PhucLoi object (4)',1,'[{\"added\": {}}]',12,1),(23,'2021-09-25 13:46:37.847257','4','KinhNghiem object (4)',2,'[{\"changed\": {\"fields\": [\"Ten\"]}}]',9,1),(24,'2021-09-25 13:47:12.624112','5','KinhNghiem object (5)',1,'[{\"added\": {}}]',9,1),(25,'2021-09-25 13:50:55.009544','5','NhaTuyenDung object (5)',2,'[{\"changed\": {\"fields\": [\"Ten cong ty\", \"Dia chi\", \"Quy mo\", \"Doi xet duyet\", \"Gioi thieu\"]}}]',13,1),(26,'2021-09-25 13:53:39.647081','4','NhaTuyenDung object (4)',2,'[{\"changed\": {\"fields\": [\"Ten cong ty\", \"Dia chi\", \"Quy mo\", \"Doi xet duyet\", \"Gioi thieu\"]}}]',13,1),(27,'2021-09-25 13:54:43.058294','5','NhaTuyenDung object (5)',2,'[{\"changed\": {\"fields\": [\"Gioi thieu\"]}}]',13,1),(28,'2021-09-25 13:54:51.617693','5','NhaTuyenDung object (5)',2,'[]',13,1),(29,'2021-09-25 13:55:11.423868','4','NhaTuyenDung object (4)',2,'[{\"changed\": {\"fields\": [\"Gioi thieu\"]}}]',13,1),(30,'2021-09-25 13:56:58.909724','1','ViecLam object (1)',1,'[{\"added\": {}}]',15,1),(31,'2021-09-25 14:01:57.992404','1','DanhGiaNhaTuyenDung object (1)',1,'[{\"added\": {}}]',18,1),(32,'2021-09-25 14:02:17.527905','2','DanhGiaNhaTuyenDung object (2)',1,'[{\"added\": {}}]',18,1),(33,'2021-09-25 14:03:39.779541','3','DanhGiaNhaTuyenDung object (3)',1,'[{\"added\": {}}]',18,1),(34,'2021-09-25 14:04:00.814488','4','DanhGiaNhaTuyenDung object (4)',1,'[{\"added\": {}}]',18,1);
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_content_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (1,'admin','logentry'),(3,'auth','group'),(2,'auth','permission'),(4,'contenttypes','contenttype'),(20,'oauth2_provider','accesstoken'),(19,'oauth2_provider','application'),(21,'oauth2_provider','grant'),(23,'oauth2_provider','idtoken'),(22,'oauth2_provider','refreshtoken'),(5,'sessions','session'),(7,'viec_lam_app','bangcap'),(8,'viec_lam_app','chucdanh'),(18,'viec_lam_app','danhgianhatuyendung'),(9,'viec_lam_app','kinhnghiem'),(10,'viec_lam_app','kynang'),(11,'viec_lam_app','nganhnghe'),(6,'viec_lam_app','nguoidung'),(13,'viec_lam_app','nhatuyendung'),(12,'viec_lam_app','phucloi'),(14,'viec_lam_app','quanly'),(17,'viec_lam_app','ungtuyen'),(16,'viec_lam_app','ungvien'),(15,'viec_lam_app','vieclam');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_migrations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `app` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2021-09-25 13:22:12.252456'),(2,'contenttypes','0002_remove_content_type_name','2021-09-25 13:22:12.472058'),(3,'auth','0001_initial','2021-09-25 13:22:13.344369'),(4,'auth','0002_alter_permission_name_max_length','2021-09-25 13:22:13.533667'),(5,'auth','0003_alter_user_email_max_length','2021-09-25 13:22:13.550057'),(6,'auth','0004_alter_user_username_opts','2021-09-25 13:22:13.595093'),(7,'auth','0005_alter_user_last_login_null','2021-09-25 13:22:13.608602'),(8,'auth','0006_require_contenttypes_0002','2021-09-25 13:22:13.617076'),(9,'auth','0007_alter_validators_add_error_messages','2021-09-25 13:22:13.634251'),(10,'auth','0008_alter_user_username_max_length','2021-09-25 13:22:13.649086'),(11,'auth','0009_alter_user_last_name_max_length','2021-09-25 13:22:13.661798'),(12,'auth','0010_alter_group_name_max_length','2021-09-25 13:22:13.697987'),(13,'auth','0011_update_proxy_permissions','2021-09-25 13:22:13.712523'),(14,'auth','0012_alter_user_first_name_max_length','2021-09-25 13:22:13.728327'),(15,'viec_lam_app','0001_initial','2021-09-25 13:22:20.065587'),(16,'admin','0001_initial','2021-09-25 13:22:20.472339'),(17,'admin','0002_logentry_remove_auto_add','2021-09-25 13:22:20.496005'),(18,'admin','0003_logentry_add_action_flag_choices','2021-09-25 13:22:20.530532'),(19,'oauth2_provider','0001_initial','2021-09-25 13:22:22.703678'),(20,'oauth2_provider','0002_auto_20190406_1805','2021-09-25 13:22:22.860728'),(21,'oauth2_provider','0003_auto_20201211_1314','2021-09-25 13:22:23.124716'),(22,'oauth2_provider','0004_auto_20200902_2022','2021-09-25 13:22:24.292746'),(23,'sessions','0001_initial','2021-09-25 13:22:24.403680'),(24,'viec_lam_app','0002_alter_kinhnghiem_ten','2021-09-25 13:40:01.611478'),(25,'viec_lam_app','0003_auto_20210925_1342','2021-09-25 13:42:45.053206');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL,
  `session_data` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
INSERT INTO `django_session` VALUES ('5kw8lfq77c58k226y2ww1gy8liwl3zoq','.eJxVjDsOwjAQBe_iGlle1vhDSc8ZLK93gwPIkeKkQtwdIqWA9s3Me6mU16WmtcucRlZnBerwu1EuD2kb4Htut0mXqS3zSHpT9E67vk4sz8vu_h3U3Ou3juRBihPyzmBmIIQQoyePQ8EjCkYxxQTg4F201jDDybItJAKDDUa9P9zXN6c:1mU7eV:Iac7jDczdjFnNFYFjX2mak8_ZnJhjVUdSG_VfTyIM7Y','2021-10-09 13:23:39.943382');
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kinh_nghiem`
--

DROP TABLE IF EXISTS `kinh_nghiem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kinh_nghiem` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `ten` varchar(80) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kinh_nghiem`
--

LOCK TABLES `kinh_nghiem` WRITE;
/*!40000 ALTER TABLE `kinh_nghiem` DISABLE KEYS */;
INSERT INTO `kinh_nghiem` VALUES (1,'Thực tập sinh'),(2,'Quản lý cấp trung'),(3,'Mới ra trường'),(4,'Quản lý cấp cao'),(5,'Senior Web Developer');
/*!40000 ALTER TABLE `kinh_nghiem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ky_nang`
--

DROP TABLE IF EXISTS `ky_nang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ky_nang` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `ten` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ky_nang`
--

LOCK TABLES `ky_nang` WRITE;
/*!40000 ALTER TABLE `ky_nang` DISABLE KEYS */;
INSERT INTO `ky_nang` VALUES (1,'NodeJS'),(2,'Java Spring'),(3,'Microsoft Word'),(4,'Photoshop');
/*!40000 ALTER TABLE `ky_nang` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nganh_nghe`
--

DROP TABLE IF EXISTS `nganh_nghe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nganh_nghe` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `ten` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nganh_nghe`
--

LOCK TABLES `nganh_nghe` WRITE;
/*!40000 ALTER TABLE `nganh_nghe` DISABLE KEYS */;
INSERT INTO `nganh_nghe` VALUES (1,'Công nghệ thông tin'),(2,'Điện - điện tử'),(3,'Xây dựng'),(4,'Kế toán');
/*!40000 ALTER TABLE `nganh_nghe` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nguoi_dung`
--

DROP TABLE IF EXISTS `nguoi_dung`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nguoi_dung` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `password` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `first_name` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  `email` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `so_dien_thoai` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `anh_dai_dien` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `vai_tro` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nguoi_dung`
--

LOCK TABLES `nguoi_dung` WRITE;
/*!40000 ALTER TABLE `nguoi_dung` DISABLE KEYS */;
INSERT INTO `nguoi_dung` VALUES (1,'pbkdf2_sha256$260000$M51UYygTQeqmI6c9Tpp42h$eD2VgFWY0gB1epY3bBIbD8cbgBYsBM0jVIrIjK/fUdw=','2021-09-25 13:23:39.848291',1,'admin','','',1,1,'2021-09-25 13:23:25.003607','1851050127tan@ou.edu.vn','','',''),(2,'pbkdf2_sha256$260000$PPZZv3ed0E5jbx50V1rkJO$wdmNQgpTyAQrIdf2N6cU0TArziD3Vl7Yoh4GVAs/MgA=',NULL,0,'uv','Tấn','Trần',0,1,'2021-09-25 13:48:08.008860','uv@mail.com','','static/upload/2021/09/usecase.jpg','UNG VIEN'),(3,'pbkdf2_sha256$260000$mcnKMYELvjlWIJ7e85sWYF$lJkmbpOc5Mjpgyzru2Wldx3We2/tmcAUcUnbkRWnKe8=',NULL,0,'uv2','Tú','Lê',0,1,'2021-09-25 13:48:47.514451','uv2@mail.com','','static/upload/2021/09/usecase_a6Krqh3.jpg','UNG VIEN'),(4,'pbkdf2_sha256$260000$hMvJlIhHd22gWUHXph2At8$IX5IF52ohwKxI6D1whRovYSlx/M5oDtHkKDGNhJIZFA=',NULL,0,'ntd','Thúy','Nguyễn',0,1,'2021-09-25 13:49:24.266116','ntd@mail.com','','static/upload/2021/09/usecase_xfabNoZ.jpg','TUYEN DUNG'),(5,'pbkdf2_sha256$260000$H4LaHpuHnlZdjOlk7ix5SV$vkCn4TIIDwUEAPt6l14YN5H0cuU/RSPOmB6xzoQvPhA=',NULL,0,'ntd2','Hải','Lý',0,1,'2021-09-25 13:49:54.571114','ntd2@mail.com','','static/upload/2021/09/usecase_TOcbkTT.jpg','TUYEN DUNG');
/*!40000 ALTER TABLE `nguoi_dung` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nguoi_dung_groups`
--

DROP TABLE IF EXISTS `nguoi_dung_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nguoi_dung_groups` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nguoidung_id` bigint NOT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nguoi_dung_groups_nguoidung_id_group_id_7c8ee018_uniq` (`nguoidung_id`,`group_id`),
  KEY `nguoi_dung_groups_group_id_59397a59_fk_auth_group_id` (`group_id`),
  CONSTRAINT `nguoi_dung_groups_group_id_59397a59_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `nguoi_dung_groups_nguoidung_id_6a8095a0_fk_nguoi_dung_id` FOREIGN KEY (`nguoidung_id`) REFERENCES `nguoi_dung` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nguoi_dung_groups`
--

LOCK TABLES `nguoi_dung_groups` WRITE;
/*!40000 ALTER TABLE `nguoi_dung_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `nguoi_dung_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nguoi_dung_user_permissions`
--

DROP TABLE IF EXISTS `nguoi_dung_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nguoi_dung_user_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nguoidung_id` bigint NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nguoi_dung_user_permissi_nguoidung_id_permission__ff59ee3c_uniq` (`nguoidung_id`,`permission_id`),
  KEY `nguoi_dung_user_perm_permission_id_9e3563ee_fk_auth_perm` (`permission_id`),
  CONSTRAINT `nguoi_dung_user_perm_nguoidung_id_624225ff_fk_nguoi_dun` FOREIGN KEY (`nguoidung_id`) REFERENCES `nguoi_dung` (`id`),
  CONSTRAINT `nguoi_dung_user_perm_permission_id_9e3563ee_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nguoi_dung_user_permissions`
--

LOCK TABLES `nguoi_dung_user_permissions` WRITE;
/*!40000 ALTER TABLE `nguoi_dung_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `nguoi_dung_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nha_tuyen_dung`
--

DROP TABLE IF EXISTS `nha_tuyen_dung`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nha_tuyen_dung` (
  `nguoi_dung_id` bigint NOT NULL,
  `ten_cong_ty` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `dia_chi` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `quy_mo` int NOT NULL,
  `diem_danh_gia_tb` double NOT NULL,
  `doi_xet_duyet` tinyint(1) NOT NULL,
  `gioi_thieu` longtext COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`nguoi_dung_id`),
  CONSTRAINT `nha_tuyen_dung_nguoi_dung_id_79885dfa_fk_nguoi_dung_id` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nha_tuyen_dung`
--

LOCK TABLES `nha_tuyen_dung` WRITE;
/*!40000 ALTER TABLE `nha_tuyen_dung` DISABLE KEYS */;
INSERT INTO `nha_tuyen_dung` VALUES (4,'Tập đoàn Trường Hải','321 Cao Lỗ',1000,0,0,'Tại Navigos Group, mỗi ngày đi làm của hơn 500 DREAM MAKERS chúng tôi đều là một ngày vui. Vui vì tất cả đều cảm nhận được rằng mình đang làm một công việc có ý nghĩa, và vui vì hơn hết mỗi người đều được sống và làm việc trong một đại gia đình NAVIWORKS (cách gọi thân mật từ sự kết hợp của VietnamWorks và Navigos Search) giàu tính nhân văn và luôn được quan tâm chân thành từ các cấp lãnh đạo cao nhất, tới những người bạn đồng nghiệp ngồi cùng bàn. Các thành viên của đại gia đình NAVIWORKS còn được thường xuyên tham gia các chương trình đào tạo nhằm phát triển chuyên môn từ các chuyên gia và người quản lý trực tiếp, cùng chế độ đãi ngộ hấp dẫn, tương xứng với năng lực và kết quả công việc.'),(5,'Công ty TNHH VinPro','123 Lê Lai',200,0,0,'Tại Navigos Group, mỗi ngày đi làm của hơn 500 DREAM MAKERS chúng tôi đều là một ngày vui. Vui vì tất cả đều cảm nhận được rằng mình đang làm một công việc có ý nghĩa, và vui vì hơn hết mỗi người đều được sống và làm việc trong một đại gia đình NAVIWORKS (cách gọi thân mật từ sự kết hợp của VietnamWorks và Navigos Search) giàu tính nhân văn và luôn được quan tâm chân thành từ các cấp lãnh đạo cao nhất, tới những người bạn đồng nghiệp ngồi cùng bàn. Các thành viên của đại gia đình NAVIWORKS còn được thường xuyên tham gia các chương trình đào tạo nhằm phát triển chuyên môn từ các chuyên gia và người quản lý trực tiếp, cùng chế độ đãi ngộ hấp dẫn, tương xứng với năng lực và kết quả công việc.');
/*!40000 ALTER TABLE `nha_tuyen_dung` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `oauth2_provider_accesstoken`
--

DROP TABLE IF EXISTS `oauth2_provider_accesstoken`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `oauth2_provider_accesstoken` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expires` datetime(6) NOT NULL,
  `scope` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `application_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  `created` datetime(6) NOT NULL,
  `updated` datetime(6) NOT NULL,
  `source_refresh_token_id` bigint DEFAULT NULL,
  `id_token_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `token` (`token`),
  UNIQUE KEY `source_refresh_token_id` (`source_refresh_token_id`),
  UNIQUE KEY `id_token_id` (`id_token_id`),
  KEY `oauth2_provider_acce_application_id_b22886e1_fk_oauth2_pr` (`application_id`),
  KEY `oauth2_provider_accesstoken_user_id_6e4c9a65_fk_nguoi_dung_id` (`user_id`),
  CONSTRAINT `oauth2_provider_acce_application_id_b22886e1_fk_oauth2_pr` FOREIGN KEY (`application_id`) REFERENCES `oauth2_provider_application` (`id`),
  CONSTRAINT `oauth2_provider_acce_id_token_id_85db651b_fk_oauth2_pr` FOREIGN KEY (`id_token_id`) REFERENCES `oauth2_provider_idtoken` (`id`),
  CONSTRAINT `oauth2_provider_acce_source_refresh_token_e66fbc72_fk_oauth2_pr` FOREIGN KEY (`source_refresh_token_id`) REFERENCES `oauth2_provider_refreshtoken` (`id`),
  CONSTRAINT `oauth2_provider_accesstoken_user_id_6e4c9a65_fk_nguoi_dung_id` FOREIGN KEY (`user_id`) REFERENCES `nguoi_dung` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oauth2_provider_accesstoken`
--

LOCK TABLES `oauth2_provider_accesstoken` WRITE;
/*!40000 ALTER TABLE `oauth2_provider_accesstoken` DISABLE KEYS */;
INSERT INTO `oauth2_provider_accesstoken` VALUES (1,'51M9tYxG8FYceiS8gRoBs26Q50yju1','2021-09-26 00:05:15.271455','read write',1,2,'2021-09-25 14:05:15.271974','2021-09-25 14:05:15.271988',NULL,NULL);
/*!40000 ALTER TABLE `oauth2_provider_accesstoken` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `oauth2_provider_application`
--

DROP TABLE IF EXISTS `oauth2_provider_application`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `oauth2_provider_application` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `client_id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `redirect_uris` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `client_type` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `authorization_grant_type` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `client_secret` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint DEFAULT NULL,
  `skip_authorization` tinyint(1) NOT NULL,
  `created` datetime(6) NOT NULL,
  `updated` datetime(6) NOT NULL,
  `algorithm` varchar(5) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `client_id` (`client_id`),
  KEY `oauth2_provider_application_user_id_79829054_fk_nguoi_dung_id` (`user_id`),
  KEY `oauth2_provider_application_client_secret_53133678` (`client_secret`),
  CONSTRAINT `oauth2_provider_application_user_id_79829054_fk_nguoi_dung_id` FOREIGN KEY (`user_id`) REFERENCES `nguoi_dung` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oauth2_provider_application`
--

LOCK TABLES `oauth2_provider_application` WRITE;
/*!40000 ALTER TABLE `oauth2_provider_application` DISABLE KEYS */;
INSERT INTO `oauth2_provider_application` VALUES (1,'sAWkAhXc1sWRtON4pBHiTLv6o8txra9ZpK38xcZM','','confidential','password','cia1tWOI3w1gCQ2WxbV1JuiDrppuoSCIc2UrovFiY9Bat9QyHG6jtcLohcut9jZLfjJsBmnG5yv33YxaXmlWkC9cZlmKLjGrhxNNaJU2SPOPmumtGrwWaWuyVJgz3SrR','WebsiteViecLam',1,0,'2021-09-25 13:24:04.100115','2021-09-25 13:24:04.100148','');
/*!40000 ALTER TABLE `oauth2_provider_application` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `oauth2_provider_grant`
--

DROP TABLE IF EXISTS `oauth2_provider_grant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `oauth2_provider_grant` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `code` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expires` datetime(6) NOT NULL,
  `redirect_uri` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `scope` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `application_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  `created` datetime(6) NOT NULL,
  `updated` datetime(6) NOT NULL,
  `code_challenge` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code_challenge_method` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nonce` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `claims` longtext COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT (_utf8mb3''),
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  KEY `oauth2_provider_gran_application_id_81923564_fk_oauth2_pr` (`application_id`),
  KEY `oauth2_provider_grant_user_id_e8f62af8_fk_nguoi_dung_id` (`user_id`),
  CONSTRAINT `oauth2_provider_gran_application_id_81923564_fk_oauth2_pr` FOREIGN KEY (`application_id`) REFERENCES `oauth2_provider_application` (`id`),
  CONSTRAINT `oauth2_provider_grant_user_id_e8f62af8_fk_nguoi_dung_id` FOREIGN KEY (`user_id`) REFERENCES `nguoi_dung` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oauth2_provider_grant`
--

LOCK TABLES `oauth2_provider_grant` WRITE;
/*!40000 ALTER TABLE `oauth2_provider_grant` DISABLE KEYS */;
/*!40000 ALTER TABLE `oauth2_provider_grant` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `oauth2_provider_idtoken`
--

DROP TABLE IF EXISTS `oauth2_provider_idtoken`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `oauth2_provider_idtoken` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `jti` char(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expires` datetime(6) NOT NULL,
  `scope` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `created` datetime(6) NOT NULL,
  `updated` datetime(6) NOT NULL,
  `application_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `jti` (`jti`),
  KEY `oauth2_provider_idto_application_id_08c5ff4f_fk_oauth2_pr` (`application_id`),
  KEY `oauth2_provider_idtoken_user_id_dd512b59_fk_nguoi_dung_id` (`user_id`),
  CONSTRAINT `oauth2_provider_idto_application_id_08c5ff4f_fk_oauth2_pr` FOREIGN KEY (`application_id`) REFERENCES `oauth2_provider_application` (`id`),
  CONSTRAINT `oauth2_provider_idtoken_user_id_dd512b59_fk_nguoi_dung_id` FOREIGN KEY (`user_id`) REFERENCES `nguoi_dung` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oauth2_provider_idtoken`
--

LOCK TABLES `oauth2_provider_idtoken` WRITE;
/*!40000 ALTER TABLE `oauth2_provider_idtoken` DISABLE KEYS */;
/*!40000 ALTER TABLE `oauth2_provider_idtoken` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `oauth2_provider_refreshtoken`
--

DROP TABLE IF EXISTS `oauth2_provider_refreshtoken`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `oauth2_provider_refreshtoken` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `access_token_id` bigint DEFAULT NULL,
  `application_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  `created` datetime(6) NOT NULL,
  `updated` datetime(6) NOT NULL,
  `revoked` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `access_token_id` (`access_token_id`),
  UNIQUE KEY `oauth2_provider_refreshtoken_token_revoked_af8a5134_uniq` (`token`,`revoked`),
  KEY `oauth2_provider_refr_application_id_2d1c311b_fk_oauth2_pr` (`application_id`),
  KEY `oauth2_provider_refreshtoken_user_id_da837fce_fk_nguoi_dung_id` (`user_id`),
  CONSTRAINT `oauth2_provider_refr_access_token_id_775e84e8_fk_oauth2_pr` FOREIGN KEY (`access_token_id`) REFERENCES `oauth2_provider_accesstoken` (`id`),
  CONSTRAINT `oauth2_provider_refr_application_id_2d1c311b_fk_oauth2_pr` FOREIGN KEY (`application_id`) REFERENCES `oauth2_provider_application` (`id`),
  CONSTRAINT `oauth2_provider_refreshtoken_user_id_da837fce_fk_nguoi_dung_id` FOREIGN KEY (`user_id`) REFERENCES `nguoi_dung` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oauth2_provider_refreshtoken`
--

LOCK TABLES `oauth2_provider_refreshtoken` WRITE;
/*!40000 ALTER TABLE `oauth2_provider_refreshtoken` DISABLE KEYS */;
INSERT INTO `oauth2_provider_refreshtoken` VALUES (1,'vnukoBnkLOrWyf6fKt4jjYICswuEwj',1,1,2,'2021-09-25 14:05:15.279382','2021-09-25 14:05:15.279412',NULL);
/*!40000 ALTER TABLE `oauth2_provider_refreshtoken` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `phuc_loi`
--

DROP TABLE IF EXISTS `phuc_loi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `phuc_loi` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `ten` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `phuc_loi`
--

LOCK TABLES `phuc_loi` WRITE;
/*!40000 ALTER TABLE `phuc_loi` DISABLE KEYS */;
INSERT INTO `phuc_loi` VALUES (1,'Bảo hiểm y tế'),(2,'Bảo hiểm xã hội'),(3,'Teambuilding'),(4,'Thưởng doanh số');
/*!40000 ALTER TABLE `phuc_loi` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quan_ly`
--

DROP TABLE IF EXISTS `quan_ly`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quan_ly` (
  `nguoi_dung_id` bigint NOT NULL,
  `log` longtext COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`nguoi_dung_id`),
  CONSTRAINT `quan_ly_nguoi_dung_id_725fb816_fk_nguoi_dung_id` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quan_ly`
--

LOCK TABLES `quan_ly` WRITE;
/*!40000 ALTER TABLE `quan_ly` DISABLE KEYS */;
/*!40000 ALTER TABLE `quan_ly` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ung_tuyen`
--

DROP TABLE IF EXISTS `ung_tuyen`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ung_tuyen` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `ngay_ung_tuyen` date NOT NULL,
  `trang_thai_ho_so` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ung_vien_nop_don` tinyint(1) NOT NULL,
  `viec_lam_id` bigint DEFAULT NULL,
  `ung_vien_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ung_tuyen_viec_lam_id_e26bec97_fk_viec_lam_id` (`viec_lam_id`),
  KEY `ung_tuyen_ung_vien_id_b81a3f14_fk_ung_vien_nguoi_dung_id` (`ung_vien_id`),
  CONSTRAINT `ung_tuyen_ung_vien_id_b81a3f14_fk_ung_vien_nguoi_dung_id` FOREIGN KEY (`ung_vien_id`) REFERENCES `ung_vien` (`nguoi_dung_id`),
  CONSTRAINT `ung_tuyen_viec_lam_id_e26bec97_fk_viec_lam_id` FOREIGN KEY (`viec_lam_id`) REFERENCES `viec_lam` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ung_tuyen`
--

LOCK TABLES `ung_tuyen` WRITE;
/*!40000 ALTER TABLE `ung_tuyen` DISABLE KEYS */;
/*!40000 ALTER TABLE `ung_tuyen` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ung_vien`
--

DROP TABLE IF EXISTS `ung_vien`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ung_vien` (
  `nguoi_dung_id` bigint NOT NULL,
  `ngay_sinh` date DEFAULT NULL,
  `dia_chi` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cv` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gioi_thieu` longtext COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`nguoi_dung_id`),
  CONSTRAINT `ung_vien_nguoi_dung_id_04091140_fk_nguoi_dung_id` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ung_vien`
--

LOCK TABLES `ung_vien` WRITE;
/*!40000 ALTER TABLE `ung_vien` DISABLE KEYS */;
INSERT INTO `ung_vien` VALUES (2,NULL,NULL,'',NULL),(3,NULL,NULL,'',NULL);
/*!40000 ALTER TABLE `ung_vien` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ung_vien_bang_cap`
--

DROP TABLE IF EXISTS `ung_vien_bang_cap`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ung_vien_bang_cap` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `ungvien_id` bigint NOT NULL,
  `bangcap_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ung_vien_bang_cap_ungvien_id_bangcap_id_adb9e2d0_uniq` (`ungvien_id`,`bangcap_id`),
  KEY `ung_vien_bang_cap_bangcap_id_c76cfcd5_fk_bang_cap_id` (`bangcap_id`),
  CONSTRAINT `ung_vien_bang_cap_bangcap_id_c76cfcd5_fk_bang_cap_id` FOREIGN KEY (`bangcap_id`) REFERENCES `bang_cap` (`id`),
  CONSTRAINT `ung_vien_bang_cap_ungvien_id_d79858a1_fk_ung_vien_nguoi_dung_id` FOREIGN KEY (`ungvien_id`) REFERENCES `ung_vien` (`nguoi_dung_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ung_vien_bang_cap`
--

LOCK TABLES `ung_vien_bang_cap` WRITE;
/*!40000 ALTER TABLE `ung_vien_bang_cap` DISABLE KEYS */;
/*!40000 ALTER TABLE `ung_vien_bang_cap` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ung_vien_kinh_nghiem`
--

DROP TABLE IF EXISTS `ung_vien_kinh_nghiem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ung_vien_kinh_nghiem` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `ungvien_id` bigint NOT NULL,
  `kinhnghiem_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ung_vien_kinh_nghiem_ungvien_id_kinhnghiem_id_745b2f49_uniq` (`ungvien_id`,`kinhnghiem_id`),
  KEY `ung_vien_kinh_nghiem_kinhnghiem_id_c8ef1111_fk_kinh_nghiem_id` (`kinhnghiem_id`),
  CONSTRAINT `ung_vien_kinh_nghiem_kinhnghiem_id_c8ef1111_fk_kinh_nghiem_id` FOREIGN KEY (`kinhnghiem_id`) REFERENCES `kinh_nghiem` (`id`),
  CONSTRAINT `ung_vien_kinh_nghiem_ungvien_id_ae0ba4e5_fk_ung_vien_` FOREIGN KEY (`ungvien_id`) REFERENCES `ung_vien` (`nguoi_dung_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ung_vien_kinh_nghiem`
--

LOCK TABLES `ung_vien_kinh_nghiem` WRITE;
/*!40000 ALTER TABLE `ung_vien_kinh_nghiem` DISABLE KEYS */;
/*!40000 ALTER TABLE `ung_vien_kinh_nghiem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ung_vien_ky_nang`
--

DROP TABLE IF EXISTS `ung_vien_ky_nang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ung_vien_ky_nang` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `ungvien_id` bigint NOT NULL,
  `kynang_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ung_vien_ky_nang_ungvien_id_kynang_id_99ea48a9_uniq` (`ungvien_id`,`kynang_id`),
  KEY `ung_vien_ky_nang_kynang_id_d586083e_fk_ky_nang_id` (`kynang_id`),
  CONSTRAINT `ung_vien_ky_nang_kynang_id_d586083e_fk_ky_nang_id` FOREIGN KEY (`kynang_id`) REFERENCES `ky_nang` (`id`),
  CONSTRAINT `ung_vien_ky_nang_ungvien_id_87156984_fk_ung_vien_nguoi_dung_id` FOREIGN KEY (`ungvien_id`) REFERENCES `ung_vien` (`nguoi_dung_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ung_vien_ky_nang`
--

LOCK TABLES `ung_vien_ky_nang` WRITE;
/*!40000 ALTER TABLE `ung_vien_ky_nang` DISABLE KEYS */;
/*!40000 ALTER TABLE `ung_vien_ky_nang` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ung_vien_nganh_nghe`
--

DROP TABLE IF EXISTS `ung_vien_nganh_nghe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ung_vien_nganh_nghe` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `ungvien_id` bigint NOT NULL,
  `nganhnghe_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ung_vien_nganh_nghe_ungvien_id_nganhnghe_id_6c99bf6e_uniq` (`ungvien_id`,`nganhnghe_id`),
  KEY `ung_vien_nganh_nghe_nganhnghe_id_31489f90_fk_nganh_nghe_id` (`nganhnghe_id`),
  CONSTRAINT `ung_vien_nganh_nghe_nganhnghe_id_31489f90_fk_nganh_nghe_id` FOREIGN KEY (`nganhnghe_id`) REFERENCES `nganh_nghe` (`id`),
  CONSTRAINT `ung_vien_nganh_nghe_ungvien_id_88e5c9d5_fk_ung_vien_` FOREIGN KEY (`ungvien_id`) REFERENCES `ung_vien` (`nguoi_dung_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ung_vien_nganh_nghe`
--

LOCK TABLES `ung_vien_nganh_nghe` WRITE;
/*!40000 ALTER TABLE `ung_vien_nganh_nghe` DISABLE KEYS */;
/*!40000 ALTER TABLE `ung_vien_nganh_nghe` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `viec_lam`
--

DROP TABLE IF EXISTS `viec_lam`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `viec_lam` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `ngay_tao` date NOT NULL,
  `ngay_het_han` date NOT NULL,
  `noi_dung` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `tieu_de` varchar(80) COLLATE utf8mb4_unicode_ci NOT NULL,
  `luong` int NOT NULL,
  `trang_thai_viec_lam` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nha_tuyen_dung_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `viec_lam_nha_tuyen_dung_id_25617820_fk_nha_tuyen` (`nha_tuyen_dung_id`),
  CONSTRAINT `viec_lam_nha_tuyen_dung_id_25617820_fk_nha_tuyen` FOREIGN KEY (`nha_tuyen_dung_id`) REFERENCES `nha_tuyen_dung` (`nguoi_dung_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `viec_lam`
--

LOCK TABLES `viec_lam` WRITE;
/*!40000 ALTER TABLE `viec_lam` DISABLE KEYS */;
INSERT INTO `viec_lam` VALUES (1,'2021-09-25','2021-11-10','Để tiếp tục hành trình biến hàng triệu giấc mơ nghề nghiệp thành hiện thực, Navigos Group luôn đón chào những ứng viên tài năng đến trải nghiệm và làm việc cùng tập đoàn. Nếu bạn có khả năng và kinh nghiệm phù hợp, đừng ngần ngại ứng tuyển vào các công việc sẵn có của chúng tôi để tận hưởng một môi trường làm việc lý tưởng cùng những phúc lợi tuyệt vời.','Chuyên viên phát triển sản phẩm',20000000,'DANG MO',4),(2,'2021-09-25','2021-11-10','Để tiếp tục hành trình biến hàng triệu giấc mơ nghề nghiệp thành hiện thực, Navigos Group luôn đón chào những ứng viên tài năng đến trải nghiệm và làm việc cùng tập đoàn. Nếu bạn có khả năng và kinh nghiệm phù hợp, đừng ngần ngại ứng tuyển vào các công việc sẵn có của chúng tôi để tận hưởng một môi trường làm việc lý tưởng cùng những phúc lợi tuyệt vời.','Kế toán trưởng',0,'DANG MO',4),(3,'2021-09-25','2021-11-10','Để tiếp tục hành trình biến hàng triệu giấc mơ nghề nghiệp thành hiện thực, Navigos Group luôn đón chào những ứng viên tài năng đến trải nghiệm và làm việc cùng tập đoàn. Nếu bạn có khả năng và kinh nghiệm phù hợp, đừng ngần ngại ứng tuyển vào các công việc sẵn có của chúng tôi để tận hưởng một môi trường làm việc lý tưởng cùng những phúc lợi tuyệt vời.','Nhân viên bán thời gian',20000000,'DANG MO',5),(4,'2021-09-25','2021-11-10','Để tiếp tục hành trình biến hàng triệu giấc mơ nghề nghiệp thành hiện thực, Navigos Group luôn đón chào những ứng viên tài năng đến trải nghiệm và làm việc cùng tập đoàn. Nếu bạn có khả năng và kinh nghiệm phù hợp, đừng ngần ngại ứng tuyển vào các công việc sẵn có của chúng tôi để tận hưởng một môi trường làm việc lý tưởng cùng những phúc lợi tuyệt vời.','Thợ bảo trì điện',0,'DANG MO',5),(5,'2021-09-25','2021-11-10','Để tiếp tục hành trình biến hàng triệu giấc mơ nghề nghiệp thành hiện thực, Navigos Group luôn đón chào những ứng viên tài năng đến trải nghiệm và làm việc cùng tập đoàn. Nếu bạn có khả năng và kinh nghiệm phù hợp, đừng ngần ngại ứng tuyển vào các công việc sẵn có của chúng tôi để tận hưởng một môi trường làm việc lý tưởng cùng những phúc lợi tuyệt vời.','Bảo vệ',20000000,'DANG MO',4),(6,'2021-09-25','2021-11-10','Để tiếp tục hành trình biến hàng triệu giấc mơ nghề nghiệp thành hiện thực, Navigos Group luôn đón chào những ứng viên tài năng đến trải nghiệm và làm việc cùng tập đoàn. Nếu bạn có khả năng và kinh nghiệm phù hợp, đừng ngần ngại ứng tuyển vào các công việc sẵn có của chúng tôi để tận hưởng một môi trường làm việc lý tưởng cùng những phúc lợi tuyệt vời.','Nhân viên bán hàng',0,'DANG MO',4),(7,'2021-09-25','2021-11-10','Để tiếp tục hành trình biến hàng triệu giấc mơ nghề nghiệp thành hiện thực, Navigos Group luôn đón chào những ứng viên tài năng đến trải nghiệm và làm việc cùng tập đoàn. Nếu bạn có khả năng và kinh nghiệm phù hợp, đừng ngần ngại ứng tuyển vào các công việc sẵn có của chúng tôi để tận hưởng một môi trường làm việc lý tưởng cùng những phúc lợi tuyệt vời.','Nhân viên kinh doanh',20000000,'DANG MO',5),(8,'2021-09-25','2021-11-10','Để tiếp tục hành trình biến hàng triệu giấc mơ nghề nghiệp thành hiện thực, Navigos Group luôn đón chào những ứng viên tài năng đến trải nghiệm và làm việc cùng tập đoàn. Nếu bạn có khả năng và kinh nghiệm phù hợp, đừng ngần ngại ứng tuyển vào các công việc sẵn có của chúng tôi để tận hưởng một môi trường làm việc lý tưởng cùng những phúc lợi tuyệt vời.','Phát thanh viên',0,'DANG MO',5),(9,'2021-09-25','2021-11-10','Để tiếp tục hành trình biến hàng triệu giấc mơ nghề nghiệp thành hiện thực, Navigos Group luôn đón chào những ứng viên tài năng đến trải nghiệm và làm việc cùng tập đoàn. Nếu bạn có khả năng và kinh nghiệm phù hợp, đừng ngần ngại ứng tuyển vào các công việc sẵn có của chúng tôi để tận hưởng một môi trường làm việc lý tưởng cùng những phúc lợi tuyệt vời.','Nhân viên bưu cục',20000000,'DANG MO',4),(10,'2021-09-25','2021-11-10','Để tiếp tục hành trình biến hàng triệu giấc mơ nghề nghiệp thành hiện thực, Navigos Group luôn đón chào những ứng viên tài năng đến trải nghiệm và làm việc cùng tập đoàn. Nếu bạn có khả năng và kinh nghiệm phù hợp, đừng ngần ngại ứng tuyển vào các công việc sẵn có của chúng tôi để tận hưởng một môi trường làm việc lý tưởng cùng những phúc lợi tuyệt vời.','Nhân viên vận chuyển',0,'DANG MO',4),(11,'2021-09-25','2021-11-10','Để tiếp tục hành trình biến hàng triệu giấc mơ nghề nghiệp thành hiện thực, Navigos Group luôn đón chào những ứng viên tài năng đến trải nghiệm và làm việc cùng tập đoàn. Nếu bạn có khả năng và kinh nghiệm phù hợp, đừng ngần ngại ứng tuyển vào các công việc sẵn có của chúng tôi để tận hưởng một môi trường làm việc lý tưởng cùng những phúc lợi tuyệt vời.','Kế toán viên',20000000,'DANG MO',5);
/*!40000 ALTER TABLE `viec_lam` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `viec_lam_bang_cap`
--

DROP TABLE IF EXISTS `viec_lam_bang_cap`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `viec_lam_bang_cap` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `vieclam_id` bigint NOT NULL,
  `bangcap_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `viec_lam_bang_cap_vieclam_id_bangcap_id_a62a7056_uniq` (`vieclam_id`,`bangcap_id`),
  KEY `viec_lam_bang_cap_bangcap_id_371171b9_fk_bang_cap_id` (`bangcap_id`),
  CONSTRAINT `viec_lam_bang_cap_bangcap_id_371171b9_fk_bang_cap_id` FOREIGN KEY (`bangcap_id`) REFERENCES `bang_cap` (`id`),
  CONSTRAINT `viec_lam_bang_cap_vieclam_id_c2652e00_fk_viec_lam_id` FOREIGN KEY (`vieclam_id`) REFERENCES `viec_lam` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `viec_lam_bang_cap`
--

LOCK TABLES `viec_lam_bang_cap` WRITE;
/*!40000 ALTER TABLE `viec_lam_bang_cap` DISABLE KEYS */;
INSERT INTO `viec_lam_bang_cap` VALUES (1,1,1),(2,1,3),(3,1,5);
/*!40000 ALTER TABLE `viec_lam_bang_cap` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `viec_lam_kinh_nghiem`
--

DROP TABLE IF EXISTS `viec_lam_kinh_nghiem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `viec_lam_kinh_nghiem` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `vieclam_id` bigint NOT NULL,
  `kinhnghiem_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `viec_lam_kinh_nghiem_vieclam_id_kinhnghiem_id_977b17ad_uniq` (`vieclam_id`,`kinhnghiem_id`),
  KEY `viec_lam_kinh_nghiem_kinhnghiem_id_4de4579b_fk_kinh_nghiem_id` (`kinhnghiem_id`),
  CONSTRAINT `viec_lam_kinh_nghiem_kinhnghiem_id_4de4579b_fk_kinh_nghiem_id` FOREIGN KEY (`kinhnghiem_id`) REFERENCES `kinh_nghiem` (`id`),
  CONSTRAINT `viec_lam_kinh_nghiem_vieclam_id_7e06fdb6_fk_viec_lam_id` FOREIGN KEY (`vieclam_id`) REFERENCES `viec_lam` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `viec_lam_kinh_nghiem`
--

LOCK TABLES `viec_lam_kinh_nghiem` WRITE;
/*!40000 ALTER TABLE `viec_lam_kinh_nghiem` DISABLE KEYS */;
INSERT INTO `viec_lam_kinh_nghiem` VALUES (1,1,1),(2,1,3),(3,1,5);
/*!40000 ALTER TABLE `viec_lam_kinh_nghiem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `viec_lam_ky_nang`
--

DROP TABLE IF EXISTS `viec_lam_ky_nang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `viec_lam_ky_nang` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `vieclam_id` bigint NOT NULL,
  `kynang_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `viec_lam_ky_nang_vieclam_id_kynang_id_4d5e3913_uniq` (`vieclam_id`,`kynang_id`),
  KEY `viec_lam_ky_nang_kynang_id_310e4401_fk_ky_nang_id` (`kynang_id`),
  CONSTRAINT `viec_lam_ky_nang_kynang_id_310e4401_fk_ky_nang_id` FOREIGN KEY (`kynang_id`) REFERENCES `ky_nang` (`id`),
  CONSTRAINT `viec_lam_ky_nang_vieclam_id_7faf76a3_fk_viec_lam_id` FOREIGN KEY (`vieclam_id`) REFERENCES `viec_lam` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `viec_lam_ky_nang`
--

LOCK TABLES `viec_lam_ky_nang` WRITE;
/*!40000 ALTER TABLE `viec_lam_ky_nang` DISABLE KEYS */;
INSERT INTO `viec_lam_ky_nang` VALUES (1,1,1),(2,1,3);
/*!40000 ALTER TABLE `viec_lam_ky_nang` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `viec_lam_nganh_nghe`
--

DROP TABLE IF EXISTS `viec_lam_nganh_nghe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `viec_lam_nganh_nghe` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `vieclam_id` bigint NOT NULL,
  `nganhnghe_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `viec_lam_nganh_nghe_vieclam_id_nganhnghe_id_97189eaf_uniq` (`vieclam_id`,`nganhnghe_id`),
  KEY `viec_lam_nganh_nghe_nganhnghe_id_940f192e_fk_nganh_nghe_id` (`nganhnghe_id`),
  CONSTRAINT `viec_lam_nganh_nghe_nganhnghe_id_940f192e_fk_nganh_nghe_id` FOREIGN KEY (`nganhnghe_id`) REFERENCES `nganh_nghe` (`id`),
  CONSTRAINT `viec_lam_nganh_nghe_vieclam_id_924aacea_fk_viec_lam_id` FOREIGN KEY (`vieclam_id`) REFERENCES `viec_lam` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `viec_lam_nganh_nghe`
--

LOCK TABLES `viec_lam_nganh_nghe` WRITE;
/*!40000 ALTER TABLE `viec_lam_nganh_nghe` DISABLE KEYS */;
INSERT INTO `viec_lam_nganh_nghe` VALUES (1,1,1),(2,1,3);
/*!40000 ALTER TABLE `viec_lam_nganh_nghe` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `viec_lam_phuc_loi`
--

DROP TABLE IF EXISTS `viec_lam_phuc_loi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `viec_lam_phuc_loi` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `vieclam_id` bigint NOT NULL,
  `phucloi_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `viec_lam_phuc_loi_vieclam_id_phucloi_id_399b49e5_uniq` (`vieclam_id`,`phucloi_id`),
  KEY `viec_lam_phuc_loi_phucloi_id_90cffc67_fk_phuc_loi_id` (`phucloi_id`),
  CONSTRAINT `viec_lam_phuc_loi_phucloi_id_90cffc67_fk_phuc_loi_id` FOREIGN KEY (`phucloi_id`) REFERENCES `phuc_loi` (`id`),
  CONSTRAINT `viec_lam_phuc_loi_vieclam_id_2b26bce0_fk_viec_lam_id` FOREIGN KEY (`vieclam_id`) REFERENCES `viec_lam` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `viec_lam_phuc_loi`
--

LOCK TABLES `viec_lam_phuc_loi` WRITE;
/*!40000 ALTER TABLE `viec_lam_phuc_loi` DISABLE KEYS */;
INSERT INTO `viec_lam_phuc_loi` VALUES (1,1,1),(2,1,3);
/*!40000 ALTER TABLE `viec_lam_phuc_loi` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-09-25 21:07:29
