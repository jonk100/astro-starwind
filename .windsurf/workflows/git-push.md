# Git Commit and Push Workflow

This workflow stages all changes, commits them with a relevant message, creates a GitHub repository if needed, and pushes to the remote repository.

## Prerequisites

- GitHub CLI installed (`gh`) OR GitHub personal access token configured
- Git initialized in the current directory

## Steps

1. **Check git status** - See what files have changed

   ```bash
   git status
   ```

2. **Initialize git if needed** - Initialize repository if not already a git repo

   ```bash
   git init
   ```

3. **Add all changes** - Stage all modified and new files

   ```bash
   git add .
   ```

4. **Commit with relevant message** - Commit the staged changes

   ```bash
   git commit -m "your commit message here"
   ```

   *Replace "your commit message here" with a descriptive commit message*

5. **Check if remote origin exists** - Verify if origin is already configured

   ```bash
   git remote -v
   ```

6. **Create GitHub repository if needed** - Choose one of the following methods:

   **Method A: Using GitHub CLI (Recommended)**

   ```bash
   gh repo create your-repo-name --public --source=. --remote=origin --push
   ```

   *Replace "your-repo-name" with your desired repository name*

   **Method B: Manual creation with GitHub CLI**

   ```bash
   gh repo create your-repo-name --public
   git remote add origin https://github.com/username/your-repo-name.git
   git push -u origin main
   ```

   **Method C: Using curl with personal access token**

   ```bash
   curl -X POST -H "Authorization: token YOUR_TOKEN" -H "Accept: application/vnd.github.v3+json" https://api.github.com/user/repos -d '{"name":"your-repo-name","private":false}'
   git remote add origin https://github.com/username/your-repo-name.git
   git push -u origin main
   ```

7. **Push to remote** - If not already pushed in step 6

   ```bash
   git push -u origin main
   ```

   *If your default branch is not "main", replace with "master" or your branch name*

8. **Update changelog when necessary** - Only update when completing significant features worth a new version

**When to update changelog:**

- Adding major new components or features
- Completing a significant milestone
- Releasing a new version with breaking changes
- Finishing a complete feature set

**How to update changelog:**

```bash
# Update changelog.json with new version entry
# Add new version object to versions array with:
# - version: "x.y.z" (increment based on change type)
# - date: current date in YYYY-MM-DD format
# - description: concise summary of changes
# - changes: array of specific accomplishments
```

Example changelog update:

```json
{
   "version": "1.1.0",
   "date": "2026-05-10",
   "description": "Added navigation and form components",
   "changes": [
      "Implemented navigation menu component with mobile support",
      "Added form validation components with error handling",
      "Enhanced accessibility across all components"
   ]
}
```

**Version incrementing guidelines:**

- **Major (x.0.0)**: Breaking changes, major architectural changes
- **Minor (x.y.0)**: New features, significant enhancements
- **Patch (x.y.z)**: Bug fixes, minor improvements, documentation updates

After updating changelog.json:

```bash
git add changelog.json
git commit -m "Update changelog to v1.1.0"
git push
```

## Usage

1. Navigate to your git repository directory
2. Run the commands in order, customizing the commit message and repository URL as needed
3. Only update changelog for significant milestones (not every commit)
4. If you encounter any authentication issues, you may need to configure your git credentials or use SSH instead of HTTPS

## Notes

- This workflow assumes you're working with the main/master branch
- For different branches, replace "main" with your target branch name
- Make sure you have the necessary permissions to push to the repository
- If using a private repository, ensure your authentication is properly configured
- Method A (GitHub CLI) is the recommended approach as it handles authentication automatically
- To install GitHub CLI: `curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg`
- **Changelog updates should be conservative** - only update when you've completed something substantial that represents a meaningful version increment
