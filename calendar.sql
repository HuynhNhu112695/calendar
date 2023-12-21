-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 21, 2023 at 05:06 AM
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
  `userIdCreate` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `calendars`
--

INSERT INTO `calendars` (`id`, `sovanban`, `ngayphathanh`, `donviphathanh`, `trichyeunoidung`, `chutheyeucau`, `noidungyeucau`, `nguoithuchien`, `nhactruoc`, `douutien`, `userIdCreate`, `createdAt`, `updatedAt`) VALUES
(9, 'Số 48/QĐ-BCA', '2022-10-10', 'BCA', 'dfdf dfgdfg dfg', 'H05', 'dfgfd fgdfg dfgdf', 'Như Như', 3, 1, 1, '2023-12-19 14:37:40', '2023-12-20 16:05:39'),
(10, '47/CAT-PV01', '2023-12-19', 'CAT', 'Yêu cầu báo cáo công tác ứng dụng cntt', 'H05', 'Báo cáo theo đề cương', 'Như', 2, 0, 1, '2023-12-19 15:44:52', '2023-12-19 15:44:52'),
(11, '47', '2023-12-19', 'BCA', 'đẩèádá', 'dsa', 'nguyễn thị huỳnh như', 'Thi', 2, 0, 1, '2023-12-19 15:48:14', '2023-12-20 16:21:12'),
(12, '45', '2023-12-19', 'BCA', 'df', 's', 'dfghj', 'Huy', 2, 0, 1, '2023-12-19 15:51:28', '2023-12-20 13:47:29'),
(13, 'ádasd', '2023-12-01', 'BCA', '', '', 'sdfd dfsdf', 'Như', 3, 0, 1, '2023-12-20 14:30:18', '2023-12-20 14:30:18');

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
(10, 9, 0, '2023-12-22', 0, '2023-12-19 14:37:40', '2023-12-19 14:37:40'),
(12, 11, 0, '2023-12-20', 0, '2023-12-19 15:48:14', '2023-12-20 16:21:12'),
(13, 12, 0, '2023-12-28', 0, '2023-12-19 15:51:28', '2023-12-19 15:51:28'),
(14, 13, 0, '2023-12-27', 0, '2023-12-20 14:30:18', '2023-12-20 14:30:18');

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
('migration-create-calendar.js'),
('migration-create-repeat-cicle.js'),
('migration-create-update-status.js'),
('migration-create-user.js');

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
-- Indexes for table `calendars`
--
ALTER TABLE `calendars`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `repeatcicles`
--
ALTER TABLE `repeatcicles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

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
-- AUTO_INCREMENT for table `calendars`
--
ALTER TABLE `calendars`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `repeatcicles`
--
ALTER TABLE `repeatcicles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

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
