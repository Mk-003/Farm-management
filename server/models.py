from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin

metadata = MetaData()
db = SQLAlchemy(metadata=metadata)

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String, nullable=False)
    role = db.Column(db.String, nullable=False)  # 'admin/shop' or 'client/customer'
    
    # Define the relationship between User and Product models
    products = db.relationship('Product', backref='seller', lazy=True, cascade="all, delete-orphan")
    user_orders = db.relationship('Order', backref='user', lazy=True, cascade="all, delete-orphan")
    
    # Define serialization rules
    serialize_rules = {'exclude': ['user_orders.user', 'user_orders.product']}

    # Define a validator for the password column
    @validates('password')
    def validate_password(self, key, password):
        if len(password) < 8:
            raise ValueError('Password must be more than 8 characters.')
        return password
    
    # Define a validator for the email column
    @validates('email')
    def validate_email(self, key, email):
        if not email.endswith("@gmail.com"):
            raise ValueError("Email is not valid. It should end with @gmail.com")
        return email

    def __repr__(self) -> str:
        return f'<User {self.email} of role {self.role}>'

class Product(db.Model, SerializerMixin):
    __tablename__ = 'products'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.Text, nullable=False)
    price = db.Column(db.Float, nullable=False)
    image_url = db.Column(db.String, nullable=False)
    quantity_available = db.Column(db.Integer, nullable=False)
    vet_specific_field = db.Column(db.String)
    # Define the foreign key for the seller_id column
    seller_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    
# Define the relationship between Product and OrderItem models
    order_items = db.relationship('OrderItem', backref='ordered_product', lazy=True, cascade="all, delete-orphan")

    serialize_rules = {'exclude': ['order_items.product', 'order_items.user']}

    def __repr__(self):
        return f'<Product {self.name} from seller {self.seller_id}>'

class Order(db.Model, SerializerMixin):
    __tablename__ = 'orders'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    # Define the relationship with OrderItem, specifying the backref
    order_items = db.relationship('OrderItem', back_populates='order', lazy=True, cascade="all, delete-orphan")

    serialize_rules = {'exclude': ['user.orders', 'product.orders']}

    def __repr__(self):
        return f'<Order {self.id}>'


class OrderItem(db.Model, SerializerMixin):
    __tablename__ = 'order_items'

    id = db.Column(db.Integer, primary_key=True)
    quantity = db.Column(db.Integer, nullable=False)

    order_id = db.Column(db.Integer, db.ForeignKey('orders.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)

    # Define the relationship with Order, specifying the backref
    order = db.relationship('Order', back_populates='order_items', lazy=True)
    product = db.relationship('Product', backref='ordered_products')

    serialize_rules = {'exclude': ['product.order_items', 'order.order_items']}

    def __repr__(self):
        return f'<OrderItem {self.id}>'
