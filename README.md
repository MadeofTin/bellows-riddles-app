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

If you have used a private Docker Registry from https://registry.hub.docker.com (as I do in my example) and set it up to pull from Github it would rebuild every time master gets pushed. Remember, you will need to wait for the build to finish before you can pull it.

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
This will ssh you into the Docker. Good for Debugging, but remember everything you do will magically vanish when you Kill docker. 

```
docker run --rm -p 9001:80 -it tinmanpiano/bellows-riddles-app:dev /bin/bash
```

### Useful Notes

`docker ps -a` will show you all current docker containers (even ones not running) you can check to make sure you aren't exploding your machine with containers. Killing a container does not remove it. It just stops it. using the flag `--rm` means it will remove it's self when you kill it so you don't need to manually.

### Using BoottoDocker
I have a Mac and Boot2Docker is easy to use to do local development.
Once installed you got to your repo's root folder and run. From the following guide I have reduced it to the parts needed to run our app.

http://viget.com/extend/how-to-use-docker-on-os-x-the-missing-guide


>**Requirements**
>Homebrew
>Code Devel Tools

###### Install Docker and Boot2Docker

```shell
brew update
brew install docker
brew link docker
brew install boot2docker
```
**The Link may not be necessary. I had the Boot2Docker app installed before so I think I needed Homebrew to overwrite the link the Mac App made.**

###### Initializes and start boot2docker

```
boot2docker init
boot2docker up
export DOCKER_HOST=tcp://192.168.59.103:2375
```
>Your VM might have a different IP address—use whatever boot2docker up told you to use. You probably want to add that environment variable to your shell config.

Initial setup
```shell
boot2docker up
$(boot2docker shellinit)
docker run --rm --name dev-serv -p 9001:80 dev-serv
```
then next step should be, but my current terminal is stuck serving the web service so I can't run it in the same terminal.
```
open http://$(boot2docker ip 2>/dev/null)/
```
I can do it on a terminal from my machine but it just shows a blank page. Not a 404 error. Just a blank page. If I refresh then it gives me
>Google Chrome's connection attempt to 192.168.59.103 was rejected. The website may be down, or your network may not be properly configured.
>Error code: ERR_CONNECTION_REFUSED

This is the relevant info I think.
https://github.com/boot2docker/boot2docker/blob/master/README.md#container-port-redirection
http://viget.com/extend/how-to-use-docker-on-os-x-the-missing-guide