# API swap Bitmarketperu

Backend para la conexion con la base de datos de Bitmarketperu

Carácteristicas:
- ECMAScript 6
- Async/Await
- [Express.JS](https://expressjs.com)
- JSON request support
- [HTTP](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol)/[HTTPS](https://en.wikipedia.org/wiki/HTTPS) support
- Implementation of notifications with [Mailgun API](https://documentation.mailgun.com/en/latest/api_reference.html)
- [NPM](https://docs.npmjs.com/about-npm/)
- Static Content
- [Mongoose](https://mongoosejs.com/)

# Web App
| Route | Method | Requires auth |
|--|--|--|
| / | GET | false |
| /login | GET | false |


# Backend
## Routes 
#### USERS
| Route | Method | Required Data | Optional Data | Description |
|--|--|--|--|--|
| /api/users | GET | none | none | Returns all registered users |
| /api/users | GET | **queryString**: wallet | none | Returns a specified user by the wallet.|
| /api/users | PUT | **body**: wallet, token| **body**: username, fullname, email | Update a user |


#### Auth
| Route | Method | Required Data | Optional Data | Description |
|--|--|--|--|--|
| /api/auth/signup | POST | **body**: wallet | none | signup |
| /api/auth/login | POST | **body**: wallet, token | none | Login |
| /api/auth/logout | GET | none | none | Logout |

#### Transactions
| Route | Method | Required Data | Optional Data | Description |
|--|--|--|--|--|
| /api/transactions | GET | **headers**: token | none | Get the Transactions |
| /api/transactions | GET | **headers**: token; **queryString**: wallet | none | Get the Transactions related to a user |
| /api/transactions| PUT | **headers**: token; **body**: wallet, transactionId, status | none | Update the status of the Transactions |

# Run local

- Clone repo
  ```console
  $ git clone https://github.com/Bitmarketperu/backend.git
  ```
- set the environment variables
  ```text
  DATABASE=YOUR_STRING_CONNECT
  MAILGUN_DOMAIN=YOUR_MAILGUN_DOMAIN
  MAILGUN_API_KEY=YOUR_MAILGUN_API_KEY
  MAINGUN_SENDER=<postmaster@YOUR_MAILGUN_DOMAIN>
  ```
- Run the proyect:
  ```console
  $ npm start
  ```


  Node version: v16.16.0

  # Config Data Base
  models configs
    ```
    {
      "dolOut": 3,
      "dolInp": 3,
      "solOut": 2,
      "solInp": 3,
      "maxSol": 10000,
      "maxDol": 1000,
      "limSol": 40000,
      "limDol": 15000,
      "maxCrypto": 4000,
      "sellBit": 3.5,
      "buyBit": 2.5
    }
    ```
