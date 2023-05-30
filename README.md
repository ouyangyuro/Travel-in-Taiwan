## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## 🗄️ Project Structure

Most of the code lives in the src folder and looks like this:

```sh
src
|
+-- assets      # assets folder can contain all the static files such as images, global styles, etc.
|
+-- components  # shared components used across the entire application
|
+-- config      # all the global configuration, env variables etc. get exported from here and used in the app
|
+-- features    # feature based modules
|
+-- hooks       # shared hooks used across the entire application
|
+-- pages       # routes configuration
|
+-- redux       # global state stores
|
+-- templates   # global template layout
|
+-- utils       # shared utility functions
```

In order to scale the application in the easiest and most maintainable way, keep most of the code inside the `features` folder, which should contain different feature-based things. Every `feature` folder should contain domain specific code for a given feature. This will allow you to keep functionalities scoped to a feature and not mix its declarations with shared things. This is much easier to maintain than a flat folder structure with many files.

A feature could have the following structure:

```sh
src/features/home
|
+-- api         # exported API request declarations and api hooks related to a specific feature
|
+-- components  # components scoped to a specific feature
|
+-- hooks       # hooks scoped to a specific feature
```

## 📝 Rules For Git Commit

```sh
新增/修改功能 (feature)
feat: Use this keyword to indicate that you are committing to a new feature.
"feat: Add new login functionality."

修補 bug (bug fix)
fix: Use this keyword to indicate that you are committing a fix for a specific problem or issue.
"fix: Fix bug causing crashes on certain devices."

格式 (不影響程式碼運行的變動 white-space, formatting, missing semi colons, etc)
style: Use this keyword to indicate that you are making changes to the style or formatting of the code, but not its functionality.
"style: Update indentation in main.js."

重構 (既不是新增功能，也不是修補 bug 的程式碼變動)
refactor: Use this keyword to indicate that you are making changes to the code that improve its structure or organisation, but do not add new features or fix bugs.
"refactor: Refactor the code to improve readability."

增加測試/重構測試 (adding missing tests, refactoring tests; no production code change)
test: Use this keyword to indicate that you are adding or updating tests for the code.
"test: Add new unit tests for login functionality."

建構程序或輔助工具的變動 (updating grunt tasks etc; no production code change)
chore: Use this keyword to indicate that you are making changes to the build process or other tasks that are not directly related to the code itself.
"chore: Update dependencies in package.json."

改善效能 (A code change that improves performance)
perf: Use this keyword to indicate that you are making changes to improve the performance of the code.
"perf: Optimize image loading for faster performance."

文件 (documentation)
docs: Use this keyword to do change anything about documentations.
"docs: Added project structure and rules for git commit to README.md of docs."
```
