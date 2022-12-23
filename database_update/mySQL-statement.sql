CREATE DATABASE myhealthapplication; 

----------------------------------------------------------------------------------------------------------------------------------------------

USE myhealthapplication;

CREATE TABLE patients(
	patientID int NOT NULL AUTO_INCREMENT,
    firebaseUID varchar(255),
	firstName varchar(255),
	lastName varchar(255),
    username varchar(255),
	address varchar(255),
	mobile varchar(255),
    email varchar(255),
    Age int,
	PRIMARY KEY (patientID)
);

CREATE TABLE doctors(
	doctorID int NOT NULL AUTO_INCREMENT,
	firstName varchar(255),
	lastName varchar(255),
	area varchar(255),
	mobile varchar(255),
    email varchar(255),
	PRIMARY KEY (doctorID)
);

CREATE TABLE hospitals(
	hospitalID int NOT NULL AUTO_INCREMENT,
	name varchar(255),
	address varchar(255),
	mobile varchar(255),
	PRIMARY KEY (hospitalID)
);

CREATE TABLE doctorHospital(
	dhID int NOT NULL AUTO_INCREMENT,
	doctorID int,
    patientID int,
	PRIMARY KEY (dhID),
    FOREIGN KEY (patientID) REFERENCES patients(patientID),
    FOREIGN KEY (doctorID) REFERENCES doctors(doctorID)
);

CREATE TABLE schedules(
	scheduleID int NOT NULL AUTO_INCREMENT,
	doctorID int NOT NULL,
    patientID int NOT NULL,
    hospitalID int NOT NULL,
    scheduledDate datetime,
    updateDate datetime,
    appointmentDate datetime,
    description varchar(255),
	PRIMARY KEY (scheduleID),
    FOREIGN KEY (patientID) REFERENCES patients(patientID),
    FOREIGN KEY (doctorID) REFERENCES doctors(doctorID),
    FOREIGN KEY (hospitalID) REFERENCES hospitals(hospitalID)
);

----------------------------------------------------------------------------------------------------------------------------------------------

ALTER TABLE schedules ADD COLUMN status VARCHAR(15) AFTER description;