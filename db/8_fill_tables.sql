USE GARAGE_SQL;

update BOOKING_TYPE set timeslot_size = 2 where id = 3;

INSERT INTO USER_PROFILE (id, profile_type_id, username, firstname, surname, phone, email, password)
VALUES (NULL, "2", "staff2@gersgarage.com", "Sullivan", "Seamus", "34567890", "staff2@gersgarage.com",
        "$2b$04$Zdb2U0sTEg7XB6byh93eROEYltCki2ckreodz0RD6SM5eymgFGyZS"),
       (NULL, "2", "staff3@gersgarage.com", "MacCarthy", "Jan", "34567890", "staff3@gersgarage.com",
        "$2b$04$Zdb2U0sTEg7XB6byh93eROEYltCki2ckreodz0RD6SM5eymgFGyZS"),
       (NULL, "2", "staff4@gersgarage.com", "Fitzpatrick", "Ciaran", "34567890", "staff4@gersgarage.com",
        "$2b$04$Zdb2U0sTEg7XB6byh93eROEYltCki2ckreodz0RD6SM5eymgFGyZS");

insert into BOOKING_SERVICES_TYPE (name, price)
values ('Car Wash', 15.00),
       ('Interior Detailing', 50.00),
       ('Paint Protection Treatment', 200.00),
       ('Window Tinting', 120.00),
       ('Headlight Restoration', 80.00),
       ('Alloy Wheel Refurbishment', 150.00),
       ('Paintless Dent Repair', 100.00),
       ('Vinyl Wrap Installation', 300.00),
       ('Windshield Chip Repair', 50.00),
       ('Leather Seat Conditioning', 70.00);

insert into BOOKING_PARTS_TYPE (name, price)
values ('Brake Pads', 15.00),
       ('Spark Plugs', 50.00),
       ('Air Filter', 200.00),
       ('Radiator Hose', 70.00);

insert into BOOKING_ACCESSORIES_TYPE (name, price)
values ('Mats', 15.00),
       ('Light Bulbs', 50.00),
       ('Wheels', 200.00),
       ('Break Lights', 120.00);