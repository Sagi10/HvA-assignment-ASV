INSERT INTO USER(id, email, password, firstname, lastname, role) VALUES (1001, 'mechanic@klm.nl', 'Welkom01', 'Mechanic', 'mac', 1);
INSERT INTO USER(id, email, password, firstname, lastname, role) VALUES (1002,'admin@klm.nl', 'Welkom01', 'admin', 'admin', 0);
INSERT INTO USER(id, email, password, firstname, lastname, role) VALUES (1003,'runner@klm.nl', 'Welkom01', 'runner', 'runner', 2);
INSERT INTO USER(id, email, password, firstname, lastname, role) VALUES (1004, 'mechanicus@klm.nl', 'Welkom01', 'Mark', 'Anic', 1);

INSERT INTO CART(id, lat, lng, carttype, EQUIPMENT_STATUS, title) VALUES (50, 52.302916, 4.761736,'NITROGENCART', 'IN_USE', 'NITROGENCART');
INSERT INTO CART(id, lat, lng, carttype, EQUIPMENT_STATUS, title) VALUES (53, 52.304916, 4.762036,'NITROGENCART', 'AVAILABLE', 'NITROGENCART');
INSERT INTO CART(id, lat, lng, carttype, EQUIPMENT_STATUS, title) VALUES (54, 52.314916, 4.765036,'NITROGENCART', 'AVAILABLE', 'NITROGENCART');
INSERT INTO CART(id, lat, lng, carttype, EQUIPMENT_STATUS, title) VALUES (55, 52.305802, 4.773066,'NITROGENCART', 'IN_USE', 'NITROGENCART');
INSERT INTO CART(id, lat, lng, carttype, EQUIPMENT_STATUS, title) VALUES (60, 52.312676, 4.775512,'TIRECART', 'AVAILABLE','TIRECART');
INSERT INTO CART(id, lat, lng, carttype, EQUIPMENT_STATUS, title) VALUES (61, 52.302916, 4.761736,'TIRECART', 'AVAILABLE','TIRECART');
INSERT INTO CART(id, lat, lng, carttype, EQUIPMENT_STATUS, title) VALUES (70, 52.308190, 4.773538, 'SKYDROLWAGEN', 'AVAILABLE','SKYDROLWAGEN');
INSERT INTO CART(id, lat, lng, carttype, EQUIPMENT_STATUS, title) VALUES (75, 52.304916, 4.762036, 'SKYDROLWAGEN', 'AVAILABLE','SKYDROLWAGEN');
INSERT INTO CART(id, lat, lng, carttype, EQUIPMENT_STATUS, title) VALUES (80, 52.314015, 4.754484, 'SKYDROL_CART', 'AVAILABLE','SKYDROL_CART');
INSERT INTO CART(id, lat, lng, carttype, EQUIPMENT_STATUS, title) VALUES (81, 52.302916, 4.761736, 'SKYDROL_CART', 'AVAILABLE','SKYDROL_CART');

INSERT INTO REQUEST(id, location, deadline, plane_type, tail_type, wagon_type, selected_wagon, position, status, extra_info, request_created, request_updated, completion_time, delivery_time, user_id)
VALUES (500, 'C3' , DATEADD(MINUTE , 10, current_time ), 'BOEING737700', 'PH_AKA', 'Nitrogen Cart', 0, 'Left', 'Pending', null, current_time, current_time , current_time, current_time, 1001);
INSERT INTO REQUEST(id, location, deadline, plane_type, tail_type, wagon_type, selected_wagon, position, status, extra_info, request_created, completion_time, delivery_time, request_updated, user_id)
VALUES (501, 'B5', current_time, 'BOEING737700', 'PH_AKA', 'Nitrogen Cart', 55, 'Left', 'Delivered', null, current_time, current_time, current_time, current_time , 1004);
INSERT INTO REQUEST(id, location, deadline, plane_type, tail_type, wagon_type, selected_wagon, position, status, extra_info, request_created, completion_time, delivery_time, request_updated, user_id)
VALUES (502, 'B5', DATEADD(MINUTE , 35, current_time ), 'BOEING737700', 'PH_AKA', 'Skydrolwagen', 0, 'Left', 'Pending', null, current_time, current_time, current_time, current_time , 1001);
INSERT INTO REQUEST(id, location, deadline, plane_type, tail_type, wagon_type, selected_wagon, position, status, extra_info, request_created, completion_time, delivery_time, request_updated, user_id)
VALUES (503, 'F7', DATEADD(MINUTE , 80, current_time ), 'BOEING737700', 'PH_AKA', 'Tires Cart', 0, 'Left', 'Pending', 'N:2, M:1', current_time, current_time, current_time, current_time , 1004);
INSERT INTO REQUEST(id, location, deadline, plane_type, tail_type, wagon_type, selected_wagon, position, status, extra_info, request_created, completion_time, delivery_time, request_updated, user_id)
VALUES (504, 'F7', current_time, 'BOEING737700', 'PH_AKA', 'Nitrogen Cart', 50, 'Left', 'Delivered', null, current_time, current_time, current_time, current_time , 1001);
INSERT INTO REQUEST(id, location, deadline, plane_type, tail_type, wagon_type, selected_wagon, position, status, extra_info, request_created, completion_time, delivery_time, request_updated, user_id)
VALUES (505, 'B5', DATEADD(MINUTE , 90, current_time ), 'BOEING737700', 'PH_AKA', 'Skydrolwagen', 75, 'Right', 'Collect', null, DATEADD(MINUTE, -1, current_time), DATEADD(MINUTE, -1, current_time), current_time, DATEADD(MINUTE, -1, current_time) , 1001);

-- '2019-12-27 15:20:33'

-- INSERT INTO REQUEST(id, location, deadline, plane_type, tail_type, wagon_type, selected_wagon, position, status, extra_info, request_created, request_updated, completion_time, delivery_time, user_id)
-- VALUES (1, 'A1' , current_time, 'BOEING737700', 'PH_AKA', 'Tires Cart', 0, 'Left', 'Finished', null, '2019-12-27 15:20:33', '2019-12-27 15:20:33' , '2019-12-27 15:20:33', '2019-12-27 15:20:33', 1001);
-- INSERT INTO REQUEST(id, location, deadline, plane_type, tail_type, wagon_type, selected_wagon, position, status, extra_info, request_created, request_updated, completion_time, delivery_time, user_id)
-- VALUES (2, 'A1' , current_time, 'BOEING737700', 'PH_AKA', 'Tires Cart', 0, 'Left', 'Finished', null, '2019-12-27 15:20:33', '2019-12-27 15:20:33' , '2019-12-27 15:20:33', '2019-12-27 15:20:33', 1001);
-- INSERT INTO REQUEST(id, location, deadline, plane_type, tail_type, wagon_type, selected_wagon, position, status, extra_info, request_created, request_updated, completion_time, delivery_time, user_id)
-- VALUES (3, 'A1' , current_time, 'BOEING737700', 'PH_AKA', 'Tires Cart', 0, 'Left', 'Finished', null, '2019-12-27 15:20:33', '2019-12-27 15:20:33' , '2019-12-27 15:20:33', '2019-12-27 15:20:33', 1001);
-- INSERT INTO REQUEST(id, location, deadline, plane_type, tail_type, wagon_type, selected_wagon, position, status, extra_info, request_created, request_updated, completion_time, delivery_time, user_id)
-- VALUES (4, 'A1' , current_time, 'BOEING737700', 'PH_AKA', 'Tires Cart', 0, 'Left', 'Finished', null, '2019-12-27 15:20:33', '2019-12-27 15:20:33' , '2019-12-27 15:20:33', '2019-12-27 15:20:33', 1001);
-- INSERT INTO REQUEST(id, location, deadline, plane_type, tail_type, wagon_type, selected_wagon, position, status, extra_info, request_created, request_updated, completion_time, delivery_time, user_id)
-- VALUES (5, 'A1' , current_time, 'BOEING737700', 'PH_AKA', 'Nitrogen Cart', 0, 'Left', 'Finished', null, '2019-12-27 15:20:33', '2019-12-27 15:20:33' , '2019-12-27 15:20:33', '2019-12-27 15:20:33', 1001);
-- INSERT INTO REQUEST(id, location, deadline, plane_type, tail_type, wagon_type, selected_wagon, position, status, extra_info, request_created, request_updated, completion_time, delivery_time, user_id)
-- VALUES (6, 'A1' , current_time, 'BOEING737700', 'PH_AKA', 'Nitrogen Cart', 0, 'Left', 'Finished', null, '2019-12-27 15:20:33', '2019-12-27 15:20:33' , '2019-12-27 15:20:33', '2019-12-27 15:20:33', 1001);
-- INSERT INTO REQUEST(id, location, deadline, plane_type, tail_type, wagon_type, selected_wagon, position, status, extra_info, request_created, request_updated, completion_time, delivery_time, user_id)
-- VALUES (7, 'A1' , current_time, 'BOEING737700', 'PH_AKA', 'Nitrogen Cart', 0, 'Left', 'Finished', null, '2019-12-27 15:20:33', '2019-12-27 15:20:33' , '2019-12-27 15:20:33', '2019-12-27 15:20:33', 1001);
-- INSERT INTO REQUEST(id, location, deadline, plane_type, tail_type, wagon_type, selected_wagon, position, status, extra_info, request_created, request_updated, completion_time, delivery_time, user_id)
-- VALUES (8, 'A1' , current_time, 'BOEING737700', 'PH_AKA', 'Skydrolwagen', 0, 'Left', 'Finished', null, '2019-12-27 15:20:33', '2019-12-27 15:20:33' , '2019-12-27 15:20:33', '2019-12-27 15:20:33', 1001);
-- INSERT INTO REQUEST(id, location, deadline, plane_type, tail_type, wagon_type, selected_wagon, position, status, extra_info, request_created, request_updated, completion_time, delivery_time, user_id)
-- VALUES (9, 'A1' , current_time, 'BOEING737700', 'PH_AKA', 'Skydrolwagen', 0, 'Left', 'Finished', null, '2019-12-27 15:20:33', '2019-12-27 15:20:33' , '2019-12-27 15:20:33', '2019-12-27 15:20:33', 1001);
-- INSERT INTO REQUEST(id, location, deadline, plane_type, tail_type, wagon_type, selected_wagon, position, status, extra_info, request_created, request_updated, completion_time, delivery_time, user_id)
-- VALUES (10, 'A1' , current_time, 'BOEING737700', 'PH_AKA', 'Heater, Polar Cart', 0, 'Left', 'Finished', null, '2019-12-27 15:20:33', '2019-12-27 15:20:33' , '2019-12-27 15:20:33', '2019-12-27 15:20:33', 1001);
