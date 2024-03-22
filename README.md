# Bkash Payment Gateway System

## Description

This project is a backend service for Bkash Integration - CHECKOUT (URL BASED)

## Features

- Grant Token
- Create Payment
- Execute Payment

## Installation

To run this project, follow these steps:

1. Clone the repository: `git clone https://github.com/FahimJadid/bkash-payment-system-backend.git`
2. Install the dependencies: `npm install`
3. Start the project: `npm start`
4. Add .env file

## .env example
```
PORT = 5000
 
DATABASE_URL = 

BKASH_USERNAME = ''
BKASH_PASSWORD = ''
BKASH_APP_KEY = ''
BKASH_APP_SECRET = ''

bkash_grant_token_url = https://tokenized.sandbox.bka.sh/v1.2.0-beta/tokenized/checkout/token/grant
bkash_create_payment_url =  https://tokenized.sandbox.bka.sh/v1.2.0-beta/tokenized/checkout/create
bkash_execute_payment_url = https://tokenized.sandbox.bka.sh/v1.2.0-beta/tokenized/checkout/execute
bkash_refund_transaction_url = https://tokenized.sandbox.bka.sh/v1.2.0-beta/tokenized/checkout/payment/refund

backend_callback_url= "http://localhost:5000/api/v1/payment/bkash/callback",

STORE_ID= 
STORE_PASSWORD=
IS_LIVE=false

```

## Usage

After starting the project, it will listen for requests on `http://localhost:5000`. You can use a tool like Postman to send requests to the API endpoints.

## Contributing

If you want to contribute, please fork the repository and create a pull request. We appreciate any help!

## License

This project is licensed under the MIT License.
