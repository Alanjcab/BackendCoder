# API Documentation

Esta es la documentación de la API para la aplicación backend. A continuación se describen los endpoints disponibles, junto con sus métodos HTTP, descripciones y posibles respuestas.

## Endpoints

### Usuarios

- **Registrar un usuario**
  - **URL**: `/api/users/register`
  - **Método**: `POST`
  - **Descripción**: Registra un nuevo usuario en la aplicación.
  - **Cuerpo de la solicitud**: Debe incluir detalles del usuario (nombre, correo, contraseña, etc.).
  - **Respuesta**: 
    - `201 Created` si el registro es exitoso.
    - `400 Bad Request` si hay un error en los datos proporcionados.

- **Iniciar sesión**
  - **URL**: `/api/users/login`
  - **Método**: `POST`
  - **Descripción**: Inicia sesión para un usuario existente.
  - **Cuerpo de la solicitud**: Debe incluir el correo y la contraseña del usuario.
  - **Respuesta**: 
    - `200 OK` y un token de sesión si el inicio de sesión es exitoso.
    - `401 Unauthorized` si las credenciales son incorrectas.

- **Mostrar perfil del usuario**
  - **URL**: `/api/users/current`
  - **Método**: `GET`
  - **Descripción**: Muestra el perfil del usuario actualmente autenticado.
  - **Respuesta**: 
    - `200 OK` y los datos del usuario.
    - `401 Unauthorized` si el usuario no está autenticado.

- **Listar todos los usuarios**
  - **URL**: `/api/users`
  - **Método**: `GET`
  - **Descripción**: Muestra todos los usuarios en la aplicación.
  - **Respuesta**: 
    - `200 OK` y una lista de usuarios.
    - `403 Forbidden` si el usuario no tiene permisos.

- **Enviar correo a usuarios inactivos**
  - **URL**: `/api/users`
  - **Método**: `GET`
  - **Descripción**: Envía un correo a todos los usuarios que no han iniciado sesión por un determinado tiempo.
  - **Respuesta**: 
    - `200 OK` si los correos se envían correctamente.

- **Cambiar rol de usuario**
  - **URL**: `/api/users/premium/:id`
  - **Método**: `PATCH`
  - **Descripción**: Cambia el rol del usuario entre 'premium' y 'user'.
  - **Respuesta**: 
    - `200 OK` si el rol se cambia correctamente.
    - `404 Not Found` si el usuario no existe.

### Productos

- **Mostrar todos los productos**
  - **URL**: `/api/products`
  - **Método**: `GET`
  - **Descripción**: Muestra todos los productos, accesible solo para usuarios autenticados.
  - **Respuesta**: 
    - `200 OK` y una lista de productos.
    - `401 Unauthorized` si el usuario no está autenticado.

- **Buscar producto por ID**
  - **URL**: `/api/products/:id`
  - **Método**: `GET`
  - **Descripción**: Busca un producto específico por su ID.
  - **Respuesta**: 
    - `200 OK` y los datos del producto.
    - `404 Not Found` si el producto no existe.

- **Crear un nuevo producto**
  - **URL**: `/api/products`
  - **Método**: `POST`
  - **Descripción**: Crea un nuevo producto. Solo los usuarios administradores y premium tienen permiso.
  - **Cuerpo de la solicitud**: Debe incluir detalles del producto.
  - **Respuesta**: 
    - `201 Created` si el producto se crea exitosamente.
    - `403 Forbidden` si el usuario no tiene permisos.

- **Actualizar un producto**
  - **URL**: `/api/products/:id`
  - **Método**: `PUT`
  - **Descripción**: Actualiza algún campo de un producto existente.
  - **Cuerpo de la solicitud**: Debe incluir los campos a actualizar.
  - **Respuesta**: 
    - `200 OK` si el producto se actualiza correctamente.
    - `404 Not Found` si el producto no existe.

- **Eliminar un producto**
  - **URL**: `/api/products/:id`
  - **Método**: `DELETE`
  - **Descripción**: Elimina un producto por su ID.
  - **Respuesta**: 
    - `204 No Content` si el producto se elimina correctamente.
    - `404 Not Found` si el producto no existe.

### Carritos

- **Mostrar todos los carritos**
  - **URL**: `/api/carts`
  - **Método**: `GET`
  - **Descripción**: Muestra todos los carritos, accesible solo para usuarios administradores.
  - **Respuesta**: 
    - `200 OK` y una lista de carritos.
    - `403 Forbidden` si el usuario no tiene permisos.

- **Buscar carrito por ID**
  - **URL**: `/api/carts/:id`
  - **Método**: `GET`
  - **Descripción**: Busca un carrito específico por su ID.
  - **Respuesta**: 
    - `200 OK` y los datos del carrito.
    - `404 Not Found` si el carrito no existe.

- **Eliminar un carrito**
  - **URL**: `/api/carts/:id`
  - **Método**: `DELETE`
  - **Descripción**: Elimina un carrito por su ID.
  - **Respuesta**: 
    - `204 No Content` si el carrito se elimina correctamente.
    - `404 Not Found` si el carrito no existe.

- **Agregar un producto al carrito**
  - **URL**: `/api/products/:id`
  - **Método**: `POST`
  - **Descripción**: Agrega un producto al carrito.
  - **Respuesta**: 
    - `200 OK` si el producto se agrega correctamente.
    - `404 Not Found` si el producto no existe.

- **Eliminar un producto del carrito**
  - **URL**: `/api/carts/:idcarts/products/:idproducto`
  - **Método**: `DELETE`
  - **Descripción**: Elimina un producto específico del carrito.
  - **Respuesta**: 
    - `204 No Content` si el producto se elimina correctamente.
    - `404 Not Found` si el carrito o el producto no existen.

- **Actualizar la cantidad de un producto en el carrito**
  - **URL**: `/api/carts/:idcarts/products/:idproducto`
  - **Método**: `PUT`
  - **Descripción**: Actualiza la cantidad de un producto en el carrito.
  - **Respuesta**: 
    - `200 OK` si la cantidad se actualiza correctamente.
    - `404 Not Found` si el carrito o el producto no existen.

- **Limpiar el carrito**
  - **URL**: `/api/carts/:idcarts`
  - **Método**: `DELETE`
  - **Descripción**: Limpia todos los productos del carrito.
  - **Respuesta**: 
    - `204 No Content` si el carrito se limpia correctamente.
    - `404 Not Found` si el carrito no existe.

### Tickets

- **Generar ticket de compra**
  - **URL**: `/api/ticket/purchase`
  - **Método**: `POST`
  - **Descripción**: Genera un ticket de compra para el usuario.
  - **Respuesta**: 
    - `200 OK` y los detalles del ticket.
    - `400 Bad Request` si hay un error en la solicitud.

### Restablecimiento de Contraseña

- **Resetear contraseña**
  - **URL**: `/api/users/reset-pass`
  - **Método**: `POST`
  - **Descripción**: Resetea la contraseña del usuario y envía un correo para el restablecimiento.
  - **Cuerpo de la solicitud**: Debe incluir el correo del usuario.
  - **Respuesta**: 
    - `200 OK` si el correo se envía correctamente.
    - `404 Not Found` si el usuario no existe.

- **Crear nueva contraseña**
  - **URL**: `/api/users/new-pass`
  - **Método**: `POST`
  - **Descripción**: Crea y actualiza una nueva contraseña para el usuario.
  - **Cuerpo de la solicitud**: Debe incluir la nueva contraseña y el token de restablecimiento.
  - **Respuesta**: 
    - `200 OK` si la contraseña se actualiza correctamente.
    - `400 Bad Request` si hay un error en la solicitud.

