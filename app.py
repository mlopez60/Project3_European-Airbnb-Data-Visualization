# example
from flask import Flask, render_template, jsonify
import sqlite3
import csv

app = Flask(__name__)

# Function to create a new database and table if they don't exist
def create_table():
    conn = sqlite3.connect('data.db')
    cursor = conn.cursor()
    
    # Drop the table if it exists
    cursor.execute('DROP TABLE IF EXISTS data')
    
    # Create a new table
    cursor.execute('''CREATE TABLE data
                      (city VARCHAR,
                       rental_period VARCHAR,
                       id DECIMAL,
                       rental_price DECIMAL,
                       room_type VARCHAR,
                       room_shared BOOLEAN,
                       room_private BOOLEAN,
                       person_capacity DECIMAL,
                       host_is_superhost BOOLEAN,
                       multi BOOLEAN,
                       biz BOOLEAN,
                       cleanliness_rating DECIMAL,
                       guest_satisfaction_overall DECIMAL,
                       bedrooms DECIMAL,
                       dist DECIMAL,
                       metro_dist DECIMAL,
                       attr_index DECIMAL,
                       attr_index_norm DECIMAL,
                       rest_index DECIMAL,
                       rest_index_norm DECIMAL,
                       lng DECIMAL,
                       lat DECIMAL)''')
    
    conn.commit()
    conn.close()

# Function to insert dummy data into the database
def insert_dummy_data():
    with open('Resources/rental_data.csv', 'r') as fin:
        dr = csv.DictReader(fin)
        airbnbdata = [(i['city'], i['rental_period'],i['id'], i['rental_price'], i['room_type'], i['room_shared'], i['room_private'], i['person_capacity'], i['host_is_superhost'], i['multi'], i['biz'], i['cleanliness_rating'], i['guest_satisfaction_overall'], i['bedrooms'], i['dist'], i['metro_dist'], i['attr_index'], i['attr_index_norm'], i['rest_index'], i['rest_index_norm'], i['lng'], i['lat']) for i in dr]
        # print(airbnbdata).columns

    conn = sqlite3.connect('data.db')
    cursor = conn.cursor()
    # update below
    cursor.executemany("INSERT INTO data (city, rental_period, id, rental_price, room_type, room_shared, room_private, person_capacity, host_is_superhost, multi, biz, cleanliness_rating, guest_satisfaction_overall,bedrooms, dist, metro_dist, attr_index, attr_index_norm, rest_index, rest_index_norm, lng, lat) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);", airbnbdata)
    conn.commit()
    conn.close()

@app.route('/')
def homepage():
    return render_template('home.html')

@app.route('/backend')
def backend():
    return render_template('backend.html')

@app.route('/visuals')
def index():
    return render_template('index.html')

@app.route('/data')
def get_data():
    conn = sqlite3.connect('data.db')
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM data')
    data = cursor.fetchall()
    conn.close()
    return jsonify(data)

if __name__ == '__main__':
    create_table()
    insert_dummy_data()
    app.run(debug=True)


# have csv files and want to dump that data into a table
    # loaddata point to name of file and specify files 