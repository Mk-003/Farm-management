from flask import Flask, jsonify, request, make_response
from flask_restful import Api, Resource
from flask_cors import CORS, cross_origin
from models import db, User,Admin, Product, Service, ProductOrder, ServiceOrder, ServiceOrderItem, ProductOrderItem
from flask_migrate import Migrate
from datetime import datetime
from sqlalchemy.orm import sessionmaker
from flask_jwt_extended import JWTManager, jwt_required, get_jwt_identity, create_access_token, get_jwt
from flask_bcrypt import Bcrypt
from functools import wraps


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

CORS(app)

migrate = Migrate(app, db)

db.init_app(app)

api = Api(app)

bcrypt = Bcrypt(app)

app.secret_key = 'secret key'
app.config['JWT_SECRET_KEY'] = 'this-is-secret-key'

jwt = JWTManager(app)

revoked_tokens = set()


# Decorator for admin-only access
# def admin_required(fn):
#     @wraps(fn)
#     def wrapper(*args, **kwargs):
#         current_user = get_jwt_identity()
#         if current_user.get('role') != 'admin':
#             return jsonify({'error': 'Unauthorized'}), 403
#         return fn(*args, **kwargs)
#     return wrapper

# User Registration




class UserRegister(Resource):
    @cross_origin()
    def post(self):
        data = request.get_json(force=True)

        username = data.get('username')
        email = data.get('email')
        phone_number = data.get('phone_number')
        password = data.get('password')
        confirm_password = data.get('confirm_password')

        user_exists = User.query.filter_by(username=username).first()

        if user_exists:
            return jsonify({'error': 'User already exists'}), 409
        
        if password != confirm_password:
            return jsonify({'Error': 'Passwords not matching'}), 400
        
        hashed_pw = bcrypt.generate_password_hash(password.encode('utf-8'))

        new_user = User(
            username=username,
            email=email, 
            phone_number=phone_number, 
            password=hashed_pw,
            role='user'
        )

        db.session.add(new_user)
        db.session.commit()

        return jsonify({
            "id": new_user.id,
            "username": new_user.username,
            "email": new_user.email,
            'phone_number': new_user.phone_number,
        }), 201

api.add_resource(UserRegister, '/userRegister')


# User Login
class UserLogin(Resource):
    @cross_origin()
    def post(self):
        data = request.get_json(force=True)

        username = data.get('username')
        password = data.get('password')

        user = User.query.filter_by(username=username).first()

        if user is None:
            return jsonify({'error': 'Unauthorized'}), 401
        
        if not bcrypt.check_password_hash(user.password, password):
            return jsonify({'error': 'Unauthorized, incorrect password'}), 401
        
        # Generate access token with role included
        access_token = create_access_token(identity={'username': username, 'role': 'user'})

        return jsonify({
            "id": user.id,
            "username": user.username,
            "access_token": access_token
        }), 201

api.add_resource(UserLogin, '/user/login')

# Admin Login
class AdminLogin(Resource):
    @cross_origin()
    def post(self):
        data = request.get_json(force=True)

        username = data.get('username')
        password = data.get('password')

        # Checks if the admin exists in the Admin Table
        admin = Admin.query.filter_by(username=username).first()

        if admin is None:
            return jsonify({'error': 'Unauthorized'}), 401
        
        if not bcrypt.check_password_hash(admin.password, password):
            return jsonify({'error': 'Unauthorized, incorrect password'}), 401
        
        # Generate access token with role included
        access_token = create_access_token(identity={'username': username, 'role': 'admin'})

        return jsonify({
            "id": admin.id,
            "username": admin.username,
            "access_token": access_token
        }), 201

api.add_resource(AdminLogin, '/admin/login')


# User Logout
class UserLogout(Resource):
    @jwt_required()  # Requires a valid access token to access this endpoint
    def post(self):
        try:
            # No need to retrieve raw JWT token, as jwt_required ensures a valid token
            # Revoke the current access token directly
            jti = get_jwt()["jti"]
            revoked_tokens.add(jti)

            return jsonify({'message': 'User Logout successful'}), 200
        except Exception as e:
            print(f"Error occurred during logout: {e}")
            return jsonify({'error': 'An unexpected error occurred'}), 500

api.add_resource(UserLogout, '/userLogout')


# Admin Logout
class AdminLogout(Resource):
    @jwt_required()  # Requires a valid access token to access this endpoint
    def post(self):
        try:
            # Get the raw JWT token (access token)
            jti = get_jwt()["jti"]
            revoked_tokens.add(jti)

            return jsonify({'message': 'Admin logout successful'}), 200
        except Exception as e:
            print(f"Error occurred during admin logout: {e}")
            return jsonify({'error': 'An unexpected error occurred'}), 500

api.add_resource(AdminLogout, '/adminLogout')

@app.route('/users/<int:id>', methods=["GET", "PATCH"])
def get_and_update_user_info_by_id(id):
    session = db.session()
    user = session.get(User,id)

    if request.method == 'GET':
        if not user:
            return jsonify({'error': 'Item not found'}), 404
        return jsonify(user.to_dict()), 200
    
    if request.method == 'PATCH':
        data = request.json7

        if not data:
            return jsonify({'error': 'No data provided for update'}), 401
        
        if not user:
            return jsonify({'error': 'Item not found'}), 404
        
        for key, value in data.items():
            setattr(user, key, value)

        try:
            db.session.commit()
            return jsonify(user.to_dict()), 200
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': f'Failed to update item: {str(e)}'}), 500
        
@app.route('/admins/<int:id>', methods=["GET", "PATCH"])
def get_and_update_admin_info_by_id(id):
    session = db.session()
    admin = session.get(Admin,id)

    if request.method == 'GET':
        if not admin:
            return jsonify({'error': 'Item not found'}), 404
        return jsonify(admin.to_dict()), 200
    
    if request.method == 'PATCH':
        data = request.json7

        if not data:
            return jsonify({'error': 'No data provided for update'}), 401
        
        if not admin:
            return jsonify({'error': 'Item not found'}), 404
        
        for key, value in data.items():
            setattr(admin, key, value)

        try:
            db.session.commit()
            return jsonify(admin.to_dict()), 200
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': f'Failed to update item: {str(e)}'}), 500

# Client side

@app.route('/userproducts', methods=['GET'])
def get_user_products():
    products = Product.query.all()

    if request.method == 'GET':
        return jsonify({product.to_dict for product in products}), 200
    
@app.route('/userservices', methods=['GET'])
def get_user_services():
    services = Service.query.all()

    if request.method == 'GET':
        return jsonify({service.to_dict for service in services}), 200


class ProductOrders(Resource):
    @jwt_required()
    def get(self):
        #current_user_id = get_jwt_identity()
        orders = ProductOrder.query.all()

        aggregated_orders = []

        for order in orders:
            order_details = {
                'order_id': order.id,
                'status': order.status,
                'total_price': float(sum(item.product.price * item.quantity for item in order.order_items)),
                'products': [{'name': item.product.name, 'quantity': item.quantity, 'image':item.product.image_url, 'price':item.product.price} for item in order.order_items]
            }
            aggregated_orders.append(order_details)

       # print(aggregated_orders)
        
        return make_response(aggregated_orders, 200)

    @jwt_required()
    def post(self):

        data = request.json
        current_user_id = get_jwt_identity()

        try:
            new_order = ProductOrder(
                user_id=current_user_id,
                total_price=data["total"],
                status="pending"
            )
            # incase of a list of items 
            for item in data["items"]:
                order_item = ProductOrderItem(
                    product_id=item["id"],
                    quantity=item["quantity"]
                )
                new_order.order_items.append(order_item)

            db.session.add(new_order)
            db.session.commit()

            print("This is the new order", new_order)
            return make_response(new_order.to_dict(only=("id","status", "total_price")), 201)

        except Exception as e:
            db.session.rollback()
            return make_response(jsonify({"error": str(e)}), 400) 
        
api.add_resource(ProductOrders,"/productorders")


class ServiceOrders(Resource):
    @jwt_required()
    def get(self):
        #current_user_id = get_jwt_identity()
        orders = ServiceOrder.query.all()

        aggregated_orders = []

        for order in orders:
            order_details = {
                'order_id': order.id,
                'status': order.status,
                'total_price': float(sum(item.product.price * item.quantity for item in order.order_items)),
                'products': [{'name': item.product.name, 'quantity': item.quantity, 'image':item.product.image_url, 'price':item.product.price} for item in order.order_items]
            }
            aggregated_orders.append(order_details)

       # print(aggregated_orders)
        
        return make_response(aggregated_orders, 200)

    @jwt_required()
    def post(self):

        data = request.json
        current_user_id = get_jwt_identity()

        try:
            new_order = ServiceOrder(
                user_id=current_user_id,
                total_price=data["total"],
                status="pending"
            )
            # incase of a list of items 
            for item in data["items"]:
                order_item = ServiceOrderItem(
                    product_id=item["id"],
                    quantity=item["quantity"]
                )
                new_order.order_items.append(order_item)

            db.session.add(new_order)
            db.session.commit()

            print("This is the new order", new_order)
            return make_response(new_order.to_dict(only=("id","status", "total_price")), 201)

        except Exception as e:
            db.session.rollback()
            return make_response(jsonify({"error": str(e)}), 400) 
        
api.add_resource(ServiceOrders,"/serviceorders")


# Admin Side
@app.route('/adminproducts', methods=['GET','POST'])
def get_post_update_and_delete_products():
    products = Product.query.all()

    if request.method == 'GET':
        return jsonify({product.to_dict for product in products}), 200
    
    if request.method == 'POST':
        data = request.json

        if not data:
            return jsonify({'error': 'No data provided for create'}), 400
        
        # Input validation
        required_fields = ['name', 'description', 'price', 'image_url', 'quantity_available']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'Missing required field: {field}'}), 400

        name = data.get('name')
        description = data.get('description')
        price = data.get('price')
        image_url = data.get('image_url')
        quantity_available = data.get('quantity_available')

        new_product = Product(
            name=name,
            description=description,
            price=price,
            image_url=image_url,
            quantity_available=quantity_available,
        )

        try:
            db.session.add(new_product)
            db.session.commit()
            return jsonify(new_product.to_dict()), 200
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': f'Failed to create product: {str(e)}'}), 500
        
@app.route('/adminproducts/<int:id>', methods=['GET','PATCH','DELETE'])
def get_update_and_delete_products(id):
    session = db.session()
    product = session.get(Product, id)

    if request.method == 'GET':
        if not product:
            return jsonify({'error': 'Product not found'}), 404
        return jsonify(product.to_dict()), 200
    
    elif request.method == 'PATCH':
        data = request.json

        if not data:
            return jsonify({'error': 'No data provided for update'}), 401

        if not product:
            return jsonify({'error': 'Item not found'}), 404
        
    
        for key, value in data.items():
            setattr(product, key, value)

        try:
            db.session.commit()
            return jsonify(product.to_dict()), 200
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': f'Failed to update product: {str(e)}'}), 500
        
    elif request.method == 'DELETE':
        if not product:
            return jsonify({'error': 'Product not found'}), 404

        try:
            db.session.delete(product)
            db.session.commit()
            return jsonify({'message': 'Product deleted successfully'}), 200
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': f'Failed to delete product: {str(e)}'}), 500



        
@app.route('/adminservices', methods=['GET','POST'])
def get_post_update_and_delete_services():
    services = Service.query.all()

    if request.method == 'GET':
        return jsonify({service.to_dict for service in services}), 200
    
    if request.method == 'POST':
        data = request.json

        if not data:
            return jsonify({'error': 'No data provided for create'}), 400
        
        # Input validation
        required_fields = ['name', 'description', 'price', 'image_url', 'duration']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'Missing required field: {field}'}), 400

        name = data.get('name')
        description = data.get('description')
        price = data.get('price')
        image_url = data.get('image_url')
        duration = data.get('duration')

        new_service = Service(
            name=name,
            description=description,
            price=price,
            image_url=image_url,
            duration=duration,
        )

        try:
            db.session.add(new_service)
            db.session.commit()
            return jsonify(new_service.to_dict()), 200
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': f'Failed to create service: {str(e)}'}), 500
        
@app.route('/adminservices/<int:id>', methods=['GET','PATCH','DELETE'])
def get_update_and_delete_services(id):
    session = db.session()
    service = session.get(Service, id)

    if request.method == 'GET':
        if not service:
            return jsonify({'error': 'Service not found'}), 404
        return jsonify(service.to_dict()), 200
    
    elif request.method == 'PATCH':
        data = request.json

        if not data:
            return jsonify({'error': 'No data provided for update'}), 401

        if not service:
            return jsonify({'error': 'Service not found'}), 404
        
    
        for key, value in data.items():
            setattr(service, key, value)

        try:
            db.session.commit()
            return jsonify(service.to_dict()), 200
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': f'Failed to update service: {str(e)}'}), 500
        
    elif request.method == 'DELETE':
        if not service:
            return jsonify({'error': 'Service not found'}), 404

        try:
            db.session.delete(service)
            db.session.commit()
            return jsonify({'message': 'Service deleted successfully'}), 200
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': f'Failed to delete service: {str(e)}'}), 500


class AdminProductOrders(Resource):
    def get(self):
        try:
            orders = ProductOrder.query.all()

            orders_data = []
            for order in orders:
                order_info = {
                    'order_id': order.id,
                    'total_price': order.total_price,
                    'user_id': order.user_id,
                    'status': order.status,
                    'items': []
                }

                # Eager loading to retrieve order items
                order_items = ProductOrderItem.query.filter_by(product_order_id=order.id).all()
                for item in order_items:
                    order_info['items'].append({
                        'product_name': item.product.name,
                        'quantity': item.quantity,
                        'product_price': item.product.price,
                        'product_id': item.product.id
                    })

                orders_data.append(order_info)

            return jsonify(orders_data), 200
        except Exception as e:
            return {'message': 'Failed to fetch product orders', 'error': str(e)}, 500

api.add_resource(AdminProductOrders, '/adminProductOrders')

class AdminServiceOrders(Resource):
    def get(self):
        try:
            orders = ServiceOrder.query.all()

            orders_data = []
            for order in orders:
                order_info = {
                    'order_id': order.id,
                    'total_price': order.total_price,
                    'user_id': order.user_id,
                    'status': order.status,
                    'items': []
                }

                # Eager loading to retrieve order items
                order_items = ServiceOrderItem.query.filter_by(service_order_id=order.id).all()
                for item in order_items:
                    order_info['items'].append({
                        'service_name': item.service.name,
                        'quantity': item.quantity,
                        'service_price': item.service.price,
                        'service_id': item.service.id
                    })

                orders_data.append(order_info)

            return jsonify(orders_data), 200
        except Exception as e:
            return {'message': 'Failed to fetch service orders', 'error': str(e)}, 500

api.add_resource(AdminServiceOrders, '/adminServiceOrders')



if __name__ == '__main__':
    app.run(port=5555, debug=True)
