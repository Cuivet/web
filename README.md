# CUIVET - web

Este repositorio corresponde al lado del cliente/usuario del proyecto CUIVET desarrollado por estudiantes de la UTN-FRC.

> .[!IMPORTANT].
> semantic-commits
Detallamos a continuación la semántica a utilizar para realizar los commits:

feat: Nueva funcionalidad de software para el usuario.

fix: Arreglo de algún bug.

refactor: Formateo o documentación, sin cambio de código de produccion (ej: Espaciado de texto o renombrar variables).

config: Cambios relacionados con dependencias y configuraciones no relacionadas con funcionalidades para el usuario final.

Algunos commits de ejemplo serían "feat: pet crud added", "fix: error creating pethistory" o "config: node_modules added to gitignore".

-------------------------------------------------------------------------------------------------------------------------------
# Algunas consideraciones del desarrollo

Se diferencian los elementos de React de los puramente javascript al usar la extension .jsx para componentes.

La estructura de carpeta divide los componentes, de las paginas navegables y de los layouts de fondo.

Por convencion se usa el framework ant-design para darle estilo a la aplicacion, asi mismo cada componente puede estar acopanado de su propio hoja de estilo en formato .scss, siempre teniendo como normativa tomar los valores definido en el archivo '_variables.scss'

El enrutamiento de paginas se realiza en el archivo 'route.jsx'

Las validaciones en los formularios se realizan con funciones creadas por el equipo de desarrollo y no con funcionalidades del framework, estan son definidas en el archivo 'formValidation.js'

-------------------------------------------------------------------------------------------------------------------------------
#Otras consideraciones

Gestión de X: tabla de datos (gran volumen)
Asociación de X: cards (volumen moderado)
Mis X: abmc (administracion)
