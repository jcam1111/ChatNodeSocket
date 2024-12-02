CREATE TABLE users (
    id SERIAL PRIMARY KEY,               -- Identificador único de usuario
    email VARCHAR(255) UNIQUE NOT NULL,   -- Email del usuario (único)
    password VARCHAR(255) NOT NULL,       -- Contraseña encriptada
    name VARCHAR(100) NOT NULL,           -- Nombre del usuario
    avatar VARCHAR(255),                  -- URL de la imagen del avatar
    status VARCHAR(50) DEFAULT 'offline', -- Estado del usuario (online/offline)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Fecha de creación
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- Fecha de última actualización
);

CREATE TABLE rooms (
    id SERIAL PRIMARY KEY,               -- Identificador único de la sala
    name VARCHAR(255) UNIQUE NOT NULL,    -- Nombre de la sala
    description TEXT,                    -- Descripción opcional de la sala
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- Fecha de creación
);


CREATE TABLE room_members (
    user_id INT REFERENCES users(id) ON DELETE CASCADE,  -- ID del usuario (referencia a la tabla de usuarios)
    room_id INT REFERENCES rooms(id) ON DELETE CASCADE,  -- ID de la sala (referencia a la tabla de salas)
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,        -- Fecha en que el usuario se unió a la sala
    PRIMARY KEY (user_id, room_id)  -- Combinación única de usuario y sala
);

CREATE TABLE messages (
    id SERIAL PRIMARY KEY,                 -- Identificador único del mensaje
    room_id INT REFERENCES rooms(id) ON DELETE CASCADE,  -- Sala en la que se envió el mensaje
    user_id INT REFERENCES users(id) ON DELETE CASCADE,  -- Usuario que envió el mensaje
    content TEXT NOT NULL,                  -- Contenido del mensaje (puede ser texto o emoji)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Fecha y hora del mensaje
    pinned BOOLEAN DEFAULT FALSE           -- Indicador si el mensaje está fijado (pin/unpin)
);

----noooo
CREATE TABLE typing_status (
    room_id INT REFERENCES rooms(id) ON DELETE CASCADE,  -- Sala en la que el usuario está escribiendo
    user_id INT REFERENCES users(id) ON DELETE CASCADE,  -- Usuario que está escribiendo
    is_typing BOOLEAN DEFAULT TRUE,                       -- Indicador si el usuario está escribiendo
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,       -- Fecha de actualización
    PRIMARY KEY (room_id, user_id)                        -- Combinación única de sala y usuario
);
