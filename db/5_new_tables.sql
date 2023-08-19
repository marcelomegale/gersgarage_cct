use GARAGE_SQL2;

create table IF NOT EXISTS BOOKING_TYPE (
                              id int unsigned not null auto_increment,
                              name varchar(30) not null,
                              price decimal(10,2) not null,
                              description varchar(500) not null,

                              primary key(id)
);

create table IF NOT EXISTS BOOKING_STATUS (
                                id int unsigned not null auto_increment,
                                name varchar(30) not null,

                                primary key(id)
);


create table IF NOT EXISTS BOOKING_TIME_SLOT (
                                              id int unsigned not null auto_increment,
                                              name varchar(30) not null,

                                              primary key(id)
);

create table IF NOT EXISTS BOOKING_SERVICES_TYPES_EXTRAS (
                                id int unsigned not null auto_increment,
                                name varchar(30) not null,
                                price decimal (10,2) default 0.00,

                                primary key(id)
);

create table IF NOT EXISTS BOOKING (
                               id int unsigned not null auto_increment,
                               date DATE NOT NULL,
                               vehicle_id int unsigned not null,
                               booking_type_id int unsigned not null,
                               staff_id int unsigned null,
                               booking_status_id int unsigned not null,
                               price decimal(10,2) DEFAULT 0.00 not null,
                               booking_time_slot_id int unsigned not null,
                               description varchar(300) null,

                                primary key(id)
);

ALTER TABLE BOOKING
    add foreign key (vehicle_id) references VEHICLE(id),
    add foreign key (booking_type_id) references BOOKING_TYPE(id),
    add foreign key (staff_id) references USER_PROFILE(id),
    add foreign key (booking_status_id) references BOOKING_STATUS(id),
    add foreign key (booking_time_slot_id) references BOOKING_TIME_SLOT(id);

CREATE VIEW VIEW_VEHICLES_BY_PROFILE AS
SELECT
    v.id,
    v.register,
    v.user_profile_id,
    up.username
FROM
    VEHICLE v
        JOIN
    USER_PROFILE up ON up.id = v.user_profile_id;