FROM node:6
# Based off of this tutorial:
# https://nodejs.org/en/docs/guides/nodejs-docker-webapp/

# Ports required
EXPOSE 3000

# Create user
RUN useradd --user-group --create-home --shell /bin/false runner
ENV HOME=/home/runner

# Create app directory
RUN mkdir -p $HOME/app && chown -R runner:runner $HOME/

USER runner
WORKDIR $HOME/app

#See where we are.
RUN ls -lah .
# Install app dependencies
COPY package.json $HOME/app/
RUN npm install

# Bundle app source
COPY . $HOME/app

CMD [ "npm", "start" ]
