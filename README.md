
<div align="center">
<img src="./doc/assets/SNS_SQS_DYNAMO_S3.drawio.png" alt="Index app" width="100%" />
<div align="right">
<img width="16" height="16" src="./doc/assets/icons/devops/png/aws.png" alt="AWS" />
<img width="16" height="16" src="./doc/assets/icons/aws/png/lambda.png" alt="Lambda" />
<img width="16" height="16" src="./doc/assets/icons/devops/png/postman.png" alt="Postman" />
<img width="16" height="16" src="./doc/assets/icons/devops/png/git.png" alt="Git" />
<img width="16" height="16" src="./doc/assets/icons/aws/png/s3.png" alt="S3" />
<img width="16" height="16" src="./doc/assets/icons/aws/png/api-gateway.png" alt="API Gateway" />
<img width="16" height="16" src="./doc/assets/icons/aws/png/sqs.png" alt="SQS" />
<img width="16" height="16" src="./doc/assets/icons/aws/png/parameter-store.png" alt="Parameter Store" />
<img width="16" height="16" src="./doc/assets/icons/backend/javascript-typescript/png/nodejs.png" alt="Node.js" />
<img width="16" height="16" src="./doc/assets/icons/aws/png/dynamo.png" alt="DynamoDB" />
<img width="16" height="16" src="./doc/assets/icons/backend/javascript-typescript/png/typescript.png" alt="TypeScript" />
</div>
</div>

<br>

<br>

<div align="right">
  <a href="./README.md" title="Español">
    <img src="./doc/assets/translation/arg-flag.jpg" width="64" height="40" alt="Español" title="Español" />
  </a>
  <a href="./translation/README.en.md" title="Inglés">
    <img src="./doc/assets/translation/eeuu-flag.jpg" width="64" height="40" alt="Inglés" title="Inglés" />
  </a>
</div>

<br>

<div align="center">

# BackupSystem_SQS_SNS_S3_DynamoDB_AWS

</div>

Un sistema de respaldo para que los registros de tus plantas mineras queden guardados, consultables y recuperables. Reúne nombre, empresa, tipo de yacimiento, estado, mineral principal y geolocalización, con alta, listado, consulta, edición y baja autenticadas sobre DynamoDB, y copias en S3 a través de SQS y SNS, para que esa información quede centralizada y lista para integrarse con el resto de tus servicios en AWS.

<div align="left">
<a href="https://www.datos.gob.ar/dataset/energia-proyectos-mineros-ubicacion-aproximada" target="_blank" rel="noopener noreferrer" title="Dataset"><img src="./doc/assets/icons/detail-actions/dataset-pill.svg" alt="Dataset" width="100" height="30" border="0" /></a>
<br>
<a href="./src/collection/Backup_System_Mining_Plants_AWS.postman_collection.json" target="_blank" rel="noopener noreferrer" title="Colección de Postman"><img src="./doc/assets/icons/detail-actions/postman-pill.svg" alt="Postman" width="100" height="30" border="0" /></a>
</div>


<br>

## Índice 📜

<details>
 <summary> Ver </summary>
 
 <br>
 
### Sección 1)  Descripción, configuración y tecnologías

 - [1.0) Descripción del Proyecto.](#10-descripción-)
 - [1.1) Ejecución del Proyecto.](#11-ejecución-del-proyecto-)
 - [1.2) Configuración del proyecto desde cero](#12-configuración-del-proyecto-desde-cero-)
 - [1.3) Tecnologías.](#13-tecnologías-)


### Sección 2) Endpoints y Ejemplos 
 
 - [2.0) EndPoints y recursos.](#20-endpoints-y-recursos-)

### Sección 3) Prueba de funcionalidad y Referencias
 
 - [3.0) Prueba de funcionalidad.](#30-prueba-de-funcionalidad-)
 - [3.1) Referencias.](#31-referencias-)


<br>

</details>



<br>

## Sección 1)  Descripción, configuración y tecnologías


### 1.0) Descripción [🔝](#índice-) 

<details>
  <summary>Ver</summary>
 <br>

### 1.0.0) Descripción General

`Importante`: Hay alertas de seguridad de dependabot que apuntan contra el plugin "serverless-dynamodb-local". No aplicar parches de seguridad a dicho plugin, ya que la versión `^1.0.2` tiene problemas al momento de la creación de tablas y ejecución del servicio de dynamo. Se recomienda mantener la última versión estable `^0.2.40` con las alertas de seguridad generadas.


 
### 1.0.1) Descripción Arquitectura y Funcionamiento


<br>

</details>


### 1.1) Ejecución del Proyecto [🔝](#índice-)

<details>
  <summary>Ver</summary>
  <br>
 
* Creamos un entorno de trabajo a través de algún ide, podemos o no crear una carpeta raíz para el proyecto, nos posicionamos sobre la misma
```git
cd 'projectRootName'
```
* Una vez creado un entorno de trabajo a través de algún ide, clonamos el proyecto
```git
git clone https://github.com/andresWeitzel/BackupSystem_SQS_SNS_S3_DynamoDB_AWS
```
* Instalamos la última versión LTS de [Nodejs(v18)](https://nodejs.org/en/download)
* Instalamos el Serverless Framework globalmente si aún no lo hemos hecho. Recomiendo la version tres ya que es gratuita y no nos pide credenciales. Se puede usar la última version (cuatro) sin problemas, aunque es de pago.
```git
npm install -g serverless@3
```
* Verificamos la versión de Serverless instalada
```git
sls -v
```
* Instalamos todos los paquetes necesarios
```git
npm i
```
`Importante`: Hay alertas de seguridad de dependabot que apuntan contra el plugin "serverless-dynamodb-local". No aplicar parches de seguridad a dicho plugin, ya que la versión `^1.0.2` tiene problemas al momento de la creación de tablas y ejecución del servicio de dynamo. Se recomienda mantener la última versión estable `^0.2.40` con las alertas de seguridad generadas.
* El siguiente script configurado en el package.json del proyecto es el encargado de
   * Levantar serverless-offline (serverless-offline)
 ```git
  "scripts": {
    "serverless-offline": "sls offline start",
    "start": "npm run serverless-offline"
  },
```
* Ejecutamos la app desde terminal.
```git
npm start
```
 
 
<br>

</details>


### 1.2) Configuración del proyecto desde cero [🔝](#índice-)

<details>
  <summary>Ver</summary>
 <br>
 
  
* Creamos un entorno de trabajo a través de algún ide, luego de crear una carpeta nos posicionamos sobre la misma
```git
cd 'projectName'
```
* Instalamos la última versión LTS de [Nodejs(v18)](https://nodejs.org/en/download)
* Instalamos Serverless Framework de forma global si es que aún no lo tenemos instalado.
```git
npm install -g serverless
```
* Verificamos la versión de Serverless instalada
```git
sls -v
```
* Inicializamos un template ts de serverles
```git
serverless create --template aws-nodejs-typescript
```
* Comprobamos la versión de typescript
```git
tsc -v
```
* Instalamos los paquetes necesarios
```git
npm i
```
* Por defecto tendremos un serverless.ts, según el gusto y configuración se puede trabajar con el mismo, para este caso, se modifica a serverless.yml y se pasa la plantilla base.
* Modificaremos la plantilla inicial. Cambiamos `serverless.ts` por `serverless.yml` para las configs estandarizadas.
* Reemplazamos la plantila serverless.ts inicial por la siguiente como modelo (cambiar nombre, etc) según la creada...
```yml

service: nombre

frameworkVersion: '3'

provider:
  name: aws
  runtime: nodejs12.x
  stage: dev
  region : us-west-1
  memorySize: 512
  timeout : 10

plugins:


functions:
  functions:
    hello:
      handler: src/functions/hello/handler.ts
      events:
        - http:
            path: /test
            method: POST
            private: true  

custom:
  serverless-offline:
    httpPort: 4000
    lambdaPort: 4002    
  serverless-offline-ssm:
    stages:
      - dev
  dynamodb:
    stages:
      - dev
```
* Instalamos serverless offline 
```git
npm i serverless-offline --save-dev
```
* Agregamos el plugin dentro del serverless.yml
```yml
plugins:
  - serverless-offlline
``` 
* Instalamos serverless ssm 
```git
npm i serverless-offline-ssm --save-dev
```
* Agregamos el plugin dentro del serverless.yml
```yml
plugins:
  - serverless-offlline-ssm
```
* Instalamos S3 local
```git
npm install serverless-s3-local --save-dev
```
 * Agregamos el plugin dentro del serverless.yml
```yml
plugins:
  - serverless-s3-local
```
* Instalamos el Cliente s3
```git
npm install @aws-sdk/client-s3
```
* Instalamos esbuild para el compilado entre js y ts
```git
npm i serverless-esbuild
```  
* Instalamos el plugin para el uso de dynamodb en local (No el servicio de dynamoDB, este viene configurado en los archivos dentro de .dynamodb).
`Importante`: Hay alertas de seguridad de dependabot que apuntan contra el plugin "serverless-dynamodb-local". No aplicar parches de seguridad a dicho plugin, ya que la versión `^1.0.2` tiene problemas al momento de la creación de tablas y ejecución del servicio de dynamo. Se recomienda mantener la última versión estable `^0.2.40` con las alertas de seguridad generadas.
```git
npm install serverless-dynamodb-local --save-dev
```
 * Agregamos el plugin dentro del serverless.yml
```yml
plugins:
  - serverless-dynamodb-local
```
* Instalamos el sdk client de dynamodb para las operaciones de db necesarias
``` git
npm install @aws-sdk/client-dynamodb
```     
* Instalamos el sdk lib de dynamodb para las operaciones de db necesarias
``` git
npm i @aws-sdk/lib-dynamodb
```
* Debemos descargar el .jar junto con su config para ejecutar el servicio de dynamodb. [Descargar aquí](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.DownloadingAndRunning.html#DynamoDBLocal.DownloadingAndRunning.title)
* Una vez descargado el .jar en formato .tar descomprimimos y copiamos todo su contenido dentro de la carpeta `.dynamodb` (La creamos a la misma altura que el directorio src, caso de no tenerla).
* Usaremos [git](https://www.hostinger.com.ar/tutoriales/instalar-git-en-distintos-sistemas-operativos) como control de versiones. Nos posicionamos en la app e inicializamos git
```git
git init
```
* Creamos el repositorio en github (sin readme) y agregamos la url del repositorio creado (ej: la siguiente)
```git
git remote add origin https://github.com/andresWeitzel/BackupSystem_SQS_SNS_S3_DynamoDB_AWS
```
* Traemos los cambios del remoto, agregamos los nuevos cambios en local, commitiamos y los subimos al repo.
```git
git pull origin master
git add *
git commit -m "Add app config"
git push origin master
```
* El siguiente script configurado en el package.json del proyecto es el encargado de
Levantar serverless-offline (serverless-offline)
```git
 "scripts": {
   "serverless-offline": "sls offline start",
   "start": "npm run serverless-offline"
 },
```
* Ejecutamos la app desde terminal.
```git
npm start
```
* Deberíamos esperar un output por consola con los siguiente servicios levantados cuando se ejecuta el comando anterior
```git
> crud-amazon-dynamodb-aws@1.0.0 start
> npm run serverless-offline

> crud-amazon-dynamodb-aws@1.0.0 serverless-offline
> sls offline start

serverless-offline-ssm checking serverless version 3.31.0.
Dynamodb Local Started, Visit: http://localhost:8000/shell
DynamoDB - created table payments-table

etc.....
```
* Ya tenemos una app funcional con una estructura inicial definida por Serverless-Framework. La aplicación queda deployada en http://localhost:4002 y podemos testear el endpoint declarado en el serverless desde postman
* `Aclaración` : El resto de las modificaciones aplicadas sobre la plantilla inicial no se describen por temas de simplificación de doc. Para más info consultar el tutorial de [Serverless-framework](https://www.serverless.com/) para el uso de servicios, plugins, etc.

<br>

</details>


### 1.3) Tecnologías [🔝](#índice-)

<details>
  <summary>Ver</summary>
 <br>

| **Tecnologías** | **Versión** | **Finalidad** |               
| ------------- | ------------- | ------------- |
| [SDK](https://www.serverless.com/framework/docs/guides/sdk/) | 4.3.2  | Inyección Automática de Módulos para Lambdas |
| [Serverless Framework Core v3](https://www.serverless.com//blog/serverless-framework-v3-is-live) | 3.23.0 | Core Servicios AWS |
| [Systems Manager Parameter Store (SSM)](https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html) | 3.0 | Manejo de Variables de Entorno |
| [Amazon Api Gateway](https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html) | 2.0 | Gestor, Autenticación, Control y Procesamiento de la Api | 
| [Amazon S3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/UsingBucket.html) | 3.0 | Contenedor de Objetos | 
| [NodeJS](https://nodejs.org/en/) | 14.18.1  | Librería JS |
| [VSC](https://code.visualstudio.com/docs) | 1.72.2  | IDE |
| [Postman](https://www.postman.com/downloads/) | 10.11  | Cliente Http |
| [CMD](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/cmd) | 10 | Símbolo del Sistema para linea de comandos | 
| [Git](https://git-scm.com/downloads) | 2.29.1  | Control de Versiones |

</br>


| **Plugin** | **Descripción** |               
| -------------  | ------------- |
| [Serverless Plugin](https://www.serverless.com/plugins/) | Librerías para la Definición Modular |
| [serverless-offline](https://www.npmjs.com/package/serverless-offline) | Este complemento sin servidor emula AWS λ y API Gateway en entorno local |
| [serverless-offline-ssm](https://www.npmjs.com/package/serverless-offline-ssm) |  busca variables de entorno que cumplen los parámetros de SSM en el momento de la compilación y las sustituye desde un archivo  |
| [serverless-s3-local](https://www.serverless.com/plugins/serverless-s3-local) | complemento sin servidor para ejecutar clones de S3 en local

</br>


| **Extensión** |              
| -------------  | 
| Prettier - Code formatter |
| YAML - Autoformatter .yml (alt+shift+f) |
| TypeScript constructor generator - automatic constructor generator | 

<br>

</details>


<br>


## Sección 2) Endpoints y Ejemplos. 


### 2.0) Endpoints y recursos [🔝](#índice-) 

<details>
  <summary>Ver</summary>
<br>

### 2.1.0) Variables en Postman

| **Variable** | **Initial value** | **Current value** |               
| ------------- | ------------- | ------------- |
| base_url | http://localhost:4000  | http://localhost:4000 |
| x-api-key | f98d8cd98h73s204e3456998ecl9427j  | f98d8cd98h73s204e3456998ecl9427j |
| bearer_token | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c  | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c |

<br>


<br>

</details>

<br>


## Sección 3) Prueba de funcionalidad y Referencias. 


### 3.0) Prueba de funcionalidad [🔝](#índice-) 

<details>
  <summary>Ver</summary>
<br>

</details>


### 3.1) Referencias [🔝](#índice-)

<details>
  <summary>Ver</summary>
 <br>



#### Api Gateway
 * [Buenas Prácticas Api-Gateway](https://docs.aws.amazon.com/whitepapers/latest/best-practices-api-gateway-private-apis-integration/rest-api.html)
 * [Creación de Api-keys personalizadas](https://towardsaws.com/protect-your-apis-by-creating-api-keys-using-serverless-framework-fe662ad37447)

 #### Dynamodb installation
 * [DynamoDB en local ejecutable](https://cloudkatha.com/how-to-install-dynamodb-locally-on-windows-10/#:~:text=How%20to%20Install%20DynamoDB%20Locally%20on%20Windows%2010,Use%20DynamoDB%20Locally%20to%20Create%20a%20Table%20)

#### DynamoDB teoría
* [Guía DynamoDB](https://www.dynamodbguide.com/local-secondary-indexes/)
* [Doc Oficial Api DynamoDB](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-dynamo-db.html#http-api-dynamo-db-create-table)
* [Definicion de atributos](https://tipsfolder.com/range-key-dynamodb-ac5558671b26d5d7f2a34cd9b138c01e/#:~:text=The%20range%20attribute%20is%20the%20type%20key%20of,%28which%20means%20it%20can%20only%20hold%20one%20value%29.)
* [Clave de Partición vs Ordenación](https://stackoverflow.com/questions/27329461/what-is-hash-and-range-primary-key)
* [Expresiones de Filtros en Dynamodb](https://www.alexdebrie.com/posts/dynamodb-filter-expressions/)
* [Ejemplos de Expresiones de Filtros en Dynamodb](https://dynobase.dev/dynamodb-filterexpression/)

#### Dynamodb operations sdk v-3
* [Operations](https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/javascript_dynamodb_code_examples.html)
* [Operations API-REST](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-dynamo-db.html)

#### Videotutoriales 
* [Dynamodb local config](https://www.youtube.com/watch?v=-KRykmVIoV0&t=663s)
* [Crud Dynamodb](https://www.youtube.com/watch?v=hOcbHz4T0Eg)

#### Dynamodb examples
* [Plugin serverless](https://www.serverless.com/plugins/serverless-dynamodb-local)
* [Creación de varias tablas](https://stackoverflow.com/questions/47327765/creating-two-dynamodb-tables-in-serverless-yml)
* [Ejemplo dynamodb serverless](https://github.com/serverless/examples/tree/v3/aws-node-rest-api-with-dynamodb-and-offline)
* [Dynamodb SDK examples](https://github.com/aws-samples/aws-dynamodb-examples/tree/master/DynamoDB-SDK-Examples/node.js)
* [CRUD Dynamodb](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-dynamo-db.html)

#### Dynamodb code
* [Api Rest Base](https://github.com/jacksonyuan-yt/dynamodb-crud-api-gateway)

#### Herramientas 
 * [Herramienta de Diseño AWS app.diagrams.net](https://app.diagrams.net/?splash=0&libs=aws4)
 * [Formateo y validador online json format](https://jsonformatter.org/)

 #### Librerías
 * [Validación de campos](https://www.npmjs.com/package/node-input-validator)
 * [Configuración de scripts en paralelo](https://stackoverflow.com/questions/30950032/how-can-i-run-multiple-npm-scripts-in-parallel)

<br>

</details>
