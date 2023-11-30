-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 27, 2023 at 02:41 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `calendar`
--

-- --------------------------------------------------------

--
-- Table structure for table `allcodes`
--

CREATE TABLE `allcodes` (
  `id` int(11) NOT NULL,
  `key` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `valueEN` varchar(255) DEFAULT NULL,
  `valueVI` varchar(255) DEFAULT NULL,
  `note` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `allcodes`
--

INSERT INTO `allcodes` (`id`, `key`, `type`, `valueEN`, `valueVI`, `note`, `createdAt`, `updatedAt`) VALUES
(1, 'R1', 'ROLE_M', 'Admin', 'Quản trị viên', NULL, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(2, 'R2', 'ROLE_M', 'Manager Branch 1', 'Quản lý chi nhánh 1', NULL, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(3, 'R3', 'ROLE_S', 'Staff Branch 1', 'Nhân viên chi nhánh 1', NULL, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(4, 'R4', 'ROLE_C', 'Customer Branch 1', 'Khách hàng chi nhánh 1', NULL, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(5, 'R5', 'ROLE_M', 'Manager Branch 2', 'Quản lý chí nhánh 2', NULL, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(6, 'R6', 'ROLE_S', 'Staff Branch 2', 'Nhân viên chi nhánh 2', NULL, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(7, 'R7', 'ROLE_C', 'Customer Branch 2', 'Khách hàng chi nhánh 2', NULL, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(8, 'T1', 'TIME', '8:00 AM - 9:00 AM', '8:00 - 9:00', NULL, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(9, 'T2', 'TIME', '9:00 AM - 10:00 AM', '9:00 - 10:00', NULL, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(10, 'T3', 'TIME', '10:00 AM - 11:00 AM', '10:00 - 11:00', NULL, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(11, 'T4', 'TIME', '11:00 AM - 0:00 PM', '11:00 - 12:00', NULL, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(12, 'T5', 'TIME', '1:00 PM - 2:00 PM', '13:00 - 14:00', NULL, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(13, 'T6', 'TIME', '2:00 PM - 3:00 PM', '14:00 - 15:00', NULL, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(14, 'T7', 'TIME', '3:00 PM - 4:00 PM', '15:00 - 16:00', NULL, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(15, 'T8', 'TIME', '4:00 PM - 5:00 PM', '16:00 - 17:00', NULL, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(16, 'M', 'GENDER', 'Male', 'Nam', NULL, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(17, 'F', 'GENDER', 'Female', 'Nữ', NULL, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(18, 'O', 'GENDER', 'Other', 'Khác', NULL, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(19, 'S1', 'SERVICE', 'WAXING SERVICE', 'WAXING SERVICE', NULL, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(20, 'S2', 'SERVICE', 'DIPPING MANICURE', 'DIPPING MANICURE', NULL, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(21, 'S3', 'SERVICE', 'SCULPTURE NAILS', 'SCULPTURE NAILS', NULL, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(22, 'S4', 'SERVICE', 'NATURAL NAILS MANICUR', 'NATURAL NAILS MANICUR', NULL, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(23, 'S5', 'SERVICE', 'NATURAL NAILS PEDICURE', 'NATURAL NAILS PEDICURE', NULL, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(25, 'U2', 'UNIT', 'Bottle', 'Chai', '10', '2023-07-22 15:24:20', '2023-09-23 14:35:23'),
(26, 'U3', 'UNIT', 'Box', 'Thùng', '2', '2023-07-22 15:24:20', '2023-09-23 14:38:32'),
(27, 'T9', 'TIME', 'Full time', 'Cả ngày', NULL, '2023-07-27 19:03:24', '2023-07-27 19:03:24'),
(89, 'U4', 'UNIT', 'Jar', 'Lọ', '', '2023-09-23 14:21:55', '2023-09-23 14:21:55');

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `id` int(11) NOT NULL,
  `userIdCreate` int(11) DEFAULT NULL,
  `customerName` varchar(255) DEFAULT NULL,
  `staffId` int(11) DEFAULT NULL,
  `themeId` varchar(255) DEFAULT NULL,
  `serviceId` int(11) DEFAULT NULL,
  `price` decimal(9,2) DEFAULT NULL,
  `discount` int(11) DEFAULT NULL,
  `total` decimal(9,2) DEFAULT NULL,
  `cashPay` decimal(9,2) DEFAULT NULL,
  `cardPay` decimal(9,2) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `note` varchar(255) DEFAULT NULL,
  `action` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `bookings`
--

INSERT INTO `bookings` (`id`, `userIdCreate`, `customerName`, `staffId`, `themeId`, `serviceId`, `price`, `discount`, `total`, `cashPay`, `cardPay`, `date`, `note`, `action`, `createdAt`, `updatedAt`) VALUES
(1, 1, NULL, 7, 'S1', 7, '43.00', 0, '43.00', '0.00', '43.00', '2023-09-20', '', 0, '2023-09-20 17:56:07', '2023-09-20 21:26:46'),
(2, 1, NULL, 7, 'S2', 8, '50.00', 0, '50.00', '50.00', '0.00', '2023-09-20', '', 0, '2023-09-20 17:58:18', '2023-09-20 21:27:16'),
(3, 1, 'nhu', 5, 'S1', 7, '43.00', 0, '43.00', '43.00', '0.00', '2023-09-20', '', 1, '2023-09-20 17:58:18', '2023-09-20 20:58:57'),
(4, 1, NULL, 7, 'S1', 7, '43.00', 0, '43.00', '43.00', '0.00', '2023-09-20', '', 1, '2023-09-20 18:00:51', '2023-09-20 18:00:51');

-- --------------------------------------------------------

--
-- Table structure for table `calendars`
--

CREATE TABLE `calendars` (
  `id` int(11) NOT NULL,
  `sovanban` varchar(255) DEFAULT NULL,
  `ngayphathanh` date DEFAULT NULL,
  `donviphathanh` varchar(255) DEFAULT NULL,
  `trichyeunoidung` text DEFAULT NULL,
  `chutheyeucau` varchar(255) DEFAULT NULL,
  `noidungyeucau` text DEFAULT NULL,
  `nguoithuchien` varchar(255) DEFAULT NULL,
  `nhactruoc` int(11) DEFAULT NULL,
  `douutien` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `calendars`
--

INSERT INTO `calendars` (`id`, `sovanban`, `ngayphathanh`, `donviphathanh`, `trichyeunoidung`, `chutheyeucau`, `noidungyeucau`, `nguoithuchien`, `nhactruoc`, `douutien`, `createdAt`, `updatedAt`) VALUES
(3, 'Số 48/QĐ-BCA', '2023-11-01', 'BCA', 'test edit', 'H05', 'test edit', 'Như', 3, 0, '2023-11-21 09:44:09', '2023-11-22 15:58:31'),
(4, 'Số 86/QĐ-BCA', '2023-09-04', 'BCA', 'dfgdf dfgdf dfgsdfg', 'H05', 'sdfds dsfsdf sdfsdf sdddddddddddddddddddđbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb', 'Như', 3, 1, '2023-11-21 14:51:57', '2023-11-21 14:51:57');

-- --------------------------------------------------------

--
-- Table structure for table `callbookings`
--

CREATE TABLE `callbookings` (
  `id` int(11) NOT NULL,
  `userIdCreate` int(11) DEFAULT NULL,
  `customerName` varchar(255) DEFAULT NULL,
  `peopleNumber` int(11) DEFAULT NULL,
  `phonenumber` varchar(255) DEFAULT NULL,
  `serviceName` varchar(255) DEFAULT NULL,
  `time` varchar(255) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `note` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `callbookings`
--

INSERT INTO `callbookings` (`id`, `userIdCreate`, `customerName`, `peopleNumber`, `phonenumber`, `serviceName`, `time`, `date`, `note`, `createdAt`, `updatedAt`) VALUES
(4, 1, 'nguyen', 2, '5675678998', 'uper lip 1', '18:00', '2023-09-12', 'dfgfhgkjkjhl', '2023-09-15 20:40:31', '2023-09-15 20:40:31'),
(5, 1, 'nhu', 1, '0643434565', 'Upper lip 1', '09:00', '2023-09-12', 'ffffffff', '2023-09-15 20:54:08', '2023-09-15 20:54:08'),
(7, 1, 'nguyen thi a', 2, '0975568848', 'ffffff', '11:00', '2023-09-15', 'Abchd', '2023-09-15 23:21:29', '2023-09-15 23:21:29'),
(8, 1, 'nnnnn', 1, '06576536', 'kkkkkk', '10:00', '2023-09-15', 'kkkkkkk', '2023-09-16 08:34:09', '2023-09-16 08:34:09'),
(9, 1, 'jjj', 1, '4235345', 'gggggg', '10:00', '2023-09-15', 'ggggg', '2023-09-16 08:36:18', '2023-09-16 08:36:18'),
(10, 1, 'yyy', 1, '4643564', 'ttttt', '10:00', '2023-09-15', 'tttttttt', '2023-09-16 08:38:16', '2023-09-16 08:38:16'),
(12, 1, 'llll', 1, '67567', 'rtrtygfhg', '10:00', '2023-09-15', 'fghfgdh', '2023-09-16 09:11:25', '2023-09-16 09:11:25'),
(15, 1, 'nguyen', 1, '675-765-7757', 'G', '11:20', '2023-09-21', '', '2023-09-21 11:44:51', '2023-09-21 11:44:51'),
(16, 1, 'nhu', 1, '345-456-4356', 'F', '12:30', '2023-09-21', '', '2023-09-21 19:16:01', '2023-09-21 19:16:01'),
(17, 1, 'f', 1, '464-563-4573', 'abdgdfg', '13:30', '2023-09-21', '', '2023-09-21 19:20:15', '2023-09-21 19:20:15'),
(18, 1, 'dfsdf', 1, '346-453-7656', 'retert', '09:45', '2023-09-21', '', '2023-09-21 19:21:34', '2023-09-21 19:21:34'),
(19, 1, 'nnnn', 2, '434-324-2342', 'Upper lip 1', '14:30', '2023-09-24', '', '2023-09-24 07:14:14', '2023-09-24 07:14:14');

-- --------------------------------------------------------

--
-- Table structure for table `productexports`
--

CREATE TABLE `productexports` (
  `id` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `importId` int(11) DEFAULT NULL,
  `exportDate` date DEFAULT NULL,
  `exportQuantity` int(11) DEFAULT NULL,
  `remainQuantity` int(11) DEFAULT NULL,
  `note` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `productexports`
--

INSERT INTO `productexports` (`id`, `productId`, `importId`, `exportDate`, `exportQuantity`, `remainQuantity`, `note`, `createdAt`, `updatedAt`) VALUES
(7, 7, 27, '2023-10-08', 2, 2, '', '2023-10-08 12:04:01', '2023-10-08 12:04:01'),
(12, 7, 27, '2023-10-10', 1, 1, NULL, '2023-10-09 12:16:57', '2023-10-09 12:16:57'),
(15, 7, 30, '2023-10-19', 3, 0, '', '2023-10-19 12:56:38', '2023-10-19 12:56:38'),
(22, 13, 41, '2023-10-22', 2, 8, '', '2023-10-22 17:32:56', '2023-10-22 17:32:56'),
(23, 13, 41, '2023-10-22', 2, 6, '', '2023-10-22 17:33:11', '2023-10-22 17:33:11'),
(24, 13, 41, '2023-10-22', 2, 4, '', '2023-10-22 17:35:28', '2023-10-22 17:35:28');

-- --------------------------------------------------------

--
-- Table structure for table `productimports`
--

CREATE TABLE `productimports` (
  `id` int(11) NOT NULL,
  `productId` varchar(255) DEFAULT NULL,
  `importDate` date DEFAULT NULL,
  `unit` varchar(255) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `price` decimal(9,2) DEFAULT NULL,
  `note` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `productimports`
--

INSERT INTO `productimports` (`id`, `productId`, `importDate`, `unit`, `quantity`, `price`, `note`, `createdAt`, `updatedAt`) VALUES
(27, '7', '2023-10-08', 'U2', 4, '200.00', '', '2023-10-08 12:03:37', '2023-10-08 12:03:37'),
(30, '7', '2023-10-10', 'U2', 2, '15.00', '', '2023-10-08 13:03:47', '2023-10-08 13:03:47'),
(41, '13', '2023-10-22', 'U3', 10, '1000.00', '', '2023-10-22 17:32:34', '2023-10-22 17:32:34');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `productName` varchar(255) DEFAULT NULL,
  `nowQuantity` int(11) DEFAULT NULL,
  `unit` varchar(255) DEFAULT NULL,
  `note` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `productName`, `nowQuantity`, `unit`, `note`, `createdAt`, `updatedAt`) VALUES
(7, 'Acetone', 0, 'U2', NULL, '2023-10-08 12:03:37', '2023-10-21 15:55:32'),
(13, 'product2', 4, 'U3', NULL, '2023-10-22 17:32:34', '2023-10-22 17:35:28');

-- --------------------------------------------------------

--
-- Table structure for table `repeatcicles`
--

CREATE TABLE `repeatcicles` (
  `id` int(11) NOT NULL,
  `idcongviec` int(11) DEFAULT NULL,
  `chukylap` int(1) DEFAULT NULL,
  `ngaylap` date DEFAULT NULL,
  `trangthai` int(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `repeatcicles`
--

INSERT INTO `repeatcicles` (`id`, `idcongviec`, `chukylap`, `ngaylap`, `trangthai`, `createdAt`, `updatedAt`) VALUES
(3, 3, 8, '2023-11-23', 0, '2023-11-21 09:44:09', '2023-11-21 09:44:09'),
(4, 3, 2, '2023-06-20', 0, '2023-11-21 09:44:09', '2023-11-22 15:13:51'),
(5, 4, 1, '2023-11-26', 0, '2023-11-21 14:51:57', '2023-11-21 14:51:57'),
(6, 4, 6, '2023-09-20', 0, '2023-11-21 14:51:57', '2023-11-21 14:51:57'),
(7, 4, 4, '2023-03-15', 0, '2023-11-21 14:51:57', '2023-11-21 14:51:57');

-- --------------------------------------------------------

--
-- Table structure for table `salaries`
--

CREATE TABLE `salaries` (
  `id` int(11) NOT NULL,
  `userIdCreate` int(11) DEFAULT NULL,
  `staffId` int(11) DEFAULT NULL,
  `tax` decimal(9,2) DEFAULT NULL,
  `cardTotal` decimal(9,2) DEFAULT NULL,
  `cashTotal` decimal(9,2) DEFAULT NULL,
  `bonus` decimal(9,2) DEFAULT NULL,
  `receivedStore` decimal(9,2) DEFAULT NULL,
  `receivedStaff` decimal(9,2) DEFAULT NULL,
  `receivedByCard` decimal(9,2) DEFAULT NULL,
  `receivedAfterTax` decimal(9,2) DEFAULT NULL,
  `receivedByCash` decimal(9,2) DEFAULT NULL,
  `dateStart` date DEFAULT NULL,
  `dateEnd` date DEFAULT NULL,
  `note` varchar(255) DEFAULT NULL,
  `action` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `salaries`
--

INSERT INTO `salaries` (`id`, `userIdCreate`, `staffId`, `tax`, `cardTotal`, `cashTotal`, `bonus`, `receivedStore`, `receivedStaff`, `receivedByCard`, `receivedAfterTax`, `receivedByCash`, `dateStart`, `dateEnd`, `note`, `action`, `createdAt`, `updatedAt`) VALUES
(1, 1, 5, '10.00', '55.00', '0.00', '2.50', '25.00', '30.00', '30.00', '27.00', '0.00', '2023-09-10', '2023-09-16', '', 0, '2023-09-10 17:32:17', '2023-09-10 17:36:38'),
(2, 1, 7, '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '2023-09-10', '2023-09-16', '', 0, '2023-09-10 17:38:45', '2023-09-10 17:38:52'),
(3, 1, 5, '0.00', '32.00', '63.00', '0.00', '47.50', '47.50', '0.00', NULL, '47.50', '2023-09-17', '2023-09-23', 'nnnnnnnn', 0, '2023-09-17 22:18:36', '2023-09-17 22:29:03'),
(4, 1, 5, '0.00', '32.00', '63.00', '0.00', '57.00', '38.00', '0.00', '0.00', '38.00', '2023-09-17', '2023-09-23', '', 1, '2023-09-18 21:20:42', '2023-09-18 21:23:04'),
(5, 1, 7, '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '2023-09-17', '2023-09-23', 'dfgsd', 0, '2023-09-18 21:24:13', '2023-09-18 21:35:15');

-- --------------------------------------------------------

--
-- Table structure for table `schedules`
--

CREATE TABLE `schedules` (
  `id` int(11) NOT NULL,
  `userIdCreate` int(11) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `staffId` int(11) DEFAULT NULL,
  `note` text DEFAULT NULL,
  `action` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('migration-create-allcode.js'),
('migration-create-booking.js'),
('migration-create-calendar.js'),
('migration-create-call-booking.js'),
('migration-create-product-export.js'),
('migration-create-product-import.js'),
('migration-create-product.js'),
('migration-create-repeat-cicle.js'),
('migration-create-salary.js'),
('migration-create-schedule.js'),
('migration-create-service.js'),
('migration-create-tax.js'),
('migration-create-update-status.js'),
('migration-create-user.js');

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `id` int(11) NOT NULL,
  `serviceName` varchar(255) DEFAULT NULL,
  `price` decimal(9,2) DEFAULT NULL,
  `serviceThemeId` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `action` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`id`, `serviceName`, `price`, `serviceThemeId`, `description`, `action`, `createdAt`, `updatedAt`) VALUES
(2, 'Upper lip 1', '15.00', 'S1', 'nnnn', 1, '2023-09-09 19:24:23', '2023-09-16 14:00:19'),
(3, 'aaaaaa', '15.00', 'S2', 'n', 1, '2023-09-10 18:12:33', '2023-09-17 15:21:58'),
(4, 'abdgdfg', '20.00', 'S1', '', 1, '2023-09-11 19:54:20', '2023-09-11 19:54:20'),
(5, 'dddđ', '100.00', 'S1', 'hhhhhhhhhhh', 1, '2023-09-16 13:32:55', '2023-09-16 13:32:55'),
(7, 'uper lip 8', '43.00', 'S1', '5fffffffff', 1, '2023-09-16 13:58:16', '2023-09-16 13:58:16'),
(8, 'hfghgfh', '50.00', 'S2', '45vcfbvc', 1, '2023-09-17 22:37:16', '2023-09-17 22:37:16'),
(9, 'rtyjgdhjgdh', '56.00', 'S3', '', 1, '2023-09-17 22:47:50', '2023-09-17 22:47:50'),
(10, 'fdfghsfghs', '15.00', 'S2', '', 1, '2023-10-22 17:39:37', '2023-10-22 17:39:37');

-- --------------------------------------------------------

--
-- Table structure for table `taxs`
--

CREATE TABLE `taxs` (
  `id` int(11) NOT NULL,
  `startDateTax` date DEFAULT NULL,
  `endDateTax` date DEFAULT NULL,
  `tax` decimal(9,2) DEFAULT NULL,
  `action` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `updatestatus`
--

CREATE TABLE `updatestatus` (
  `id` int(11) NOT NULL,
  `iddangkylap` int(11) DEFAULT NULL,
  `loainhac` int(1) DEFAULT NULL,
  `ngaycapnhat` date DEFAULT NULL,
  `trangthaicapnhat` varchar(255) DEFAULT NULL,
  `danhgia` varchar(255) DEFAULT NULL,
  `ghichu` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `roleId` varchar(255) DEFAULT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phonenumber` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `percentOfStaff` decimal(9,2) DEFAULT NULL,
  `note` text DEFAULT NULL,
  `action` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `roleId`, `firstname`, `lastname`, `birthday`, `address`, `phonenumber`, `gender`, `percentOfStaff`, `note`, `action`, `createdAt`, `updatedAt`) VALUES
(1, 'admin123@gmail.com', '$2a$10$clB7U5qKHPS7RievbU9I2O1agC8RNS963gY.SttY7kZ81T.s2OMj6', 'R1', 'Admin', 'Admin', '1995-01-01', 'HCM', '099090909', 'F', '50.00', NULL, 1, '2023-09-10 13:00:37', '2023-09-10 13:00:37'),
(5, 'test2@gmail.com', NULL, 'R3', 'staff', '2', '2023-09-09', 'HCM, Viet Nam', '033-888-8756', 'F', '40.00', '', 1, '2023-09-09 19:26:52', '2023-10-21 11:20:35'),
(6, 'asdf@gmail.com', NULL, 'R4', 'Nhu', 'Huynh', '2023-09-04', 'HCM, Viet Nam', '5346456', 'M', '0.00', NULL, 1, '2023-09-09 19:34:53', '2023-09-09 19:34:53'),
(7, 'huynhnhu112695@gmail.com', NULL, 'R3', 'staff', '1', '2023-09-06', 'Viet Nam', '654-747-6474', 'F', '45.00', '', 1, '2023-09-10 15:02:27', '2023-10-21 11:20:20'),
(13, 'test1@gmail.com', NULL, 'R4', 'customer', '3', '1990-09-09', 'HCM, Viet Nam', '03388888', 'M', '0.00', NULL, 1, '2023-09-17 09:43:37', '2023-10-21 11:21:34'),
(14, 'sdfgdsfg@gmail.com', NULL, 'R7', 'customer', '2', '1990-08-08', 'Viet Nam', '540-565-6433', 'F', '0.00', NULL, 1, '2023-09-17 10:04:45', '2023-10-21 11:21:19'),
(15, 'ffff@gmail.com', NULL, 'R4', 'customer', '1', '2023-08-28', 'fgdfgdfgdfcvcv', '345-346-4565', 'M', '0.00', 'dfgdfdfgsdfgdfgfgvdfgttttcvbcvc', 1, '2023-09-27 21:21:30', '2023-10-21 11:20:59');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `allcodes`
--
ALTER TABLE `allcodes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `calendars`
--
ALTER TABLE `calendars`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `callbookings`
--
ALTER TABLE `callbookings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `productexports`
--
ALTER TABLE `productexports`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `productimports`
--
ALTER TABLE `productimports`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `repeatcicles`
--
ALTER TABLE `repeatcicles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `salaries`
--
ALTER TABLE `salaries`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `schedules`
--
ALTER TABLE `schedules`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `taxs`
--
ALTER TABLE `taxs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `updatestatus`
--
ALTER TABLE `updatestatus`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `allcodes`
--
ALTER TABLE `allcodes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=90;

--
-- AUTO_INCREMENT for table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `calendars`
--
ALTER TABLE `calendars`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `callbookings`
--
ALTER TABLE `callbookings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `productexports`
--
ALTER TABLE `productexports`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `productimports`
--
ALTER TABLE `productimports`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `repeatcicles`
--
ALTER TABLE `repeatcicles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `salaries`
--
ALTER TABLE `salaries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `schedules`
--
ALTER TABLE `schedules`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `taxs`
--
ALTER TABLE `taxs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `updatestatus`
--
ALTER TABLE `updatestatus`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
