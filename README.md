<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Ejecutar en desarrollo
1. Clonar el repositorio

2. Ejecutar
```
yarn install
```
3. Tener Nest CLI instalado
```
npm i -g @nestjs/cli
```

4. Levantar la base de datos
```
docker-compose up -d
```

6. Clonar el archivo __.env.template__ y renombrar la copia __.env__

7. Llenas las variables de entorno definidas en el ```.env```

8. Ejecutar la aplicacion en desarrollo con el comando
```
yarn start:dev
```

9. Reconstruir la base de datos con la semilla
```
https://localhost:3000/api/v2/seed
```

## Stack usado
* MongoDB
* Nestjs