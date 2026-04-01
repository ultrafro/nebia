# Nebia - Getting Started Guide

Hi! This guide will walk you through setting up everything you need to start working on this project. Don't worry if you've never done anything like this before -- just follow each step exactly and you'll be up and running.

> **Are you on a Windows PC or a Mac?** This guide covers both! Whenever a step is different depending on your computer, you'll see a **Windows** section and a **Mac** section. Just follow the one that matches your computer.
>
> **Not sure which you have?** If your keyboard has a key with the Windows logo (looks like a four-pane window), you're on Windows. If your keyboard has a key that says **&#x2318; (Command)** with an apple-like symbol, you're on a Mac.

**What we're going to do:**
1. Create a GitHub account (where the code lives online)
2. Install GitHub Desktop (an app to download and sync code)
3. Download this project to your computer
4. Install Node.js (the engine that runs the project)
5. Install Claude Code (an AI that will help you write code)
6. Start everything up and see it in your browser

Let's go!

---

## Step 1: Create a GitHub Account

GitHub is like Google Drive but for code. It stores the project online so multiple people can work on it.

1. Open your web browser (Chrome, Safari, Edge, Firefox -- any is fine)

2. Go to: **https://github.com/signup**

3. You'll see a page that says **"Welcome to GitHub! Let's begin the adventure"**

4. It will ask you a series of questions, one at a time:
   - **Enter your email** -- type your email address and click **Continue**
   - **Create a password** -- pick a password (at least 8 characters) and click **Continue**
   - **Enter a username** -- this is your public name on GitHub. Pick something simple like your first name + some numbers (e.g. `sarah_codes_2026`). Click **Continue**
   - **Email preferences** -- type `n` to skip marketing emails, then click **Continue**
   - **Verify your account** -- solve the little puzzle they show you

5. Click the big green **"Create account"** button

6. **Check your email!** GitHub will send you a code. Go to your inbox, find the email from GitHub, and copy the code

7. Go back to your browser and paste the code in

8. GitHub will ask you some personalization questions -- you can click **"Skip this for now"** at the bottom if you want

9. You should now see your GitHub dashboard. You have an account!

---

## Step 2: Install GitHub Desktop

GitHub Desktop is an app that lives on your computer. It lets you download code from GitHub and upload your changes back -- all with buttons, no typing commands.

1. Go to: **https://desktop.github.com**

2. You'll see a big page with a purple/blue download button.

   - **Windows:** It will say **"Download for Windows"**
   - **Mac:** It will say **"Download for macOS"**

   Click that button.

3. **Find the downloaded file:**

   - **Windows:** Look at the bottom of your browser for a downloads bar, or press **Ctrl + J** to open your downloads. The file is called something like `GitHubDesktopSetup-x64.exe`. Click on it to open it.
   - **Mac:** Look in your **Downloads** folder (click the smiley face icon in your dock, then click **Downloads** in the left sidebar). The file is called something like `GitHubDesktop-arm64.dmg`. Double-click it. A window will pop up -- drag the GitHub Desktop icon into the **Applications** folder. Then open **Applications** and double-click **GitHub Desktop** to launch it.

4. The installer will run.

   - **Windows:** It installs automatically. Wait for it to finish.
   - **Mac:** If macOS asks "Are you sure you want to open it?" click **"Open"**.

5. GitHub Desktop will open. You'll see a **"Welcome to GitHub Desktop"** screen.

6. Click **"Sign in to GitHub.com"**

7. Your browser will open and ask you to authorize GitHub Desktop. Click the green **"Authorize desktop"** button.

8. Your browser might ask "Open GitHub Desktop?" -- click **"Open"** or **"Allow"**.

9. You'll be back in GitHub Desktop, now signed in. You should see your username in the top-left area.

---

## Step 3: Download (Clone) This Project

"Cloning" just means downloading a copy of the project's code to your computer.

1. In GitHub Desktop, look at the top menu bar and click **File**

2. Click **Clone Repository...**

3. A window pops up with three tabs at the top: **GitHub.com**, **GitHub Enterprise**, and **URL**

4. Click the **URL** tab (the third one)

5. In the first text box (it says "Repository URL or GitHub username and repository"), paste this:
   ```
   https://github.com/ultrafro/nebia
   ```
   To paste:
   - **Windows:** Click inside the text box, then press **Ctrl + V**
   - **Mac:** Click inside the text box, then press **Cmd + V** (the &#x2318; key + V)

6. In the second text box ("Local path"), it shows where the project will be saved on your computer. The default is usually fine, but **write down or remember this path!** You'll need it later.

   - **Windows:** It will be something like `C:\Users\YourName\Documents\GitHub\nebia`
   - **Mac:** It will be something like `/Users/YourName/Documents/GitHub/nebia`

7. Click the blue **"Clone"** button

8. Wait for it to finish. You'll see a progress bar. This might take a minute depending on your internet.

9. When it's done, you'll see the GitHub Desktop main screen showing the "nebia" repository. There might be a screen asking "How are you planning to use this fork?" -- if so, select **"To contribute to the parent project"** and click **Continue**.

You now have all the code on your computer!

---

## Step 4: Install Node.js

Node.js is the engine that actually runs this project. Without it, nothing will work. Think of it like installing Java to play Minecraft -- you need the runtime.

1. Go to: **https://nodejs.org**

2. You'll see two big green buttons. Click the one on the **LEFT** that says **"LTS"** (it stands for "Long Term Support" -- it's the stable, recommended version). It will say something like "22.x.x LTS - Recommended For Most Users"

3. A file will download.
   - **Windows:** It's called something like `node-v22.x.x-x64.msi`
   - **Mac:** It's called something like `node-v22.x.x.pkg`

4. Find and open the downloaded file.
   - **Windows:** Check the bottom of your browser or press **Ctrl + J**
   - **Mac:** Check your **Downloads** folder or press **Cmd + J** in your browser

5. **Run the installer:**

   **On Windows:**
   - The Node.js Setup Wizard will open
   - Click **"Next"**
   - Check the box to accept the license agreement, click **"Next"**
   - Leave the install location as default, click **"Next"**
   - Leave all the features as default, click **"Next"**
   - If it asks about "Tools for Native Modules" -- leave the checkbox **unchecked**, click **"Next"**
   - Click **"Install"**
   - If Windows asks "Do you want to allow this app to make changes?" click **"Yes"**
   - Wait for it to install
   - Click **"Finish"**

   **On Mac:**
   - The Node.js installer will open
   - Click **"Continue"** through the intro screens
   - Click **"Agree"** to accept the license
   - Click **"Install"**
   - Enter your Mac password (the one you use to log in to your computer) when it asks
   - Wait for it to install
   - Click **"Close"**

6. **Now let's verify it worked.** We need to open a terminal (a text-based window where you can type commands):

   **On Windows:**
   - Press the **Windows key** on your keyboard (the key with the Windows logo, usually between Ctrl and Alt)
   - Type **`cmd`**
   - You'll see **"Command Prompt"** appear in the search results. Click on it.
   - A black window will open with white text and a blinking cursor

   **On Mac:**
   - Press **Cmd + Space** on your keyboard (this opens Spotlight search)
   - Type **`Terminal`**
   - Press **Enter** or click on **"Terminal"** in the results
   - A window will open with a text prompt and a blinking cursor

7. Type this exactly and press **Enter**:
   ```
   node --version
   ```

8. You should see a version number like `v22.14.0`. **If you see this, it worked!**

9. Now type this and press **Enter**:
   ```
   npm --version
   ```

10. You should see another version number like `10.9.2`. **If you see this, npm (Node Package Manager) is also working!**

**If you got errors instead of version numbers:**
- Close the terminal window completely
- Open a brand new one (repeat step 6)
- Try again. The terminal needs to be reopened after installing new programs.
- If it still doesn't work, restart your computer and try again.

You can close the terminal for now.

---

## Step 5: Install Claude Code

Claude Code is an AI assistant that lives in your terminal. You'll type instructions to it in plain English (like "add a button that makes the character jump higher") and it will write and run the code for you.

### 5a: Install Claude Code

1. Open a terminal:
   - **Windows:** Press the **Windows key**, type **`cmd`**, click **"Command Prompt"**
   - **Mac:** Press **Cmd + Space**, type **Terminal**, press **Enter**

2. Type this and press **Enter**:
   ```
   npm install -g @anthropic-ai/claude-code
   ```

   **Mac note:** If you get a "permission denied" error, try this instead:
   ```
   sudo npm install -g @anthropic-ai/claude-code
   ```
   It will ask for your Mac password. Type it in (you won't see the characters as you type -- that's normal!) and press **Enter**.

3. Wait for it to finish. You'll see a lot of text scrolling. This is normal. It might take a minute or two.

4. When it's done, you'll see your cursor blinking again, ready for a new command.

5. Verify it worked by typing:
   ```
   claude --version
   ```
   You should see a version number.

### 5b: Sign In to Claude Code

The first time you run Claude Code, it will ask you to sign in through your browser. This is free and easy!

1. In the same terminal, type:
   ```
   claude
   ```

2. Claude Code will show a message saying it needs to authenticate, and it will **automatically open your web browser** to a sign-in page.

   - If the browser doesn't open automatically, it will show you a URL. Copy that URL and paste it into your browser's address bar.

3. In your browser, you'll see a page asking you to sign in to your **Anthropic account**:
   - If you already have one, sign in
   - If you don't, click **"Sign up"** and create an account (you can use your Google account to make it quick)

4. After signing in, the browser will show a confirmation page saying you're authenticated. You can close this browser tab.

5. Go back to your terminal -- Claude Code should now be working! You'll see a chat-like interface where you can type messages.

6. For now, type `/exit` and press **Enter** to close Claude Code. We'll start it properly in Step 7.

---

## Step 6: Install Codex (Optional)

Codex is another AI coding tool, this one from OpenAI. This step is optional -- you can skip it if you want and come back later.

1. Open a terminal:
   - **Windows:** Press the **Windows key**, type **`cmd`**, click **"Command Prompt"**
   - **Mac:** Press **Cmd + Space**, type **Terminal**, press **Enter**
2. Run:
   ```
   npm install -g @openai/codex
   ```
3. The first time you run `codex`, it will ask you to sign in -- follow the prompts similar to Claude Code.

---

## Step 7: Start the Project with Claude Code

This is the exciting part! Let's start everything up.

1. Open a **new** terminal:
   - **Windows:** Press the **Windows key**, type **`cmd`**, click **"Command Prompt"**
   - **Mac:** Press **Cmd + Space**, type **Terminal**, press **Enter**

2. Navigate to the project folder. Type this command and press **Enter**:

   **Windows** (replace `YourName` with your actual Windows username):
   ```
   cd C:\Users\YourName\Documents\GitHub\nebia
   ```

   **Mac** (replace `YourName` with your actual Mac username):
   ```
   cd /Users/YourName/Documents/GitHub/nebia
   ```

   > **Shortcut -- if you forgot the path:**
   > Open GitHub Desktop, look at the top menu bar, click **Repository**, then click **"Open in Command Prompt"** (Windows) or **"Open in Terminal"** (Mac). This opens a terminal already in the right folder! If you do this, skip to step 3.

3. Now start Claude Code. Type this and press **Enter**:
   ```
   claude --dangerously-skip-permissions
   ```

   > **What does `--dangerously-skip-permissions` mean?** Normally Claude Code asks your permission before running every command (like "Can I install packages? [y/n]"). This flag tells it to just go ahead and do things without asking. It makes the experience much smoother when you're working.

4. Claude Code will start up. You'll see its interface in the terminal -- it looks like a chat where you can type messages.

5. **Paste this as your first message** and press **Enter**:

   - **Windows:** Click inside the Claude Code prompt, press **Ctrl + V** to paste
   - **Mac:** Click inside the Claude Code prompt, press **Cmd + V** to paste

   ```
   Install the project dependencies by running `npm install`, then start the dev server with `npm run dev`. Once the server is running, keep it running and await my instructions. If anything fails, read the error and try to fix it. Let me know when the server is up and ready at localhost:3000.
   ```

6. Claude will start working. You'll see it running commands and showing output. **Wait for it to say the server is ready.** This might take a few minutes the first time because it needs to download all the project dependencies.

7. When Claude says something like "the server is running" or you see `Ready on http://localhost:3000` -- you're good to go!

---

## Step 8: See It In Your Browser!

1. Open your web browser (Chrome, Safari, Edge, Firefox, etc.)

2. Click on the address bar at the top (where it shows the URL of websites)

3. Type this and press **Enter**:
   ```
   localhost:3000
   ```

4. You should see the app! It might be a 3D scene, a game editor, or a web page depending on the current state of the project.

5. **Leave this browser tab open.** As you make changes to the code (through Claude), the page will automatically update to show the changes. You can always come back to this tab to see what things look like.

---

## Step 9: Start Building!

Now you can talk to Claude Code in plain English and tell it what you want. Here are some example things you can say:

- `"Add a red cube to the scene"`
- `"Make the background color blue"`
- `"The character moves too fast, slow it down by half"`
- `"Explain what this project does"`
- `"Show me what files are in the project"`

Just type your instruction and press **Enter**. Claude will figure out what code to change, make the changes, and tell you what it did. Then check your browser to see the result!

---

## Troubleshooting

Here are solutions to common problems you might run into.

### "I can't see anything at localhost:3000"

- **Is the server running?** Look at your terminal where Claude Code is running. If you see `Ready on http://localhost:3000`, the server is running. If you don't see that, ask Claude: `"start the dev server with npm run dev"`
- **Try refreshing the page.**
  - **Windows:** Press **Ctrl + R** or **F5**
  - **Mac:** Press **Cmd + R**
- **Try the other URL.** Sometimes `localhost` doesn't work. Try typing `127.0.0.1:3000` in the address bar instead. It's the same thing, just written differently.
- **Did you close the terminal?** If you close the terminal window where the server was running, the server stops. You'll need to start Claude Code again (go back to Step 7).

### "The page looks broken or has weird styling"

- Do a hard refresh:
  - **Windows:** Press **Ctrl + Shift + R**
  - **Mac:** Press **Cmd + Shift + R**
- If that doesn't work, tell Claude: `"delete the .next folder and restart the dev server"`

### "npm is not recognized" / "npm: command not found"

- Node.js isn't installed correctly. Go back to **Step 4** and reinstall it.
- **Make sure to close and reopen your terminal** after installing. Old terminal windows don't know about newly installed programs.
- If it still doesn't work after reopening, **restart your computer** and try again.

### "claude is not recognized" / "claude: command not found"

- Claude Code isn't installed. Go back to **Step 5c**.
- Make sure to close and reopen your terminal after installing.
- **Mac only:** If you used `sudo` to install but it still says command not found, try running:
  ```
  npx @anthropic-ai/claude-code --dangerously-skip-permissions
  ```
  This runs Claude Code directly without needing it installed globally.

### Claude Code says "not authenticated" or "authentication failed"

- You need to sign in. Run `claude` in your terminal and follow the browser sign-in prompts (see Step 5b).
- If the browser sign-in page doesn't open, check your internet connection.
- If you signed in but it still doesn't work, try running `claude` again -- sometimes you just need to retry.
- Make sure you're signing in with the correct account (the one you created at console.anthropic.com).

### "Port 3000 is already in use"

- Something else on your computer is using that port. Tell Claude: `"start the server on port 3001 instead"`
- Then go to `localhost:3001` in your browser instead of `localhost:3000`

### Claude Code seems frozen or stuck

- Press **Ctrl + C** on your keyboard (same on both Windows and Mac). This interrupts whatever it's doing. Then you can type a new instruction.
- If that doesn't work, press **Ctrl + C** multiple times.
- If it's completely frozen, just close the terminal window (click the X or the red circle), open a new one, navigate to the project folder, and run `claude --dangerously-skip-permissions` again.

### "Permission denied" errors (Mac)

- If you see "permission denied" when running a command, try putting `sudo` in front of it. For example:
  ```
  sudo npm install -g @anthropic-ai/claude-code
  ```
- `sudo` stands for "super user do" -- it runs the command as an administrator.
- It will ask for your Mac password. Type it in (you won't see the characters -- that's normal!) and press **Enter**.

### "I made a mistake and broke something"

- Don't panic! Tell Claude: `"undo the last change"` or `"revert the last commit"`
- Or open GitHub Desktop -- it shows you all changed files. You can right-click any file and choose **"Discard changes"** to go back to how it was.

### "I want to save my work / share my changes"

1. Open **GitHub Desktop**
2. On the left side, you'll see a list of files that changed. Check the boxes next to the files you want to save.
3. At the bottom-left, there's a text box that says **"Summary (required)"**. Type a short description of what you changed (e.g. "made the character jump higher")
4. Click the blue **"Commit to main"** button
5. Then click **"Push origin"** at the top to upload your changes to GitHub so others can see them

---

## Quick Reference Card

| I want to...                        | Windows                                                | Mac                                                   |
|--------------------------------------|--------------------------------------------------------|-------------------------------------------------------|
| Open a terminal                      | Windows key, type `cmd`, Enter                         | Cmd + Space, type `Terminal`, Enter                   |
| Go to the project folder             | `cd C:\Users\You\Documents\GitHub\nebia`               | `cd /Users/You/Documents/GitHub/nebia`                |
| Start Claude Code                    | `claude --dangerously-skip-permissions`                | `claude --dangerously-skip-permissions`               |
| See the app in browser               | Go to `localhost:3000`                                 | Go to `localhost:3000`                                |
| Refresh the page                     | **Ctrl + R** or **F5**                                 | **Cmd + R**                                           |
| Hard refresh (clear cache)           | **Ctrl + Shift + R**                                   | **Cmd + Shift + R**                                   |
| Stop the server                      | **Ctrl + C** in terminal                               | **Ctrl + C** in terminal                              |
| Stop Claude Code                     | Type `/exit` or **Ctrl + C** a few times               | Type `/exit` or **Ctrl + C** a few times              |
| Copy text                            | **Ctrl + C**                                           | **Cmd + C**                                           |
| Paste text                           | **Ctrl + V**                                           | **Cmd + V**                                           |
| Undo a change                        | GitHub Desktop: right-click file > **Discard changes** | GitHub Desktop: right-click file > **Discard changes**|
| Save my work                         | GitHub Desktop: commit + push                          | GitHub Desktop: commit + push                         |
| Pull latest code                     | GitHub Desktop: **Fetch origin** > **Pull origin**     | GitHub Desktop: **Fetch origin** > **Pull origin**    |

---

## Daily Routine

Here's what a typical work session looks like:

1. **Open GitHub Desktop** and click **"Fetch origin"** then **"Pull origin"** to get the latest code

2. **Open a terminal:**
   - **Windows:** Press the **Windows key**, type **`cmd`**, press **Enter**
   - **Mac:** Press **Cmd + Space**, type **Terminal**, press **Enter**

3. **Go to the project folder:**
   - **Windows:** `cd C:\Users\YourName\Documents\GitHub\nebia`
   - **Mac:** `cd /Users/YourName/Documents/GitHub/nebia`

4. **Start Claude Code:**
   ```
   claude --dangerously-skip-permissions
   ```

5. **Paste the startup prompt:**
   ```
   Start the dev server with `npm run dev` and await my instructions.
   ```

6. **Open your browser** to `localhost:3000`

7. **Tell Claude what to build** in plain English!

8. **When you're done**, save your work in GitHub Desktop (commit + push)

---

## Glossary

These are terms you might hear that sound confusing:

- **Repository (repo):** A project's folder of code, tracked by Git. Think of it as the project itself.
- **Clone:** Downloading a copy of a repository to your computer.
- **Commit:** Saving a snapshot of your changes (like a save point in a game).
- **Push:** Uploading your commits to GitHub so others can see them.
- **Pull:** Downloading the latest changes that others have pushed.
- **Terminal / Command Prompt:** A text-based window where you type commands. On Windows it's called "Command Prompt" (black window). On Mac it's called "Terminal" (white or black window).
- **localhost:** Your own computer, acting as a server. `localhost:3000` means "the website running on my computer, on port 3000."
- **npm:** Node Package Manager -- a tool that installs code libraries (dependencies) that the project needs.
- **Dependencies:** Other people's code that our project uses. Think of them like ingredients in a recipe.
- **Dev server:** A local server that runs the app on your computer for testing. It's not on the internet -- only you can see it.
- **sudo:** A Mac/Linux command that means "run this as an administrator." Used when you need extra permissions.
