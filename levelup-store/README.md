# LevelUp Store

LevelUp Store es una tienda web de videojuegos desarrollada como proyecto académico para la asignatura Desarrollo Fullstack II.

El proyecto permite navegar por un catálogo de videojuegos, consultar información de los productos, agregarlos al carrito, registrar usuarios, iniciar sesión y administrar productos y usuarios mediante distintos roles.

El proyecto está desarrollado principalmente con HTML, CSS y JavaScript, utilizando LocalStorage para almacenar información en el navegador.

---

## Integrantes

- Diego Alejandro Gonzalez
- Stefani Verdugo
- Jonathan Aliaga

---

## Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript
- LocalStorage
- Git
- GitHub

---

## Estructura del proyecto

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
    │   └── styles.css
    │
    ├── js/
    │   ├── main.js
    │   ├── datos-juegos.js
    │   ├── catalogo.js
    │   ├── producto.js
    │   ├── carrito.js
    │   ├── registro.js
    │   ├── regiones-comunas.js
    │   ├── login.js
    │   ├── contacto.js
    │   ├── admin.js
    │   └── asistente-ia.js
    │
    └── img/
        ├── juegos/
        └── imágenes utilizadas por el sitio
```

---

## Funcionalidades principales

### Página de inicio

La página principal presenta LevelUp Store y permite acceder a las principales secciones de la tienda.

Incluye:

- Navegación principal.
- Banner promocional.
- Productos destacados.
- Acceso al catálogo.
- Acceso al carrito.
- Acceso al registro e inicio de sesión.
- Acceso a contacto.
- Acceso a Nosotros y Blog.
- Acceso al Asistente IA.

---

## Catálogo de productos

La página de catálogo permite visualizar los videojuegos disponibles.

Incluye:

- Listado de productos.
- Buscador de videojuegos.
- Filtros.
- Información de plataforma.
- Precio.
- Acceso al detalle de cada producto.
- Integración con los productos creados desde administración.

Los productos agregados desde el panel de administración también pueden aparecer en el catálogo.

---

## Detalle del producto

Cada producto cuenta con una página de detalle donde se puede consultar información adicional.

Desde esta sección el usuario puede:

- Ver el nombre del producto.
- Ver su precio.
- Consultar características.
- Consultar stock cuando corresponde.
- Seleccionar una cantidad.
- Agregar productos al carrito.
- Ver productos relacionados.

El sistema controla la cantidad disponible para los productos administrados mediante stock.

---

## Carrito de compras

El carrito permite administrar los productos seleccionados antes de realizar una compra.

Entre sus funciones se encuentran:

- Agregar productos.
- Modificar cantidades.
- Eliminar productos.
- Vaciar el carrito.
- Calcular el subtotal.
- Calcular el total.
- Validar disponibilidad de stock.
- Completar los datos necesarios para finalizar la compra.

Cuando se completa correctamente una compra de un producto administrado, su stock se descuenta automáticamente.

---

## Registro de usuarios

El formulario de registro permite crear nuevos usuarios.

Entre las validaciones implementadas se encuentran:

- RUN obligatorio.
- Validación de RUN chileno.
- RUN ingresado sin puntos ni guion.
- Nombre obligatorio.
- Apellidos obligatorios.
- Validación de correo electrónico.
- Dominios de correo permitidos.
- Región.
- Comuna dependiente de la región seleccionada.
- Dirección.
- Contraseña.
- Confirmación de contraseña.
- Control de usuarios y RUN duplicados.

Los usuarios registrados son almacenados mediante LocalStorage.

---

## Inicio de sesión

El sistema permite iniciar sesión utilizando las cuentas de prueba o las cuentas creadas desde el formulario de registro.

Después de iniciar sesión, el comportamiento depende del rol del usuario.

---

## Roles del sistema

El proyecto utiliza los siguientes roles:

### Administrador

Puede acceder al panel de administración y gestionar:

- Productos.
- Usuarios.

### Vendedor

Puede acceder al panel de administración para gestionar productos.

La sección de administración de usuarios está restringida para este rol.

### Cliente

Puede utilizar las funciones normales de la tienda, como:

- Navegar por el catálogo.
- Consultar productos.
- Agregar productos al carrito.
- Realizar compras.

No puede acceder al panel administrativo.

---

## Administración de productos

El panel de administración permite gestionar los productos de la tienda.

Entre sus funciones se encuentran:

- Crear productos.
- Visualizar productos.
- Editar productos.
- Eliminar productos.
- Definir código.
- Definir nombre.
- Definir descripción.
- Definir precio.
- Definir stock.
- Definir categoría.

Los productos se almacenan mediante LocalStorage.

Los cambios realizados desde administración se reflejan en el catálogo de productos.

---

## Administración de usuarios

El administrador puede consultar y gestionar los usuarios registrados en el sistema.

Esta funcionalidad está disponible únicamente para usuarios con rol de administrador.

---

## Control de stock

Los productos creados desde administración cuentan con control de stock.

El funcionamiento general es:

```text
Administración
      |
      v
Catálogo
      |
      v
Detalle del producto
      |
      v
Carrito
      |
      v
Compra
      |
      v
Actualización del stock
```

El sistema evita agregar cantidades superiores al stock disponible.

Cuando se finaliza correctamente una compra, la cantidad comprada se descuenta del producto correspondiente.

---

## Contacto

El sitio incluye un formulario de contacto.

El formulario permite ingresar:

- Nombre.
- Correo electrónico.
- Comentario.

También se aplican validaciones antes de almacenar el mensaje.

Los mensajes son almacenados mediante LocalStorage.

---

## Nosotros

La página Nosotros presenta información general sobre LevelUp Store y el equipo responsable del proyecto.

Incluye información relacionada con:

- El proyecto.
- La propuesta de la tienda.
- Los integrantes del equipo.
- Las principales áreas desarrolladas.

---

## Blog

El proyecto incluye una sección de Blog con artículos relacionados con videojuegos y tecnología.

Actualmente se incluyen artículos con sus respectivas páginas de detalle.

---

## Asistente IA

El proyecto cuenta con una sección destinada a un Asistente IA.

Esta funcionalidad permite realizar consultas desde la interfaz de LevelUp Store.

La implementación del asistente se encuentra separada del resto de las funcionalidades principales de la tienda.

---

## Uso de LocalStorage

Debido a que esta versión del proyecto es Front-End y no utiliza una base de datos en un servidor, se utiliza LocalStorage para mantener información dentro del navegador.

Las principales claves utilizadas son:

```text
levelupUsuarios
levelupProductos
levelupSesion
levelupMensajes
levelup_carrito
```

### levelupUsuarios

Almacena los usuarios registrados.

### levelupProductos

Almacena los productos creados desde administración.

### levelupSesion

Mantiene información de la sesión iniciada.

### levelupMensajes

Almacena los mensajes enviados desde el formulario de contacto.

### levelup_carrito

Almacena los productos agregados al carrito.

---

## Cuentas de prueba

El proyecto incluye cuentas predeterminadas para facilitar las pruebas.

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

---

## Prueba recomendada del sistema

Para comprobar el funcionamiento general del proyecto se puede realizar el siguiente flujo:

1. Iniciar sesión como administrador.
2. Crear un producto desde administración.
3. Asignar stock al producto.
4. Ir al catálogo.
5. Buscar el producto creado.
6. Abrir el detalle del producto.
7. Agregar una cantidad al carrito.
8. Abrir el carrito.
9. Completar el proceso de compra.
10. Volver al panel de administración.
11. Comprobar que el stock haya disminuido.

También se recomienda probar:

- Registro de nuevos usuarios.
- Validación de RUN.
- Validación de correo.
- Inicio de sesión.
- Roles.
- Formulario de contacto.
- Buscador del catálogo.
- Filtros.
- Eliminación de productos.
- Edición de productos.
- Navegación entre páginas.

---

## Diseño responsive

El sitio utiliza CSS responsive para adaptarse a diferentes tamaños de pantalla.

Se incluyen ajustes para:

- Computadores.
- Tablets.
- Dispositivos móviles.

El menú de navegación cambia su comportamiento en pantallas pequeñas.

---

## Ejecución del proyecto

El proyecto no necesita instalación de dependencias.

Se puede ejecutar abriendo:

```text
index.html
```

También puede ejecutarse utilizando una extensión como Live Server desde Visual Studio Code.

---

## Limitaciones

Esta versión corresponde a un proyecto académico Front-End.

Por este motivo:

- No utiliza una base de datos real.
- No utiliza un servidor Backend.
- La información se almacena en LocalStorage.
- Los datos dependen del navegador y dispositivo utilizado.
- Las sesiones son gestionadas desde el cliente.
- Las contraseñas almacenadas en LocalStorage no representan un sistema de autenticación seguro para producción.

En una aplicación real estas funcionalidades deberían implementarse mediante un Backend, una base de datos y un sistema de autenticación seguro.

---

## Objetivo del proyecto

El objetivo de LevelUp Store es aplicar los conocimientos adquiridos durante el desarrollo de la asignatura, integrando HTML, CSS y JavaScript en una aplicación web funcional.

El proyecto permite trabajar conceptos como:

- Estructura HTML.
- Diseño mediante CSS.
- Diseño responsive.
- Manipulación del DOM.
- Eventos JavaScript.
- Validación de formularios.
- LocalStorage.
- Manejo de productos.
- Manejo de usuarios.
- Carrito de compras.
- Control de stock.
- Roles de usuario.
- Organización de un proyecto web.
- Control de versiones mediante Git y GitHub.

---

## Estado del proyecto

El proyecto se encuentra en desarrollo académico y continúa siendo revisado y mejorado por el equipo.