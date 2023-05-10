# define from what image we want to build from
FROM node:alpine

# create a directory to hold the application code inside the image, this will be the working directory for your application
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# copy tsconfig and environment variable file
COPY tsconfig.json ./
COPY .env ./

# generated prisma files
COPY prisma ./prisma/

# bundle app source
COPY . .

# install app dependencies
RUN npm install

# generate prisma client.
RUN npx prisma generate

# expose the server port 3000
EXPOSE 3000

# command to start server
CMD ["npm", "start"]