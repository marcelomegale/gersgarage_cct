use GARAGE_SQL;

insert into VEHICLE_ENGINE_TYPE (name)
values ("Diesel"),
       ("Eletric"),
       ("Etanol"),
       ("Hybrid"),
       ("Petrol");

insert into VEHICLE_TYPE (name)
values ("Bus"),
       ("Car"),
       ("Lorry"),
       ("Van");

insert into VEHICLE_TRANSMISSION_TYPE (name)
values ("Mechanic"),
       ("Automatic");

INSERT INTO VEHICLE_MANUFACTURER (name)
VALUES ("Toyota"),
       ("Ford"),
       ("Honda"),
       ("Chevrolet"),
       ("Volkswagen"),
       ("BMW"),
       ("Mercedes-Benz"),
       ("Nissan"),
       ("Audi"),
       ("Hyundai"),
       ("Kia"),
       ("Volvo"),
       ("Mazda"),
       ("Subaru"),
       ("Jeep"),
       ("Lexus"),
       ("Tesla"),
       ("Ferrari"),
       ("Porsche"),
       ("Land Rover"),
       ("Jaguar"),
       ("Mitsubishi"),
       ("Chrysler"),
       ("Dodge"),
       ("Buick"),
       ("Cadillac"),
       ("GMC"),
       ("Acura"),
       ("Infiniti"),
       ("Lincoln");

INSERT INTO VEHICLE_MANUFACTURER_MODEL (manufacturer_id, name)
VALUES ("10", "Sonata"),
       ("10", "Elantra"),
       ("10", "Tucson"),
       ("10", "Santa Fe"),
       ("10", "Kona"),
       ("4", "Camaro"),
       ("4", "Malibu"),
       ("4", "Silverado"),
       ("4", "Equinox"),
       ("4", "Traverse"),
       ("6", "3 Series"),
       ("6", "5 Series"),
       ("6", "X3"),
       ("6", "X5"),
       ("6", "i8"),
       ("8", "Altima"),
       ("8", "Maxima"),
       ("8", "Rogue"),
       ("8", "Sentra"),
       ("8", "Pathfinder"),
       ("2", "Mustang"),
       ("2", "Focus"),
       ("2", "F-150"),
       ("2", "Explorer"),
       ("2", "Escape"),
       ("5", "Golf"),
       ("5", "Jetta"),
       ("5", "Passat"),
       ("5", "Tiguan"),
       ("5", "Atlas");

