use GARAGE_SQL2;


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

INSERT INTO USER_PROFILE (id, profile_type_id, username, firstname, surname, phone, email, password)
VALUES 
  (NULL, "3", "customer2@gersgarage.com", "Alice", "Smith", "34567890", "customer2@gersgarage.com", "$2b$04$Zdb2U0sTEg7XB6byh93eROEYltCki2ckreodz0RD6SM5eymgFGyZS"),
  (NULL, "3", "customer3@gersgarage.com", "Bob", "Johnson", "34567890", "customer3@gersgarage.com", "$2b$04$Zdb2U0sTEg7XB6byh93eROEYltCki2ckreodz0RD6SM5eymgFGyZS"),
  (NULL, "3", "customer4@gersgarage.com", "Eva", "Anderson", "34567890", "customer4@gersgarage.com", "$2b$04$Zdb2U0sTEg7XB6byh93eROEYltCki2ckreodz0RD6SM5eymgFGyZS"),
  (NULL, "3", "customer5@gersgarage.com", "Michael", "Brown", "34567890", "customer5@gersgarage.com", "$2b$04$Zdb2U0sTEg7XB6byh93eROEYltCki2ckreodz0RD6SM5eymgFGyZS"),
  (NULL, "3", "customer6@gersgarage.com", "Sophia", "Lee", "34567890", "customer6@gersgarage.com", "$2b$04$Zdb2U0sTEg7XB6byh93eROEYltCki2ckreodz0RD6SM5eymgFGyZS"),
  (NULL, "3", "customer7@gersgarage.com", "David", "Garcia", "34567890", "customer7@gersgarage.com", "$2b$04$Zdb2U0sTEg7XB6byh93eROEYltCki2ckreodz0RD6SM5eymgFGyZS"),
  (NULL, "3", "customer8@gersgarage.com", "Olivia", "Rodriguez", "34567890", "customer8@gersgarage.com", "$2b$04$Zdb2U0sTEg7XB6byh93eROEYltCki2ckreodz0RD6SM5eymgFGyZS"),
  (NULL, "3", "customer9@gersgarage.com", "William", "Martinez", "34567890", "customer9@gersgarage.com", "$2b$04$Zdb2U0sTEg7XB6byh93eROEYltCki2ckreodz0RD6SM5eymgFGyZS"),
  (NULL, "3", "customer10@gersgarage.com", "Emily", "Hernandez", "34567890", "customer10@gersgarsge.com", "$2b$04$Zdb2U0sTEg7XB6byh93eROEYltCki2ckreodz0RD6SM5eymgFGyZS");
