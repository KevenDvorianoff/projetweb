DROP DATABASE IF EXISTS projetweb;
CREATE DATABASE IF NOT EXISTS projetweb DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE projetweb;

DROP TABLE IF EXISTS TYPE_M;
CREATE TABLE IF NOT EXISTS TYPE_M (
        IdType_M int, 
        NomType_M varchar(255), 

        PRIMARY KEY(IdType_M)
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS MATERIEL;
CREATE TABLE IF NOT EXISTS MATERIEL (
		IdMateriel int, 
        NomMateriel varchar(255), 
        IdType_M int,

        PRIMARY KEY(IdMateriel),
        FOREIGN KEY(IdType_M) REFERENCES TYPE_M(IdType_M) 
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS TYPE_E;
CREATE TABLE IF NOT EXISTS TYPE_E(
        IdType_E int, 
        NomType_E varchar(255), 

        PRIMARY KEY(IdType_E)                  
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS TROUPE;
CREATE TABLE IF NOT EXISTS TROUPE(
        IdTroupe int, 
        NomTroupe varchar(255), 

        PRIMARY KEY(IdTroupe)                  
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS EVENEMENTS;
CREATE TABLE IF NOT EXISTS EVENEMENTS(
        IdEvenement int,
        dateEvenement datetime, 
        IdType_E int,
        IdTroupe int, 

        PRIMARY KEY(IdEvenement),
        FOREIGN KEY(IdType_E) REFERENCES TYPE_E(IdType_E),
        FOREIGN KEY(IdTroupe) REFERENCES TROUPE(IdTroupe)
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS PATROUILLE;
CREATE TABLE IF NOT EXISTS PATROUILLE(
        IdPatrouille int, 
        NomPatrouille varchar(255), 
        IdTroupe int, 

        PRIMARY KEY(IdPatrouille), 
        FOREIGN KEY(IdTroupe) REFERENCES TROUPE(IdTroupe)                 
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS POSSEDER;
CREATE TABLE IF NOT EXISTS POSSEDER(
        IdPatrouille int,
        IdMateriel int,
        Quantite int,

        PRIMARY KEY(IdPatrouille, IdMateriel), 
        FOREIGN KEY(IdMateriel) REFERENCES MATERIEL(IdMateriel),
        FOREIGN KEY(IdPatrouille) REFERENCES PATROUILLE(IdPatrouille)                 
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS UTILISATEUR;
CREATE TABLE IF NOT EXISTS UTILISATEUR(
        NumCarte int,
        Motdepasse varchar(255),
        Nom varchar(255), 
        Prenom varchar(255),
        DateNaissance date,
        Admin boolean,
        IdPatrouille int,


        PRIMARY KEY(NumCarte), 
        FOREIGN KEY(IdPatrouille) REFERENCES PATROUILLE(IdPatrouille)                
)ENGINE=InnoDB DEFAULT CHARSET=latin1;


