<div align="center">
<img src="../doc/assets/SNS_SQS_DYNAMO_S3.drawio.png" alt="Index app" width="100%" />
<div align="right">
<img width="16" height="16" src="../doc/assets/icons/devops/png/aws.png" alt="AWS" />
<img width="16" height="16" src="../doc/assets/icons/aws/png/lambda.png" alt="Lambda" />
<img width="16" height="16" src="../doc/assets/icons/devops/png/postman.png" alt="Postman" />
<img width="16" height="16" src="../doc/assets/icons/devops/png/git.png" alt="Git" />
<img width="16" height="16" src="../doc/assets/icons/aws/png/s3.png" alt="S3" />
<img width="16" height="16" src="../doc/assets/icons/aws/png/api-gateway.png" alt="API Gateway" />
<img width="16" height="16" src="../doc/assets/icons/aws/png/sqs.png" alt="SQS" />
<img width="16" height="16" src="../doc/assets/icons/aws/png/parameter-store.png" alt="Parameter Store" />
<img width="16" height="16" src="../doc/assets/icons/backend/javascript-typescript/png/nodejs.png" alt="Node.js" />
<img width="16" height="16" src="../doc/assets/icons/aws/png/dynamo.png" alt="DynamoDB" />
<img width="16" height="16" src="../doc/assets/icons/backend/javascript-typescript/png/typescript.png" alt="TypeScript" />
</div>
</div>

<br>

<br>

<div align="right">
  <a href="../README.md" title="Español">
    <img src="../doc/assets/translation/arg-flag.jpg" width="64" height="40" alt="Español" title="Español" />
  </a>
  <a href="./README.en.md" title="Inglés">
    <img src="../doc/assets/translation/eeuu-flag.jpg" width="64" height="40" alt="Inglés" title="Inglés" />
  </a>
</div>

<br>

<div align="center">

# BackupSystem_SQS_SNS_S3_DynamoDB_AWS

</div>

A backup system for your mining-plant records to stay stored, searchable, and recoverable. It brings together name, company, deposit type, status, main mineral, and geolocation, with authenticated create, list, lookup, update, and delete on DynamoDB, and copies in S3 through SQS and SNS, so that information stays centralized and ready to integrate with the rest of your AWS services.

<div align="left">
<a href="https://www.datos.gob.ar/dataset/energia-proyectos-mineros-ubicacion-aproximada" target="_blank" rel="noopener noreferrer" title="Dataset"><img src="../doc/assets/icons/detail-actions/dataset-pill.svg" alt="Dataset" width="100" height="30" border="0" /></a>
<br>
<a href="../src/collection/Backup_System_Mining_Plants_AWS.postman_collection.json" target="_blank" rel="noopener noreferrer" title="Postman collection"><img src="../doc/assets/icons/detail-actions/postman-pill.svg" alt="Postman" width="100" height="30" border="0" /></a>
</div>


<br>

## Index 📜

<details>
 <summary> View </summary>
 
 <br>
 
### Section 1) Description, setup, and technologies

 - [1.0) Project description.](#10-description-)
 - [1.1) Running the project.](#11-running-the-project-)
 - [1.2) Project setup from scratch](#12-project-setup-from-scratch-)
 - [1.3) Technologies.](#13-technologies-)


### Section 2) Endpoints and examples
 
 - [2.0) Endpoints and resources.](#20-endpoints-and-resources-)

### Section 3) Functional test and references
 
 - [3.0) Functional test.](#30-functional-test-)
 - [3.1) References.](#31-references-)


<br>

</details>



<br>

## Section 1) Description, setup, and technologies


### 1.0) Description [🔝](#index-) 

<details>
  <summary>View</summary>
 <br>

### 1.0.0) General description

`Important`: Dependabot security alerts point at the "serverless-dynamodb-local" plugin. Do not apply security patches to that plugin, because version `^1.0.2` fails when creating tables and starting the DynamoDB service. Keep the last stable version `^0.2.40`, even with the generated security alerts.


 
### 1.0.1) Architecture and how it works


<br>

</details>


### 1.1) Running the project [🔝](#index-)

<details>
  <summary>View</summary>
  <br>
 
* Create a workspace in any IDE. You can create a root folder for the project or not. Move into that folder
```git
cd 'projectRootName'
```
* Once the workspace is ready, clone the project
```git
git clone https://github.com/andresWeitzel/BackupSystem_SQS_SNS_S3_DynamoDB_AWS
```
* Install the latest LTS version of [Node.js (v18)](https://nodejs.org/en/download)
* Install the Serverless Framework globally if you have not already
```git
npm install -g serverless
```
* Check the installed Serverless version
```git
sls -v
```
* Install every required package
```git
npm i
```
`Important`: Dependabot security alerts point at the "serverless-dynamodb-local" plugin. Do not apply security patches to that plugin, because version `^1.0.2` fails when creating tables and starting the DynamoDB service. Keep the last stable version `^0.2.40`, even with the generated security alerts.
* The script below, configured in the project package.json, is in charge of
   * Starting serverless-offline (serverless-offline)
 ```git
  "scripts": {
    "serverless-offline": "sls offline start",
    "start": "npm run serverless-offline"
  },
```
* Run the app from the terminal.
```git
npm start
```
 
 
<br>

</details>


### 1.2) Project setup from scratch [🔝](#index-)

<details>
  <summary>View</summary>
 <br>
 
  
* Create a workspace in any IDE, create a folder, and move into it
```git
cd 'projectName'
```
* Install the latest LTS version of [Node.js (v18)](https://nodejs.org/en/download)
* Install the Serverless Framework globally if it is not installed yet.
```git
npm install -g serverless
```
* Check the installed Serverless version
```git
sls -v
```
* Initialize a Serverless TypeScript template
```git
serverless create --template aws-nodejs-typescript
```
* Check the TypeScript version
```git
tsc -v
```
* Install the required packages
```git
npm i
```
* By default you get a serverless.ts. You can keep working with it. In this case it is changed to serverless.yml and the base template is applied.
* We will change the initial template. Replace `serverless.ts` with `serverless.yml` for the standardized config.
* Replace the initial serverless.ts template with the following model (change the name, and so on) according to the one you created...
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
* Install serverless offline 
```git
npm i serverless-offline --save-dev
```
* Add the plugin inside serverless.yml
```yml
plugins:
  - serverless-offlline
``` 
* Install serverless ssm 
```git
npm i serverless-offline-ssm --save-dev
```
* Add the plugin inside serverless.yml
```yml
plugins:
  - serverless-offlline-ssm
```
* Install local S3
```git
npm install serverless-s3-local --save-dev
```
 * Add the plugin inside serverless.yml
```yml
plugins:
  - serverless-s3-local
```
* Install the S3 client
```git
npm install @aws-sdk/client-s3
```
* Install esbuild to compile between JS and TS
```git
npm i serverless-esbuild
```  
* Install the plugin for local DynamoDB (not the DynamoDB service itself; that one is configured in the files inside .dynamodb).
`Important`: Dependabot security alerts point at the "serverless-dynamodb-local" plugin. Do not apply security patches to that plugin, because version `^1.0.2` fails when creating tables and starting the DynamoDB service. Keep the last stable version `^0.2.40`, even with the generated security alerts.
```git
npm install serverless-dynamodb-local --save-dev
```
 * Add the plugin inside serverless.yml
```yml
plugins:
  - serverless-dynamodb-local
```
* Install the DynamoDB SDK client for the required database operations
``` git
npm install @aws-sdk/client-dynamodb
```     
* Install the DynamoDB SDK lib for the required database operations
``` git
npm i @aws-sdk/lib-dynamodb
```
* Download the .jar and its config to run the DynamoDB service. [Download here](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.DownloadingAndRunning.html#DynamoDBLocal.DownloadingAndRunning.title)
* After downloading the .jar as a .tar, extract it and copy everything into the `.dynamodb` folder (create it at the same level as the src directory if it does not exist).
* Use [git](https://www.hostinger.com.ar/tutoriales/instalar-git-en-distintos-sistemas-operativos) for version control. Move into the app and initialize git
```git
git init
```
* Create the GitHub repository (without a README) and add the URL of the repository you created (for example, the following)
```git
git remote add origin https://github.com/andresWeitzel/BackupSystem_SQS_SNS_S3_DynamoDB_AWS
```
* Pull the remote changes, stage the new local changes, commit, and push them to the repo.
```git
git pull origin master
git add *
git commit -m "Add app config"
git push origin master
```
* The script below, configured in the project package.json, is in charge of
starting serverless-offline (serverless-offline)
```git
 "scripts": {
   "serverless-offline": "sls offline start",
   "start": "npm run serverless-offline"
 },
```
* Run the app from the terminal.
```git
npm start
```
* You should see console output with the following services up when the previous command runs
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
* You now have a working app with the initial structure defined by the Serverless Framework. The application is deployed at http://localhost:4002 and you can test the endpoint declared in serverless from Postman
* `Note` : The rest of the changes applied on top of the initial template are not described, to keep this doc short. For more info, see the [Serverless Framework](https://www.serverless.com/) tutorial on services, plugins, and so on.

<br>

</details>


### 1.3) Technologies [🔝](#index-)

<details>
  <summary>View</summary>
 <br>

| **Technologies** | **Version** | **Purpose** |               
| ------------- | ------------- | ------------- |
| [SDK](https://www.serverless.com/framework/docs/guides/sdk/) | 4.3.2  | Automatic module injection for Lambdas |
| [Serverless Framework Core v3](https://www.serverless.com//blog/serverless-framework-v3-is-live) | 3.23.0 | AWS services core |
| [Systems Manager Parameter Store (SSM)](https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html) | 3.0 | Environment variable management |
| [Amazon Api Gateway](https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html) | 2.0 | API manager, authentication, control, and processing | 
| [Amazon S3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/UsingBucket.html) | 3.0 | Object storage | 
| [NodeJS](https://nodejs.org/en/) | 14.18.1  | JS runtime |
| [VSC](https://code.visualstudio.com/docs) | 1.72.2  | IDE |
| [Postman](https://www.postman.com/downloads/) | 10.11  | HTTP client |
| [CMD](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/cmd) | 10 | Command-line shell | 
| [Git](https://git-scm.com/downloads) | 2.29.1  | Version control |

</br>


| **Plugin** | **Description** |               
| -------------  | ------------- |
| [Serverless Plugin](https://www.serverless.com/plugins/) | Libraries for modular definition |
| [serverless-offline](https://www.npmjs.com/package/serverless-offline) | This serverless plugin emulates AWS λ and API Gateway locally |
| [serverless-offline-ssm](https://www.npmjs.com/package/serverless-offline-ssm) |  Looks up environment variables that match SSM parameters at build time and replaces them from a file  |
| [serverless-s3-local](https://www.serverless.com/plugins/serverless-s3-local) | Serverless plugin to run local S3 clones

</br>


| **Extension** |              
| -------------  | 
| Prettier - Code formatter |
| YAML - Autoformatter .yml (alt+shift+f) |
| TypeScript constructor generator - automatic constructor generator | 

<br>

</details>


<br>


## Section 2) Endpoints and examples. 


### 2.0) Endpoints and resources [🔝](#index-) 

<details>
  <summary>View</summary>
<br>

### 2.1.0) Postman variables

| **Variable** | **Initial value** | **Current value** |               
| ------------- | ------------- | ------------- |
| base_url | http://localhost:4000  | http://localhost:4000 |
| x-api-key | f98d8cd98h73s204e3456998ecl9427j  | f98d8cd98h73s204e3456998ecl9427j |
| bearer_token | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c  | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c |

<br>


<br>

</details>

<br>


## Section 3) Functional test and references. 


### 3.0) Functional test [🔝](#index-) 

<details>
  <summary>View</summary>
<br>

</details>


### 3.1) References [🔝](#index-)

<details>
  <summary>View</summary>
 <br>



#### Api Gateway
 * [API Gateway best practices](https://docs.aws.amazon.com/whitepapers/latest/best-practices-api-gateway-private-apis-integration/rest-api.html)
 * [Creating custom API keys](https://towardsaws.com/protect-your-apis-by-creating-api-keys-using-serverless-framework-fe662ad37447)

 #### Dynamodb installation
 * [Runnable local DynamoDB](https://cloudkatha.com/how-to-install-dynamodb-locally-on-windows-10/#:~:text=How%20to%20Install%20DynamoDB%20Locally%20on%20Windows%2010,Use%20DynamoDB%20Locally%20to%20Create%20a%20Table%20)

#### DynamoDB theory
* [DynamoDB guide](https://www.dynamodbguide.com/local-secondary-indexes/)
* [Official DynamoDB API docs](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-dynamo-db.html#http-api-dynamo-db-create-table)
* [Attribute definition](https://tipsfolder.com/range-key-dynamodb-ac5558671b26d5d7f2a34cd9b138c01e/#:~:text=The%20range%20attribute%20is%20the%20type%20key%20of,%28which%20means%20it%20can%20only%20hold%20one%20value%29.)
* [Partition key vs sort key](https://stackoverflow.com/questions/27329461/what-is-hash-and-range-primary-key)
* [Filter expressions in DynamoDB](https://www.alexdebrie.com/posts/dynamodb-filter-expressions/)
* [DynamoDB filter expression examples](https://dynobase.dev/dynamodb-filterexpression/)

#### Dynamodb operations sdk v-3
* [Operations](https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/javascript_dynamodb_code_examples.html)
* [Operations API-REST](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-dynamo-db.html)

#### Video tutorials 
* [Dynamodb local config](https://www.youtube.com/watch?v=-KRykmVIoV0&t=663s)
* [Crud Dynamodb](https://www.youtube.com/watch?v=hOcbHz4T0Eg)

#### Dynamodb examples
* [Serverless plugin](https://www.serverless.com/plugins/serverless-dynamodb-local)
* [Creating several tables](https://stackoverflow.com/questions/47327765/creating-two-dynamodb-tables-in-serverless-yml)
* [Serverless DynamoDB example](https://github.com/serverless/examples/tree/v3/aws-node-rest-api-with-dynamodb-and-offline)
* [Dynamodb SDK examples](https://github.com/aws-samples/aws-dynamodb-examples/tree/master/DynamoDB-SDK-Examples/node.js)
* [CRUD Dynamodb](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-dynamo-db.html)

#### Dynamodb code
* [Base REST API](https://github.com/jacksonyuan-yt/dynamodb-crud-api-gateway)

#### Tools 
 * [AWS design tool app.diagrams.net](https://app.diagrams.net/?splash=0&libs=aws4)
 * [Online JSON formatter and validator](https://jsonformatter.org/)

 #### Libraries
 * [Field validation](https://www.npmjs.com/package/node-input-validator)
 * [Running npm scripts in parallel](https://stackoverflow.com/questions/30950032/how-can-i-run-multiple-npm-scripts-in-parallel)

<br>

</details>
