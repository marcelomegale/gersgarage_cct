use GARAGE_SQL2;

create table IF NOT EXISTS VEHICLE_MANUFACTURER
(
    id   int unsigned not null auto_increment,
    name varchar(20)  not null,
    primary key (id)
);

create table IF NOT EXISTS VEHICLE_TYPE
(
    id   int unsigned not null auto_increment,
    name varchar(15)  not null,
    primary key (id)
);

create table IF NOT EXISTS VEHICLE_ENGINE_TYPE
(
    id   int unsigned not null auto_increment,
    name varchar(20)  not null,
    primary key (id)
);

create table IF NOT EXISTS VEHICLE_TRANSMISSION_TYPE
(
    id   int unsigned not null auto_increment,
    name varchar(20)  not null,
    primary key (id)
);

create table IF NOT EXISTS VEHICLE_MANUFACTURER_MODEL
(
    id              int unsigned not null auto_increment,
    manufacturer_id int unsigned not null,
    name            varchar(30)  not null,
    primary key (id)
);

ALTER TABLE VEHICLE_MANUFACTURER_MODEL
    add foreign key (manufacturer_id) references VEHICLE_MANUFACTURER (id);

create table IF NOT EXISTS VEHICLE (
                         id int unsigned not null auto_increment,
                         engine_type_id int unsigned not null,
                         vehicle_type_id int unsigned not null,
                         manufacturer_model_id int unsigned not null,
                         transmission_type_id int unsigned not null,
                         register varchar(20) not null,
                         user_profile_id int unsigned not null,
                         year_of_make int not null,

                         primary key(id)
);

ALTER TABLE VEHICLE
    add foreign key (engine_type_id) references VEHICLE_ENGINE_TYPE(id),
    add foreign key (vehicle_type_id) references VEHICLE_TYPE(id),
    add foreign key (manufacturer_model_id) references VEHICLE_MANUFACTURER_MODEL(id),
    add foreign key (transmission_type_id) references VEHICLE_TRANSMISSION_TYPE(id),
    add foreign key (user_profile_id) references USER_PROFILE(id);