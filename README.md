# sergiofores-main

## Documentation

### Overview
Este proyecto es la página personal de Sergio Forés que integra varias secciones (About, Skills, Projects, Contact) con un diseño responsivo y animaciones usando Three.js. Además, se han implementado medidas para proteger información sensible, como cargar el número de WhatsApp desde un archivo externo.

### Installation
1. Clona el repositorio.
2. Abre el proyecto en tu editor de código favorito.
3. Asegúrate de configurar un servidor local para servir el proyecto (por ejemplo, usando Vite o Live Server).
4. Verifica que el archivo `phone.txt` contenga el número de teléfono correcto y que todos los recursos estén en sus ubicaciones adecuadas.

### Usage
- Navega por las secciones utilizando el menú principal.
- Haz clic en el botón de WhatsApp para iniciar una conversación; el número se carga dinámicamente desde `phone.txt`.
- Las animaciones de Three.js se renderizan en el contenedor correspondiente. Asegúrate de que tu navegador soporte WebGL.

### Development
- Se utilizan source maps para facilitar la depuración (ver `style.css.map`).
- El CSS utiliza clases en lugar de IDs para aplicar estilos, siguiendo buenas prácticas de mantenimiento.
- El proyecto incluye una estructura modular para separar HTML, CSS y JavaScript.
