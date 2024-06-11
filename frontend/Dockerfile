# Usa una imagen base de Node.js para construir el frontend
FROM node:18 AS build

# Establece el directorio de trabajo
WORKDIR /usr/src/app

# Copia el archivo package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de la aplicación
COPY . .

# Construye la aplicación Angular
RUN npm run build --prod

# Usa una imagen base de Nginx para servir el frontend
FROM nginx:alpine

# Copia los archivos construidos al directorio de Nginx
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# Copia la configuración de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf
