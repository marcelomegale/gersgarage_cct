use GARAGE_SQL;


INSERT INTO USER_PROFILE_TYPE (name)
VALUES ("manager"),
       ("staff"),
       ("customer");

INSERT INTO USER_PROFILE (id, profile_type_id, username, firstname, surname, phone, email, password)
VALUES (NULL, "3", "customer1@gersgarage.com", "John", "Doe", "34567890", "customer1@gersgarage.com",
        "$2b$04$Zdb2U0sTEg7XB6byh93eROEYltCki2ckreodz0RD6SM5eymgFGyZS"),
       (NULL, "2", "staff1@gersgarage.com", "Mary", "Jane", "34567890", "staff1@gersgarage.com",
        "$2b$04$Zdb2U0sTEg7XB6byh93eROEYltCki2ckreodz0RD6SM5eymgFGyZS"),
       (NULL, "1", "manager1@gersgarage.com", "Jane", "Doe", "34567890", "manager1@gersgarage.com",
        "$2b$04$Zdb2U0sTEg7XB6byh93eROEYltCki2ckreodz0RD6SM5eymgFGyZS")