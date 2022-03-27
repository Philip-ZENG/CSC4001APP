# CSC4001 PROJECT




### Project directory specification

- Node.js Express Server: `/server`
- Vue.js Client: `/client`



### Environment Setup

- Node.js
  - Version: v14.18.0



### Database

- We can use either local mysql database or AWS Remote Database System

- AWS RDS info

  - AWS Cloud Console

    - https://console.aws.amazon.com

  - AWS ADMIN ccount

    - ID: 888747168322
    - User Name: philip-admin
    - Password: CSC4001admin

  - AWS RDS "database-2 North Virginia", mySQL account

    - ```
      username: admin
      password: qweasdzxc
      ```




### How to run the demo

- Run the Express server

  - Run the following under the `/server` directory

    ```shell
    node index.js
    ```

- Run the Vue client

  - Run the following under the `/client` directory

    ```shell
    npm run serve
    ```



### About the packages

Notice: All the packages should be installed under the project directory

#### For Express server

- cors

  - Allows the client to talk to the front end

  - Package link

    ```
    https://github.com/expressjs/cors
    ```

  - Install package

    ```shell
    npm install cors --save
    ```

- morgan

  - HTTP request logger middleware for node.js

  - Package link

    ```
    https://github.com/expressjs/morgan
    ```

  - Install package

    ```shell
    npm install morgan --save
    ```

- Body Parser

  - Serves for the communication of data package between the client and server. Usually for receiving client side data.

  - Package link

    ```
    https://github.com/expressjs/body-parser
    ```

  - Install package

    ```shell
    npm install body-parser --save
    ```

- MySQL

  - Package link

    ```
    https://github.com/mysqljs/mysql
    ```

  - Install the package that can link MySQL with NodeJS. Run the code under the project root directory.

    ```shell
    npm install mysql --save
    ```

    - Remark: This command `npm install` will install the package locally. Only to this project, in this path.

#### For Vue Client

- Default packages from vue cli project setup

The only extra package used is 

- Axios

  - For communication between Vue client and Express server

  - Package link

    ```
    https://github.com/axios/axios
    ```

  - Install package

    ```
    npm install axios
    ```



### About the version control

- For every commit, commit to a new sub-branch other than the main branch

- Conduct merge action from the github website

- Use `.gitignore` file to exclude all the packages, and to avoid version conflicts

  - ```
    git checkout -b my_new_branch
    git commit
    ```