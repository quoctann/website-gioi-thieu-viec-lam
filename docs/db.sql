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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `danh_gia_nha_tuyen_dung`
--

LOCK TABLES `danh_gia_nha_tuyen_dung` WRITE;
/*!40000 ALTER TABLE `danh_gia_nha_tuyen_dung` DISABLE KEYS */;
INSERT INTO `danh_gia_nha_tuyen_dung` VALUES (1,'Cập nhật',4,'2021-09-25',1,4,2),(2,'Okila 2',5,'2021-09-25',1,5,3),(3,'Không có nhà ăn',1,'2021-09-25',1,5,2),(4,'Không có bãi đậu xe',1,'2021-09-25',2,4,3),(8,'Cập nhật đánh giá 999',5,'2021-10-02',6,4,2),(9,'Công việc ok reload',5,'2021-10-02',2,4,2),(10,'Công việc tạm được',3,'2021-10-02',11,5,2);
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
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
INSERT INTO `django_admin_log` VALUES (1,'2021-09-25 13:37:14.687569','1','BangCap object (1)',1,'[{\"added\": {}}]',7,1),(2,'2021-09-25 13:37:25.242595','1','BangCap object (1)',2,'[]',7,1),(3,'2021-09-25 13:37:36.106784','2','BangCap object (2)',1,'[{\"added\": {}}]',7,1),(4,'2021-09-25 13:37:46.184532','3','BangCap object (3)',1,'[{\"added\": {}}]',7,1),(5,'2021-09-25 13:37:52.723007','4','BangCap object (4)',1,'[{\"added\": {}}]',7,1),(6,'2021-09-25 13:37:56.890563','5','BangCap object (5)',1,'[{\"added\": {}}]',7,1),(7,'2021-09-25 13:40:32.365251','1','KinhNghiem object (1)',1,'[{\"added\": {}}]',9,1),(8,'2021-09-25 13:40:55.427421','2','KinhNghiem object (2)',1,'[{\"added\": {}}]',9,1),(9,'2021-09-25 13:41:11.822071','3','KinhNghiem object (3)',1,'[{\"added\": {}}]',9,1),(10,'2021-09-25 13:41:39.145865','4','KinhNghiem object (4)',1,'[{\"added\": {}}]',9,1),(11,'2021-09-25 13:42:59.151274','1','KyNang object (1)',1,'[{\"added\": {}}]',10,1),(12,'2021-09-25 13:43:06.331362','2','KyNang object (2)',1,'[{\"added\": {}}]',10,1),(13,'2021-09-25 13:43:20.276070','3','KyNang object (3)',1,'[{\"added\": {}}]',10,1),(14,'2021-09-25 13:43:26.261474','4','KyNang object (4)',1,'[{\"added\": {}}]',10,1),(15,'2021-09-25 13:43:39.557891','1','NganhNghe object (1)',1,'[{\"added\": {}}]',11,1),(16,'2021-09-25 13:43:56.583542','2','NganhNghe object (2)',1,'[{\"added\": {}}]',11,1),(17,'2021-09-25 13:44:04.763581','3','NganhNghe object (3)',1,'[{\"added\": {}}]',11,1),(18,'2021-09-25 13:44:08.639286','4','NganhNghe object (4)',1,'[{\"added\": {}}]',11,1),(19,'2021-09-25 13:44:25.190374','1','PhucLoi object (1)',1,'[{\"added\": {}}]',12,1),(20,'2021-09-25 13:44:31.130834','2','PhucLoi object (2)',1,'[{\"added\": {}}]',12,1),(21,'2021-09-25 13:44:59.219635','3','PhucLoi object (3)',1,'[{\"added\": {}}]',12,1),(22,'2021-09-25 13:45:07.295292','4','PhucLoi object (4)',1,'[{\"added\": {}}]',12,1),(23,'2021-09-25 13:46:37.847257','4','KinhNghiem object (4)',2,'[{\"changed\": {\"fields\": [\"Ten\"]}}]',9,1),(24,'2021-09-25 13:47:12.624112','5','KinhNghiem object (5)',1,'[{\"added\": {}}]',9,1),(25,'2021-09-25 13:50:55.009544','5','NhaTuyenDung object (5)',2,'[{\"changed\": {\"fields\": [\"Ten cong ty\", \"Dia chi\", \"Quy mo\", \"Doi xet duyet\", \"Gioi thieu\"]}}]',13,1),(26,'2021-09-25 13:53:39.647081','4','NhaTuyenDung object (4)',2,'[{\"changed\": {\"fields\": [\"Ten cong ty\", \"Dia chi\", \"Quy mo\", \"Doi xet duyet\", \"Gioi thieu\"]}}]',13,1),(27,'2021-09-25 13:54:43.058294','5','NhaTuyenDung object (5)',2,'[{\"changed\": {\"fields\": [\"Gioi thieu\"]}}]',13,1),(28,'2021-09-25 13:54:51.617693','5','NhaTuyenDung object (5)',2,'[]',13,1),(29,'2021-09-25 13:55:11.423868','4','NhaTuyenDung object (4)',2,'[{\"changed\": {\"fields\": [\"Gioi thieu\"]}}]',13,1),(30,'2021-09-25 13:56:58.909724','1','ViecLam object (1)',1,'[{\"added\": {}}]',15,1),(31,'2021-09-25 14:01:57.992404','1','DanhGiaNhaTuyenDung object (1)',1,'[{\"added\": {}}]',18,1),(32,'2021-09-25 14:02:17.527905','2','DanhGiaNhaTuyenDung object (2)',1,'[{\"added\": {}}]',18,1),(33,'2021-09-25 14:03:39.779541','3','DanhGiaNhaTuyenDung object (3)',1,'[{\"added\": {}}]',18,1),(34,'2021-09-25 14:04:00.814488','4','DanhGiaNhaTuyenDung object (4)',1,'[{\"added\": {}}]',18,1),(35,'2021-09-26 03:40:52.756839','2','UngVien object (2)',2,'[{\"changed\": {\"fields\": [\"Ngay sinh\", \"Cv\", \"Gioi thieu\", \"Bang cap\", \"Ky nang\", \"Nganh nghe\", \"Kinh nghiem\"]}}]',16,1),(36,'2021-09-26 10:39:16.820508','1','ViecLam object (1)',2,'[{\"changed\": {\"fields\": [\"Nganh nghe\"]}}]',15,1),(37,'2021-09-26 10:39:35.467263','10','ViecLam object (10)',2,'[{\"changed\": {\"fields\": [\"Bang cap\", \"Ky nang\", \"Nganh nghe\", \"Kinh nghiem\", \"Phuc loi\"]}}]',15,1),(38,'2021-09-26 10:39:47.145669','4','ViecLam object (4)',2,'[{\"changed\": {\"fields\": [\"Bang cap\", \"Ky nang\", \"Nganh nghe\", \"Kinh nghiem\", \"Phuc loi\"]}}]',15,1),(39,'2021-09-27 02:54:48.149454','6','quanly',1,'[{\"added\": {}}]',6,1),(40,'2021-09-27 03:02:59.033580','6','QuanLy object (6)',1,'[{\"added\": {}}]',14,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2021-09-25 13:22:12.252456'),(2,'contenttypes','0002_remove_content_type_name','2021-09-25 13:22:12.472058'),(3,'auth','0001_initial','2021-09-25 13:22:13.344369'),(4,'auth','0002_alter_permission_name_max_length','2021-09-25 13:22:13.533667'),(5,'auth','0003_alter_user_email_max_length','2021-09-25 13:22:13.550057'),(6,'auth','0004_alter_user_username_opts','2021-09-25 13:22:13.595093'),(7,'auth','0005_alter_user_last_login_null','2021-09-25 13:22:13.608602'),(8,'auth','0006_require_contenttypes_0002','2021-09-25 13:22:13.617076'),(9,'auth','0007_alter_validators_add_error_messages','2021-09-25 13:22:13.634251'),(10,'auth','0008_alter_user_username_max_length','2021-09-25 13:22:13.649086'),(11,'auth','0009_alter_user_last_name_max_length','2021-09-25 13:22:13.661798'),(12,'auth','0010_alter_group_name_max_length','2021-09-25 13:22:13.697987'),(13,'auth','0011_update_proxy_permissions','2021-09-25 13:22:13.712523'),(14,'auth','0012_alter_user_first_name_max_length','2021-09-25 13:22:13.728327'),(15,'viec_lam_app','0001_initial','2021-09-25 13:22:20.065587'),(16,'admin','0001_initial','2021-09-25 13:22:20.472339'),(17,'admin','0002_logentry_remove_auto_add','2021-09-25 13:22:20.496005'),(18,'admin','0003_logentry_add_action_flag_choices','2021-09-25 13:22:20.530532'),(19,'oauth2_provider','0001_initial','2021-09-25 13:22:22.703678'),(20,'oauth2_provider','0002_auto_20190406_1805','2021-09-25 13:22:22.860728'),(21,'oauth2_provider','0003_auto_20201211_1314','2021-09-25 13:22:23.124716'),(22,'oauth2_provider','0004_auto_20200902_2022','2021-09-25 13:22:24.292746'),(23,'sessions','0001_initial','2021-09-25 13:22:24.403680'),(24,'viec_lam_app','0002_alter_kinhnghiem_ten','2021-09-25 13:40:01.611478'),(25,'viec_lam_app','0003_auto_20210925_1342','2021-09-25 13:42:45.053206'),(26,'viec_lam_app','0004_auto_20210926_0339','2021-09-26 03:39:31.426815'),(27,'viec_lam_app','0005_auto_20210926_1038','2021-09-26 10:38:59.690188'),(28,'viec_lam_app','0006_auto_20210927_0232','2021-09-27 02:32:44.910593'),(29,'viec_lam_app','0007_auto_20210928_1009','2021-09-28 10:10:05.547134'),(30,'viec_lam_app','0008_alter_nhatuyendung_gioi_thieu','2021-09-30 05:25:51.600328');
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
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nguoi_dung`
--

LOCK TABLES `nguoi_dung` WRITE;
/*!40000 ALTER TABLE `nguoi_dung` DISABLE KEYS */;
INSERT INTO `nguoi_dung` VALUES (1,'pbkdf2_sha256$260000$M51UYygTQeqmI6c9Tpp42h$eD2VgFWY0gB1epY3bBIbD8cbgBYsBM0jVIrIjK/fUdw=','2021-09-25 13:23:39.848291',1,'admin','','',1,1,'2021-09-25 13:23:25.003607','1851050127tan@ou.edu.vn','','',''),(2,'pbkdf2_sha256$260000$PPZZv3ed0E5jbx50V1rkJO$wdmNQgpTyAQrIdf2N6cU0TArziD3Vl7Yoh4GVAs/MgA=',NULL,0,'uv','Tấn','Trần',0,1,'2021-09-25 13:48:08.008860','uv@mail.com','','static/upload/2021/09/default.jpg','UNG VIEN'),(3,'pbkdf2_sha256$260000$mcnKMYELvjlWIJ7e85sWYF$lJkmbpOc5Mjpgyzru2Wldx3We2/tmcAUcUnbkRWnKe8=',NULL,0,'uv2','Tú','Lê',0,1,'2021-09-25 13:48:47.514451','uv2@mail.com','','static/upload/2021/09/default.jpg','UNG VIEN'),(4,'pbkdf2_sha256$260000$hMvJlIhHd22gWUHXph2At8$IX5IF52ohwKxI6D1whRovYSlx/M5oDtHkKDGNhJIZFA=',NULL,0,'ntd','Thúy','Nguyễn',0,1,'2021-09-25 13:49:24.266116','ntd@mail.com','','static/upload/2021/09/default.jpg','TUYEN DUNG'),(5,'pbkdf2_sha256$260000$H4LaHpuHnlZdjOlk7ix5SV$vkCn4TIIDwUEAPt6l14YN5H0cuU/RSPOmB6xzoQvPhA=',NULL,0,'ntd2','Hải','Lý',0,1,'2021-09-25 13:49:54.571114','ntd2@mail.com','','static/upload/2021/09/default.jpg','TUYEN DUNG'),(6,'pbkdf2_sha256$260000$H4LaHpuHnlZdjOlk7ix5SV$vkCn4TIIDwUEAPt6l14YN5H0cuU/RSPOmB6xzoQvPhA=','2021-09-27 02:51:17.000000',0,'quanly','Tấn','Trần Quốc',1,1,'2021-09-27 02:50:57.000000','tqtlife@gmail.com','0706638940','static/upload/2021/09/default.jpg','QUAN LY'),(7,'pbkdf2_sha256$260000$kLH7zGVyGq6nsqXyojE0MZ$EhLYksEvWOICUbNkuDhycz2wpnSGnx67k5nktl69604=',NULL,0,'refactor1','Tran','Tan',0,1,'2021-09-27 03:12:41.135103','refactor@mail.com','','static/upload/2021/09/default.jpg','UNG VIEN'),(8,'pbkdf2_sha256$260000$dXhJZ0V8mZy6nT1ALIi1m7$y4CIBWTp1nMaqfskgr46PHQ0AX+VA+mzy7EAMEs1OVk=',NULL,0,'refactor2','Tran','Tan',0,1,'2021-09-27 03:13:24.213118','refactor2@mail.com','','static/upload/2021/09/default.jpg','TUYEN DUNG'),(9,'pbkdf2_sha256$260000$R0DCQmDpAnNAlVi1Kef1vL$voiy0IgW8mwBNuoCUO9zPIdmuGPTLl3O/0akCZzJm5M=',NULL,0,'test1','Quốc','Tấn',0,1,'2021-09-27 03:19:08.566092','test@mail.com','','static/upload/2021/09/default.jpg','UNG VIEN'),(10,'pbkdf2_sha256$260000$XejPjTuxuRDcnuildevMnD$r+BFOyTaJONb4b3L/BqRs7MyAjwceDN+vMChe/F7fBg=',NULL,0,'test2','Vin','Lê',0,1,'2021-09-27 03:21:09.554835','vin@mail.com','','static/upload/2021/09/default.jpg','UNG VIEN'),(11,'pbkdf2_sha256$260000$uiytsxLgjvbGOheS1vC6mY$3dfZWKUfnDf7luAjvCBZ8lKmegay7l6xo8sP2lUbuGs=',NULL,0,'ntd9','Tran','Tan',0,1,'2021-09-27 06:02:57.337812','tqtmail@yahoo.com','','static/upload/2021/09/default.jpg','TUYEN DUNG'),(12,'pbkdf2_sha256$260000$h11iwkfVWK0iNdFL2573fg$tB/YBBX9KQ/RBdit5bSwJUPfmcqNk64yHykfoX0Nwms=',NULL,0,'ntd8','Quốc','Tấn',0,1,'2021-09-27 06:04:04.151114','tan@mail.com','','static/upload/2021/09/default.jpg','TUYEN DUNG'),(13,'pbkdf2_sha256$260000$liUnJjBFQKxu8kuQkIcecD$9HiD0Gm3V/tl0/yIhseCSNcu/JEBu0hi1RjayBIFqVw=',NULL,0,'ntd7','Quốc','Tấn',0,1,'2021-09-27 06:04:29.833745','tqthost@gmail.com','','static/upload/2021/09/default.jpg','TUYEN DUNG');
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
) ENGINE=InnoDB AUTO_INCREMENT=93 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nguoi_dung_user_permissions`
--

LOCK TABLES `nguoi_dung_user_permissions` WRITE;
/*!40000 ALTER TABLE `nguoi_dung_user_permissions` DISABLE KEYS */;
INSERT INTO `nguoi_dung_user_permissions` VALUES (1,6,1),(2,6,2),(3,6,3),(4,6,4),(5,6,5),(6,6,6),(7,6,7),(8,6,8),(9,6,9),(10,6,10),(11,6,11),(12,6,12),(13,6,13),(14,6,14),(15,6,15),(16,6,16),(17,6,17),(18,6,18),(19,6,19),(20,6,20),(21,6,21),(22,6,22),(23,6,23),(24,6,24),(25,6,25),(26,6,26),(27,6,27),(28,6,28),(29,6,29),(30,6,30),(31,6,31),(32,6,32),(33,6,33),(34,6,34),(35,6,35),(36,6,36),(37,6,37),(38,6,38),(39,6,39),(40,6,40),(41,6,41),(42,6,42),(43,6,43),(44,6,44),(45,6,45),(46,6,46),(47,6,47),(48,6,48),(49,6,49),(50,6,50),(51,6,51),(52,6,52),(53,6,53),(54,6,54),(55,6,55),(56,6,56),(57,6,57),(58,6,58),(59,6,59),(60,6,60),(61,6,61),(62,6,62),(63,6,63),(64,6,64),(65,6,65),(66,6,66),(67,6,67),(68,6,68),(69,6,69),(70,6,70),(71,6,71),(72,6,72),(73,6,73),(74,6,74),(75,6,75),(76,6,76),(77,6,77),(78,6,78),(79,6,79),(80,6,80),(81,6,81),(82,6,82),(83,6,83),(84,6,84),(85,6,85),(86,6,86),(87,6,87),(88,6,88),(89,6,89),(90,6,90),(91,6,91),(92,6,92);
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
  `gioi_thieu` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`nguoi_dung_id`),
  CONSTRAINT `nha_tuyen_dung_nguoi_dung_id_79885dfa_fk_nguoi_dung_id` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nha_tuyen_dung`
--

LOCK TABLES `nha_tuyen_dung` WRITE;
/*!40000 ALTER TABLE `nha_tuyen_dung` DISABLE KEYS */;
INSERT INTO `nha_tuyen_dung` VALUES (4,'Tập đoàn Trường Hải','321 Cao Lỗ',1000,3.7,0,'Tại Navigos Group, mỗi ngày đi làm của hơn 500 DREAM MAKERS chúng tôi đều là một ngày vui. Vui vì tất cả đều cảm nhận được rằng mình đang làm một công việc có ý nghĩa, và vui vì hơn hết mỗi người đều được sống và làm việc trong một đại gia đình NAVIWORKS (cách gọi thân mật từ sự kết hợp của VietnamWorks và Navigos Search) giàu tính nhân văn và luôn được quan tâm chân thành từ các cấp lãnh đạo cao nhất, tới những người bạn đồng nghiệp ngồi cùng bàn. Các thành viên của đại gia đình NAVIWORKS còn được thường xuyên tham gia các chương trình đào tạo nhằm phát triển chuyên môn từ các chuyên gia và người quản lý trực tiếp, cùng chế độ đãi ngộ hấp dẫn, tương xứng với năng lực và kết quả công việc.'),(5,'Công ty TNHH VinPro','123 Lê Lai',200,3,0,'Tại Navigos Group, mỗi ngày đi làm của hơn 500 DREAM MAKERS chúng tôi đều là một ngày vui. Vui vì tất cả đều cảm nhận được rằng mình đang làm một công việc có ý nghĩa, và vui vì hơn hết mỗi người đều được sống và làm việc trong một đại gia đình NAVIWORKS (cách gọi thân mật từ sự kết hợp của VietnamWorks và Navigos Search) giàu tính nhân văn và luôn được quan tâm chân thành từ các cấp lãnh đạo cao nhất, tới những người bạn đồng nghiệp ngồi cùng bàn. Các thành viên của đại gia đình NAVIWORKS còn được thường xuyên tham gia các chương trình đào tạo nhằm phát triển chuyên môn từ các chuyên gia và người quản lý trực tiếp, cùng chế độ đãi ngộ hấp dẫn, tương xứng với năng lực và kết quả công việc.'),(8,'Công ty may Việt Tiến','1 Cao Lỗ',50,0,0,'với năng lực và kết quả công việc.'),(11,'Công ty XNK Việt Hải','2 Lê Lợi',10,0,0,'với năng lực và kết quả công việc.'),(12,'Kho xưởng Đông Triều','3 Hoa Hồng',20,0,0,'với năng lực và kết quả công việc.'),(13,'Cửa hàng thú y Hồng Tâm','4 Vườn Lài',50,0,0,'với năng lực và kết quả công việc.');
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
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oauth2_provider_accesstoken`
--

LOCK TABLES `oauth2_provider_accesstoken` WRITE;
/*!40000 ALTER TABLE `oauth2_provider_accesstoken` DISABLE KEYS */;
INSERT INTO `oauth2_provider_accesstoken` VALUES (1,'51M9tYxG8FYceiS8gRoBs26Q50yju1','2021-09-26 00:05:15.271455','read write',1,2,'2021-09-25 14:05:15.271974','2021-09-25 14:05:15.271988',NULL,NULL),(2,'HhyqUiWCN0gfukzt1EIFqsFFhOuDl9','2021-09-26 11:09:57.354777','read write',1,2,'2021-09-26 01:09:57.355226','2021-09-26 01:09:57.355238',NULL,NULL),(3,'4834WzUEgf4kqsTmsgnQc7WLFxafxS','2021-09-26 12:43:16.355378','read write',1,2,'2021-09-26 02:43:16.355811','2021-09-26 02:43:16.355826',NULL,NULL),(4,'SPZL5YsyifmYaPGdThtRQMj25vM3ut','2021-09-26 12:46:41.867661','read write',1,2,'2021-09-26 02:46:41.868089','2021-09-26 02:46:41.868104',NULL,NULL),(5,'dQ4DelsXoLHE20h2m19ZBD1CaNcNIW','2021-09-26 13:42:04.903558','read write',1,2,'2021-09-26 03:42:04.904032','2021-09-26 03:42:04.904045',NULL,NULL),(6,'nbxKT2RCOXoEZXq1HZMHmOIUb00351','2021-09-26 14:13:00.368344','read write',1,4,'2021-09-26 04:13:00.368732','2021-09-26 04:13:00.368776',NULL,NULL),(7,'7KJHyk2IeiwAiNfpDTF7QUEs6CCI6a','2021-09-26 14:20:02.518841','read write',1,2,'2021-09-26 04:20:02.519241','2021-09-26 04:20:02.519254',NULL,NULL),(8,'v3RGB8HfINivxE1jCRKJbGymuxfAA7','2021-09-26 14:33:06.283365','read write',1,2,'2021-09-26 04:33:06.283733','2021-09-26 04:33:06.283745',NULL,NULL),(9,'JzASKTHuhzPQz8Vh0qYhseTax5jbJY','2021-09-26 14:46:45.883665','read write',1,2,'2021-09-26 04:46:45.884059','2021-09-26 04:46:45.884071',NULL,NULL),(10,'QZPl7bho6tW2f4z4F28AzT273ndMy6','2021-09-26 15:02:09.521121','read write',1,4,'2021-09-26 05:02:09.521498','2021-09-26 05:02:09.521510',NULL,NULL),(11,'0DnKRaUm148Jf54RJNkkSWUf1c4T2g','2021-09-26 15:56:34.154310','read write',1,2,'2021-09-26 05:56:34.154853','2021-09-26 05:56:34.154868',NULL,NULL),(12,'CrHPMdi1NkmQdU4OiRFMeMrqwkIhJa','2021-09-26 16:24:56.876116','read write',1,4,'2021-09-26 06:24:56.876602','2021-09-26 06:24:56.876614',NULL,NULL),(13,'wNRIr0X4ESa42dvlUeeerKJ9eTKmu2','2021-09-26 16:47:55.257183','read write',1,2,'2021-09-26 06:47:55.257558','2021-09-26 06:47:55.257571',NULL,NULL),(14,'5Snj3wEan4JYLsXDRbcmtqDRFqhYoQ','2021-09-26 22:16:27.534344','read write',1,2,'2021-09-26 12:16:27.534934','2021-09-26 12:16:27.534947',NULL,NULL),(15,'Glq9EmG324QHN8uU8ydjeKcqti0Vd2','2021-09-26 22:17:34.593372','read write',1,4,'2021-09-26 12:17:34.594164','2021-09-26 12:17:34.594194',NULL,NULL),(16,'b4wtPbcB3BpetAfEy6ormB49zJNcyC','2021-09-27 12:55:30.007484','read write',1,6,'2021-09-27 02:55:30.007976','2021-09-27 02:55:30.007988',NULL,NULL),(17,'5qehofYuV7iud5rUjA9JH7Owa1cJlM','2021-09-27 13:01:43.526906','read write',1,6,'2021-09-27 03:01:43.527735','2021-09-27 03:01:43.527750',NULL,NULL),(18,'KUUJFQTjuT2xiwpapVSAxCBQ0eRikx','2021-09-27 13:03:10.937371','read write',1,6,'2021-09-27 03:03:10.937870','2021-09-27 03:03:10.937885',NULL,NULL),(19,'v7iR1wlePgybxtVKR00CK7PMe7UCdW','2021-09-27 13:03:46.978335','read write',1,6,'2021-09-27 03:03:46.978833','2021-09-27 03:03:46.978845',NULL,NULL),(20,'RMBOqvsu6u4YHY4LXGYFeb2oMnWBdw','2021-09-27 13:05:51.581197','read write',1,6,'2021-09-27 03:05:51.581556','2021-09-27 03:05:51.581569',NULL,NULL),(21,'ixAbJ4VbGae1G8sxvh7BeVoSj9b10P','2021-09-27 14:07:09.286046','read write',1,6,'2021-09-27 04:07:09.286557','2021-09-27 04:07:09.286570',NULL,NULL),(22,'fNlW0HUv7VCju4VJUaluhcB1DOqkfA','2021-09-27 16:04:48.996358','read write',1,6,'2021-09-27 06:04:48.996811','2021-09-27 06:04:48.996823',NULL,NULL),(23,'yvmfW6pRHXK26D2fr7aGBwVNc1Rj1P','2021-09-27 19:58:49.856870','read write',1,2,'2021-09-27 09:58:49.857409','2021-09-27 09:58:49.857424',NULL,NULL),(24,'GjIIACHdA5a47gJt8hzHbtmBaZvV8Y','2021-09-27 19:59:38.449240','read write',1,6,'2021-09-27 09:59:38.449689','2021-09-27 09:59:38.449703',NULL,NULL),(25,'eR4aOhEsN6DFLIduO7D3nP2Lko4lXf','2021-09-27 20:43:48.189398','read write',1,4,'2021-09-27 10:43:48.189862','2021-09-27 10:43:48.189875',NULL,NULL),(26,'zSQzh6yO1es41Ss7O2EYM6nhumts4e','2021-09-27 20:46:34.342020','read write',1,6,'2021-09-27 10:46:34.342478','2021-09-27 10:46:34.342492',NULL,NULL),(27,'80tZ5NatFVmlE3lfk844C0EO5tPCpc','2021-09-28 11:59:04.252272','read write',1,6,'2021-09-28 01:59:04.252734','2021-09-28 01:59:04.252746',NULL,NULL),(28,'7ITlm8ceGErWrDpFNGqKEzS4rpWriY','2021-09-28 20:39:39.736864','read write',1,4,'2021-09-28 10:39:39.738068','2021-09-28 10:39:39.738084',NULL,NULL),(29,'wWD6YRaV4Mg8SJ3HMV45wrRZwVmEEq','2021-09-28 21:05:38.003236','read write',1,4,'2021-09-28 11:05:38.003876','2021-09-28 11:05:38.003900',NULL,NULL),(30,'2dS2qcCf5oVkT47h4GQiKzGOe4J2Rb','2021-09-28 21:53:12.151396','read write',1,2,'2021-09-28 11:53:12.151847','2021-09-28 11:53:12.151861',NULL,NULL),(31,'pyKxyBZIOlY6JsWZhe9voXPeUHPB3j','2021-09-28 21:54:39.008391','read write',1,2,'2021-09-28 11:54:39.008830','2021-09-28 11:54:39.008846',NULL,NULL),(32,'Ye83H7RWjZev6awuBBdVYW5ARYJFCF','2021-09-28 21:55:52.468953','read write',1,4,'2021-09-28 11:55:52.469407','2021-09-28 11:55:52.469422',NULL,NULL),(33,'Kvx5pgNF8jMaNYMlF3pjLUNjAfCSPL','2021-09-28 22:00:52.798332','read write',1,2,'2021-09-28 12:00:52.799652','2021-09-28 12:00:52.799669',NULL,NULL),(34,'muQFRVPX8LRTTwAw8otK37lbuBkDYG','2021-09-28 22:01:29.118398','read write',1,3,'2021-09-28 12:01:29.118838','2021-09-28 12:01:29.118852',NULL,NULL),(35,'um22pgd7OcFdevfN67FdC4MExfNwN8','2021-09-29 00:10:49.807639','read write',1,2,'2021-09-28 14:10:49.808200','2021-09-28 14:10:49.808213',NULL,NULL),(36,'qX56hslb7MDKMUMze19hAl1N63DTPq','2021-09-29 00:11:29.422906','read write',1,10,'2021-09-28 14:11:29.423337','2021-09-28 14:11:29.423352',NULL,NULL),(37,'PB3xToRz7XUGHkBhzDB1DDlg1hB0Om','2021-09-29 00:12:21.379902','read write',1,4,'2021-09-28 14:12:21.380297','2021-09-28 14:12:21.380308',NULL,NULL),(38,'BjE5xxJrcZIx8bZyhTtPnQT5uL6Z8Z','2021-09-29 00:12:27.380331','read write',1,4,'2021-09-28 14:12:27.380703','2021-09-28 14:12:27.380715',NULL,NULL),(39,'jsZutx1vo9dbuaPlRBa4NCVQHobLMl','2021-09-29 00:19:52.122160','read write',1,4,'2021-09-28 14:19:52.122599','2021-09-28 14:19:52.122614',NULL,NULL),(40,'IB0i42h2htl79loLHBudfb13RRMwij','2021-09-29 00:31:05.689077','read write',1,2,'2021-09-28 14:31:05.689513','2021-09-28 14:31:05.689528',NULL,NULL),(41,'SLRdnbP99ruPMGTYglTRqzoVNXfNur','2021-09-29 00:34:12.424669','read write',1,3,'2021-09-28 14:34:12.425343','2021-09-28 14:34:12.425357',NULL,NULL),(42,'V43Ab28PJLF7O0Chpw2rrj6MgHItDJ','2021-09-29 00:39:09.161301','read write',1,10,'2021-09-28 14:39:09.161801','2021-09-28 14:39:09.161814',NULL,NULL),(43,'d34VzWfm5hTDVUhuSfrMAaPdGNrpWZ','2021-09-29 00:42:21.247869','read write',1,2,'2021-09-28 14:42:21.248245','2021-09-28 14:42:21.248257',NULL,NULL),(44,'DKxqU2i7efXlU64dliQxp5lI1R857y','2021-09-29 00:50:46.030924','read write',1,6,'2021-09-28 14:50:46.031294','2021-09-28 14:50:46.031307',NULL,NULL),(45,'npNpQBstGkUZzGuB4oabyncwv4OWIX','2021-09-29 01:00:50.020470','read write',1,2,'2021-09-28 15:00:50.021138','2021-09-28 15:00:50.021152',NULL,NULL),(46,'tVzAkhckc04BUl4GwhQ8JfhWQKeCBw','2021-09-29 18:07:36.714289','read write',1,4,'2021-09-29 08:07:36.714761','2021-09-29 08:07:36.714773',NULL,NULL),(47,'htjceLvMRS94VhO8zuTv1bX5KGrniz','2021-09-29 18:40:01.738476','read write',1,4,'2021-09-29 08:40:01.739028','2021-09-29 08:40:01.739043',NULL,NULL),(48,'3TSh47jtoRdkSVAXZtY9MXUaDBiV0Y','2021-09-29 23:46:51.973211','read write',1,4,'2021-09-29 13:46:51.973636','2021-09-29 13:46:51.973648',NULL,NULL),(49,'rezoPvaoJRO895g9VJP1lSxTxlgaml','2021-09-29 23:56:34.100857','read write',1,4,'2021-09-29 13:56:34.101359','2021-09-29 13:56:34.101373',NULL,NULL),(50,'hRpQogtI7EBCrgj8IgWckPrKoIgJOH','2021-09-30 01:05:14.074979','read write',1,4,'2021-09-29 15:05:14.075595','2021-09-29 15:05:14.075609',NULL,NULL),(51,'fMhQnDVUfnPHxcxdKDPncukYzEaWLc','2021-09-30 01:13:45.837654','read write',1,2,'2021-09-29 15:13:45.838198','2021-09-29 15:13:45.838213',NULL,NULL),(52,'I4dakc0hgPoD8wewW2JyWd5FMd4okh','2021-09-30 01:37:30.172687','read write',1,4,'2021-09-29 15:37:30.173232','2021-09-29 15:37:30.173247',NULL,NULL),(53,'Jq2uafBbx74KkoJPdAc2zZtpLFMDYz','2021-09-30 15:20:04.642499','read write',1,4,'2021-09-30 05:20:04.643012','2021-09-30 05:20:04.643026',NULL,NULL),(54,'fnm80tIZmjOFeZYYGywGKnBBixcCQ5','2021-09-30 15:20:39.671665','read write',1,2,'2021-09-30 05:20:39.672084','2021-09-30 05:20:39.672098',NULL,NULL),(55,'w4DoF9eMrCkrV7G2akdnVhaLo2In9R','2021-09-30 17:55:17.276058','read write',1,4,'2021-09-30 07:55:17.276602','2021-09-30 07:55:17.276616',NULL,NULL),(56,'yIWikbMMpoyWkqyff1mtvXSdeehkb3','2021-09-30 17:56:00.773166','read write',1,4,'2021-09-30 07:56:00.773565','2021-09-30 07:56:00.773577',NULL,NULL),(57,'VVgCDuYBLcZ4nu7dchUPL6hp188hKz','2021-09-30 17:56:30.569657','read write',1,2,'2021-09-30 07:56:30.570040','2021-09-30 07:56:30.570052',NULL,NULL),(58,'UHdhACahAdIimY6tK0N81M3V6KUq60','2021-09-30 22:05:33.005564','read write',1,4,'2021-09-30 12:05:33.006016','2021-09-30 12:05:33.006029',NULL,NULL),(59,'fiebajGrxjlQaNmzt6g0FNvoR23TNH','2021-09-30 22:05:55.679247','read write',1,2,'2021-09-30 12:05:55.679618','2021-09-30 12:05:55.679630',NULL,NULL),(60,'CEbLB8hghp7eVGwSQtGmplGVQy775K','2021-10-02 12:09:43.415938','read write',1,2,'2021-10-02 02:09:43.416402','2021-10-02 02:09:43.416415',NULL,NULL),(61,'p2uGJPVupEgGuN8JH7NKYmDJlklWzf','2021-10-02 16:05:49.689566','read write',1,4,'2021-10-02 06:05:49.690046','2021-10-02 06:05:49.690059',NULL,NULL),(62,'Uhkhy7aAEDcTNhj99TVybFRGy8Lsa0','2021-10-02 16:06:00.079067','read write',1,4,'2021-10-02 06:06:00.079459','2021-10-02 06:06:00.079471',NULL,NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oauth2_provider_refreshtoken`
--

LOCK TABLES `oauth2_provider_refreshtoken` WRITE;
/*!40000 ALTER TABLE `oauth2_provider_refreshtoken` DISABLE KEYS */;
INSERT INTO `oauth2_provider_refreshtoken` VALUES (1,'vnukoBnkLOrWyf6fKt4jjYICswuEwj',1,1,2,'2021-09-25 14:05:15.279382','2021-09-25 14:05:15.279412',NULL),(2,'THdXwO9HQ7t3nPfN3G3hprjNK1C6Sw',2,1,2,'2021-09-26 01:09:57.397592','2021-09-26 01:09:57.397623',NULL),(3,'ZoZwTN83VsbnbLhHuhGS23AdoP2lbF',3,1,2,'2021-09-26 02:43:16.362330','2021-09-26 02:43:16.362359',NULL),(4,'8C617zxhjrV3vREL3Rs7fys5tLhgdl',4,1,2,'2021-09-26 02:46:41.874254','2021-09-26 02:46:41.874282',NULL),(5,'kFEbHi494qUGvY3Jrd0z9sEQrt5f42',5,1,2,'2021-09-26 03:42:04.917521','2021-09-26 03:42:04.917562',NULL),(6,'odwjnXlU0gxPD0jK1Ubf8M9gscOukV',6,1,4,'2021-09-26 04:13:00.378679','2021-09-26 04:13:00.378720',NULL),(7,'fAGIuxlwKiehnQ0a9WBbdNX29L0QgF',7,1,2,'2021-09-26 04:20:02.525622','2021-09-26 04:20:02.525649',NULL),(8,'M7BcrU79NsGyFpBucNcxlTOc210AHl',8,1,2,'2021-09-26 04:33:06.289832','2021-09-26 04:33:06.289856',NULL),(9,'carYs0qH5Bjn3yTl0i1tZtKrFLVQ1h',9,1,2,'2021-09-26 04:46:45.890483','2021-09-26 04:46:45.890509',NULL),(10,'W0vqs68v3sEj0cBU0ce5LS1HEZRFlF',10,1,4,'2021-09-26 05:02:09.527967','2021-09-26 05:02:09.527993',NULL),(11,'kx8NEZF7sM4ImsMeFTRFMttniYO29B',11,1,2,'2021-09-26 05:56:34.168879','2021-09-26 05:56:34.168910',NULL),(12,'YU6NLwXOh3t7tzTA0XRWHbQHutx8Ex',12,1,4,'2021-09-26 06:24:56.883930','2021-09-26 06:24:56.883959',NULL),(13,'rVdg0XYELGx6PBBV3QrYXSJQFbiYqr',13,1,2,'2021-09-26 06:47:55.263935','2021-09-26 06:47:55.263975',NULL),(14,'0HLBPSzSMWNU4PHbQ5vRDRXvhJcpjX',14,1,2,'2021-09-26 12:16:27.551855','2021-09-26 12:16:27.551896',NULL),(15,'y2AqZ9nBeyRpOmiuIczUrUoY6w5ELY',15,1,4,'2021-09-26 12:17:34.603043','2021-09-26 12:17:34.603088',NULL),(16,'GccKwlF0tXEyTaapZhH0OiljCeezi4',16,1,6,'2021-09-27 02:55:30.021488','2021-09-27 02:55:30.021516',NULL),(17,'HEKIvQ34D2roPhMO2ZciB6b7MKNe7Z',17,1,6,'2021-09-27 03:01:43.534682','2021-09-27 03:01:43.534709',NULL),(18,'fr9thjXGO5KEUIxirQT1eDFMYpoNEb',18,1,6,'2021-09-27 03:03:10.961448','2021-09-27 03:03:10.961480',NULL),(19,'0d1FmdWpuipmUjPjVTMz3AJU3rlFi8',19,1,6,'2021-09-27 03:03:46.985915','2021-09-27 03:03:46.985944',NULL),(20,'jPp1hV9BgJIciBcVsREXJanNYAu05D',20,1,6,'2021-09-27 03:05:51.595667','2021-09-27 03:05:51.595697',NULL),(21,'RHMta1LkB7KKqUMejraqsQO8NWdMm9',21,1,6,'2021-09-27 04:07:09.298600','2021-09-27 04:07:09.298629',NULL),(22,'z7cilUROL3NL9DP6nAnMCgauddmswB',22,1,6,'2021-09-27 06:04:49.003327','2021-09-27 06:04:49.003355',NULL),(23,'YbUch8QgrvLJrvEK1czcamMu2meY0P',23,1,2,'2021-09-27 09:58:49.867504','2021-09-27 09:58:49.867536',NULL),(24,'de4gk1DqeUInpdEPosIvEdSijd8nn2',24,1,6,'2021-09-27 09:59:38.456045','2021-09-27 09:59:38.456073',NULL),(25,'ztSSkhq6rpT6NgjARZfuZua8J5lKg4',25,1,4,'2021-09-27 10:43:48.201924','2021-09-27 10:43:48.201971',NULL),(26,'vmJYtoOvLNIKIfGqJ6nWjNev2xqvU1',26,1,6,'2021-09-27 10:46:34.353227','2021-09-27 10:46:34.353259',NULL),(27,'29RwMwXbDY0NAd0C2EW899jScHJxKF',27,1,6,'2021-09-28 01:59:04.287137','2021-09-28 01:59:04.287169',NULL),(28,'SFdIdWlJM5E5EVCxTfQ67u5v15hJgk',28,1,4,'2021-09-28 10:39:39.753088','2021-09-28 10:39:39.753119',NULL),(29,'M9Ga2BMkarhlpkfWxbrzljVelJZC1W',29,1,4,'2021-09-28 11:05:38.018447','2021-09-28 11:05:38.018482',NULL),(30,'UCzcP2qeKVeUzeCtO4yyjDKPSSQkyW',30,1,2,'2021-09-28 11:53:12.158428','2021-09-28 11:53:12.158457',NULL),(31,'BdbITCX1eYlZri1411isWlf8lbCWy4',31,1,2,'2021-09-28 11:54:39.015130','2021-09-28 11:54:39.015156',NULL),(32,'ekoXbAxjbSMXpv7yDLpdJ1xBp4i2N5',32,1,4,'2021-09-28 11:55:52.475606','2021-09-28 11:55:52.475635',NULL),(33,'N7cQHMilPNFFbNFTwsfhKpw55ixebt',33,1,2,'2021-09-28 12:00:52.822216','2021-09-28 12:00:52.822247',NULL),(34,'Sb1i8rlpcHw6i0h6MhUbOTVOEyXjkR',34,1,3,'2021-09-28 12:01:29.125015','2021-09-28 12:01:29.125041',NULL),(35,'QL3v29UpDO2xbjTajljwXhZolUkW4y',35,1,2,'2021-09-28 14:10:49.814967','2021-09-28 14:10:49.814996',NULL),(36,'pMZB4udrg3OQGzR6tHQMKV9CD4hKDK',36,1,10,'2021-09-28 14:11:29.429572','2021-09-28 14:11:29.429601',NULL),(37,'Qz2liO5uSN6j8vqole0TNEHChyoNpU',37,1,4,'2021-09-28 14:12:21.386661','2021-09-28 14:12:21.386690',NULL),(38,'VzxreR2J0LlHhfj4bncHeVy6QeVYWm',38,1,4,'2021-09-28 14:12:27.386930','2021-09-28 14:12:27.386957',NULL),(39,'uDAMRO5G5ia1qiFUkb4qy4r8ZyDIqH',39,1,4,'2021-09-28 14:19:52.128605','2021-09-28 14:19:52.128631',NULL),(40,'uLSFAqdNbmYpwIVi8WdTEfi2T7jgZA',40,1,2,'2021-09-28 14:31:05.695826','2021-09-28 14:31:05.695854',NULL),(41,'J21p08XuTiQfYkYwZGS9Ku2E0vzGLI',41,1,3,'2021-09-28 14:34:12.437582','2021-09-28 14:34:12.437612',NULL),(42,'CZvx8a5NQ32MI7dZXgRI7f9S5CeIMH',42,1,10,'2021-09-28 14:39:09.168575','2021-09-28 14:39:09.168604',NULL),(43,'ZgFiAudZgpI1743S4TeBguSulz8nbL',43,1,2,'2021-09-28 14:42:21.254341','2021-09-28 14:42:21.254369',NULL),(44,'i6dG4tDdjDOD1vnb4DqYR7jzsQWGzm',44,1,6,'2021-09-28 14:50:46.037317','2021-09-28 14:50:46.037341',NULL),(45,'TwcShhrUxvCN5umN96ePvy11XQjXeV',45,1,2,'2021-09-28 15:00:50.031804','2021-09-28 15:00:50.031834',NULL),(46,'dXk3k8ipg2SQZ6Z9IUwhxiiDA7Sywh',46,1,4,'2021-09-29 08:07:36.738731','2021-09-29 08:07:36.738761',NULL),(47,'NRv343zOAbHn40p37VR48UqvNSX28v',47,1,4,'2021-09-29 08:40:01.751975','2021-09-29 08:40:01.752004',NULL),(48,'lW0L0COZ9AdxIUWWqLKYb8WmFdwq8v',48,1,4,'2021-09-29 13:46:51.980284','2021-09-29 13:46:51.980312',NULL),(49,'AgRn9LZWoSFsexPEGztui6oHxGbasG',49,1,4,'2021-09-29 13:56:34.107856','2021-09-29 13:56:34.107884',NULL),(50,'LR3d1XY8JhgZae7jNGVXFxs9SLCS6a',50,1,4,'2021-09-29 15:05:14.088391','2021-09-29 15:05:14.088420',NULL),(51,'KApGSRpgTEHsDwACOtkmUtl5AUBR5f',51,1,2,'2021-09-29 15:13:45.845740','2021-09-29 15:13:45.845792',NULL),(52,'hA8wW8ip1TcJRgw7lBeDTn9VgTlwv2',52,1,4,'2021-09-29 15:37:30.179719','2021-09-29 15:37:30.179746',NULL),(53,'lsPf3sjLglDMemE34fOIsNswTVrwoI',53,1,4,'2021-09-30 05:20:04.674917','2021-09-30 05:20:04.674947',NULL),(54,'9GIZEWGN895QKKGZwH9lLPpiprqT6a',54,1,2,'2021-09-30 05:20:39.678338','2021-09-30 05:20:39.678364',NULL),(55,'hi7jI4P2ivpVY6W0R6pKyaasPjiVaU',55,1,4,'2021-09-30 07:55:17.289600','2021-09-30 07:55:17.289630',NULL),(56,'taJjgVTHDa95aUWdO5jK8eMptLHgqc',56,1,4,'2021-09-30 07:56:00.779578','2021-09-30 07:56:00.779603',NULL),(57,'exbUgr6R6IMrEgtZlZ8H5R2UDJeLHn',57,1,2,'2021-09-30 07:56:30.576237','2021-09-30 07:56:30.576263',NULL),(58,'azt5CGxGJgGTC9yP62zVKNlTsIx9NQ',58,1,4,'2021-09-30 12:05:33.012121','2021-09-30 12:05:33.012144',NULL),(59,'JVJArwOqPfYuADG5MrOIqJ52mWUecB',59,1,2,'2021-09-30 12:05:55.685688','2021-09-30 12:05:55.685713',NULL),(60,'1EwpRSgUFu6oLwfzNH86IdGq70W8Dw',60,1,2,'2021-10-02 02:09:43.432133','2021-10-02 02:09:43.432163',NULL),(61,'8NSefMG0PRbgfBrUw1nUEV4y380GOf',61,1,4,'2021-10-02 06:05:49.711099','2021-10-02 06:05:49.711151',NULL),(62,'W94D6kLGPr5sAGgBsECZLVb5oe3GDG',62,1,4,'2021-10-02 06:06:00.085967','2021-10-02 06:06:00.085996',NULL);
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
  `log` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`nguoi_dung_id`),
  CONSTRAINT `quan_ly_nguoi_dung_id_725fb816_fk_nguoi_dung_id` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quan_ly`
--

LOCK TABLES `quan_ly` WRITE;
/*!40000 ALTER TABLE `quan_ly` DISABLE KEYS */;
INSERT INTO `quan_ly` VALUES (6,'2021-09-28 10:15:45.303603: Duyet tai khoan nha tuyen dung ID: 11\n2021-09-28 10:15:47.393735: Duyet tai khoan nha tuyen dung ID: 13\n2021-09-28 10:15:49.131651: Duyet tai khoan nha tuyen dung ID: 12\n');
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
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ung_tuyen`
--

LOCK TABLES `ung_tuyen` WRITE;
/*!40000 ALTER TABLE `ung_tuyen` DISABLE KEYS */;
INSERT INTO `ung_tuyen` VALUES (1,'2021-09-26','CHO XU LY',1,1,2),(2,'2021-09-26','CHAP NHAN',0,2,2),(3,'2021-09-26','CHO XU LY',1,4,2),(4,'2021-09-26','CHAP NHAN',0,6,2),(5,'2021-09-26','CHAP NHAN',1,11,2),(6,'2021-09-28','CHO XU LY',1,11,3),(9,'2021-09-28','CHAP NHAN',1,1,10),(10,'2021-09-29','CHO XU LY',1,10,2),(11,'2021-09-29','TU CHOI',1,5,2),(14,'2021-09-29','CHO XU LY',0,9,3);
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
INSERT INTO `ung_vien` VALUES (2,'2021-05-10','12 Lê Lai','static/upload/2021/09/default.jpg','Tôi là nhân viên kinh doanh'),(3,'1999-01-02','13 Nguyễn Trãi','','Tôi là nhân viên kinh doanh'),(7,'1998-12-31','2 Cao Lỗ','','Tôi là nhân viên kinh doanh'),(9,'2000-10-30','3 Lê Lợi','','Tôi là nhân viên kinh doanh'),(10,'2000-03-13','4 Hồng Bàng','','Tôi là nhân viên kinh doanh');
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ung_vien_bang_cap`
--

LOCK TABLES `ung_vien_bang_cap` WRITE;
/*!40000 ALTER TABLE `ung_vien_bang_cap` DISABLE KEYS */;
INSERT INTO `ung_vien_bang_cap` VALUES (1,2,1),(2,2,3),(3,3,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ung_vien_kinh_nghiem`
--

LOCK TABLES `ung_vien_kinh_nghiem` WRITE;
/*!40000 ALTER TABLE `ung_vien_kinh_nghiem` DISABLE KEYS */;
INSERT INTO `ung_vien_kinh_nghiem` VALUES (1,2,1),(2,3,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ung_vien_ky_nang`
--

LOCK TABLES `ung_vien_ky_nang` WRITE;
/*!40000 ALTER TABLE `ung_vien_ky_nang` DISABLE KEYS */;
INSERT INTO `ung_vien_ky_nang` VALUES (1,2,1),(2,3,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ung_vien_nganh_nghe`
--

LOCK TABLES `ung_vien_nganh_nghe` WRITE;
/*!40000 ALTER TABLE `ung_vien_nganh_nghe` DISABLE KEYS */;
INSERT INTO `ung_vien_nganh_nghe` VALUES (1,2,1),(2,2,2),(3,2,3),(4,3,1),(5,3,2),(6,7,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `viec_lam_bang_cap`
--

LOCK TABLES `viec_lam_bang_cap` WRITE;
/*!40000 ALTER TABLE `viec_lam_bang_cap` DISABLE KEYS */;
INSERT INTO `viec_lam_bang_cap` VALUES (1,1,1),(2,1,3),(3,1,5),(6,4,1),(7,4,2),(8,4,3),(4,10,1),(5,10,2);
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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `viec_lam_kinh_nghiem`
--

LOCK TABLES `viec_lam_kinh_nghiem` WRITE;
/*!40000 ALTER TABLE `viec_lam_kinh_nghiem` DISABLE KEYS */;
INSERT INTO `viec_lam_kinh_nghiem` VALUES (1,1,1),(2,1,3),(3,1,5),(6,4,1),(7,4,2),(4,10,1),(5,10,3);
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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `viec_lam_ky_nang`
--

LOCK TABLES `viec_lam_ky_nang` WRITE;
/*!40000 ALTER TABLE `viec_lam_ky_nang` DISABLE KEYS */;
INSERT INTO `viec_lam_ky_nang` VALUES (1,1,1),(2,1,3),(5,4,1),(6,4,2),(7,4,3),(3,10,1),(4,10,3);
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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `viec_lam_nganh_nghe`
--

LOCK TABLES `viec_lam_nganh_nghe` WRITE;
/*!40000 ALTER TABLE `viec_lam_nganh_nghe` DISABLE KEYS */;
INSERT INTO `viec_lam_nganh_nghe` VALUES (1,1,1),(3,1,2),(2,1,3),(4,1,4),(8,4,1),(9,4,2),(5,10,1),(6,10,2),(7,10,3);
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `viec_lam_phuc_loi`
--

LOCK TABLES `viec_lam_phuc_loi` WRITE;
/*!40000 ALTER TABLE `viec_lam_phuc_loi` DISABLE KEYS */;
INSERT INTO `viec_lam_phuc_loi` VALUES (1,1,1),(2,1,3),(5,4,1),(6,4,2),(3,10,2),(4,10,3);
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

-- Dump completed on 2021-10-02 13:08:45
