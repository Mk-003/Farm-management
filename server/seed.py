from app import db, app
from models import Product,Service,Admin
from flask_bcrypt import Bcrypt

bcrypt = Bcrypt(app)

def seed_data():
    with app.app_context():

        print('Deleting existing products...')
        Product.query.delete()
        Service.query.delete()
        Admin.query.delete()


        print('Creating products...')

        seller_id = 1  # Set the seller_id to 1 for all products

        animal1 = Product( name='Dog Pro', pet='Dog', price=999, description='Premium Dog Pro, suitable for large breeds, with 128GB memory for training commands, Purple', image_url='https://i.pinimg.com/564x/46/4a/3c/464a3c2e8af440f769de8456976ffbc7.jpg', quantity_available=100,seller_id=seller_id)

        animal2 = Product(
        name='Cat Galaxy S20',
        pet='Cat',
        price=799,
        description='Advanced Cat Galaxy S20, 128GB memory, Cosmic Gray, perfect for tracking feline activities',
        image_url='https://i.pinimg.com/564x/e8/b2/7d/e8b27df6b3f8f76c569c1715297672d2.jpg',
        quantity_available=80,
        seller_id=seller_id
        )

        animal3 = Product(
        name='Cat Pixel 5',
        pet='Cat',
        price=699,
        description='Google Cat Pixel 7a, 128GB, Just Black, designed for monitoring and entertaining your cat',
        image_url='https://i.pinimg.com/564x/df/c7/24/dfc72427002660c11845df1c3e6cf43b.jpg',
        quantity_available=120,
        seller_id=seller_id
        )
        
        animal4 = Product(
        name='Dog 9 Pro',
        pet='Dog',
        price=899,description='OnePlus Dog 9 Pro, 256GB, Morning Mist, ideal for active dogs, comes with training features',image_url='https://i.pinimg.com/564x/a2/c9/61/a2c9612d875b39b0d899598b67dc415d.jpg',quantity_available=90, seller_id=seller_id)

    


        animal5 = Product(name='Bird Air',pet='Bird', price=499, description='Bird Air, lightweight and spacious cage with advanced feeding system, perfect for small birds',image_url='https://i.pinimg.com/564x/9e/2a/4c/9e2a4c2e8a7844e769fe8456977ffbc7.jpg',quantity_available=150,seller_id=seller_id)

        animal6 = Product(name='Rabbit Hutch Plus',pet='Rabbit',price=299,description='Rabbit Hutch Plus, sturdy outdoor hutch with integrated play area and easy clean features', image_url='https://i.pinimg.com/564x/8b/4b/7e/8b4b7e6b8f8f76c569c1715298772d2.jpg',quantity_available=60,seller_id=seller_id)

        animal7 = Product(name='Fish Tank Ultra',pet='Fish',price=199,description='Fish Tank Ultra, 50-gallon aquarium with LED lighting and advanced filtration system', image_url='https://i.pinimg.com/564x/df/a7/24/dfa72427002660c11845df1c3e6cf43b.jpg', quantity_available=80, seller_id=seller_id)  

        animal8 = Product(name='Hamster Wheel 3000',pet='Hamster',price=49,description='Hamster Wheel 3000, ultra-quiet exercise wheel with adjustable speed settings, suitable for all hamsters',image_url='https://i.pinimg.com/564x/a2/d9/61/a2d9612d875b39b0d899598b67dc415d.jpg',quantity_available=200,seller_id=seller_id)

        animal9 = Product(name='Reptile Terrarium Pro',pet='Reptile',price=349, description='Reptile Terrarium Pro, spacious habitat with temperature control and naturalistic decor for reptiles',image_url='https://i.pinimg.com/564x/c3/b3/8d/c3b38d8f89b3f8c569c1715297672d3.jpg',quantity_available=70, seller_id=seller_id)

        animal10 = Product(name='Parrot Perch Elite',pet='Parrot',price=159,description='Parrot Perch Elite, adjustable and comfortable perch with toys and feeding station for parrots',image_url='https://i.pinimg.com/564x/d4/b2/7e/d4b27e6b8f8f76c569c1715297672d3.jpg',quantity_available=90,seller_id=seller_id)

        animal11 = Product( name='Turtle Dock Supreme', pet='Turtle', price=99, description='Turtle Dock Supreme, floating dock with ramp and basking area, ideal for aquatic turtles', image_url='https://i.pinimg.com/564x/e5/c3/48/e5c3482d874f440f769de8456976ffb7.jpg', quantity_available=110, seller_id=seller_id )

        animal12 = Product(name='Ferret Fun House',pet='Ferret',price=249, description='Ferret Fun House, multi-level cage with tunnels and toys for active ferrets', image_url='https://i.pinimg.com/564x/f6/d2/49/f6d2492e874f440f769de8456976ffb7.jpg', quantity_available=50, seller_id=seller_id )

# Adding the initial four products to complete the list
        animal13 = Product(name='Dog Pro',pet='Dog',price=999, description='Premium Dog Pro, suitable for large breeds, with 128GB memory for training commands, Purple',  image_url='https://i.pinimg.com/564x/46/4a/3c/464a3c2e8af440f769de8456976ffbc7.jpg',  quantity_available=100,   seller_id=seller_id)

        animal14 = Product(  name='Cat Galaxy S20',  pet='Cat',  price=799,  description='Advanced Cat Galaxy S20, 128GB memory, Cosmic Gray, perfect for tracking feline activities',  image_url='https://i.pinimg.com/564x/e8/b2/7d/e8b27df6b3f8f76c569c1715297672d2.jpg',  quantity_available=80,  seller_id=seller_id)

        animal15 = Product( name='Cat Pixel 5', pet='Cat', price=699, description='Google Cat Pixel 7a, 128GB, Just Black, designed for monitoring and entertaining your cat',image_url='https://i.pinimg.com/564x/df/c7/24/dfc72427002660c11845df1c3e6cf43b.jpg',quantity_available=120,seller_id=seller_id)

        animal16 = Product(  name='Dog 9 Pro',  pet='Dog',  price=899,  description='OnePlus Dog 9 Pro, 256GB, Morning Mist, ideal for active dogs, comes with training features',  image_url='https://i.pinimg.com/564x/a2/c9/61/a2c9612d875b39b0d899598b67dc415d.jpg', quantity_available=90,seller_id=seller_id)
        service1 = Service( name='Dog Pro Training', pet='Dog', price=1799,description='Professional Dog Training, comprehensive program for obedience and behavior, 110 days',  image_url='https://i.pinimg.com/736x/69/d5/44/69d544b42b46e696650e07ddef8bd28e.jpg',  duration=110,  seller_id=seller_id )

        service2 = Service( name='Cat Grooming Deluxe',pet='Cat',price=1499,description='Deluxe Cat Grooming, full grooming session including bath, haircut, and nail trim, 95 minutes',image_url='https://i.pinimg.com/564x/e7/f8/01/e7f801cef4b945026ee53d3d8ebc3906.jpg',  duration=95, seller_id=seller_id) 

        service3 = Service( name='Cat Boarding Premium', pet='Cat', price=1299, description='Premium Cat Boarding, luxury suite with daily activities and personalized care, 30 days',image_url='https://i.pinimg.com/564x/1a/c6/81/1ac681ab418ea8dfd00e37c3b2580fe1.jpg',duration=125,seller_id=seller_id)

        service4 = Service(   name='Dog Walking Plus', pet='Dog', price=1399,  description='Plus Dog Walking, extended walk with playtime and socialization, 105 minutes', image_url='https://i.pinimg.com/564x/d7/10/f1/d710f17efbfcaa72651a2c6930c5e0ad.jpg',    duration=105,   seller_id=seller_id)

        service5 = Service(   name='Bird Sitting Service',   pet='Bird',   price=499,   description='Professional Bird Sitting, daily care and interaction while you are away, 7 days',   image_url='https://i.pinimg.com/564x/3a/2b/4c/3a2b4c28d8a748fb8a7c5d0b8b4e1f4b.jpg',   duration=7, seller_id=seller_id )

        service6 = Service(  name='Rabbit Health Check', pet='Rabbit',  price=299,  description='Comprehensive Rabbit Health Check, includes examination and dietary advice, 60 minutes', image_url='https://i.pinimg.com/564x/4b/5d/6e/4b5d6e7a8f8e4d7f8e4d5e8e4d5e8e7e.jpg', duration=60,seller_id=seller_id )

        service7 = Service( name='Fish Tank Maintenance', pet='Fish', price=199, description='Fish Tank Maintenance, professional cleaning and water quality check, monthly service', image_url='https://i.pinimg.com/564x/5c/7e/8f/5c7e8f8e4d8f5e7f8e4d5e8e4d5e8f8e.jpg', duration=30, seller_id=seller_id )

        service8 = Service(name='Hamster Cage Cleaning',pet='Hamster',price=49,description='Hamster Cage Cleaning, thorough cleaning and fresh bedding replacement, 30 minutes',image_url='https://i.pinimg.com/564x/6d/8f/9e/6d8f9e8e7f9e6e7f8f7e8e6f8e7e8f8e.jpg',duration=30,seller_id=seller_id )

        service9 = Service(  name='Reptile Habitat Setup',  pet='Reptile',  price=349,  description='Reptile Habitat Setup, customized enclosure setup with temperature and humidity control, 2 hours',  image_url='https://i.pinimg.com/564x/7e/9f/ae/7e9fae8e9fae8e7f9f8e7f8e7f8e7f8e.jpg',duration=120,   seller_id=seller_id   ) 

        service10 = Service( name='Parrot Training Workshop', pet='Parrot', price=159, description='Parrot Training Workshop, interactive session to teach tricks and commands, 90 minutes', image_url='https://i.pinimg.com/564x/8f/ae/be/8faebe8e7fae8e7f9f8e7fae8e7fae8e.jpg', duration=90, seller_id=seller_id)

        service11 = Service(name='Turtle Care Service', pet='Turtle',price=99,description='Turtle Care Service, includes shell cleaning and habitat maintenance, 45 minutes',image_url='https://i.pinimg.com/564x/9e/bf/cf/9ebfcf8e7f9e8e7f9f8e7f9e8e7f8e7f.jpg',duration=45, seller_id=seller_id )

        service12 = Service(name='Ferret Playtime Package',pet='Ferret',price=249,description='Ferret Playtime Package, daily play sessions with toys and activities, 15 days',image_url='https://i.pinimg.com/564x/a1/bf/d0/a1bfd08e8e7f8e7f8e7f8e7f8e7f8e7f.jpg',duration=15,seller_id=seller_id)


        admin1 = Admin(username='MacBook Pro', email="jondoe@gmail.com", password=bcrypt.generate_password_hash('Applecider'), role='admin')
        admin2 = Admin(username='Mac Bouy', email="markdoe@gmail.com", password=bcrypt.generate_password_hash('Applecider'), role='admin')

        
        admins = [admin1, admin2]
        products = [animal1, animal2, animal3, animal4,animal5,animal6,animal7,animal8,animal9,animal10,animal11,animal12,animal13,animal14,animal15,animal16]
        services = [service1,service2,service3,service4,service5,service6,service7,service8,service9,service10,service11,service12]

        # Combine all the objects into a single iterable
        objects_to_add = admins + products + services

        # Add all objects to the session
        db.session.add_all(objects_to_add)

        # Commit the changes
        db.session.commit()


        print('Successfully created products')

if __name__ == '__main__':
    seed_data()
