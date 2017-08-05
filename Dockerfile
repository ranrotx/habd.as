FROM ubuntu:latest

# Install necessary packages

RUN apt-get update && apt-get install -y \
    build-essential \
    locales \
    nodejs \
    ruby \
    ruby-dev \
    zlib1g-dev \
  && rm -rf /var/lib/apt/lists/*

# Set locale

RUN locale-gen en_US.UTF-8
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US:en
ENV LC_ALL en_US.UTF-8

# Add Gemfile and Gemfile.lock

RUN mkdir /src

COPY Gemfile /src/
COPY Gemfile.lock /src/

# Install gems

WORKDIR /src

RUN gem install bundler

RUN bundle install
