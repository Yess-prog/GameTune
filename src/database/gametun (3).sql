-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : lun. 05 mai 2025 à 12:14
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `gametun`
--

-- --------------------------------------------------------

--
-- Structure de la table `commentaire`
--

CREATE TABLE `commentaire` (
  `idG` int(11) NOT NULL,
  `commentaire` text NOT NULL,
  `idU` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `game`
--

CREATE TABLE `game` (
  `idG` int(11) NOT NULL,
  `nom` varchar(50) NOT NULL,
  `societe` varchar(50) NOT NULL,
  `prix` float(4,2) NOT NULL,
  `description` varchar(50) NOT NULL,
  `img` varchar(100) NOT NULL,
  `categorie` varchar(20) NOT NULL,
  `rate` float(1,1) NOT NULL,
  `console` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `game`
--

INSERT INTO `game` (`idG`, `nom`, `societe`, `prix`, `description`, `img`, `categorie`, `rate`, `console`) VALUES
(1, 'The Witcher 3', 'CD Projekt', 39.99, 'Epic open-world RPG.', 'https://upload.wikimedia.org/wikipedia/en/0/0c/Witcher_3_cover_art.jpg', 'action', 0.0, 'xbox one'),
(2, 'Elden Ring', 'FromSoftware', 59.99, 'Dark fantasy adventure.', 'https://upload.wikimedia.org/wikipedia/en/b/b9/Elden_Ring_Box_art.jpg', 'adventure', 0.0, 'pc'),
(3, 'FIFA 24', 'EA Sports', 69.99, 'Football simulation game.', 'https://upload.wikimedia.org/wikipedia/en/e/e0/EA_Sports_FC_24_Cover.jpg', 'sports', 0.0, 'pc'),
(4, 'Minecraft', 'Mojang Studios', 26.95, 'Sandbox survival world.', 'https://static.wikia.nocookie.net/awesome-games/images/5/51/Minecraft_cover.png/revision/latest?cb=2', 'adventure', 0.0, 'ps5'),
(5, 'God of War', 'Santa Monica Studio', 49.99, 'Action-adventure epic.', 'https://upload.wikimedia.org/wikipedia/en/a/a7/God_of_War_4_cover.jpg', 'adventure', 0.0, 'ps4'),
(6, 'Fortnite', 'Epic Games', 0.00, 'Battle Royale sensation.', 'http://bloximages.newyork1.vip.townnews.com/qconline.com/content/tncms/assets/v3/editorial/6/43/6435', 'rpg', 0.0, 'ps4'),
(7, 'GTA V', 'Rockstar Games', 29.99, 'Open-world crime game.', 'https://upload.wikimedia.org/wikipedia/en/a/a5/Grand_Theft_Auto_V.png', 'adventure', 0.0, 'xbox 360'),
(8, 'Red Dead Redemption 2', 'Rockstar Games', 59.99, 'Wild West masterpiece.', 'https://upload.wikimedia.org/wikipedia/en/4/44/Red_Dead_Redemption_II.jpg', 'adventure', 0.0, 'pc'),
(9, 'Call of Duty: Modern Warfare', 'Infinity Ward', 59.99, 'Fast-paced FPS action.', 'https://upload.wikimedia.org/wikipedia/en/9/9c/Call_of_Duty_Modern_Warfare.jpg', 'action', 0.0, 'ps4'),
(10, 'DOOM Eternal', 'id Software', 39.99, 'High-speed demon-slaying.', 'https://upload.wikimedia.org/wikipedia/en/9/92/DOOM_Eternal.jpg', 'action', 0.0, 'pc'),
(11, 'Bayonetta 3', 'PlatinumGames', 49.99, 'Stylish witch combat.', 'https://upload.wikimedia.org/wikipedia/en/4/44/Bayonetta_3_cover_art.jpg', 'action', 0.0, 'switch'),
(12, 'Devil May Cry 5', 'Capcom', 29.99, 'Over-the-top hack and slash.', 'https://upload.wikimedia.org/wikipedia/en/6/6a/Devil_May_Cry_5.jpg', 'action', 0.0, 'xbox one'),
(13, 'Uncharted 4', 'Naughty Dog', 19.99, 'Treasure-hunting adventure.', 'https://upload.wikimedia.org/wikipedia/en/6/6c/Uncharted_4_box_artwork.jpg', 'adventure', 0.0, 'ps4'),
(14, 'NBA 2K24', 'Visual Concepts', 69.99, 'Basketball simulation.', 'https://upload.wikimedia.org/wikipedia/en/a/a9/NBA_2K24_cover.jpg', 'sports', 0.0, 'ps5'),
(15, 'Madden NFL 24', 'EA Sports', 69.99, 'American football action.', 'https://upload.wikimedia.org/wikipedia/en/4/48/Madden_NFL_24_cover.jpg', 'sports', 0.0, 'xbox one'),
(16, 'WWE 2K23', '2K Sports', 59.99, 'Pro wrestling simulation.', 'https://upload.wikimedia.org/wikipedia/en/7/7d/WWE_2K23_cover_art.jpg', 'sports', 0.0, 'pc'),
(17, 'Tony Hawk’s Pro Skater 1+2', 'Vicarious Visions', 39.99, 'Skateboarding remastered.', 'https://upload.wikimedia.org/wikipedia/en/8/88/Tony_Hawk%27s_Pro_Skater_1%2B2.jpg', 'sports', 0.0, 'ps4'),
(18, 'Final Fantasy VII Remake', 'Square Enix', 59.99, 'Reimagined RPG classic.', 'https://upload.wikimedia.org/wikipedia/en/2/2c/Final_Fantasy_VII_Remake_cover_art.jpg', 'rpg', 0.0, 'ps4'),
(19, 'Persona 5 Royal', 'Atlus', 49.99, 'Stylish turn-based RPG.', 'https://upload.wikimedia.org/wikipedia/en/0/05/Persona_5_cover_art.jpg', 'rpg', 0.0, 'ps4'),
(20, 'Cyberpunk 2077', 'CD Projekt', 59.99, 'Sci-fi open-world RPG.', 'https://upload.wikimedia.org/wikipedia/en/9/9f/Cyberpunk_2077_box_art.jpg', 'rpg', 0.0, 'pc'),
(21, 'Civilization VI', 'Firaxis Games', 29.99, 'Build an empire to last.', 'https://upload.wikimedia.org/wikipedia/en/5/57/Civilization_VI_cover_art.jpg', 'strategy', 0.0, 'pc'),
(22, 'XCOM 2', 'Firaxis Games', 39.99, 'Alien invasion tactics.', 'https://upload.wikimedia.org/wikipedia/en/0/0d/XCOM_2_cover_art.jpg', 'strategy', 0.0, 'pc'),
(23, 'StarCraft II', 'Blizzard Entertainment', 0.00, 'Sci-fi RTS classic.', 'https://upload.wikimedia.org/wikipedia/en/2/29/StarCraft_II_-_Box_Art.jpg', 'strategy', 0.0, 'pc'),
(24, 'Fire Emblem: Three Houses', 'Intelligent Systems', 59.99, 'Tactical RPG warfare.', 'https://upload.wikimedia.org/wikipedia/en/4/4d/Fire_Emblem_Three_Houses.jpg', 'strategy', 0.0, 'switch'),
(25, 'Age of Empires IV', 'Relic Entertainment', 59.99, 'Historical real-time battles.', 'https://upload.wikimedia.org/wikipedia/en/a/aa/Age_of_Empires_IV_cover_art.jpg', 'strategy', 0.0, 'pc'),
(26, 'Call of Duty: Modern Warfare', 'Infinity Ward', 59.99, 'First-person shooter.', 'https://upload.wikimedia.org/wikipedia/en/7/7f/Call_of_Duty_Modern_Warfare_cover_art.jpg', 'action', 0.0, 'ps5'),
(27, 'DOOM Eternal', 'id Software', 49.99, 'Fast-paced demon slaying.', 'https://upload.wikimedia.org/wikipedia/en/3/3e/Doom_Eternal.jpg', 'action', 0.0, 'pc'),
(28, 'Bayonetta 2', 'PlatinumGames', 39.99, 'Stylish hack-and-slash.', 'https://upload.wikimedia.org/wikipedia/en/f/fd/Bayonetta_2_box_artwork.jpg', 'action', 0.0, 'switch'),
(29, 'Devil May Cry 5', 'Capcom', 29.99, 'Demonic action.', 'https://upload.wikimedia.org/wikipedia/en/3/33/Devil_May_Cry_5.jpg', 'action', 0.0, 'ps4'),
(30, 'Metal Gear Solid V', 'Konami', 19.99, 'Tactical espionage.', 'https://upload.wikimedia.org/wikipedia/en/a/a0/MGSVTPP.jpg', 'action', 0.0, 'xbox one'),
(31, 'Uncharted 4', 'Naughty Dog', 39.99, 'Treasure hunting adventure.', 'https://upload.wikimedia.org/wikipedia/en/9/95/Uncharted_4_box_artwork.jpg', 'adventure', 0.0, 'ps4'),
(32, 'Tomb Raider', 'Crystal Dynamics', 29.99, 'Origin story of Lara Croft.', 'https://upload.wikimedia.org/wikipedia/en/b/bc/Tomb_Raider_2013_cover.jpg', 'adventure', 0.0, 'pc'),
(33, 'Life is Strange', 'Dontnod Entertainment', 19.99, 'Story-driven adventure.', 'https://upload.wikimedia.org/wikipedia/en/f/fc/Life_Is_Strange_cover_art.jpg', 'adventure', 0.0, 'ps3'),
(34, 'Firewatch', 'Campo Santo', 14.99, 'Mystery in the woods.', 'https://upload.wikimedia.org/wikipedia/en/7/76/Firewatch_cover_art.jpg', 'adventure', 0.0, 'pc'),
(35, 'Journey', 'Thatgamecompany', 9.99, 'Emotional desert journey.', 'https://upload.wikimedia.org/wikipedia/en/5/5f/Journey_%28PS3_game%29_art.jpg', 'adventure', 0.0, 'ps4'),
(36, 'NBA 2K24', '2K Sports', 59.99, 'Basketball simulator.', 'https://upload.wikimedia.org/wikipedia/en/2/2e/NBA_2K24_cover.jpg', 'sports', 0.0, 'ps5'),
(37, 'Madden NFL 24', 'EA Sports', 69.99, 'American football simulator.', 'https://upload.wikimedia.org/wikipedia/en/4/45/Madden_NFL_24.jpg', 'sports', 0.0, 'xbox one'),
(38, 'WWE 2K24', '2K Sports', 49.99, 'Wrestling game.', 'https://upload.wikimedia.org/wikipedia/en/1/1a/WWE_2K24.jpg', 'sports', 0.0, 'ps4'),
(39, 'Tony Hawk\'s Pro Skater 1+2', 'Vicarious Visions', 39.99, 'Skateboarding classic.', 'https://upload.wikimedia.org/wikipedia/en/e/e6/Tony_Hawk%27s_Pro_Skater_1_%2B_2.jpg', 'sports', 0.0, 'switch'),
(40, 'F1 24', 'Codemasters', 59.99, 'Formula 1 racing.', 'https://upload.wikimedia.org/wikipedia/en/5/59/F1_2021_cover_art.jpg', 'sports', 0.0, 'pc'),
(41, 'Final Fantasy XV', 'Square Enix', 29.99, 'Fantasy road trip.', 'https://upload.wikimedia.org/wikipedia/en/f/f9/Final_Fantasy_XV_box_art.jpg', 'rpg', 0.0, 'ps4'),
(42, 'Persona 5 Royal', 'Atlus', 49.99, 'Stylish JRPG.', 'https://upload.wikimedia.org/wikipedia/en/4/4a/Persona_5_cover_art.jpg', 'rpg', 0.0, 'ps5'),
(43, 'Dragon Age: Inquisition', 'BioWare', 39.99, 'Epic fantasy RPG.', 'https://upload.wikimedia.org/wikipedia/en/2/2d/Dragon_Age_Inquisition_Boxart.jpg', 'rpg', 0.0, 'xbox one'),
(44, 'Cyberpunk 2077', 'CD Projekt', 59.99, 'Futuristic RPG.', 'https://upload.wikimedia.org/wikipedia/en/9/9f/Cyberpunk_2077_box_art.jpg', 'rpg', 0.0, 'pc'),
(45, 'The Elder Scrolls V: Skyrim', 'Bethesda', 19.99, 'Open-world fantasy RPG.', 'https://upload.wikimedia.org/wikipedia/en/3/3c/The_Elder_Scrolls_V_Skyrim_cover.png', 'rpg', 0.0, 'switch'),
(46, 'Civilization VI', 'Firaxis Games', 29.99, 'Build an empire.', 'https://upload.wikimedia.org/wikipedia/en/6/6a/Civilization_VI_cover_art.jpg', 'strategy', 0.0, 'pc'),
(47, 'XCOM 2', 'Firaxis Games', 24.99, 'Alien invasion strategy.', 'https://upload.wikimedia.org/wikipedia/en/8/80/XCOM_2_cover_art.jpg', 'strategy', 0.0, 'ps4'),
(48, 'Total War: WARHAMMER II', 'Creative Assembly', 49.99, 'Epic fantasy battles.', 'https://upload.wikimedia.org/wikipedia/en/7/76/Total_War_Warhammer_II_cover_art.jpg', 'strategy', 0.0, 'pc'),
(49, 'Age of Empires IV', 'Relic Entertainment', 59.99, 'Real-time historical battles.', 'https://upload.wikimedia.org/wikipedia/en/f/fd/Age_of_Empires_IV_cover_art.jpg', 'strategy', 0.0, 'pc'),
(50, 'StarCraft II', 'Blizzard Entertainment', 0.00, 'Sci-fi RTS.', 'https://upload.wikimedia.org/wikipedia/en/2/29/StarCraft_II_Box_Art1.jpg', 'strategy', 0.0, 'pc');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `idU` int(11) NOT NULL,
  `nom` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `username` varchar(30) NOT NULL,
  `pwd` varchar(30) NOT NULL,
  `role` enum('user','admin') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`idU`, `nom`, `email`, `username`, `pwd`, `role`) VALUES
(1, 'naccache', 'ssnaccache1@gmail.com', 'nacc', 'nacc', 'admin');

-- --------------------------------------------------------

--
-- Structure de la table `userchart`
--

CREATE TABLE `userchart` (
  `idU` int(11) NOT NULL,
  `prixG` int(11) NOT NULL,
  `idG` int(11) NOT NULL,
  `nomG` int(11) NOT NULL,
  `imgG` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `venteadmin`
--

CREATE TABLE `venteadmin` (
  `idV` int(11) NOT NULL,
  `nomG` int(11) NOT NULL,
  `idG` int(11) NOT NULL,
  `prixG` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `game`
--
ALTER TABLE `game`
  ADD PRIMARY KEY (`idG`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`idU`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `game`
--
ALTER TABLE `game`
  MODIFY `idG` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `idU` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
