#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'

# Usage:
#   bash scripts/deploy-local.sh "/abs/path/to/wp-content/plugins/<plugin-folder>" [--dry-run] [--backup]
#
# Example:
#   bash scripts/deploy-local.sh "/Users/you/Local Sites/site/app/public/wp-content/plugins/actions1" --dry-run

die() { printf "Error: %s\n" "$*" >&2; exit 1; }
msg() { printf "==> %s\n" "$*"; }

TARGET="${1:-}"; shift || true
DRYRUN=false
BACKUP=false

# Parse flags
for arg in "${@:-}"; do
  case "$arg" in
    --dry-run) DRYRUN=true ;;
    --backup)  BACKUP=true ;;
    *) die "Unknown option: $arg" ;;
  endesac
done

[[ -n "$TARGET" ]] || die "Missing target path."

# Must be absolute path
[[ "$TARGET" = /* ]] || die "TARGET must be an absolute path."

# Safety guard: path should look like a WP plugins dir
case "$TARGET" in
  *"/wp-content/plugins/"*|*"/wp-content/plugins"* ) ;;
  *) die "TARGET doesn't look like a WordPress plugins path: $TARGET" ;;
esac

# Refuse to run as root
if [[ "${EUID}" -eq 0 ]]; then
  die "Refusing to run as root. Run as a normal user."
fi

# Resolve repo root (one level up from scripts/)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"

# Source (your plugin code = repo root)
SRC="$REPO_ROOT"

# Create target if missing
mkdir -p "$TARGET"

# Optional backup of existing target
if $BACKUP && [ -d "$TARGET" ]; then
  TS="$(date +%Y%m%d%H%M%S)"
  BK="/tmp/$(basename "$TARGET")-backup-$TS.tgz"
  msg "Creating backup: $BK"
  tar -C "$(dirname "$TARGET")" -czf "$BK" "$(basename "$TARGET")" || msg "Backup skipped."
fi

# Build rsync command
RSYNC_OPTS=(
  -az
  --delete
  --exclude ".git"
  --exclude ".github"
  --exclude "node_modules"
  --exclude "tests"
  --exclude ".DS_Store"
  --exclude "*.map"
)
$DRYRUN && RSYNC_OPTS+=(--dry-run -v)

msg "Syncing from: $SRC"
msg "To target:    $TARGET"
$DRYRUN && msg "(dry run: no changes will be made)"

# Do the copy
rsync "${RSYNC_OPTS[@]}" "$SRC"/ "$TARGET"/

msg "Done."
$DRYRUN && msg "Dry run completed (no files changed)."
