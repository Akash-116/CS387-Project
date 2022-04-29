import csv
import random

orders_file = open('orders.csv')
orders = orders_file.readlines()
num_orders = len(orders)-1
orders_file.close()

dish_file = open('dishes.csv')
dishes = dish_file.readlines()
num_dishes = len(dishes)-1
dish_file.close()

# offer_file=open('offer.csv')
# offers=offer_file.readlines()
# num_offers=len(offers)-1
# offer_file.close()

max_dishes_per_order = min(3, num_dishes)
max_amount_of_dish = 2
order_dishes_file = open('order_dishes.csv', 'w')
order_dishes_file.write('order_id,dish_id,quantity,rating\n')
max_rating = 5

D = range(1, num_dishes+1)
O = range(1, num_orders+1)
for i in O:
    k = random.randint(1, max_dishes_per_order)
    dishes_i = random.sample(D, k)
    for i_dish in dishes_i:
        quan = random.randint(1, max_amount_of_dish)
        rating_null = random.choice([True, False])
        if(rating_null):
            i_rating = "NULL"
        else:
            i_rating = random.randint(1, max_rating)
        order_dishes_file.write(
            str(i)+','+str(i_dish)+','+str(quan)+','+str(i_rating)+'\n')

order_dishes_file.close()
