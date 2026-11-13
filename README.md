# IBM Express Book Review — Complete Coursework Project

This is a **working independent implementation** matching IBM's Express Book Review REST API exercises. It is *not an actual GitHub fork*. The IBM upstream repository currently appears at: https://github.com/ibm-developer-skills-network/expressBookReviews (plural). The assessment calls it `expressBookReview` (singular). For **Question 1**, fork the actual upstream repository in your own account and copy the contents of this project into its `final_project/` directory (or integrate the files individually).

## Prerequisites

Node.js 18+, npm, curl, and an internet connection for the initial `npm install`.

## Get started

```bash
npm install
npm start
```

Server: http://127.0.0.1:5000. In another terminal, test it:

```bash
curl -i http://127.0.0.1:5000/
curl -i http://127.0.0.1:5000/isbn/1
curl -i 'http://127.0.0.1:5000/author/Chinua%20Achebe'
curl -i 'http://127.0.0.1:5000/title/Things%20Fall%20Apart'
curl -i http://127.0.0.1:5000/review/1
```

## Generate Questions 1–10 evidence

Stop a manually started server first (evidence collection starts its own clean server). Run:

```bash
GITHUB_USERNAME=YOUR_GITHUB_USERNAME npm run evidence
```

This creates `evidence/githubrepo`, `getallbooks`, `getbooksbyISBN`, `getbooksbyauthor`, `getbooksbytitle`, `getbookreview`, `register`, `login`, `reviewadded`, and `deletereview`. The evidence generator actually executes cURL calls, captures **real HTTP responses**, registers a temporary demo user, logs in, adds a book review, then deletes it. The script requires your GitHub username to verify the actual fork and does not create or fake one.

**Important:** The `evidence/` files in the downloaded ZIP initially contain *instructions, not fabricated execution results*. They become verified results only after you run this script locally. Make sure port 5000 is free. Registration and reviews are in-memory and reset when the server stops.

## Question 11: Public URL of `general.js`

1. Visit https://github.com/ibm-developer-skills-network/expressBookReviews and select **Fork**.
2. Clone your fork, then copy this project's `index.js`, `package.json`, `router/` and other new files into the fork's `final_project/` directory. The original README and other course files can remain.
3. Commit and push your files to your fork's `main` branch:

```bash
git add final_project
 git commit -m "Complete Express Book Review final assignment"
 git push origin main
```

4. Paste the real link, using your GitHub username (check the link opens publicly):

```text
https://github.com/YOUR_GITHUB_USERNAME/expressBookReviews/blob/main/final_project/router/general.js
```

**Do not use the template URL as your submission.** The actual user fork must exist.

## Questions mapped to evidence

| Question | Evidence filename | Endpoint / action |
|---|---|---|
| 1 | `githubrepo` | GitHub API fork information (only verifiable after fork) |
| 2 | `getallbooks` | GET `/` |
| 3 | `getbooksbyISBN` | GET `/isbn/1` |
| 4 | `getbooksbyauthor` | GET `/author/Chinua%20Achebe` |
| 5 | `getbooksbytitle` | GET `/title/Things%20Fall%20Apart` |
| 6 | `getbookreview` | GET `/review/1` |
| 7 | `register` | POST `/register` |
| 8 | `login` | POST `/customer/login` |
| 9 | `reviewadded` | PUT `/customer/auth/review/1` |
| 10 | `deletereview` | DELETE `/customer/auth/review/1` |
| 11 | `question11-url.txt` | Link to public `router/general.js` in your fork |

## Axios implementation

`router/general.js` contains the traditional public endpoints and four extra Axios-based routes for tasks 10–13:

- GET `/asyncbooks` — `axios.get(...).then(...)` (promise callback)
- GET `/asyncbooks/isbn/:isbn` — `async/await`
- GET `/asyncbooks/author/:author` — `async/await`
- GET `/asyncbooks/title/:title` — `async/await`

## Notes

The sample book dataset is included in `router/booksdb.js` for reproducible demonstrations. This is an exercise-oriented service: its storage and session store are in-memory, so it is **not production-ready**. The script writes a temporary username/password as part of cURL command evidence; avoid using a real password or publishing those evidence files unchanged.
