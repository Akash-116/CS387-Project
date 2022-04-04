-- 1 logging onto the system

SELECT user_id,
	role
FROM user_data
where user_id=u_id
				and password=password_entered;

-- 2 changing /adding dishes and menu
INSERT INTO dish
VALUES (dish_id,
	dish_name,
	recipe,
	time_taken,
	dish_type,
	cost,
	rating,
	photo);

UPDATE dish
SET rating =rating
where dish_id = dish_id;

INSERT INTO dish_items 
VALUES (dish_id,
	item_id,
	quantity);
DELETE FROM dish_items
WHERE dish_id = dish_id and item_id =item_id;

-- 3 Manae table status

UPDATE table_status
SET status=new_state
WHERE table_id = table_id;

-- 4 Manage Orders and Customers and dishes in cart

SELECT c_id,
	user_id
FROM user_data
where c_id = customer_id;


INSERT INTO orders
VALUES (c_id,
									area_id,
									table_id,
									dat,
									received_time,
									finished_time,
									delivered_time,
									delivery_person,
									status,
									order_type)
INSERT INTO order_dishes
VALUES (order_id,
									dish_id,
									quantity,
									offer_id)
DELETE
from order_dishes
WHERE order_id = order_id
				and dish_id = dish_id;

-- 5,9 Managing delivery personnel

INSERT INTO employee
VALUES (name,
									salary,
									ph_no,
									addr,
									e_type,
									join_date,
									status,
									left_date,
									prim_area_id,
									sec_area_id);


UPDATE employee
SET status=new_state
where e_id = employee_id;

DELETE FROM employee WHERE e_id =employee_id;


-- 6 Manage items
INSERT INTO item
VALUES (item_name,
	cost,
	quan_inv,
	unit)

UPDATE item SET quan_inv=new_quantity WHERE item_name = item_name;

-- 8 View employee details
SELECT * from employee where e_id= employee_id;

-- 10 view menu
SELECT * from dish;
SELECT * FROM dish where dish_id = dish_id;

-- 11 view and edit restraunt details
-- ... idk what to write here

-- 12 best waiter
-- didn't add ratings to them

-- 13 best dishes according to user rating
SELECT * from dish ORDER BY rating limit 10;
-- 14 best customer
-- no rating feild added

-- 15 most ordered dish
SELECT dish_name FROM
((SELECT dish_id from order_dishes) as o_ 
UNION
(SELECT dish_id from cart) as c_)as d_,
dish
where dish.dish_id =d_.dish_id
GROUP BY dish_id
ORDER BY count(dish_id) DESC
limit 1;

-- 16 Best day of the week
SELECT dat from day_to_day_dishes
GROUP BY dat
ORDER BY count(dat) DESC
limit 1;
-- 17 best delivery person
-- no ratings were added to delivery personnel

-- 18 view item details
SELECT * FROM item;
SELECT * FROM item WHERE item_name =item_name;

-- 19 view table satus
SELECT * FROM table_status WHERE table_id = table_id;

-- 20 order details
SELECT * FROM orders WHERE order_id = order_id;

-- 21 offer details
SELECT * from offer WHERE name = name;

-- 22 view prev orders
SELECT * from orders WHERE order.c_id = c_id ORDER BY order_id DESC;

-- 23 change customer details
UPDATE customer
SET name=name AND ph_no = ph_no AND addr=addr
WHERE c_id = customer_id

--