#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

echo "Road Trip Rampage GitHub publish helper"
echo
echo "GitHub no longer accepts normal passwords for git push."
echo "Use a GitHub Personal Access Token when this script asks for TOKEN."
echo
echo "Token page: https://github.com/settings/tokens"
echo "Required access: repo contents read/write for Lmanzhead64/road-trip-rampage"
echo

read -r -p "GitHub username [Lmanzhead64]: " GH_USER
GH_USER="${GH_USER:-Lmanzhead64}"

read -r -s -p "GitHub token, not password: " GH_TOKEN
echo

if [ -z "$GH_TOKEN" ]; then
  echo "No token entered. Aborting."
  exit 1
fi

ASKPASS_SCRIPT="$(mktemp -t rtr-git-askpass.XXXXXX)"
cleanup() {
  rm -f "$ASKPASS_SCRIPT"
}
trap cleanup EXIT

cat > "$ASKPASS_SCRIPT" <<'ASKPASS'
#!/usr/bin/env bash
case "$1" in
  *Username*) printf "%s\n" "$GH_USER" ;;
  *) printf "%s\n" "$GH_TOKEN" ;;
esac
ASKPASS
chmod 700 "$ASKPASS_SCRIPT"

echo
echo "Pushing local main to GitHub..."
GIT_ASKPASS="$ASKPASS_SCRIPT" GIT_TERMINAL_PROMPT=0 git -c credential.helper= \
  push https://github.com/Lmanzhead64/road-trip-rampage.git main

echo
echo "Push complete. If Vercel is connected to this GitHub repo, it should deploy automatically."
