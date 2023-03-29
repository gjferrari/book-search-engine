# Book Search Engine

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

- [Description](#description)
- [User Story](#user-story)
- [Install](#install)
- [Visuals](#visuals)
- [Deployed Application](#deployed-application)
- [License](#license)
- [Acceptance Criteria](#acceptance-criteria)

## Description

For this application code, I started with a fully functioning Google Books API search engine built with a RESTful API, and refactored it to be a GraphQL API built with Apollo Server. In order to accomplish this I:

1. Set up an Apollo Server to use GraphQL queries and mutations to fetch and modify data, replacing the existing RESTful API.

2. Modified the existing authentication middleware so that it worked in the context of a GraphQL API.

3. Created an Apollo Provider so that requests could communicate with an Apollo Server.

4. Deployed my application to Heroku with a MongoDB database using MongoDB Atlas.

## User Story

```md
AS AN avid reader
I WANT to search for new books to read
SO THAT I can keep a list of books to purchase
```

## Installation

First clone the repository. Install all dependencies using 'npm i' in the command terminal, and run the code using 'npm run start'.

## Visuals

- [Screenshot of Homepage](./assets/searchPage.png)
- [Screenshot of Login](./assets/loginPage.png)
- [Screenshot of Search Page](./assets/bookPage.png)
- [Screenshot of Saved Book Page](./assets/savedBooks.png)

## Deployed Application

[Click-Here-For-The-Live-URL](https://greatest-booksearch-live.herokuapp.com/)<br/>
[Click-Here-For-The-GitHub-Repository](https://github.com/gjferrari/book-search-engine)<br/>

## License

This application is covered by the MIT license.

To see more of my work, follow me at github.com/gjferrari.
For further questions about this project, contact me at genferrari@gmail.com.
