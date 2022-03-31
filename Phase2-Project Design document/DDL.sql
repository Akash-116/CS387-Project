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

create customer_type(
    c_type_id int,
    c_type text check (c_type in ('P','VIP','N'))
    primary key(c_type_id)
);

create table customer(
    c_id int,
    name text,
    ph_no int,
    addr text,
    num_orders int,
    num_dish int,
    c_type_id int,
    primary key(c_id),
    foreign key(c_type_id) references customer_type on delete set null
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
    e_type text check (e_type in ('Chef','Waiter','Delivery','Manager'))
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
    day text check day in ('Mon','Tue','Wed','Thu','Fri','Sat','Sun'),
    primary key(dat)
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
    count int,
    primary key(dat,dish_id),
    foreign key(dat) references day on delete cascade,
    foreign key(dish_id) references dish on delete cascade
);

create table day_to_day_items(
    dat date,
    item_id int,
    used int,
    bought int,
    left_inv int,
    primary key(dat,item_id),
    foreign key(dat) references day on delete cascade,
    foreign key(item_id) references item on delete cascade
);