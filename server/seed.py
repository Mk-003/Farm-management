from app import db, app
from models import Product
from faker import Faker

def generate_fake_vet_product(fake, seller_id=1):
    name = fake.word() + " for Vets"  # Adjust product name to indicate it's for vets
    price = fake.random_int(min=50, max=2000)
    description = fake.sentence(nb_words=6)
    image_url = fake.image_url()
    quantity_available = fake.random_int(min=10, max=200)
    # Additional fields specific to vet products
    vet_specific_field = fake.word()  # Example additional field
    return Product(name=name, price=price, description=description, image_url=image_url, quantity_available=quantity_available, seller_id=seller_id, vet_specific_field=vet_specific_field)

def seed_data():
    with app.app_context():
        fake = Faker()
        print('Deleting existing vet products...')  # Update the print statement
        Product.query.delete()

        print('Creating vet products...')  # Update the print statement
        vet_products = []  # Rename the variable to indicate vet products
        for _ in range(200):
            product = generate_fake_vet_product(fake)
            vet_products.append(product)  # Append to vet_products list

        db.session.add_all(vet_products)  # Add vet_products list to the session
        db.session.commit()

        print('Successfully created vet products')  # Update the print statement

if __name__ == '__main__':
    seed_data()
