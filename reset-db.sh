# !/bin/env bash

set -e

rm -f apartment_info.db
npm run db:migrate
tsx ./src/db/lib/seed-apartments.ts
tsx ./src/db/lib/seed-tenants.ts