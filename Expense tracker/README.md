Apologies for the oversight. Here's an updated version of the readme with the addition of Helmet middleware for backend security:

---

# Expense Tracker Application

The Expense Tracker application is designed to help users track and manage their expenses effectively. It provides a user-friendly interface for entering and categorizing expenses, and visualizing spending patterns. The application targets individuals and small businesses seeking a simple and efficient solution for tracking their financial transactions.

## How to Use the App

1. Sign Up: Create a new account by providing your email address and password.
2. Log In: Enter your credentials to log in to your existing account.
3. Add Expenses: Click on the "Add Expense" button to enter details such as amount, date, category, and description for each expense.
4. Categorize Expenses: Categorize your expenses into different categories to organize and analyze them better. You can create custom categories and assign expenses to them.

## Installation and Local Setup

To install and run the Expense Tracker application on your local machine, follow these steps:

1. Clone the Repository: Start by cloning the repository to your local machine.

Backend Setup:

1. Navigate to the "Expense tracker" directory.
2. Create a `.env` file in the root directory of the backend.
3. Add the following environment variables to the `.env` file:
   ```
   MONGO_URL=<your MongoDB connection URL>
   PORT=5000
   JWT_SECRET=<your secret key>
   DB_NAME=<your MongoDB database name>
   ```
4. Run `npm install` to install the dependencies.
5. Run `npm start` to start the backend server.

Frontend Setup:

1. Navigate to the "client" directory.
2. Run `npm install` to install the dependencies.
3. Run `npm start` to start the frontend development server.

Open the Application:

1. Open your web browser and visit http://localhost:3000 to access the Expense Tracker application.

Note: Make sure you have MongoDB installed and running on your local machine before running the application. Update the `.env` file with your MongoDB connection URL, secret key, and database name.

## System Roles and Permissions

The Expense Tracker application will implement role-based access control to differentiate between administrators and normal users. The roles and their corresponding permissions are defined as follows:

1. Administrator:

   - Can add, view, edit, and delete expenses and incomes.
   - Has access to all administrative features and functionalities.
   - Can manage user accounts and permissions.

2. Normal User:
   - Can add and view expenses and incomes.
   - Cannot edit or delete expenses and incomes.
   - Does not have access to administrative features.

By implementing this role-based access control, the Expense Tracker application ensures that administrators have complete control over expense and income management, while normal users have limited permissions to maintain data integrity and security.

The application's backend API will include the necessary authentication and authorization mechanisms to enforce these role-based permissions. When a user logs in, their role will be determined, and the corresponding permissions will be applied to their actions within the application.

The frontend interface will reflect these permissions, disabling or hiding edit and delete options for expenses and incomes created by other users for normal users.

This role-based access control enhances the security and data integrity of the application, allowing administrators to manage and maintain expense and income records while providing normal users with the necessary functionality to track and view their financial transactions.

## Testing

The Expense Tracker application includes a comprehensive test suite to ensure the correctness and reliability of the codebase. The tests cover various scenarios and functionalities, expense management, and data retrieval for the backend.

To run the tests, follow these steps:

1. Navigate to the "client" directory.
2. Run `npm test` tests.

The test results will be displayed in the console.

## Security Measures

We have taken the following measures to ensure the security of the Expense Tracker application:

- Authentication: The application uses JSON Web Tokens (JWT) for authentication. User passwords are hashed and stored securely in the database.
- Environment Variable Protection: Sensitive information, such as MongoDB connection URL and secret keys, is stored in environment variables and not committed to the code repository.
- Helmet Middleware: The backend utilizes the Helmet middleware to add various security-related HTTP headers to enhance the application's security.

## Third-Party APIs

The Expense Tracker application utilizes the following third-party APIs:

- MongoDB: The application uses MongoDB as the database for storing expense data. MongoDB is a popular NoSQL database that provides flexibility and scalability.

## Deployment

## Deployment Note

Please note that the Expense Tracker application will not be deployed to a live server as originally planned. The decision to not deploy the application was made due to changes in the availability of free hosting options, specifically the removal of free hosting plans by Heroku.

During the development process, it was discovered that Heroku's free tier no longer provides the necessary resources to host the application. Upon talking to the lecture, we were told not to deploy but put it in the README why it was not deployed and I also did mention it to Hyperiondev support when i was begging for an extention.

As a result, the Expense Tracker application will be provided as a local development setup. You can access the application's source code and relevant files on GitHub at the following link: [Expense Tracker GitHub Repository](https://github.com/DanisonMabitsela/Expense-Tracker)

Users can clone the repository, set up the required dependencies, and run the application locally on their machines for testing and evaluation purposes.

# Expense Tracker Application - Software Requirements Documentation

## System Architecture

The Expense Tracker application is built using a client-server architecture with a web stack. The chosen architecture for this application includes the following components:

Frontend: The frontend of the application will be developed using React.js, a popular JavaScript library for building user interfaces. To kickstart the development process, Create React App (CRA) will be used. CRA provides a pre-configured setup, build tools, and development environment for React applications, allowing for a faster development workflow.

Backend: The backend of the application will be developed using Node.js. It will utilize Express.js, a minimal and flexible Node.js framework for building web applications. The backend will handle API requests, perform data validation, and interact with the database.

Database: The application will utilize MongoDB as the database for storing expense data. MongoDB is a NoSQL database that provides flexibility and scalability for handling complex data structures. To interact with MongoDB, the Mongoose library will be used. Mongoose is an object data modeling (ODM) library that simplifies working with MongoDB in Node.js.

Deployment: The application will be deployed using a cloud platform such as Heroku or AWS. The choice of deployment platform will depend on factors such as scalability, cost, and ease of use. The deployment process will involve setting up the necessary infrastructure, configuring the server, and ensuring high availability and security.

Styling: The application will follow a separate CSS file approach for styling. CSS files will be created separately and linked to the corresponding components or pages. This traditional approach allows for more straightforward management of styles, modularity, and better separation of concerns.

The chosen architecture leverages the strengths of React.js and Node.js, allowing for efficient development, separation of concerns, and scalability. By utilizing a web stack and cloud deployment, the application can provide a responsive and reliable user experience.

# System Requirements Specification

## Application Overview

The Expense Tracker application is designed to help users track and manage their expenses effectively. It provides a user-friendly interface for entering and categorizing expenses, generating reports, and visualizing spending patterns. The application targets individuals and small businesses seeking a simple and efficient solution for tracking their financial transactions.

## User Stories

- Angus, a freelancer, wants to be able to add new expenses with details such as amount, date, category, and description. This will help him keep track of his project-related expenses and easily categorize them for invoicing and tax purposes.

- Linda, a college student, would like to view and edit her existing expenses. This will enable her to manage her monthly budget effectively, make adjustments when necessary, and analyze her spending patterns.

- Alex, a small business owner, wants to categorize his expenses into different categories for better organization and analysis. This will allow him to track expenses across different departments or cost centers, making it easier for financial reporting and budget planning.

- Chad, a frequent traveler, wants to view summary reports of his expenses, including total spending, spending by category, and trends over time. This will help him understand his travel expenses and make informed decisions regarding budgeting and future travel plans.

## Competitor Analysis

Currently, there are several expense tracker applications available in the

market, each with its own strengths and weaknesses. A competitive analysis has been conducted to identify key features and functionalities that are important to users and differentiate the Expense Tracker application from its competitors.

Based on the analysis, the Expense Tracker application aims to provide the following unique features:

1. User-Friendly Interface: The application will have an intuitive and user-friendly interface, allowing users to quickly and easily enter and manage their expenses.

2. Customizable Categories: Users will be able to create custom expense categories and assign expenses to them. This flexibility allows for better organization and analysis of expenses based on individual needs.

3. Reporting and Visualization: The application will provide comprehensive reports and visualizations to help users gain insights into their spending patterns, identify trends, and make informed financial decisions.

4. Scalability and Security: The architecture and design of the application will prioritize scalability and security, ensuring that it can handle a large number of users and protect user data.

By focusing on these key features, the Expense Tracker application aims to provide a competitive and user-centric solution for expense tracking and management.

## Data Model

The Expense Tracker application will store the following data for each expense:

- `id`: Unique identifier for the expense.
- `amount`: The amount of the expense.
- `description`: Additional description or notes for the expense.

The data model will be designed to accommodate future enhancements and additional features, such as multi-currency support and attachments.

## Wireframes

Wireframes have been created to visualize the layout and user interface of the Expense Tracker application. The wireframes depict the main screens and functionalities, including the home screen, expense entry form, expense list, and reporting/dashboard.

The wireframes provide a clear understanding of the application's structure and user flow, serving as a reference for the frontend development process.

## Technical Specifications

The Expense Tracker application will be developed using the following technologies and frameworks:

Frontend:

- React.js: A JavaScript library for building user interfaces.
- Create React App: A pre-configured setup and development environment for React applications.
- React Router: A library for handling routing and navigation within the application.

Backend:

- Node.js: A JavaScript runtime for building server-side applications.
- Express.js: A minimal and flexible Node.js web application framework.
- MongoDB: A NoSQL database for storing expense data.
- Mongoose: An object data modeling (ODM) library for MongoDB in Node.js.
- JSON Web Tokens (JWT): A secure method for authenticating API requests.

Testing:

- Mocha: A feature-rich JavaScript testing framework.
- Chai: An assertion library for writing test assertions in a readable style.
