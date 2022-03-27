# CSC4001 PROJECT



### Project directory specification

- Node.js Express Server: `/server`
  - Server: `server/index.js`

- Vue.js Client: `/client`
  - Home page: `client/src/views/HomeView.vue`
  - Activity creation page: `client/src/views/ActivityCreationView.vue`
  - Login page: `client/src/views/LoginView.vue`
  - Register page: `client/src/views/PersonalInfoView.vue`
  - Personal info page: `client/src/views/PersonalInfoView.vue`
  - Setting page: `client/src/views/SettingView.vue`
  - Activity list page: `client/src/views/ActivityListView.vue`
  - Activity Management page: `client/src/views/ActivityManagementView.vue`
  - Notification page: `client/src/views/NotificationView.vue`




### Environment Setup

- Node.js
  - Version: v14.18.0
- Vue.js 
  - Version: v3.2.13

- MySQL
  - Version: v8.0.27 




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
  
  - Login From terminal
  
    - ```shell
      mysql --host=database-2.c0pbv8ca91j5.us-east-1.rds.amazonaws.com --user=admin --password=qweasdzxc
      ```



### Implication Specification

- Database specification (焯儒)

  Attributes are list below; Constrains are listed after the attribute

- First Rank

  - Activity-User
    - Activity-id (Primary-Key)
    - User-id (Foreign Key)
    - Role: initiator/participants
  - User
    - User-id (Primary Key)
    - Email (Unique)
    - Password
    - User Name
    - Gender
    - My portrait: Select from given range
    - Phone Number
    - Bio: a sentence to describe yourself
  - Activity
    - Activity-id (Primary Key)
    - Title
    - Activity Time (Time & Date)
    - Activity Location
    - Description
    - Activity Picture
    - Current Number of participants
    - Maximum Number of participants
    - Activity type: Given range
    - Heat Score: Number of visits

- Second Rank

  - Following
    - Follower-id
    - Followee-id
  - Comment
    - Activity-id
    - User-id
    - Content
  - View History
    - User-id
    - Activity-id: list of viewed activity

- Functional
  - User register/ User login (骆锴)
  - User information editing (骆锴)
    - Change email
    - Change password
  - Email Verification (骆锴)
    - Send verification code to user email and server
    - Verify the two code
    - Expire within 60 seconds
    - After verification succeed, store user account info into the database
  - Create Activity (博一)
    - Time: minimum time unit every 15/30 minutes
  - Activity Management (焯儒）
    - Edit existing activity information
    - Add/delete participants
    - Change manager: initiator is the default manager
  - Activity Search (博一)
    - Given tag
    - Create Time (Ascending/Descending)
    - Need the least member to join
    - Heat
  - Notification （焯儒）
    - Auto notify participants
    - Inform the participants 0.5 hour ahead

- Page
  - Main Page (博一)
    - Display and searching
    - Activity Creation
  - Login Page (骆锴)
  - Personal Information (骆锴)
  - Activity Management (焯儒)
    - Activity Creation
    - Management
  - Notification (焯儒)
  - Navigation Bar (焯儒)




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

    ```shell
    npm install axios --save
    ```



### Version control

- To avoid version control problems, please follow the procedure:

  - For every commit, commit to a new sub-branch other than the main branch
  - Setup a PULL REQUEST from github website after pushing
  - Conduct merge action from the github website

- Pushing command from terminal

  - Create a new branch

    - ```shell
      git checkout -b my_new_branch
      ```

  - Stage files

    - ```shell
      git add .
      ```

  - Commit

    - ```shell
      git commit -m "message"
      ```

  - Push

    - ```shell
      git push
      ```

- For conflicting version

  - Try pulling from the repository before pushing