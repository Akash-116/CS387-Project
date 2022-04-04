import csv
from datetime import date
import random

def gen_random_date():
    dat_month = random.randint(1,12)
    dat_year = random.randint(2019,2021)
    if dat_month in [1,3,5,7,8,10,12]:
        dat_day = random.randint(1,31)
    elif dat_month in [4,6,9,11]:
        dat_day = random.randint(1,30)
    else:
        dat_day = random.randint(1,28)
    dat=str(dat_day).zfill(2)+'/'+str(dat_month).zfill(2)+'/'+str(dat_year)
    return dat

offer_file=open('offer.csv')
offers=offer_file.readlines()
num_offers=len(offers)-1
offer_file.close()

dish_file=open('dishes.csv')
dishes=dish_file.readlines()
num_dishes=len(dishes)-1
dish_file.close()

cus_type_file=open('customer_type.csv')
cus_types=cus_type_file.readlines()
num_cus_types=len(cus_types)-1
cus_type_file.close()

max_dates_per_offer=5
max_cus_types_per_offer=min(num_cus_types,2)
max_dishes_per_offer=min(num_dishes,8)

offer_valid_file=open('offer_valid.csv','w')
offer_valid_file.write('offer_id,dat,dish_id,c_type_id\n')

D=range(1,num_dishes+1)
C_T=range(1,num_cus_types+1)
O=range(1,num_offers+1)
for i in O:
    dat_null=random.choice([True,False])
    if(dat_null):
        i_dates=["NULL"]
    else:
        i_num_date=random.randint(1,max_dates_per_offer)
        i_dates=[]
        for j in range(i_num_date):
            i_dates.append(gen_random_date())
    for i_date in i_dates:
        dish_null=random.choice([True,False])
        if(dish_null):
            i_dishes=["NULL"]
        else:
            i_num_dish=random.randint(1,max_dishes_per_offer)
            i_dishes=random.sample(D,i_num_dish)
        for i_dish in i_dishes:
            cus_type_null=random.choice([True,False])
            if(cus_type_null):
                i_cus_types=["NULL"]
            else:
                i_num_cus_types=random.randint(1,max_cus_types_per_offer)
                i_cus_types=random.sample(C_T,i_num_cus_types)
            for i_cus_type in i_cus_types:
                offer_valid_file.write(str(i)+','+str(i_date)+','+str(i_dish)+','+str(i_cus_type)+'\n')

offer_valid_file.close()