use GARAGE_SQL2;

alter table BOOKING_TYPE
    add timeslot_size int default 1 null;

alter table USER_PROFILE
    add active bool default true;

create table IF NOT EXISTS BOOKING_PARTS_TYPE (
                                            id int unsigned not null auto_increment,
                                            name varchar(30) not null,
                                            price decimal(10,2) not null,

                                            primary key(id)
);

create table IF NOT EXISTS BOOKING_ACCESSORIES_TYPE (
                                                 id int unsigned not null auto_increment,
                                                 name varchar(30) not null,
                                                 price decimal(10,2) not null,

                                                 primary key(id)
);

drop table BOOKING_SERVICES_TYPES_EXTRAS;

create table IF NOT EXISTS BOOKING_SERVICES_TYPE (
                                                             id int unsigned not null auto_increment,
                                                             name varchar(30) not null,
                                                             price decimal (10,2) default 0.00,

                                                             primary key(id)
);

alter table BOOKING
    drop column price;

create table IF NOT EXISTS BOOKING_ITEM (
                                                    id int unsigned not null auto_increment,
                                                    booking_id int unsigned not null,
                                                    category_name varchar(30) not null,
                                                    name varchar(30) not null,
                                                    price decimal (10,2) default 0.00,

                                                    primary key(id)
);

ALTER TABLE BOOKING_ITEM
    add foreign key (booking_id) references BOOKING(id);

create view view_staff as
select id, username as name from USER_PROFILE
where profile_type_id = 2
  and active = 1;

CREATE VIEW view_staff_by_bookings AS
SELECT DISTINCT UP.id, up.firstname as name
FROM USER_PROFILE up
JOIN BOOKING B ON b.staff_id = up.id ;