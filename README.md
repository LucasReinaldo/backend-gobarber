<h1 align="center">GoBarber Backend API</h1>
<p align="center">A barber app that allows the barber to see his agenda for the day and users to book appointments with their favourite barber.</p>

## 💻 Project

The Backend API basically updates the profile and shows the appointments of the day, month and according to the barber id.

## 💡 Patterns

For this project I used SOLID principles and Domain Driven Design.

## 🚀 Technologies

The project was developed during the GoStack Bootcamp by RocketSeat, developed mainly with the following technologies:

```
"dependencies": {
  "aws-sdk": "^2.690.0",
  "bcryptjs": "^2.4.3",
  "celebrate": "^12.1.1",
  "class-transformer": "^0.2.3",
  "cors": "^2.8.5",
  "date-fns": "^2.14.0",
  "dotenv": "^8.2.0",
  "express": "^4.17.1",
  "express-async-errors": "^3.1.1",
  "handlebars": "^4.7.6",
  "ioredis": "^4.17.3",
  "jsonwebtoken": "^8.5.1",
  "mime": "^2.4.6",
  "mongodb": "^3.5.8",
  "multer": "^1.4.2",
  "nodemailer": "^6.4.6",
  "pg": "^8.0.2",
  "rate-limiter-flexible": "^2.1.7",
  "redis": "^3.0.2",
  "reflect-metadata": "^0.1.13",
  "tsyringe": "^4.2.0",
  "typeorm": "^0.2.24",
  "uuidv4": "^6.0.7"
},

"devDependencies": {
  "@typescript-eslint/eslint-plugin": "^2.28.0",
  "@typescript-eslint/parser": "^2.28.0",
  "eslint": "^5.16.0",
  "eslint-config-airbnb-base": "^14.1.0",
  "eslint-config-prettier": "^6.10.1",
  "eslint-import-resolver-typescript": "^2.0.0",
  "eslint-plugin-import": "^2.20.1",
  "eslint-plugin-prettier": "^3.1.3",
  "jest": "^26.0.1",
  "prettier": "^2.0.4",
  "ts-jest": "^26.0.0",
  "ts-node-dev": "^1.0.0-pre.44",
  "tsconfig-paths": "^3.9.0",
  "typescript": "^3.8.3"
}

VS Code with EditorConfig and ESLint
```

## 📚 How To Use

To clone and run this application, we will need NodeJS + Yarn (or NPM) installed.

After this clone the repository, from our command line:

```
# Clone this repository
$ git clone https://github.com/LucasReinaldo/backend-gobarber.git

# Go into the repository
$ cd backend-gobarber

# Install dependencies
$ yarn install

# Run the app
$ yarn dev:start

# Tests (Jest)
$ yarn test
```

## 📖 License

This project is under MIT license [LICENSE](LICENSE.md) to know more.
