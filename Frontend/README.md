# CodeBench MVP

React + Vite frontend for a LeetCode-style coding platform.

## Current features

- Home, login, register, problems list, and problem detail routes
- Search, difficulty filters, and pagination on the problems page
- Split problem/editor workspace with `react-split`
- Monaco editor with JavaScript, Python, and C++ starter code
- Output console with visible test case results
- Mock submit flow shaped like the future backend validation flow
- API client prepared for `VITE_API_URL`

## Run locally

```bash
npm install
npm run dev
```

## Verify

```bash
npm run lint
npm run build
```

## Backend handoff

The frontend currently uses mocked execution in `src/utils/execution.js`. Replace that with API calls to an Express service that validates submissions on the backend, fetches hidden test cases from MongoDB, sends wrapped code to Judge0, compares outputs, and returns `Accepted`, `Wrong Answer`, or runtime errors.
