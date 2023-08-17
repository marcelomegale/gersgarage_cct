use GARAGE_SQL;

insert into BOOKING_TYPE (name, price, description)
values ("Annual Service", 380, "At our garage, we offer an Annual Service to ensure your vehicle remains in optimal condition throughout the year. Our skilled technicians will perform a comprehensive inspection, checking vital components"),
       ("Major Service", 150, "Our Major Service is designed to give your vehicle a comprehensive maintenance overhaul. It goes beyond the regular check-up and includes thorough inspections, fluid replacements, and component adjustments"),
       ("Major Repair", 250, "When your vehicle requires significant repairs, our experienced team is here to help. Our Major Repair service covers a wide range of complex mechanical issues."),
       ("Repair / Fault", 100, "When your vehicle encounters a specific repair or fault, our team is here to diagnose and resolve the issue. We have the expertise to handle a wide range of mechanical faults, from electrical problems to faulty components.");

insert into BOOKING_STATUS (name)
values ("Booked"),
       ("Collected"),
       ("Fixed / Completed"),
       ("In Service"),
       ("Unrepairable / Scrapped");

insert into BOOKING_TIME_SLOT (name)
values ("Early Morning"),
       ("Late Morning"),
       ("Early Afternoon"),
       ("Late Afternoon");

insert into BOOKING_SERVICES_TYPES_EXTRAS (name, price)
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