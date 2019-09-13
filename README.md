# Invoice Service Challenge

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.0.3.

## Steps to run local

## Install command

Download the Zip file or Clone the application and go to the downloaded folder, perform below step:
        
      Run `npm install` to install dependencies from package.json.

## Running the Application + Mock Json-server

      Go to the downloaded project folder -> Run `ng serve` or `npm start` from console.
      e.g) `C:\Users\CodeChallenge\invoice-calculator>ng serve`

      Open another console/terminal and inside project folder(invoice-calculator), go to folder (invoice-calculator/src/app/db-json/)
      then run the command - 'json-server --watch db.json'
      e.g) `C:\Users\CodeChallenge\invoice-calculator\src\app\db-json>json-server --watch db.json`

Task for the challenge:
  ##Workflow / User Journey
1. On load, the user is presented with a form, which includes:
   - A customer selector (list retrieved from API) - Done, customer list will be populated from json server
   - A date range (start and end date) - Done - UI have the option to select both dates
   - After submitting the form, the orders are retrieved from the API  - Done - Orders API is mocked using json server
2. The page then displays the following:
   - A list of all the orders - Done - Order result page will display all orders, given the option of pagination
        Default size of pagination is 10, we can edit it as well.
   - The recipient name and email address - Done
   - The total price of the order (based on the total_price from each item) - Done
   - When the order was made - Done
   - The items within the order - Done , in the UI, user can click on 'show' button which will display the items
   - The delivery details - Done
3. A summary at the top of the page - Additional summary companent created for displaying summary data
   - The date range and the total number of days - Done
   - The total amount to invoice (based on the charge_customer value) - Done
   - The number of orders - Done
4. Devise a way of storing the current state of the app, such that the user is able to refresh the page, 
      and when the app reloads the previous state is displayed 
      (i.e. including the state of the form and the orders retrieved) 
   - Done, for implementation, I have used local storage. So the
      user can refresh the page, still the page will laod with previsous selected data

## Optional

## If want to run development server individual 

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## If want to run JSON server individual

Run `npm run mock:server` for a json server. Navigate to `http://localhost:3000/`.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
