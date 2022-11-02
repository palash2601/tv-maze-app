# tv-maze-app

Single Page application to browser TV shows and see more details about it.

Data source for the application: [http://www.tvmaze.com/api](http://www.tvmaze.com/api)
## Functional Features

- Browse TV shows based on genres like Drama, Comedy, Sports etc..
- Get more details about a show like Premier date, seasons etc..
- Search for your favorites show
- Bookmark your search results and share it with your friends

## Technical Features

- Vue 3 library features like Composition API, SFC, composables
- TypeScript
- Routing with [vue-router](https://router.vuejs.org/)
- State management with Vue Refs
- Use of [PrimeVue](https://www.primefaces.org/primevue/) UI library for components like Carousel
- Skeleton on page load for
- Lazy loading of Details page
- Unit testcases with Vitest, eslint and prettier
- Accessibility complaint

## Improvements

- The TVMaze API does not provide options to query shows based on certain filter like genre, most popular shows which will be useful for most apps. As of now home page displays data based on limited data set and can be improved
- Localisation/Internalisation for multilingual support
- Paging/Load more functionality for search results

- [Virtualize Large Lists](https://vuejs.org/guide/best-practices/performance.html#virtualize-large-lists)
- PWA and Service workers
- Web Analytics
- Monitoring and Logging
- Image compressions

## Project Setup and running application

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
