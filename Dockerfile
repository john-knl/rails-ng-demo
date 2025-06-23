FROM gradle:latest AS build

WORKDIR /build/

ENV PATH /build/node_modules/.bin:$PATH

COPY ./client/ /build/

RUN gradle build --no-daemon --info --stacktrace

FROM ruby:3.4.4 AS server

ENV RAILS_ENV production
ENV PORT 10000

RUN apt-get update -qq && apt-get install -y build-essential nodejs

COPY ./api/entrypoint.sh /usr/bin/

WORKDIR /rails/

COPY api/ /rails

RUN bundle install

COPY --from=build /build/public/ ./public/

RUN chmod +x /usr/bin/entrypoint.sh

ENTRYPOINT ["entrypoint.sh"]

EXPOSE 10000

CMD ["bundle", "exec", "puma", "-C", "config/puma.rb"]
