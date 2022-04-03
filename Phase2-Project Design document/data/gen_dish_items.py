import csv
import random

item_file=open('items.csv')
items=item_file.readlines()
num_items=len(items)-1
item_file.close()

dish_file=open('dishes.csv')
dishes=dish_file.readlines()
num_dishes=len(dishes)-1
dish_file.close()

max_item_per_dish=min(10,num_items)
max_amount_item=10

dish_item_file=open('dish_items.csv','w')
dish_item_file.write('dish_id,item_id,quantity\n')

D=range(1,num_dishes+1)
I=range(1,num_items+1)
for i in D:
    k=random.randint(1,max_item_per_dish)
    dish_i_items=random.sample(I,k)
    for i_item in dish_i_items:
        quan=random.randint(1,max_amount_item)
        dish_item_file.write(str(i)+','+str(i_item)+','+str(quan)+'\n')

dish_item_file.close()