-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Maj 29, 2023 at 09:39 PM
-- Wersja serwera: 10.4.28-MariaDB
-- Wersja PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `liga_przegrywów_akt_ucieczka_klonów`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `gra`
--

CREATE TABLE `gra` (
  `id_gracza` int(11) NOT NULL COMMENT 'id gracza',
  `charakter` text NOT NULL COMMENT 'przechowuje jaką postać wybraliśmy',
  `lvl` int(2) NOT NULL COMMENT 'przechowuje poziom gracza',
  `exp` bigint(3) NOT NULL COMMENT 'przechowuje aktualny exp gracza',
  `money` bigint(20) NOT NULL COMMENT 'przechowuje kase gracza',
  `wearing_helmet` text NOT NULL COMMENT 'ubrany hełm gracza',
  `wearing_chest` text NOT NULL COMMENT 'ubrana zbroja',
  `wearing_amulet` text NOT NULL COMMENT 'ubrany amulet',
  `wearing_weapon` text NOT NULL COMMENT 'ubrana broń',
  `equipment` text NOT NULL COMMENT 'ekwipunek gracza',
  `stage` int(11) NOT NULL COMMENT 'poziom gry, jest zapisywany jako 1,2 itp.',
  `enemy_Alive` tinyint(1) NOT NULL COMMENT 'true i false [czy przeciwnik żyje]',
  `akt_hp` bigint(100) NOT NULL COMMENT 'przechowuje aktualną liczbę hp',
  `runs` int(100) NOT NULL COMMENT 'ilosc podejsc, wygrane, przegrane',
  `inRun` tinyint(1) NOT NULL COMMENT 'czy gracz jest w trakcie podejscia'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `gra`
--
ALTER TABLE `gra`
  ADD PRIMARY KEY (`id_gracza`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `gra`
--
ALTER TABLE `gra`
  MODIFY `id_gracza` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id gracza';
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
