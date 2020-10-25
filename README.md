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
foo@bar:~$ docker login
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

Enjoy life!

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## :pushpin: License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

<p align="right">MADE WITH ❤ BY ABRAHAM</p>
