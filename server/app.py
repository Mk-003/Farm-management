from flask import Flask, request
from flask_migrate import Migrate
from flask_cors import CORS
from models import db




app=Flask(__name__)

CORS(app)

#configure a database connection to the local file farm.db
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///farm.db'

#disable modification tracking to use less memory
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']= False

#create  a migrate object to manage schema modifications
migrate =Migrate(app, db)

#initialize the Flask applicatuon to use the database
db.init_app(app)

@app.route('/')
def index():
    return '<h2> Welcome to Homepage</h2>'



@app.route('/test')
def test():
    return '<p>Test is Ok. </p>'



if __name__=='__main__':
    app.run(port=5555, debug=True)
