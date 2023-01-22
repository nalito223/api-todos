# api-todos

This app is the back-end server for the [Todos showcase project](https://todos-tau-nine.vercel.app/)

The back-end is an Express API serverless function [deployed](https://olivia-ruth-arts-api.vercel.app/art) on Vercel. 

### Installation
- Clone down this repo, and cd into it.
- `npm install` to download all dependencies
- `node server.js`


### Endpoints

| url | verb | options | sample response |
| ----|------|---------|---------------- |
| `http://localhost:3001/todos` | GET | not needed | An array containing all existing todos |
| `http://localhost:3001/todos/:id` | GET | not needed | The requested todo object: `{id: <String> , content: <String>,  date: <String>, destination: {droppableId: <String>, index: <Number>}` |
| `http://localhost:3001/todos/` | POST | `{content: <String>,  date: <String>, destination: {droppableId: <String>, index: <Number>}` | Created object: `{id: <String> , content: <String>,  date: <String>, destination: {droppableId: <String>, index: <Number>}` |
| `http://localhost:3001/todos/:id` | DELETE | not needed |  An array containing all existing art pieces reflecting the new data without the deleted piece |
