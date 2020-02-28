USE projetweb;

DROP TABLE IF EXISTS DEMANDE;
CREATE TABLE IF NOT EXISTS DEMANDE (
        NumCarte varchar(255),
        NomTroupe varchar(255), 

        PRIMARY KEY(NumCarte),
        FOREIGN KEY(NumCarte) REFERENCES utilisateur(NumCarte)
)ENGINE=InnoDB DEFAULT CHARSET=latin1;