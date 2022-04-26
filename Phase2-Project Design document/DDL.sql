drop table if exists item cascade ;


drop table if exists dish cascade ;


drop table if exists dish_items cascade ;


drop table if exists table_status cascade ;


drop table if exists cart cascade ;


drop table if exists customer cascade ;


drop table if exists customer_type cascade ;


drop table if exists employee cascade ;


drop table if exists area cascade ;


drop table if exists orders cascade ;


drop table if exists order_dishes cascade ;


drop table if exists offer cascade ;


drop table if exists offer_valid cascade ;


drop table if exists day_to_day_dishes cascade ;


drop table if exists day_to_day_items cascade ;


drop table if exists day cascade;


drop trigger if exists day_dishes_update on order_dishes cascade;


drop function if exists update_dishes;


drop trigger if exists day_items_update on order_dishes cascade;


drop function if exists update_items;


drop trigger if exists customer_update_on_order on orders cascade;


drop function if exists update_customer_on_order;


drop trigger if exists date_insert_on_order on orders cascade;


drop function if exists insert_date_on_order;


drop trigger if exists date_insert_on_offer on orders cascade;


drop function if exists insert_date_on_offer;


create table item( item_id serial, item_name text, cost int, quan_inv int default 0, unit text, primary key(item_id));


create table dish( dish_id serial, dish_name text, recipe text, time_taken int, dish_type text check (dish_type in ('Veg Starter','Non-Veg Starter','Veg Main','Non-Veg Main','Deserts')), cost int, rating real, photo text, primary key(dish_id));


create table dish_items
    ( dish_id int, item_id int, quantity int, primary key(dish_id,item_id),
     foreign key(dish_id) references dish on delete cascade,
     foreign key(item_id) references item on delete
     set null);


create table table_status( table_id serial, loc text, status text check (status in ('O','E')), primary key(table_id));


create table area( area_id serial, loc text, city text, primary key(area_id));


create table customer_type( c_type_id serial, c_type text check (c_type in ('Platinum','Gold','Silver','Normal')), min_num_dishes int, max_num_dishes int, primary key(c_type_id));


create table employee(
    e_id serial,
    name text,
    username text not null,
    pswd text not null,
    salary int,
    ph_no bigint,
    addr text,
    e_type text check (e_type in ('Chef','Waiter','Head Waiter','Delivery','Manager')),
    join_date date,
    status text check (status in ('Working','Leave','Left')),
    d_status text default 'Free' check (d_status in ('On Delivery','Free')),
    left_date date,
    prim_area_id int,
    sec_area_id int,
    primary key(e_id),
    foreign key(prim_area_id) references area on delete set null,
    foreign key(sec_area_id) references area on delete set null,
    constraint emp_username_unique unique(username)
);


create table cart
    ( c_id int, dish_id int, quantity int, primary key(c_id,dish_id),
     foreign key(c_id) references customer on delete cascade,
     foreign key(dish_id) references dish on delete cascade);


create table offer_valid(
    offer_id int not null,
    dat date,
    dish_id int,
    --c_type_id int,
    unique(offer_id,dat,dish_id),
    foreign key(offer_id) references offer on delete cascade,
    foreign key(dat) references day on delete cascade,
    foreign key(dish_id) references dish on delete cascade,
    --foreign key(c_type_id) references customer_type on delete cascade
);


create table offer( offer_id serial, name text, discount int, primary key(offer_id));


create table day( dat date, day text check (day in ('Mon','Tue','Wed','Thu','Fri','Sat','Sun')), constraint day_prim primary key(dat));


create table day_to_day_dishes
    ( dat date, dish_id int, dish_count int, constraint day_dish_prim primary key(dat,dish_id),
     foreign key(dat) references day on delete cascade,
     foreign key(dish_id) references dish on delete cascade);


create table day_to_day_items
    ( dat date, item_id int, used int, bought int, left_inv int, constraint day_item_prim primary key(dat,item_id),
     foreign key(dat) references day on delete cascade,
     foreign key(item_id) references item on delete cascade);


create table orders
    ( order_id serial, c_id int, area_id int, table_id int, dat date not null, received_time time, finished_time time, delivered_time time, delivery_person int, status text check (status in ('Preparing','Out for delivery','Delivered','Served')), order_type text check (order_type in ('Online','Dine')), primary key(order_id),
     foreign key(c_id) references customer on delete
     set null,
     foreign key(area_id) references area on delete
     set null,
     foreign key(delivery_person) references employee on delete
     set null,
     foreign key(table_id) references table_status on delete
     set null,
     foreign key(dat) references day on delete cascade);


create table order_dishes
    ( order_id int, dish_id int, quantity int, offer_id int, primary key(order_id,dish_id),
     foreign key(order_id) references orders,
     foreign key(dish_id) references dish,
     foreign key(offer_id) references offer on delete
     set null);


create function update_dishes() returns trigger language plpgsql as $$
    begin
        insert into day_to_day_dishes values((select dat from orders where order_id=NEW.order_id),NEW.dish_id,NEW.quantity) on conflict on constraint day_dish_prim do update set dish_count=day_to_day_dishes.dish_count+NEW.quantity;
        update customer set num_dish=customer.num_dish+NEW.quantity where c_id=(select c_id from orders where order_id=NEW.order_id);
        return NEW;
    end
    $$;


create trigger day_dishes_update after
insert on order_dishes
for each row execute procedure update_dishes();


create function update_items() returns trigger language plpgsql as $$
    begin
        insert into day_to_day_items(dat,item_id,used) select orders.dat,item_id,NEW.quantity*quantity from dish_items,orders where dish_id=NEW.dish_id and orders.order_id=NEW.order_id on conflict on constraint day_item_prim do update set used=day_to_day_items.used+NEW.quantity*(select quantity from dish_items where dish_id=NEW.dish_id and item_id=day_to_day_items.item_id);
        update item set quan_inv=item.quan_inv-(select NEW.quantity*quantity from dish_items where dish_id=NEW.dish_id and item_id=item.item_id) where item_id in (select item_id from dish_items where dish_id=NEW.dish_id);
        return NEW;
    end
    $$;


create trigger day_items_update after
insert on order_dishes
for each row execute procedure update_items();


create function update_customer_on_order() returns trigger language plpgsql as $$
    begin
        update customer set num_orders=customer.num_orders+1 where c_id=NEW.c_id;

        return NEW;
    end
    $$;


create trigger customer_update_on_order after
insert on orders
for each row execute procedure update_customer_on_order();


create function insert_date_on_order() returns trigger language plpgsql as $$
    begin
        insert into day(dat) values(NEW.dat) on conflict on constraint day_prim do nothing;

        return NEW;
    end
    $$;


create trigger date_insert_on_order
before
insert on orders
for each row execute procedure insert_date_on_order();


create function insert_date_on_offer() returns trigger language plpgsql as $$
    begin
        if(NEW.dat is not null) then
            insert into day(dat) values(NEW.dat) on conflict on constraint day_prim do nothing;
        end if;
        return NEW;
    end
    $$;


create trigger date_insert_on_offer
before
insert on offer_valid
for each row execute procedure insert_date_on_offer();