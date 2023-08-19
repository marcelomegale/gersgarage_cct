CREATE DATABASE IF NOT EXISTS GARAGE_SQL2;

use GARAGE_SQL2;

create table IF NOT EXISTS USER_PROFILE_TYPE
(
    id   int unsigned not null auto_increment,
    name varchar(50)  not null,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE
);

create table IF NOT EXISTS USER_PROFILE
(
    id              int unsigned not null auto_increment,
    profile_type_id int unsigned not null,
    username        varchar(30)  not null,
    firstname       varchar(30)  not null,
    surname         varchar(30)  not null,
    phone           varchar(15)  not null,
    email           varchar(30)  not null,
    password        VARCHAR(150) not NULL,
    created_on      TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    primary key (id),
    UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE
);

ALTER TABLE USER_PROFILE
    add foreign key (profile_type_id) references USER_PROFILE_TYPE (id);