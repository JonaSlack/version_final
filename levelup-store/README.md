# LevelUp Store

LevelUp Store es una tienda web de videojuegos desarrollada como proyecto académico para la asignatura **DSY1104 — Desarrollo Fullstack II** de Duoc UC.

El proyecto permite explorar un catálogo de videojuegos, consultar productos, registrarse, iniciar sesión, utilizar un carrito de compras, gestionar productos desde un panel administrativo y acceder a distintas secciones informativas.

Actualmente el proyecto funciona completamente en el **Front-End**, utilizando HTML, CSS, JavaScript y LocalStorage.

---

## Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript
- LocalStorage
- Git y GitHub
- Diseño responsivo

No se utiliza actualmente una base de datos ni un servidor Backend. La información dinámica se almacena localmente en el navegador mediante LocalStorage.

---

## Estructura principal

```text
levelup-store/
│
├── index.html
├── catalogo.html
├── producto.html
├── carrito.html
├── registro.html
├── login.html
├── contacto.html
├── nosotros.html
├── blog.html
├── blog-detalle-1.html
├── blog-detalle-2.html
├── asistente.html
├── admin.html
├── README.md
│
└── assets/
    │
    ├── css/
    │   ├── styles.css
    │   └── rubrica.css
    │
    ├── img/
    │   └── juegos/
    │
    └── js/
        ├── main.js
        ├── datos-juegos.js
        ├── catalogo.js
        ├── producto.js
        ├── carrito.js
        ├── registro.js
        ├── regiones-comunas.js
        ├── login.js
        ├── contacto.js
        ├── admin.js
        └── asistente-ia.js
```

---

## Página de inicio

La página principal presenta LevelUp Store y permite acceder a las principales funcionalidades del sitio.

Incluye:

- Navegación principal.
- Banner promocional.
- Acceso al catálogo.
- Productos destacados.
- Acceso al carrito.
- Registro e inicio de sesión.
- Blog.
- Nosotros.
- Contacto.
- Asistente IA.

La navegación cuenta además con adaptación para dispositivos móviles.

---

## Catálogo de productos

El catálogo permite visualizar los videojuegos disponibles en la tienda.

Entre sus funcionalidades se encuentran:

- Visualización de productos.
- Búsqueda de videojuegos.
- Filtros.
- Visualización de precio.
- Visualización de plataforma.
- Control visual de disponibilidad.
- Acceso al detalle del producto.
- Incorporación de productos creados desde Administración.

Los productos creados desde el panel administrativo se integran automáticamente con el catálogo mediante LocalStorage.

---

## Detalle de producto

La página de producto permite consultar información más detallada de cada videojuego.

Incluye:

- Nombre.
- Imagen.
- Precio.
- Plataforma.
- Descripción.
- Especificaciones.
- Disponibilidad.
- Selección de cantidad.
- Productos relacionados.
- Botón para agregar al carrito.

Para los productos administrados por el sistema también se controla el stock disponible antes de agregarlos al carrito.

---

## Carrito de compras

El carrito utiliza LocalStorage para mantener los productos seleccionados mientras el usuario navega por el sitio.

Permite:

- Agregar productos.
- Eliminar productos.
- Modificar cantidades.
- Calcular el total.
- Mantener el carrito entre páginas.
- Validar stock disponible.
- Realizar un proceso de compra simulado.

Cuando se completa correctamente una compra de un producto administrado, el sistema descuenta automáticamente la cantidad comprada del stock disponible.

---

## Registro de usuarios

El formulario de registro permite crear usuarios y almacenarlos localmente en el navegador.

Se realizan validaciones para:

- RUN obligatorio.
- Validación del dígito verificador del RUN.
- RUN sin puntos ni guion.
- Nombre obligatorio.
- Apellidos obligatorios.
- Correo electrónico válido.
- Dominios de correo permitidos.
- Región.
- Comuna dependiente de la región seleccionada.
- Dirección.
- Contraseña.
- Confirmación de contraseña.
- Detección de RUN duplicado.
- Detección de correo duplicado.

La fecha de nacimiento es opcional.

### Dominios permitidos

Actualmente se permiten:

- `@duoc.cl`
- `@profesor.duoc.cl`
- `@gmail.com`

Los usuarios registrados desde esta página se crean con rol de **cliente**.

---

## Inicio de sesión

El sistema permite iniciar sesión utilizando cuentas registradas y cuentas de demostración.

La sesión se mantiene mediante LocalStorage.

Actualmente existen tres tipos de usuario:

- Administrador
- Vendedor
- Cliente

Después de iniciar sesión, el sistema determina el acceso según el rol almacenado.

---

## Roles del sistema

### Administrador

El administrador puede acceder al panel administrativo y gestionar:

- Productos.
- Usuarios.

### Vendedor

El vendedor puede acceder al panel administrativo para gestionar productos.

La administración de usuarios queda reservada al administrador.

### Cliente

El cliente utiliza las funciones normales de la tienda y no tiene acceso al panel administrativo.

La separación actual de permisos entre administrador y vendedor corresponde a la implementación realizada en esta versión del proyecto.

---

## Administración de productos

El panel administrativo permite mantener los productos utilizados por la tienda.

Entre las operaciones disponibles se encuentran:

- Crear productos.
- Listar productos.
- Editar productos.
- Eliminar productos.

Cada producto administrado puede contener:

- Código.
- Nombre.
- Descripción.
- Precio.
- Stock.
- Categoría.

El sistema valida los datos antes de guardar un producto y evita códigos duplicados.

Durante la edición de un producto, el código se mantiene bloqueado para conservar correctamente su referencia dentro del catálogo y del carrito.

---

## Control de stock

Los productos creados mediante Administración poseen control de stock.

El sistema utiliza el stock en distintas partes del flujo:

```text
Administración
      ↓
Catálogo
      ↓
Detalle del producto
      ↓
Carrito
      ↓
Compra
      ↓
Actualización del stock
```

Cuando un producto queda sin unidades disponibles, el catálogo y el carrito pueden identificar que se encuentra sin stock.

---

## Administración de usuarios

Los usuarios creados desde el formulario de registro se almacenan en LocalStorage.

El administrador puede consultar los usuarios registrados desde el panel administrativo.

También puede eliminar usuarios almacenados.

Esta funcionalidad se encuentra restringida al rol **administrador** en la implementación actual.

---

## Contacto

El sitio cuenta con un formulario de contacto.

Permite ingresar:

- Nombre.
- Correo electrónico.
- Comentario.

El formulario valida:

- Nombre obligatorio.
- Longitud máxima del nombre.
- Formato del correo cuando se ingresa.
- Dominios permitidos.
- Comentario obligatorio.
- Máximo de 500 caracteres.

Los mensajes enviados se almacenan localmente mediante LocalStorage.

---

## Blog

LevelUp Store incluye una sección de Blog con artículos relacionados con videojuegos.

Actualmente incluye artículos sobre:

- Mitología en los videojuegos.
- Diferencias entre jugar en PC y consola.

Cada artículo posee su propia página de detalle y mantiene la navegación general del sitio.

---

## Nosotros

La sección Nosotros presenta información general de LevelUp Store y del equipo responsable del proyecto.

También describe algunas de las principales características implementadas en la aplicación.

---

## Asistente IA

El proyecto incluye una sección denominada **Asistente IA**.

Esta funcionalidad se encuentra implementada de forma independiente mediante el archivo:

```text
assets/js/asistente-ia.js
```

Su objetivo es complementar la experiencia del usuario mediante un asistente integrado al sitio.

---

## Uso de LocalStorage

Debido a que esta versión no posee Backend ni base de datos, se utiliza LocalStorage para almacenar distintos datos del sistema.

Entre ellos:

```text
levelupUsuarios
levelupProductos
levelupSesion
levelupMensajes
levelup_carrito
```

Esto permite simular distintas funcionalidades de una aplicación web dinámica directamente desde el navegador.

LocalStorage pertenece al navegador y dispositivo donde se ejecuta la aplicación. Por esta razón, los productos, usuarios, sesiones y carritos creados en un computador no se transfieren automáticamente a otro dispositivo.

---

## Cuentas de prueba

Para facilitar las pruebas del sistema existen usuarios de demostración.

### Administrador

```text
Correo: admin@duoc.cl
Contraseña: Admin123
```

### Vendedor

```text
Correo: vendedor@duoc.cl
Contraseña: Venta123
```

### Cliente

```text
Correo: cliente@gmail.com
Contraseña: Game123
```

Estas cuentas son exclusivamente para pruebas académicas.

---

## Cómo ejecutar el proyecto

El proyecto no requiere instalación de dependencias.

Se recomienda utilizar **Visual Studio Code** junto con una extensión como **Live Server**.

Pasos:

1. Clonar el repositorio.
2. Abrir la carpeta del proyecto en Visual Studio Code.
3. Entrar a la carpeta `levelup-store`.
4. Abrir `index.html`.
5. Ejecutar el proyecto con Live Server.
6. Navegar normalmente entre las diferentes páginas.

También es posible abrir directamente `index.html` en un navegador, aunque para desarrollo se recomienda utilizar un servidor local.

---

## Flujo recomendado para probar el sistema

Una prueba completa puede realizarse de la siguiente manera:

1. Iniciar sesión como administrador.
2. Entrar a Administración.
3. Crear un producto con stock disponible.
4. Ir al catálogo.
5. Verificar que aparezca el nuevo producto.
6. Abrir el detalle del producto.
7. Agregar unidades al carrito.
8. Abrir el carrito.
9. Verificar cantidades y precio.
10. Completar el proceso de compra.
11. Regresar a Administración.
12. Comprobar que el stock haya disminuido.

También se recomienda probar el registro de clientes, inicio de sesión, validación de RUN, regiones y comunas, formulario de contacto, búsqueda y filtros del catálogo, edición y eliminación de productos, permisos de usuario y navegación en dispositivos móviles.

---

## Control de versiones

El proyecto utiliza Git y GitHub para el trabajo colaborativo.

Se recomienda:

- Realizar commits descriptivos.
- Mantener actualizado `main`.
- Revisar los cambios antes de realizar un commit.
- Evitar sobrescribir el trabajo de otros integrantes.
- Utilizar ramas cuando se desarrollen funcionalidades importantes.

---

## Equipo de desarrollo

Proyecto desarrollado por:

- Diego Alejandro Gonzalez
- Stefani Verdugo
- Jonathan Aliaga

Para la asignatura:

**DSY1104 — Desarrollo Fullstack II**

Duoc UC.

---

## Consideraciones

Este proyecto tiene fines académicos.

La versión actual utiliza LocalStorage como mecanismo de persistencia y no debe considerarse una implementación de producción.

En una aplicación real, funcionalidades como autenticación, usuarios, productos, stock, pedidos y credenciales deberían gestionarse mediante un Backend y una base de datos, aplicando los controles de seguridad correspondientes.