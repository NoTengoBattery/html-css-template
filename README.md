# HTML/CSS/JS Project Template
Use this template to initialize your HTML+CSS+JS project (frontend). This project template is pre-configured and contains automation scripts that will make your project starting a lot easier.

## Prerequisites
- [ ] A BASH-like shell (`bash` and `zsh` work well)
- [ ] Node.js installed and working
- [ ] An active connection to the Internet
- [ ] The `curl` utility, which is installed by default on Linux, macOS, and Git BASH

## Features
The following features are present:

1. Pre-configured with all dependencies listed in `package.json`
1. Pre-configured with the GitHub Linters workflow
1. A `.gitignore` file generated by [gitignore.io](https://gitignore.io) with extra ignores
1. Scripts to initialize all the tools and run the pre-commit tasks
1. Empty `index.html` template and directory tree
1. Support for running SASS and LESS along with all the tools
1. Instructions (this file) to set up everything and get all working

## Working tree architecture

- `./`: the root of the tree, here you have your `index.html`, `package.json`, `.gitignore` and other files
  - `./.github/`: this is the GitHub workflows folder
  - `./.gitignore`: a file to instruct `git` what patterns you do not want to track
  - `./assets/`: contains some folder where you can organize your assets
  - `./build/`: a folder where you can place the output of preprocessors, minifiers, and compilers
  	- By default, all files that are processed via `gulp` are installed inside this directory
  - `./gulpfile.js`: a `gulp` worker that will help you to `auto-prefix` your CSS files
  - `./index.html`: an empty HTML index page
  - `./initialize.sh`: a shell script that will initialize your project
  - `./package.json`: a description of the current project and it's dependencies for Node.js
  - `./src/`: a folder where you can organize the original (i.e. SASS) files to be compiled or processed
  	- By default, SASS, SCSS and LESS compiled files will be put inside `./src/built`, and then processed by `gulp` (along with plain CSS files), which will put all of them inside `./build/`
  - `./README.md`: this wonderful file, which will be replaced automatically with the template

## Step 1: get the code
This is a template repository, therefore working with it is as simple as clicking the big green `Use This Template` button. Alternatively, you can download a compressed `.zip` file and extract it inside your work tree.

## Step 2: initializing the template
This template is an empty template. Here are some things that you want to change **before** initializing the template:

- [ ] Update your `.gitignore` accordingly to your project
- [ ] Be careful of changing the title of the template `./index.html`
- [ ] Change the project name, URL, version, description, and any detail of the `./package.json` before running any script or Node
- [ ] After reading this file, you should write a relevant `README.md` for your project

After that, use a BASH-like shell to run the `initialize.sh` script, like this, running it from the root of the working tree:
```sh
$SHELL initialize.sh
```
This will download and install all dependencies and configuration files. Note that this `README.md` file will be moved to `README.md.old` and replaced with the template `README.md`.

> Check your terminal output, it should show no errors.

## Step 3: running pre-commit tasks
The pre-commit task is tasks meant to be run before committing your code and pushing it to your repository. Mainly, they will run the linters, compiler, and any other relevant task.

If you understand the UNIX shell and know how to program in BASH, you can extend the pre-commit task easily by modifying the script. Otherwise, you can open a GitHub issue [here](../../issues).

Once everything is set up, and you are ready to commit, you can run the following command:
```sh
$SHELL tasks.sh
```

For specific use cases, you can change some parameters, regarding what you want to run, what not, modify some assumptions and behavior. This is done by setting up [Environment Variables](https://wiki.archlinux.org/index.php/environment_variables).

If everything looks good, you can commit and push.

# Environment Variables
The behavior of the pre-commit task is modified by the usage of environment variables. As you read in the Arch Wiki, there are several ways of setting up variables, and with different scopes and persistence. The following variables modify the behavior:

| Variable | Default | Effect |
|-|-|-|
|`RUN_GULP`|`yes`|If this variable is set to anything but `yes`, no gulp task will be run for this project.
|`RUN_GULP_STYLES`|`yes`|If `yes`, run the gulp `styles` task, which will auto-prefix all `.css` files inside `./src/css/` and put them inside `./build/css/`. You can edit the output folder by modifying `guilpfile.js`.
|`RUN_HINT`|`yes`|If `yes`, run the `hint` (webhint) linter in the root of the source tree.|
|`RUN_STYLELINT`|`yes`|If `yes`, run the `stylelint` (Stylelint) linter in the root of the source code tree.|
|`STYLELINT_MATCH_PATTERN`|`src/**/*.{css,scss,less} !**/{built,build}/**`|This is a pattern that will match any `.css` or `.scss` (pure CSS, SCSS or LESS) files. This is a [shell globbing](https://mywiki.wooledge.org/glob), which looks like a regular expression but is quite different. By default, it will look for files inside the `./src` folder but will ignore any file inside the folders `build` and `built`.|
|`RUN_LHCI`|`no`|If `yes`, run the `lhci` (Lighthouse) web auditor in your project.|
|`RUN_SASS`|`yes`|If `yes`, run the `sass` compiler for SASS and SCSS source files.|
|`SASS_BUILT`|`src/built`|The directory where the `sass` compiler will put the compiled CSS files and their map. By default, this directory is ignored by Stylelint.|
|`SASS_SOURCE`|`src/**/*.{sass,scss}`|Where `sass` will look for source files to compile. By default, it will search all `.sass` and `.scss` files inside the `./src` directory. This is a shell globbing.|
|`RUN_LESS`|`yes`|If `yes`, run the `lessc` compiler for LESS source files.|
|`LESS_MATCH`|`src/**/*.less`|A pattern that will tell `lessc` where to find it's source code files. It is a shell globbing that, by default, looks for all `.less` files inside the `./src` directory.|
|`LESS_BUILT`|`src/built`|Similar to `SASS_BUILT`, this is the directory where the `lessc` compiler will put the compiled CSS files.|

# Name space collisions
This is a problem with the SASS compiler itself, not related to how the script works. If the `sass` compiler finds two files whose base name is the same (say `styles.scss` and `styles.sass` and they share the same output directory, only one of them will be used. Because of this, the output file names use the same file name as the original file, with the added `.css` extension.

So, if you have 3 files `style.sass`, `style.scss` and `style.less`, you will get 3 compiled files, such as `style.sass.css`, `style.scss.css` and `style.less.css`.

# Author's notes
Please, take your time to understand what the scripts do, how, when, and why. You don't need to be shell savvy to understand what commands are being executed.

Read the documentation to the Wikis carefully, if you are new to the Bourne shell, you will find them really helpful. This work is in progress, and any feedback is welcome.

## If you have a problem or suggestion
Open a GitHub issue explaining what is wrong. If you have problems with your scripts, copy the output of the shell command. For better feedback, replace the `$SHELL` part of the command with `$SHELL -x`.

## If this work is useful
Do not hesitate of opening a GitHub issue telling me that you enjoyed this work. Also, do not hesitate to give this repository a nice golden star.

---

> Copyright (c) 2020 Oever González, this project is free and open-source under the [MIT](https://opensource.org/licenses/MIT) license
