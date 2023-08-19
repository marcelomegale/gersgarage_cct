use GARAGE_SQL2;

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

INSERT INTO GARAGE_SQL2.VEHICLE (id, engine_type_id, vehicle_type_id, manufacturer_model_id, transmission_type_id, register, user_profile_id, year_of_make)
VALUES 
  ("5", "2", "2", "11", "2", "21-C-9876", "12", "2019"),
  ("6", "3", "2", "11", "1", "15-D-5432", "13", "2020"),
  ("7", "4", "2", "11", "2", "19-L-8765", "14", "2018"),
  ("8", "1", "2", "11", "1", "20-W-2345", "15", "2022"),
  ("9", "2", "2", "11", "2", "13-G-6789", "16", "2017"),
  ("10", "3", "2", "11", "1", "18-KE-4567", "17", "2019"),
  ("11", "4", "2", "11", "2", "16-MO-9876", "18", "2021"),
  ("12", "1", "2", "11", "1", "22-WW-3210", "19", "2020");
