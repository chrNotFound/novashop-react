# NovaShop

Tienda online de tecnología hecha con **React 19, Vite, React Router y Bootstrap 5**.
Proyecto de la Evaluación Parcial 2 de DSY1104 Desarrollo Fullstack II.

Es una aplicación solo frontend: los datos viven en archivos JavaScript (`src/data`) y en
`localStorage` del navegador. El pago es una simulación y no procesa dinero real.

## Qué incluye

**Tienda (pública):** inicio, catálogo, detalle de producto, categorías, ofertas, carrito,
checkout con región y comuna, compra exitosa o rechazada, registro, inicio de sesión,
contacto, blog y nosotros.

**Panel de administración (`/admin`, solo rol admin):** dashboard con stock crítico, CRUD de
productos, categorías y usuarios, órdenes con boleta, historial de compras por usuario,
reportes y perfil.

## Requisitos

- Node.js 20 o superior y npm
- Chrome, Edge o Brave (para las pruebas)

## Instalación y uso

```bash
npm install
npm run dev 
```

## Usuarios de demostración

| Rol | Correo | Contraseña |
| --- | --- | --- |
| Administrador | admin@novashop.cl | Admin123 |
| Cliente | cliente@novashop.cl | Cliente123 |

Son datos de prueba. No uses claves reales: se guardan en el navegador.

## Pruebas unitarias

Las pruebas usan **Jasmine** y **Karma** .

```bash
npm test
```

Ejecuta las 30 pruebas (componentes, formulario de login, contexto del carrito, utilidades
y CRUD de productos).

Última ejecución: 30 de 30 aprobadas. Cobertura global: 52,8 % de instrucciones,
34,92 % de ramas, 66,66 % de funciones y 51,56 % de líneas.

## Estructura

```
src/
  components/   ProductCard, Header, Footer, RutaAdmin, ...
  context/      AuthContext, CarritoContext
  data/         productos, usuarios, categorias, ordenes, blogs
  pages/        tienda/ y admin/
  utils/        precios, validaciones, stock, estados
  tests/        pruebas Jasmine (*.spec.js y *.spec.jsx)
```
