from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData


metadata =MetaData()

db =SQLAlchemy(metadata=metadata)


class Employee(db.Model):
    __tablename__ = 'employees'

    id=db.Column(db.Integer, primary_key=True)
    name=db.Column(db.String)
    age=db.Column(db.Integer)


# if __name__=='__main__':
#     app.run(port=5555, debug=True)