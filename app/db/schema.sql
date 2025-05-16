CREATE TABLE IF NOT EXISTS garden (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    image TEXT,
    origin TEXT,
    category TEXT,
    ideal_light TEXT,
    ideal_watering TEXT,
    last_water TEXT,
    is_healthy BOOLEAN,
    email TEXT,
    user_id INTEGER,
    demo_plant BOOLEAN,
    actions TEXT,
    skip_count INTEGER,
    skip_history TEXT
);
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    password TEXT NOT NULL,
    email TEXT,
    joined_date TEXT DEFAULT CURRENT_TIMESTAMP
);