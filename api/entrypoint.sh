#!/bin/bash
set -e

bundle exec rails db:prepare

bundle exec rails db:seed

if [ "$RAILS_ENV" = "production" ]; then
  bundle exec rails s -e production;
fi

if [ "$RALS_ENV" = "test" ]; then
  bundle exec rails s -b "0.0.0.0" -e test &
fi

# Add a sleep command to allow the server to start before running tests
sleep 5

# Run the provided command (e.g., `rspec`) in the foreground
exec "$@"
