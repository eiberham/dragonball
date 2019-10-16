# Dragonball

<p align="center">
  <img src="./dragonball.jpeg" alt="dragonball" />  
</p>

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
      <td>GET</td><td>/films</td><td>Get a list of related films</td><td>Public</td>
    </tr>
    <tr>
      <td>GET</td><td>/films/:name</td><td>Get info about a single film</td><td>Public</td>
    </tr>
  </tbody>
</table>


## How to run it ?

First, clone the repo:

```console
foo@bar:~$ git clone https://github.com/wwleak/dragonball.git
```

Then install all the dependencies

```console
foo@bar:~$ npm i 
```
And lastly run

```console
foo@bar:~$ npm run dev
```

<p align="right">MADE WITH ❤ BY ABRAHAM</p>
