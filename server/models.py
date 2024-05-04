from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData


metadata =MetaData()

db =SQLAlchemy(metadata=metadata)


class Employee(db.Model):
    __tablename__ = 'employees'

    id=db.Column(db.Integer, primary_key=True)
    name=db.Column(db.String)
    age=db.Column(db.Integer)
    salary=db.Column(db.Integer)

    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def __repr__(self):
        return f'<Employee {self.id}, {self.name}, {self.age}>'


class Department(db.Model):
    __tablename__ = 'departments'

    id=db.Column(db.Integer, primary_value=True)
    name=db.Column(db.Integer, nullable=False)
    location=db.Column(db.String)

    def __repr__(self):
        return f'<Department {self.name}, {self.location}>'
    

# if __name__=='__main__':
#     app.run(port=5555, debug=True)