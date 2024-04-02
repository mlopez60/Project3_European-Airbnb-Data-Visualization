# example
from flask import Flask, render_template, jsonify
import sqlite3

app = Flask(__name__)

# Function to create a new database and table if they don't exist
def create_table():
    conn = sqlite3.connect('data.db')
    cursor = conn.cursor()
    
    # Drop the table if it exists
    cursor.execute('DROP TABLE IF EXISTS data')
    
    # Create a new table
    cursor.execute('''CREATE TABLE data
                      (x INTEGER NOT NULL,
                       y INTEGER NOT NULL)''')
    
    conn.commit()
    conn.close()

# Function to insert dummy data into the database
def insert_dummy_data():
    conn = sqlite3.connect('data.db')
    cursor = conn.cursor()
    # update below to allow insertable data
    # cursor.executemany('INSERT INTO data (x, y) VALUES (?, ?)', [(i, i*i) for i in range(10)])
    conn.commit()
    conn.close()

@app.route('/')
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