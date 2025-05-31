# Usa una imagen oficial de Node.js como base
FROM node:18

# Crea un directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de tu aplicación al contenedor
COPY . .

# Instala las dependencias
RUN npm install

# Expone el puerto en el que tu app escucha
EXPOSE 3000

# Comando para ejecutar tu app
CMD ["npm", "start"]
