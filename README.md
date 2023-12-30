# Front-end Project - ecommerce shop

![TypeScript](https://img.shields.io/badge/TypeScript-v.4-green)
![SASS](https://img.shields.io/badge/SASS-v.4-hotpink)
![React](https://img.shields.io/badge/React-v.18-blue)
![Redux toolkit](https://img.shields.io/badge/Redux-v.1.9-brown)

[https://ecommerce-project-sigma-seven.vercel.app/](https://ecommerce-project-sigma-seven.vercel.app/)

## Introduction:

A frontend ecommerce project providing a basic webshop experience with the use of a .NET backend API.
API endpoint: [https://ecommerce-fullstack.azurewebsites.net/api/v1/](https://ecommerce-fullstack.azurewebsites.net/api/v1/).
Backend Repo: [https://github.com/galeksi/fs16_CSharp-FullStack](https://github.com/galeksi/fs16_CSharp-FullStack)

The project provides CRUD operations for Products, Users, Categories as well as fileuploads and authentification.

The project is build with create-react-app and Typescript using Redux toolkit for statemanagement. Additional external libraries to mention are react-router for routing, axios for fetching and Material-UI for styling.

## Table of Content:

1. Introduction
2. Table of Content
3. Getting Started
4. Usage
5. Architecture & Design
6. Deployment

## Getting Started:

Clone the repo with git clone git@github.com:galeksi/ecommerce-project.git

Install all dependencies with `npm intstall` or `yarn install`.

.env file includes:

- REACT_APP_CLOUD_URL
- REACT_APP_CLOUD_NAME
- REACT_APP_PRESET

## Usage:

#### Scripts:

- `npm start`: start dev server
- `npm run build`: create production build
- `npm run eject`: Remove single build dependency from project

#### Features:

![Features](Features.jpg)

## Architecture & Design:

#### The project follows a horizontal arcitecture:

![Structure](Horizontal-structure.jpg)

State in managed globally with a redux-toolkit store with its reducers/slices in folder "redux". There are five main pages handled with react-router:

- Homepage/ProductList
- ProductDetail page
- Cart
- Register page
- Profile page

```
.
├── public
├── src
│   ├── components
│   ├── hooks
│   ├── pages
│   ├── redux
│   ├── test
│   ├── types
│   ├── utils
│   ├── App.tsx
│   ├── index.scss
│   ├── index.tsx
│   ├── react-app-env.d.ts
│   ├── reportWebVitals.ts
│   └── setupTests.ts
├── Features.jpg
├── Horizontal-Structure.jpg
├── package-lock.json
├── package.json
├── README.md
└── tsconfig.json
```

## Deployment:

To deploy run optimized production build with npm run build and provide build for any statig website hosting platform.

Public version is hosted with [https://vercel.com/](https://vercel.com/)
