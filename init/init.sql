CREATE DATABASE myhealthapplication;

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

CREATE TABLE doctorArea(
	areaID int NOT NULL AUTO_INCREMENT,
	discription varchar(255),
	PRIMARY KEY (areaID)
);

CREATE TABLE staffs(
	staffID int NOT NULL AUTO_INCREMENT,
	firebaseUID varchar(255),
	roleID int, 
	firstName varchar(255),
	lastName varchar(255),
	areaID int,
	mobile varchar(255),
    email varchar(255),
	rate FLOAT,
    password varchar(255),
	PRIMARY KEY (staffID),
	FOREIGN KEY (roleID) REFERENCES role(roleID),
    FOREIGN KEY (areaID) REFERENCES doctorArea(areaID)
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
    FOREIGN KEY (staffID) REFERENCES staffs(staffID)
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

INSERT INTO patients (firebaseUID, firstName, lastName, username, address, mobile, email, bdate)
VALUES ('EeRRj99QS0SMLB5NvDuRh7QFwUw2 ', 'Pasan', 'Rathnayake', 'Pasanaa','264/26, Walivita Road, Kaduwela','0723928101', 'pasanransika1@gmail.com', '2000-10-25 00:00:00');

INSERT INTO patients (firebaseUID, firstName, lastName, username, address, mobile, email, bdate)
VALUES ('WcyOy9FTZsgmw8eCDgLJccQu8X92', 'leonado', 'messi', 'Messi','264/26, Json Road, Colombo','0777699665', 'messi@gmail.com', '2000-04-19 00:00:00');

INSERT INTO doctorArea ( discription)
VALUES ('Neurologist');

INSERT INTO doctorArea ( discription)
VALUES ('Psychiatrist');

INSERT INTO doctorArea ( discription)
VALUES ('Anesthesiologist');

INSERT INTO doctorArea ( discription)
VALUES ('Radiologist');

INSERT INTO role ( discription)
VALUES ('admin');

INSERT INTO role ( discription)
VALUES ('doctor');

INSERT INTO role ( discription)
VALUES ('staff');

INSERT INTO hospitals (name, address, mobile)
VALUES ('sri jayewardenepura general hospital', 'Thalapathpitiya, Nugegoda, Sri Lanka', '074363281');

INSERT INTO hospitals (name, address, mobile)
VALUES ('Nevil Fernando teaching hospital', 'Malabe, Kaduwela, Sri Lanka', '0117483927');

INSERT INTO staffs (roleID, firstName, lastName, areaID, mobile, email, rate, password)
VALUES (2,'Cristiano', 'Ronaldo', 1, '073563281', 'cris.ronaldo@gmail.com', 0,'$2b$12$U9ChW1eh84wWNO9U9VQlRel0BzgJFqbp/3YEApC970XvpyY/fYRTS' );

INSERT INTO staffs (roleID, firstName, lastName, areaID, mobile, email, rate, password)
VALUES (1,'Admin', '123', 1, '073563281', 'admin@gmail.com', 0,'$2b$12$U9ChW1eh84wWNO9U9VQlRel0BzgJFqbp/3YEApC970XvpyY/fYRTS' );