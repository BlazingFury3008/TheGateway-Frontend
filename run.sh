#!/usr/bin/env bash
set -euo pipefail

cd -- "$(dirname -- "${BASH_SOURCE[0]}")/frontend"

if [[ ! -f .env.local ]]; then
  touch -- .env.local
fi

rm -r .next/

npm install
exec npm run dev "$@"
