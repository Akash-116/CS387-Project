import csv
from os import stat
import random

customer_file=open('customer.csv')
customers=customer_file.readlines()
num_customers=len(customers)-1
customer_file.close()

table_file=open('table_Status.csv')
tables=table_file.readlines()
num_tables=len(tables)-1
table_file.close()

offer_file=open('offer.csv')
offers=offer_file.readlines()
num_offers=len(offers)-1
offer_file.close()

area_file=open('area.csv')
areas=area_file.readlines()
num_areas=len(areas)-1
area_file.close()

employee_file=open('employee.csv')
employee=csv.reader(employee_file)
employee_header=next(employee)
e_type_index=employee_header.index('e_type')
delivery_persons=[]
id=0
for row in employee:
    id=id+1
    if(row[e_type_index]=='Delivery'):
        delivery_persons.append(id)
employee_file.close()
num_delivers=len(delivery_persons)


orders_file=open('orders.csv','w')
orders_file.write('c_id,area_id,table_id,dat,received_time,finished_time,delivered_time,offer_id,delivery_person,status,order_type\n')

max_orders_per_customer=10
C=range(1,num_customers+1)
for i in C:
    c_id=random.randint(1,num_customers+1)
    k=random.randint(1,max_orders_per_customer)
    for j in range(k):
        dat_month = random.randint(1,12)
        dat_year = random.randint(2019,2021)
        if dat_month in [1,3,5,7,8,10,12]:
            dat_day = random.randint(1,31)
        elif dat_month in [4,6,9,11]:
            dat_day = random.randint(1,30)
        else:
            dat_day = random.randint(1,28)
        dat=str(dat_day).zfill(2)+'/'+str(dat_month).zfill(2)+'/'+str(dat_year)
        rt_h=random.randint(0,23)
        rt_m=random.randint(0,59)
        rt=str(rt_h).zfill(2)+':'+str(rt_m).zfill(2)+':00'
        # print(rt)
        ft_h=random.randint(rt_h,23)
        if rt_h == ft_h:
            ft_m=random.randint(rt_m,59)
        else:
            ft_m=random.randint(0,59)
        ft=str(ft_h).zfill(2)+':'+str(ft_m).zfill(2)+':00'
        dt_h=random.randint(ft_h,23)
        if dt_h == ft_h:
            dt_m=random.randint(ft_m,59)
        else:
            dt_m=random.randint(0,59)
        dt=str(dt_h).zfill(2)+':'+str(dt_m).zfill(2)+':00'
        offer_id = random.randint(1,num_offers)
        order_type=random.choice(["Online","Dine"])
        if order_type=="Online":
            deliver_p=random.randint(1,num_delivers)
            status=random.choice(['Preparing','Out for delivery','Delivered'])
            table_id="NULL"
            area_id="NULL"
        else:
            deliver_p="NULL"
            status=random.choice(['Preparing','Served'])
            table_id = random.randint(1,num_tables+1)
            area_id=random.randint(1,num_areas+1)

        orders_file.write(str(c_id)+','+str(area_id)+','+str(table_id)+','+dat+','+rt+','+ft+','+dt+','+str(offer_id)+','+str(deliver_p)+','+str(status)+','+str(order_type)+'\n')

        
orders_file.close()