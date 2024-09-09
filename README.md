# Proyecto React con Vite - Producción

Este es un proyecto web creado con **React** y **Vite**. Esta guía detalla el proceso de instalación, configuración y despliegue para un entorno de producción.

## Requisitos Previos

Antes de continuar, asegúrate de tener lo siguiente:

- **Node.js** (versión 14 o superior)
- **Vite** ya configurado en tu entorno de desarrollo
- Un servidor de producción o servicio de hosting para el despliegue, como **Azure App Service**, **Netlify**, o **Vercel**

## Instalación del Proyecto

1. Clona el repositorio en tu máquina local:

   ```bash
   git clone https://github.com/usuario/nombre-repositorio.git
   ```

2. Ve al directorio del proyecto:

   ```bash
   cd nombre-repositorio
   ```

3. Instala las dependencias necesarias:

   ```bash
   npm install
   ```

## Variables de Entorno

Configura las variables de entorno en un archivo `.env` para tu proyecto. Un ejemplo básico de archivo `.env` podría ser:

    ```bash
    VITE_API_AUTH_URL=http://localhost:3000
    VITE_API_BACKEND_URL=http://localhost:3001
    ```

Crea o actualiza este archivo con las configuraciones necesarias para tu entorno de producción.

## Construcción para Producción

Para crear una versión optimizada para producción de tu aplicación, ejecuta el siguiente comando:

    ```bash
    npm run build
    ```

Esto generará una carpeta `dist/` con todos los archivos necesarios para servir la aplicación.

## Despliegue

### Despliegue en un Servidor Web

1. Después de generar los archivos para producción, copia el contenido de la carpeta `dist/` a tu servidor de producción.

2. Configura tu servidor web para servir los archivos estáticos desde la carpeta `dist/`. A continuación se muestra un ejemplo de configuración de **Nginx**:

   ```nginx
   server {
       listen 80;
       server_name tu-dominio.com;

       root /ruta-a-tu-proyecto/dist;
       index index.html;

       location / {
           try_files $uri $uri/ /index.html;
       }
   }
   ```

Este bloque de configuración asegura que las rutas de la aplicación funcionen correctamente, redirigiendo todas las solicitudes a `index.html`.

### Despliegue Usando Servicios como Netlify o Vercel

1. Sube el proyecto a un repositorio en GitHub, GitLab, u otro servicio similar.
2. Conecta tu repositorio con **Netlify** o **Vercel**.
3. Configura el proyecto para que el comando de **build** sea:

   ```bash
   npm run build
   ```

4. El directorio de salida será:

   ```bash
   dist
   ```

Estos servicios se encargarán de construir y desplegar automáticamente la aplicación después de cada `push`.

## Configuración de Azure Pipelines (Opcional)

Si deseas desplegar usando **Azure Pipelines**, crea un archivo `azure-pipelines.yml` en la raíz del proyecto:

    ```yaml
    trigger:
      - main

    pool:
      vmImage: 'ubuntu-latest'

    steps:
      - task: NodeTool@0
        inputs:
          versionSpec: '14.x'
        displayName: 'Instalar Node.js'

      - script: |
          npm install
          npm run build
        displayName: 'Construir aplicación'

      - task: CopyFiles@2
        inputs:
          contents: 'dist/**'
          targetFolder: '$(Build.ArtifactStagingDirectory)'
        displayName: 'Copiar archivos'

      - task: PublishBuildArtifacts@1
        inputs:
          PathtoPublish: '$(Build.ArtifactStagingDirectory)'
          ArtifactName: 'drop'

      - task: AzureRmWebAppDeployment@4
        inputs:
          azureSubscription: 'MiAzureConnection'
          appType: 'webAppLinux'
          WebAppName: 'mi-nombre-app'
          packageForLinux: '$(Build.ArtifactStagingDirectory)/dist'
    ```

## Scripts Disponibles

- **`npm run dev`**: Inicia el servidor de desarrollo.
- **`npm run build`**: Genera los archivos optimizados para producción.
- **`npm run preview`**: Previsualiza la aplicación después de construirla para producción.

## Estructura del Proyecto
