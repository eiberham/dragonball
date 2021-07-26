# Dragonball

<p align="center">
  <img src="./dragonball.jpeg" alt="dragonball" />  
</p>

<table border="0" cellspacing="0" cellpadding="0" style="border-collapse: collapse; border: none;">
  <tr>
    <td><img alt="GitHub" src="https://img.shields.io/github/license/wwleak/dragonball?style=for-the-badge"></td>
    <td><img alt="GitHub code size in bytes" src="https://img.shields.io/github/languages/code-size/wwleak/dragonball?style=for-the-badge"></td>
    <td><img alt="GitHub top language" src="https://img.shields.io/github/languages/top/wwleak/dragonball?style=for-the-badge"></td>
    <td><img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/wwleak/dragonball?style=for-the-badge"></td>
    <td><img alt="GitHub stars" src="https://img.shields.io/github/stars/wwleak/dragonball?style=for-the-badge"></td>
  </tr>
</table>

This is the dragon ball rest api, an idea to provide to anyone, relevant information about the anime.
The application is compound of the following features:

<ol>
  <li>SSL support</li>
  <li>Data caching with Redis</li>
  <li>Clustering via pm2 package</li>
  <li>JWT authentication and routes protection</li>
  <li>Fancy OAPI Front-end</li>
</ol>

As a side note endpoint tests via mocha and supertest packages were added for major robustness.

This is the list of endpoints currently available:


<table>
  <thead>
    <tr>
      <th>Verb</th><th>Resource</th><th>Description</th><th>Scope</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>GET</td><td>/swagger</td><td>Swagger UI</td><td>Public</td>
    </tr>
    <tr>
      <td>POST</td><td>/auth</td><td>Authentication resource</td><td>Public</td>
    </tr>
    <tr>
      <td>GET</td><td>/characters</td><td>Get the list of characters</td><td>Public</td>
    </tr>
    <tr>
      <td>GET</td><td>/characters/:name</td><td>Get a single character</td><td>Public</td>
    </tr>
    <tr>
      <td>POST</td><td>/characters</td><td>Create a character</td><td>Protected</td>
    </tr>
    <tr>
      <td>DELETE</td><td>/characters/:id</td><td>Delete a character</td><td>Protected</td>
    </tr>
    <tr>
      <td>PATCH</td><td>/characters/:id</td><td>Update a character</td><td>Protected</td>
    </tr>
    <tr>
      <td>GET</td><td>/sagas</td><td>Get the list of sagas</td><td>Public</td>
    </tr>
    <tr>
      <td>GET</td><td>/sagas/:name</td><td>Get a single saga</td><td>Public</td>
    </tr>
    <tr>
      <td>POST</td><td>/sagas</td><td>Create a saga</td><td>Protected</td>
    </tr>
    <tr>
      <td>DELETE</td><td>/sagas/:id</td><td>Delete a saga</td><td>Protected</td>
    </tr>
    <tr>
      <td>GET</td><td>/films</td><td>Get a list of related films</td><td>Public</td>
    </tr>
    <tr>
      <td>GET</td><td>/films/:name</td><td>Get info about a single film</td><td>Public</td>
    </tr>
    <tr>
      <td>POST</td><td>/films</td><td>Create a film</td><td>Protected</td>
    </tr>
    <tr>
      <td>DELETE</td><td>/films/:id</td><td>Delete a film</td><td>Protected</td>
    </tr>
  </tbody>
</table>

There's a OAPI resource to test all the endpoints, you have to log yourself in in order to test those endpoints who are protected. This is how the swagger page looks like:

<p align="center">
  <img src="./swagger.png" alt="swagger" />  
</p>

## :rocket: How to run it ?

Before doing anything you should clone the repo:

```console
foo@bar:~$ git clone https://github.com/eiberham/dragonball.git
```

You should first install docker and docker compose by running:

```console
foo@bar:~$ sudo apt-get install docker.io docker-compose
```
Then log into your docker hub account by typing:

```console
foo@bar:~$ docker login --username YOUR_USERNAME --password YOUR_PASSWORD
```
### :warning: Important

If for any reason, you come across with the following error while trying to log in (as i did) ...

```
`Error saving credentials: error storing credentials - err: exit status 1, out: `Error calling StartServiceByName for org.freedesktop.secrets: Timeout was reached``
```

... I could solve that by installing the following packages:

 ```console
foo@bar:~$ sudo apt install gnupg2 pass
```

...Or if you face an error like this

```console
ERROR: for db Cannot start service db: driver failed programming external connectivity on endpoint 
```
Just run

 ```console
foo@bar:~$ service mongodb stop 
 ```

Finally run compose:

```console
foo@bar:~$ docker-compose up
```

## :anchor: Docker & DockerHub

If you wish to push the docker image to your docker hub account simply build the image and push it e.g:

```console
 foo@bar:~$ docker build -t username/dragonball:tag .
 foo@bar:~$ docker login
 foo@bar:~$ docker push username/dragonball:tag
```

To limit resource usage when running a container :

```console
foo@bar:~$ docker run -d --name dragonball \
           --publish 8080:8080
           --memory 200m \
           --memory-swap 1G \
           --cpu-shares 1024 \
           username/dragonball:tag
```

## :airplane: Deploy
In order to deploy it to the cloud, for example to an EC2 Instance over AWS:

First off you gotta make sure you downloaded the EC2 Instance's key pair to a safe place in your computer.

Then you should give it proper permissions by running:

```console
foo@bar:~$ chmod 400 dragonball.pem
```

Next step is to delete the node_modules folder directory of your project:

```console
foo@bar:~$ rm -rf node_modules
```

Next step is to copy your project files:

```console
foo@bar:~$ scp -r -i dragonball.pem ~/dragonball ec2-user@8.32.145.3:~/
```

Next step is to connect to the EC2 instance via SSH:

```console
foo@bar:~$ ssh -i dragonball.pem ec2-user@8.32.145.3
```
Then run the commands below once you're successfully connected to install docker.

```console
sudo yum update
sudo yum install docker
sudo curl -L https://github.com/docker/compose/releases/download/1.21.0/docker-compose-`uname -s`-`uname -m` | sudo tee /usr/local/bin/docker-compose > /dev/null
sudo chmod +x /usr/local/bin/docker-compose
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
```
Now start the docker service.

```console
foo@bar:~$ sudo service docker start
```

Finally run

```console
foo@bar:~$ sudo docker-compose up
```

Done!

## :ship: Kubernetes

This is a guideline for myself for running this api in a kubernetes cluster :stuck_out_tongue:

So alternatively, if you want to run it in a kubernetes cluster in your host machine do the following 
(tested on mac os with docker desktop):

Install minikube

```console
foo@bar:~$ curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-darwin-amd64
foo@bar:~$ sudo install minikube-darwin-amd64 /usr/local/bin/minikube
```
Start your cluster of three nodes

```console
foo@bar:~$ minikube start --nodes 3 -p dragonball
```

Or if you wish to start it from a virtual machine like virtual box instead. The following command will
create a 3 nodes cluster, 3 machines. It will configure kubectl to use minikube cluster and "default" 
namespace.

```console
foo@bar:~$ minikube start --vm=true --vm-driver=virtualbox --nodes 3
```

To access your virtual machine from minikube simply run 

```console
foo@bar:~$ minikube ssh
```

To list and enable minikube addons (e.g. ingress addon):

```console
foo@bar:~$ minikube addons list
foo@bar:~$ minikube addons enable ingress
```

To delete a resource object:

```console
foo@bar:~$ kubectl delete <resource-name> <obj-name>
```

Install kompose

```console
foo@bar:~$ curl -L https://github.com/kubernetes/kompose/releases/download/v1.22.0/kompose-darwin-amd64 -o kompose
foo@bar:~$ chmod +x kompose
foo@bar:~$ sudo mv ./kompose /usr/local/bin/kompose
```

Convert the docker-compose.yml file into a manifest file that can be used by kubectl..

```console
foo@bar:~$ kompose convert -f docker-compose.yml -o kubemanifest.yml
```

The manifest generated will have all the workload resources needed in order to setup a kubernetes cluster. Keep in mind
that further adjustments to the manifest are commonly needed to make it work. 
Remember that a deployment resource is a pods template.
Remember that is a type is not specified for a service it takes clusterip by default.
Remember that an ingress resource allows us to create access to our services based on a path.

Run the kubectl apply -f command over the generated manifest file.

```console
foo@bar:~$ kubectl apply -f kubemanifest.yml
```

To find out which cluster kubectl is connected to run the following command

```console
foo@bar:~$ kubectl config get-contexts
```

In my case it showed the following list, as I had docker desktop installed, so I had to switch to minikube

```console
foo@bar:~$ kubectl config use-context minikube
```

To check your cluster nodes, aka machines that take part in your cluster run:

```console
foo@bar:~$ kubectl get nodes
```

To get pods, nodes, deployments and services all at once just run:

```console
foo@bar:~$ kubectl get all
```

To check the ip of all pods:

```console
foo@bar:~$ kubectl get pods -o wide
```

To check the public ip of our nodes:

```console
foo@bar:~$ kubectl get nodes -o wide
```

To scale up a specific deployment, lets say we want to scale it to five pods:

```console
foo@bar:~$ kubectl scale --replicas=5 deployment/hello
```

### Dashboard

To take a look at a web-based kubernetes user interface on minikube use the following command:

```console
foo@bar:~$ minikube dashboard --url
```

Open up your favorite web browser and go on the given url.

To port forward my express service and make it accessible outside the cluster:

```console
foo@bar:~$ kubectl port-forward --address 0.0.0.0 service/express 7080:3000
```

To verify if the nginx ingress controller is running along with the default backend service:

```console
foo@bar:~$ kubectl get pods -n kube-system
````

In case they don't show up fix it this way:

```console
foo@bar:~$ kubectl apply -f https://raw.githubusercontent.com/roelal/minikube/5093d8b21c0931a6c63fa448538761b4bf100ee0/deploy/addons/ingress/ingress-rc.yaml
foo@bar:~$ kubectl apply -f https://raw.githubusercontent.com/roelal/minikube/5093d8b21c0931a6c63fa448538761b4bf100ee0/deploy/addons/ingress/ingress-svc.yaml
```

To know the host and ip of the ingress run:

```console
foo@bar:~$ kubectl get ingress
```

To check your ingress controller service:

```console
foo@bar:~$ kubectl get svc -A | grep ingress
```

To get info about my PV(Persistent Volume):

```console
foo@bar:~$ kubectl get pv
````

Notice how the status is set to "Bound"

To get info about the PVC(Persistent Volume Claim):

```console
 foo@bar:~$ kubectl get pvc
```

Make sure in the command above that the output shows that the PersistentVolumeClaim is bound to your PersistentVolume.

To get the Storage Class:

```console
foo@bar:~$ kubectl get sc
```

If you wish to ssh into a pod run:

```console
foo@bar:~$ kubectl exec -it SERVICE_NAME -c CONTAINER_NAME -- /bin/bash
```

To check logs of all pods you can run:

```console
foo@bar:~$ kubectl cluster-info dump
```

To check logs of a particular pod:

```console
foo@bar:~$ kubectl logs POD_NAME
```

To continously stream the logs back to terminal without exiting, add the -f (follow) command flag:

```console
foo@bar:~$ kubectl logs POD_NAME -f
```

To curl inside a pod execute the following command:

```console
foo@bar:~$ kubectl exec -it POD_NAME -- curl -k https://localhost:3000/
```

To get a service's endpoints just run:

```console
foo@bar:~$ kubectl get endpoints <service-name>
```

In my case I wanted to test the api server's pod so, as it's running through https I had to specify the -k argument to curl 
in order to turn off the verification of the ssl certificate.

In case I mess something up, this is a reminder of how to start back over quickly

```console
foo@bar:~$ minikube delete && minikube start 
```

## :thinking: Troubleshooting k8's

Once I set everything up I started getting a 502 Bad Gateway Error when accessing the Ingress domain. So I'll 
leave here in this section anything that works for getting further insight of what's happening.

Surfing the web I found an interesting article on medium about how to troubleshoot this issue, check out here:

```console
https://cameron-manavian.medium.com/how-to-debug-a-502-on-kubernetes-c2b0bc1f7490
```

First off we need to make sure that our pods are running by entering the following command on the cli:

```console
foo@bar:~$ kubectl get pods
```

Now you must check if your pod's ports are open and listening by running:

```console
foo@bar:~$ kubectl describe pod <pod-name>
```

Next, we should verify that the service is active:

```console
foo@bar:~$ kubectl get svc
```

> Is your service healthy and mapped correctly?
Using each service name, you can retrieve more details on the current state of the service by once again using kubectl describe. You will usually only need to do this on the service that is associated with the problem pod and ingress URL.

```console
foo@bar:~$ kubectl describe svc express
```

Now check whether the TargetPort and Endpoints port match, afterwards lets make sure that everything is fine with our ingress:

```console
foo@bar:~$ kubectl get ing
````

Lets find out if our ingress is configured correctly

```console
foo@bar:~$ kubectl describe ing entrance
````

Take notice of the following:

- Your backends ip and port match with the endpoints you saw earlier.

installing nslookup in debian

```console
foo@bar:~$ apt install dnsutils
````

As my service type is LoadBalancer I had to enable it in minikube by running in a separate tab:

```console
foo@bar:~$ minikube tunnel
```

This will provide the load balancing needed. Then I had to get the URL to connect to my service by running:

```console
foo@bar:~$ minikube service express --https
```

Now I can curl into my service from the host machine with a successful response:

```console
foo@bar:~$ https://dragonball.zeta:32162/
```

Interesting resources:

- https://minikube.sigs.k8s.io/docs/handbook/host-access/
- https://minikube.sigs.k8s.io/docs/commands/service/
- https://minikube.sigs.k8s.io/docs/handbook/addons/ingress-dns/

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## :pushpin: License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

<p align="right">MADE WITH ❤ BY ABRAHAM</p>
