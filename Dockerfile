FROM gradle:latest AS build

WORKDIR /build/

ENV PATH /build/node_modules/.bin:$PATH

COPY ./client/ /build/

RUN gradle build --no-daemon --info --stacktrace

FROM ruby:3.2.2 AS server

ENV RAILS_ENV production
ENV PORT=3000

RUN apt-get update -qq && apt-get install -y build-essential nodejs

COPY ./api/entrypoint.sh /usr/bin/

WORKDIR /rails/

ADD api/ /rails/

RUN bundle install

RUN bundle exec rake assets:precompile

COPY --from=build /build/public/ ./public/

RUN chmod +x /usr/bin/entrypoint.sh

ENTRYPOINT ["entrypoint.sh"]

EXPOSE 3000

CMD [ "bundle", "exec", "puma", "start", "-C", "config/puma.rb" ]
