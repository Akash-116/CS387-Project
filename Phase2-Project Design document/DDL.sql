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



create table item(
    item_id int,
    item_name text,
    cost int,
    quan_inv int,
    unit text,
    primary key(item_id)
);

create table dish(
    dish_id int,
    dish_name text,
    recipe text,
    time_taken int,
    dish_type text check (dish_type in ('V','NV')),
    cost int,
    rating real,
    photo text,
    primary key(dish_id)
);


create table dish_items(
    dish_id int,
    item_id int,
    quantity int,
    primary key(dish_id,item_id),
    foreign key(dish_id) references dish on delete cascade,
    foreign key(item_id) references item on delete set null
);

create table table_status(
    table_id int,
    loc text,
    status text check (status in ('B','O','E')),
    primary key(table_id)
);

create table area(
    area_id int,
    loc text,
    city text,
    primary key(area_id)
);

create table customer_type(
    c_type_id int,
    c_type text check (c_type in ('P','VIP','N')),
    min_num_dishes int,
    max_num_dishes int,
    primary key(c_type_id)
);

create table customer(
    c_id int,
    name text,
    ph_no int,
    addr text,
    num_orders int default 0,
    num_dish int default 0,
    -- c_type_id int,
    constraint customer_prim primary key(c_id)
    -- foreign key(c_type_id) references customer_type on delete set null
);


create table cart(
    c_id int,
    dish_id int,
    quantity int,
    primary key(c_id,dish_id),
    foreign key(c_id) references customer on delete cascade,
    foreign key(dish_id) references dish on delete cascade
);

create table employee(
    e_id int,
    name int,
    salary int,
    ph_no int,
    addr text,
    e_type text check (e_type in ('Chef','Waiter','Delivery','Manager')),
    join_date date,
    status text check (status in ('Working','Leave','Left')),
    left_date date,
    prim_area_id int,
    sec_area_id int,
    primary key(e_id),
    foreign key(prim_area_id) references area on delete set null,
    foreign key(sec_area_id) references area on delete set null
);


create table offer(
    offer_id int,
    name text,
    discount int,
    primary key(offer_id)
);

create table day(
    dat date,
    day text check (day in ('Mon','Tue','Wed','Thu','Fri','Sat','Sun')),
    constraint day_prim primary key(dat)
);

create table offer_valid(
    offer_id int,
    dat date,
    dish_id int,
    c_type_id int,
    primary key(offer_id,dat,dish_id,c_type_id),
    foreign key(offer_id) references offer on delete cascade,
    foreign key(dat) references day on delete cascade,
    foreign key(dish_id) references dish on delete cascade,
    foreign key(c_type_id) references customer_type on delete cascade
);

create table day_to_day_dishes(
    dat date,
    dish_id int,
    dish_count int,
    constraint day_dish_prim primary key(dat,dish_id),
    foreign key(dat) references day on delete cascade,
    foreign key(dish_id) references dish on delete cascade
);

create table day_to_day_items(
    dat date,
    item_id int,
    used int,
    bought int,
    left_inv int,
    constraint day_item_prim primary key(dat,item_id),
    foreign key(dat) references day on delete cascade,
    foreign key(item_id) references item on delete cascade
);

create table orders(
    order_id int,
    c_id int,
    received_time time,
    finished_time time,
    delivered_time time,
    offer_id int,
    status text check (status in ('Preparing','Out for delivery','Delivered','Served')),
    order_type text check (order_type in ('Online/Dine')),
    primary key(order_id),
    foreign key(c_id) references customer,
    foreign key(offer_id) references offer
);

create table order_dishes(
    order_id int,
    dish_id int,
    quantity int,
    primary key(order_id,dish_id),
    foreign key(order_id) references orders,
    foreign key(dish_id) references dish
);

create function update_dishes()
    returns trigger
    language plpgsql
    as $$
    begin
        insert into day_to_day_dishes values(CURRENT_DATE,NEW.dish_id,NEW.quantity) on conflict on constraint day_dish_prim do update set dish_count=day_to_day_dishes.dish_count+NEW.quantity;
        insert into customer(c_id,num_dish) values((select c_id from orders where order_id=NEW.order_id),NEW.quantity) on conflict on constraint customer_prim do update set num_dish=customer.num_dish+NEW.quantity;
        return NEW;
    end
    $$;
create trigger day_dishes_update after insert on order_dishes for each row execute procedure update_dishes();


create function update_items()
    returns trigger
    language plpgsql
    as $$
    begin
        insert into day_to_day_items(dat,item_id,used) select CURRENT_DATE,item_id,NEW.quantity*quantity from dish_items where dish_id=NEW.dish_id on conflict on constraint day_item_prim do update set used=day_to_day_items.used+NEW.quantity*(select quantity from dish_items where dish_id=NEW.dish_id and item_id=day_to_day_items.item_id);

        return NEW;
    end
    $$;
create trigger day_items_update after insert on order_dishes for each row execute procedure update_items();

create function update_customer_on_order()
    returns trigger
    language plpgsql
    as $$
    begin
        insert into customer(c_id,num_orders) values(NEW.c_id,1) on conflict on constraint customer_prim do update set num_orders=customer.num_orders+1;

        return NEW;
    end
    $$;
create trigger customer_update_on_order after insert on orders for each row execute procedure update_customer_on_order();

create function insert_date_on_order()
    returns trigger
    language plpgsql
    as $$
    begin
        insert into day(dat) values(CURRENT_DATE) on conflict on constraint day_prim do nothing;

        return NEW;
    end
    $$;
create trigger date_insert_on_order before insert on orders for each row execute procedure insert_date_on_order();