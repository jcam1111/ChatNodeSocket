# Real-Time-Chat-Socket.io

Chat en tiempo real donde se utiliza el patrón de diseño Modelo,Vista,Controlador(mvc). Los usuarios pueden crear una cuenta e iniciar sesión,
 y todas las peticiones se hacen con la autorización por cabecera de JSON Web Token (JWT),
 una vez se inicia sesion te direcciona a la página principal donde se muestran todos los usuarios creados una cuenta, y se puede iniciar un chat con cada usuario.

## Tecnologías utilizadas

Este proyecto fue creado con el Postgress, Express, React y Node.js 20. En el FrontEnd, y las dependencias de producción incluyen :

- axios
- emoji-picker-react
- jwt-decode
- react, react-dom
- react-router-dom
- socket.io-client
- styled-components

En el BackEnd las dependencias de desarrollo incluyen: 
- bcrypt
- cors
- dotenv
- express
- jsonwebtoken
- sequelize
- socket.io


## Backend

El backEnd se genera en node.js 20 con express, se emplea el patrón de diseño MVC, se genera la estructura en carpetas Routers, Controllers y clases para el Modelo. En cuanto a la seguridad en la autentificación se implementó bcrypt para las contraseñas y para la autorización se creó un middleware que requiere de un token para tener acceso.

bcrypt: Al crear un usuario, la contraseña es encriptada con bcrypt y guardada en la base de datos esto para proteger los datos del usuario. Una vez iniciada la sesión se hace referencia nuevamente la librería para decodificar la contraseña y autentificar al usuario. 

Cors: Se agregó una configuración de cors a todas las rutas, permitiendo las peticiones HTTP-request POST,DELETE,UPDATE,GET. En esta configuración también se agregó los orígenes permitidos .

Dotenv: El proyecto utiliza variables de entorno para las constantes, esto a través de dotenv.

Sequelize: Librería para conectar con la base de datos Postgress.

Jsonwebtoken: Se crea el accessToken el cual devuelve la respuesta de la petición cuando se autentica el usuario(inicio de sesión)

socket.io: Es una libreria de Web Socket, permite enviar mensajes de manera inmediata hacia el front, está configurado de tal manera que cada vez que un usuario envía un mensaje y es guardado correctamente en la base de datos socket io repliega el mensaje hacia el receptor sin que este esté realizando la petición de actualizar los mensajes.

## Frontend 

En el frontend el proyecto en cuanto a los estilos se emplea styled-component.

react-router-dom: Para definir las rutas disponibles para el usuario cuales son públicas, cuáles son privadas a través de la variable auth guardada en el state, recibido al iniciar sesion y hay algunas rutas que solo están disponibles para ciertos usuarios que tienen determinado rol, si el usuario no está autorizado lo redirige a una página con el mensaje.

styled-components: Para agregar estilos a los componentes y poder reutilizarlo.

socket.io-client: socket.io-client establece una conexión persistente y de baja latencia utilizando la tecnología WebSocket para habilitar la transmisión instantánea de datos entre las partes involucradas.

jwt-decode: Para decodificar el token y poder acceder a los datos
emoji-picker-react: Para poder escoger un emoji y agregarlo al mensaje que será enviado.

axios: Para realizar las peticiones asíncronas e instancias de axios esto para poder utilizar interceptors, esto se utilizó para interceptar la respuesta si existe un error específico, en concreto el error de expiración del token, si esto ocurre se enviará una petición al backend en la cual se envía el refreshToken para obtener una nuevo accessToken, además también todas las peticiones que son creadas con esta instancia se les agregara a la cabecera el token de la autorización.


## Requisitos previos

Antes de instalar y utilizar este proyecto, se debe tener instalado Postgress. También se debe crear la base de datos y las tablas necesarias para el proyecto. Puedes encontrar el código SQL para crear la base de datos y las tablas en el archivo `script.sql` del directorio '/src/script.sql'. Además tener instalado los paquetes de Node.js, en este proyecto se utilizó la versión 20.10.0

## Instalación

Para instalar este proyecto de manera local, se deben seguir los siguientes pasos:
1. Clonar este repositorio hacia el equipo local.
2. Navegar hasta el directorio del proyecto y ejecutar `npm install` para instalar todas las dependencias, esto debe realizarse tanto en la carpeta de App y Server.
3. Crear un archivo `.env` en el directorio de la App y el Server del proyecto y agregar las variables de entorno.
    - Las variables de entorno del Server son:
        - PORTAPI
        - USER
        - PASSWORD
        - HOST
        - PORT
        - DATABASE
        - ACCESS_TOKEN_SECRET
        - REFRESH_TOKEN_SECRET
    
4. Crea una base de datos en Postgress donde se tenga usuarios y mensajes(esta configuración ya está en el archivo script.sql), donde un mensaje solo puede tener un emisor y un receptor pero un usuario puede tener varios mensajes (relación n:1)
5. Ejecuta `npm run start` para iniciar el servidor(en la carpeta Server) y luego se procede a iniciar la aplicación con `npm run dev`.
    
## Uso 

Para utilizar este proyecto, sigue estos pasos:
1. Abre tu navegador web y navega hasta http://localhost:3000.
2. Crea una cuenta o inicia sesión con una cuenta existente.
3. Una vez que hayas iniciado sesión, podrás enviar mensajes a otros usuarios.


