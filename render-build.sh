#!/usr/bin/env bash

bundle exec rails db:prepare

bundle exec rails db:seed

bundle exec rails s -b "0.0.0.0" -e production