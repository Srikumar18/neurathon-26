from flask_pymongo import PyMongo


mongo = PyMongo()

def connectDB(app):
    mongo.init_app(app)
    print("Mongo DB connected")