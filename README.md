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
</ol>

This is the list of endpoints currently available:


<table>
  <thead>
    <tr>
    <th>Verb</th><th>Resource</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>GET</td><td>/characters</td><td>Get the list of characters</td>
    </tr>
    <tr>
      <td>GET</td><td>/characters/:name</td><td>Get a single character</td>
    </tr>
    <tr>
      <td>GET</td><td>/sagas</td><td>Get the list of sagas</td>
    </tr>
    <tr>
      <td>GET</td><td>/sagas/:name</td><td>Get a single saga</td>
    </tr>
    <tr>
      <td>GET</td><td>/films</td><td>Get a list of related films</td>
    </tr>
    <tr>
      <td>GET</td><td>/films/:name</td><td>Get info about a single film</td>
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
