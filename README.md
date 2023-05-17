# old.st-labs-assessment-pokedex

## How to run:
Install dependencies
```
npm install
```

Run development server
```
npm run dev
```

## File Guide for Code Reviewers
`pages/api` - contains the bulk of the API requests to pokeapi.co (images were also retrieved from here due to the provided CMS being down).

`utils` - contains utility functions for data management and processing

`pages/index.js` - home page

`pages/pokemon/{id}` - detailed pokemon info page

## Endpoints:
`/` - home page, includes card view of pokemons from pokeapi.co

`/pokemon/{id}` - more detailed information on a specific pokemon identified by their ID

## Achieved
- Data Fetching
- Detailed info view
- Partial sorting/filtering (logic issue with useEffect) in card view list

## For Improvement
- Query optimizations

## Dependencies:
```
next
react
react-dom
tailwindcss
postcss
autoprefixer
```
