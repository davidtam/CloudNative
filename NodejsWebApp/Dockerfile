FROM    centos:centos6

# Enable Extra Packages for Enterprise Linux (EPEL) for CentOS
RUN     yum install -y epel-release
# Install Node.js and npm
RUN     yum install -y nodejs npm

# Install app dependencies
COPY package.json /src/package.json

COPY package.json     /src/package.json
COPY cachedRates.json /src/cachedRates.json
COPY server.js        /src/server.js

RUN cd /src; npm install --production

EXPOSE  1234
CMD ["node", "/src/server.js"]