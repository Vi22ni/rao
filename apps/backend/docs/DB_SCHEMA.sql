CREATE TABLE pets (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  species VARCHAR(20) CHECK (species IN ('dog', 'cat')),
  traits JSONB, -- Ex: {"color": "black", "size": "medium"}
  photo_url TEXT NOT NULL,
  status VARCHAR(10) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP DEFAULT NOW()
);