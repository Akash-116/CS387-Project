import psycopg2 as pg
from psycopg2 import extras
import argparse
import csv
# import time

# start=time.time()

parser = argparse.ArgumentParser()
parser.add_argument('--name', default='db-project')
parser.add_argument('--user', default='postgres')
parser.add_argument('--pswd', default='postgres')
parser.add_argument('--host', default='127.0.0.1')
parser.add_argument('--port', default='5432')
parser.add_argument('--ddl', default='./DDL.sql')
parser.add_argument('--data', default='./data')

args = parser.parse_args()

db = args.name
user = args.user
pswd = args.pswd
host = args.host
port = args.port
ddl_path = args.ddl
data_path = args.data

item_file = open(data_path+'/items.csv')
item = csv.reader(item_file)
item_header = next(item)
item_rows = []
for row in item:
    new_row = []
    for i in range(len(row)):
        col = row[i]
        if(col == 'NULL'):
            new_row.append(None)
        else:
            try:
                temp = int(col)
                new_row.append(temp)
            except:
                new_row.append(col)
    item_rows.append(new_row)
item_file.close()

dish_file = open(data_path+'/dishes.csv')
dish = csv.reader(dish_file)
dish_header = next(dish)
dish_rows = []
for row in dish:
    new_row = []
    for i in range(len(row)):
        col = row[i]
        if(col == 'NULL'):
            new_row.append(None)
        else:
            try:
                temp = int(col)
                new_row.append(temp)
            except:
                new_row.append(col)
    dish_rows.append(new_row)
dish_file.close()

dish_items_file = open(data_path+'/dish_items.csv')
dish_items = csv.reader(dish_items_file)
dish_items_header = next(dish_items)
dish_items_rows = []
for row in dish_items:
    new_row = []
    for i in range(len(row)):
        col = row[i]
        if(col == 'NULL'):
            new_row.append(None)
        else:
            try:
                temp = int(col)
                new_row.append(temp)
            except:
                new_row.append(col)
    dish_items_rows.append(new_row)
dish_items_file.close()

table_file = open(data_path+'/table_status.csv')
table = csv.reader(table_file)
table_header = next(table)
table_rows = []
for row in table:
    new_row = []
    for i in range(len(row)):
        col = row[i]
        if(col == 'NULL'):
            new_row.append(None)
        else:
            try:
                temp = int(col)
                new_row.append(temp)
            except:
                new_row.append(col)
    table_rows.append(new_row)
table_file.close()

customer_file = open(data_path+'/customer.csv')
customer = csv.reader(customer_file)
customer_header = next(customer)
customer_rows = []
for row in customer:
    new_row = []
    for i in range(len(row)):
        col = row[i]
        if(col == 'NULL'):
            new_row.append(None)
        else:
            try:
                temp = int(col)
                new_row.append(temp)
            except:
                new_row.append(col)
    customer_rows.append(new_row)
customer_file.close()

# customer_type_file = open(data_path+'/customer_type.csv')
# customer_type = csv.reader(customer_type_file)
# customer_type_header = next(customer_type)
# customer_type_rows = []
# for row in customer_type:
#     new_row = []
#     for i in range(len(row)):
#         col = row[i]
#         if(col == 'NULL'):
#             new_row.append(None)
#         else:
#             try:
#                 temp = int(col)
#                 new_row.append(temp)
#             except:
#                 new_row.append(col)
#     customer_type_rows.append(new_row)
# customer_type_file.close()

area_file = open(data_path+'/area.csv')
area = csv.reader(area_file)
area_header = next(area)
area_rows = []
for row in area:
    new_row = []
    for i in range(len(row)):
        col = row[i]
        if(col == 'NULL'):
            new_row.append(None)
        else:
            try:
                temp = int(col)
                new_row.append(temp)
            except:
                new_row.append(col)
    area_rows.append(new_row)
area_file.close()

offer_file = open(data_path+'/offer.csv')
offer = csv.reader(offer_file)
offer_header = next(offer)
offer_rows = []
for row in offer:
    new_row = []
    for i in range(len(row)):
        col = row[i]
        if(col == 'NULL'):
            new_row.append(None)
        else:
            try:
                temp = int(col)
                new_row.append(temp)
            except:
                new_row.append(col)
    offer_rows.append(new_row)
offer_file.close()

offer_valid_file = open(data_path+'/offer_valid.csv')
offer_valid = csv.reader(offer_valid_file)
offer_valid_header = next(offer_valid)
offer_valid_rows = []
for row in offer_valid:
    new_row = []
    for i in range(len(row)):
        col = row[i]
        if(col == 'NULL'):
            new_row.append(None)
        else:
            try:
                temp = int(col)
                new_row.append(temp)
            except:
                new_row.append(col)
    offer_valid_rows.append(new_row)
offer_valid_file.close()

# day_file=open(data_path+'/day.csv')
# day=csv.reader(day_file)
# day_header=next(day)
# day_rows=[]
# for row in day:
#     new_row=[]
#     for i in range(len(row)):
#         col=row[i]
#         if(col=='NULL'):
#             new_row.append(None)
#         else:
#             try:
#                 temp=int(col)
#                 new_row.append(temp)
#             except:
#                 new_row.append(col)
#     day_rows.append(new_row)
# day_file.close()

employee_file = open(data_path+'/employee.csv')
employee = csv.reader(employee_file)
employee_header = next(employee)
employee_rows = []
for row in employee:
    new_row = []
    for i in range(len(row)):
        col = row[i]
        if(col == 'NULL'):
            new_row.append(None)
        else:
            try:
                temp = int(col)
                new_row.append(temp)
            except:
                new_row.append(col)
    employee_rows.append(new_row)
employee_file.close()

orders_file = open(data_path+'/orders.csv')
orders = csv.reader(orders_file)
orders_header = next(orders)
orders_rows = []
for row in orders:
    new_row = []
    for i in range(len(row)):
        col = row[i]
        if(col == 'NULL'):
            new_row.append(None)
        else:
            try:
                temp = int(col)
                new_row.append(temp)
            except:
                new_row.append(col)
    orders_rows.append(new_row)
orders_file.close()

order_dishes_file = open(data_path+'/order_dishes.csv')
order_dishes = csv.reader(order_dishes_file)
order_dishes_header = next(order_dishes)
order_dishes_rows = []
for row in order_dishes:
    new_row = []
    for i in range(len(row)):
        col = row[i]
        if(col == 'NULL'):
            new_row.append(None)
        else:
            try:
                temp = int(col)
                new_row.append(temp)
            except:
                new_row.append(col)
    order_dishes_rows.append(new_row)
order_dishes_file.close()

relations = ['item', 'dish', 'dish_items', 'table_status', 'area', 
             'customer', 'employee', 'offer', 'offer_valid', 'orders', 'order_dishes']
data = [item_rows, dish_rows, dish_items_rows, table_rows, area_rows, 
        customer_rows, employee_rows, offer_rows, offer_valid_rows, orders_rows, order_dishes_rows]
headers = [item_header, dish_header, dish_items_header, table_header, area_header, 
           customer_header, employee_header, offer_header, offer_valid_header, orders_header, order_dishes_header]

dsn = "dbname="+db+" user="+user + " host="+host+" password="+pswd

try:
    conn = pg.connect(dsn)
except:
    print('Error in connecting to database')
    exit()

sql1 = "insert into "
sql2 = " values %s"

num_relations = len(relations)

with conn:
    with conn.cursor() as c:
        # try:
            c.execute('set datestyle to "ISO, DMY";show datestyle;')
            c.execute(open(ddl_path, "r").read())
            for i in range(num_relations):
                temp_sql = sql1+relations[i]+'('
                for col_name in headers[i]:
                    temp_sql = temp_sql+col_name+','
                if(temp_sql[-1] == ','):
                    temp_sql = temp_sql[:-1]
                temp_sql = temp_sql+')'
                temp_sql = temp_sql+sql2
                # try:
                extras.execute_values(c, temp_sql, data[i])
        #         except:
        #             print(f"Insertion of relation {relations[i]} got error")
        #             break
        # except:
        #     print('Error in excuting ddl file')
    c.close()
conn.close()
