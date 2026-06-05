# GitHub Push Help

GitHub no longer accepts your normal account password for `git push`.

Use either:

- GitHub CLI login: `gh auth login`
- SSH authentication
- A Personal Access Token

## Fast Token Push

1. Create a token at <https://github.com/settings/tokens>.
2. Give it access to `Lmanzhead64/road-trip-rampage`.
3. Required permission: repository contents read/write.
4. Run:

```bash
cd /Users/test/Documents/Codex/2026-06-04/help-me-do-this-avatar-quick/work/road-trip-rampage
chmod +x push-to-github.sh
./push-to-github.sh
```

When prompted:

- Username: `Lmanzhead64`
- Token: paste the GitHub token, not your password

The helper uses the token once for the push and does not save it in the repository.
