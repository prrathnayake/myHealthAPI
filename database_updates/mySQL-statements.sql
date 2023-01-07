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
    bdate DATE,
	PRIMARY KEY (patientID)
);

CREATE TABLE role(
	roleID int NOT NULL AUTO_INCREMENT,
	discription varchar(255),
	PRIMARY KEY (roleID)
);

CREATE TABLE staffs(
	staffID int NOT NULL AUTO_INCREMENT,
	roleID int, 
	firstName varchar(255),
	lastName varchar(255),
	area varchar(255),
	mobile varchar(255),
    email varchar(255),
	rate FLOAT,
    password varchar(255),
	PRIMARY KEY (staffID),
	FOREIGN KEY (roleID) REFERENCES role(roleID)
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
	staffID int,
    patientID int,
	PRIMARY KEY (dhID),
    FOREIGN KEY (patientID) REFERENCES patients(patientID),
    FOREIGN KEY (staffID) REFERENCES Staffs(staffID)
);

CREATE TABLE schedules(
	scheduleID int NOT NULL AUTO_INCREMENT,
	staffID int NOT NULL,
    patientID int NOT NULL,
    hospitalID int NOT NULL,
    scheduledDate datetime,
    updateDate datetime,
    appointmentDate DATE,
	startTime TIME,
	endTime TIME,
    description varchar(255),
	status VARCHAR(15),
	PRIMARY KEY (scheduleID),
    FOREIGN KEY (patientID) REFERENCES patients(patientID),
    FOREIGN KEY (staffID) REFERENCES staffs(staffID),
    FOREIGN KEY (hospitalID) REFERENCES hospitals(hospitalID)
);

CREATE TABLE availableTime(
	availableTimeID int NOT NULL AUTO_INCREMENT,
	staffID int NOT NULL,
    hospitalID int NOT NULL,
    setDate datetime,
    updateDate datetime,
    dayOfWeek VARCHAR(50),
	startTime TIME,
	endTime TIME,
	PRIMARY KEY (availableTimeID),
    FOREIGN KEY (staffID) REFERENCES staffs(staffID),
    FOREIGN KEY (hospitalID) REFERENCES hospitals(hospitalID)
);

