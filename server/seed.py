from app import app
from models import db, Product, Service
from faker import Faker
# from random import choice as rc
import random

with app.app_context():
    faker =Faker()

    Product.query.delete()
    Service.query.delete()

    # products=[]
    # services=[]
    
    for _ in range(20):  # Generate 10 fake records for each class
        products = Product(
            name=faker.company(),
            description=faker.paragraph(),
            price=round(random.uniform(10.0, 100.0), 2),
            image_url=faker.image_url(),
            quantity_available=random.randint(1, 100)
        )
        products.append(products)
    db.session(products)
    db.session.commit()

    for _ in range(10):
        services = Service(
            name=faker.company(),
            description=faker.paragraph(),
            price=round(random.uniform(10.0, 100.0), 2),
            image_url=faker.image_url(),
            duration=random.randint(1, 10)
        )
        services.append(services)

    db.session(services)
    db.session.commit()

print('Seeded.')



