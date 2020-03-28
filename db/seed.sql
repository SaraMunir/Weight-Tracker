-- DROP DATABASE IF EXISTS weight_tracker;
-- CREATE DATABASE weight_tracker;
USE weight_tracker;


CREATE TABLE login_credential(
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    my_name VARCHAR(250),
    username VARCHAR(250),
    user_password VARCHAR(250),
    user_img VARCHAR(250),
    createdAt TIMESTAMP not null default CURRENT_TIMESTAMP
);
CREATE TABLE personal_info(
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_img VARCHAR(250),
    username VARCHAR(250),
    my_name VARCHAR(250) NOT NULL,
    my_weight DECIMAL(4,2),
    height DECIMAL(4,2),
    member_id INT,
    FOREIGN KEY (member_id) REFERENCES login_credential(id),
    createdAt TIMESTAMP not null default CURRENT_TIMESTAMP
);
DROP TABLE weights_data;

CREATE TABLE weights_data(
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    weight DECIMAL(6,2),
    date VARCHAR(500),
    anodate VARCHAR(500),
    createdAt TIMESTAMP not null default CURRENT_TIMESTAMP,
    myId INT,
    FOREIGN KEY (myId) REFERENCES login_credential(id)
);
INSERT INTO weights_data(weight, myId, date) VALUES(525.5, 1, "2020-03-24 02:10:09");
INSERT INTO weights_data(weight, myId, date) VALUES(525.58, 1, "2020-03-23 02:10:09");
INSERT INTO weights_data(weight, myId, date) VALUES(523.68, 1, "2020-03-22 02:10:09");
INSERT INTO weights_data(weight, myId, date) VALUES(522.31, 1, "2020-03-21 02:10:09");
INSERT INTO weights_data(weight, myId, date) VALUES(522.21, 1, "2020-03-20 02:10:09");
INSERT INTO weights_data(weight, myId, date) VALUES(521.54, 1, "2020-03-19 02:10:09");
INSERT INTO weights_data(weight, myId, date) VALUES(520.54, 1, "2020-03-18 02:10:09");
INSERT INTO weights_data(weight, myId, date) VALUES(518.12, 1, "2020-03-17 02:10:09");
INSERT INTO weights_data(weight, myId, date) VALUES(519.15, 1, "2020-03-16 02:10:09");
SELECT * FROM weights_data WHERE myId = 1 ORDER BY date ASC;
SELECT * FROM weights_data WHERE myId = 1 And date = '03/13/2020';