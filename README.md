Bellow's Riddle Quest
=====================

Where I keep track of the Bellow's Riddle Quest data so I can share it with my team

# Install

Steps for installing and building this app are as follows.

### Pre-requisits

* Install [node.js](http://nodejs.org/)
* Check-out the git repository

### Building

After you have a git clone of the repo, run the following commands:

	cd app
    npm install
    npm start

This will generate the ``build`` directory which has all the combined javascript libraries.

### Serving

Just stick the entire repository behind a web server and navigate to http://webserver-root/app/index.html.  It's important to have the entire repository behind a web server so that javascript can fetch the json list of riddles.


## Using Docker on GCE

#### Deploy using Google SDK

Build an instance
```
gcloud compute instances create bellows-docker \
  --image container-vm-v20140925 \
  --image-project google-containers \
  --zone us-central1-a \
  --machine-type f1-micro
```

Pull the docker and start the App
```
docker pull <tinmanpiano/bellows-riddles-app>
docker run --name <container-name> -d -p 80:80 <tinmanpiano/bellows-riddles-app>
```

You need to enable http access through the firewall, but that should be all it takes to get a version running on GCE.

If you have used a private Docker Registry from https://registry.hub.docker.com (as I do in my example) and set it up to pull from Github it would rebuild everytime master gets pushed. Remember, you will need to wait for the build to finish before you can pull it.

#### Docker Workflow

###### Kill 
```
docker stop <container-name>
```
if stop doesn't work kill.

###### Remove
```
docker rm <container-name>
```

###### Pull 
```
docker pull tinmanpiano/bellows-riddles-app
```

###### Run
```
docker run --name <container-name> -d -p 80:80 tinmanpiano/bellows-riddles-app 
```

One Line version (assuming you are named it `bellows-dev`, and use docker registry)
```
sudo docker stop bellows-dev && sudo docker rm bellows-dev && sudo docker pull tinmanpiano/bellows-riddles-app && sudo docker run --name bellows-dev -d -p 80:80 tinmanpiano/bellows-riddles-app
```

### Dev version
You don't want to wait for registry to build you can make you own docker on the VM and run it yourself.
```
docker build -t tinmanpiano/bellows-riddles-app:dev .docker

docker run --rm --name <container-name> -p 9001:80 tinmanpiano/bellows-riddles-app:dev 
```


### Debug Version
This will ssh you into the Docker. Good for Debuging, but remember everything you do will magically vanish when you Kill docker. 

```
docker run --rm -p 9001:80 -it tinmanpiano/bellows-riddles-app:dev /bin/bash
```

### Useful Notes

`docker docker ps -a` will show you all current docker containers (even ones not running) you can check to make sure you aren't expoding your machine with containers. Killing a container does not remove it. It just stops it. using the flag `--rm` means it will remove it's self when you kill it so you don't need to manually.