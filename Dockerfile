FROM node:20

WORKDIR /app/genezio

RUN apt-get update && apt-get -y upgrade
RUN npm install -g genezio

CMD ["/bin/bash"]
