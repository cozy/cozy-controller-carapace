## [Cozy](http://cozy.io) Controller Carapace

Carapace is an process wrapper for Node.js applications that are spawned with
the [Cozy Controller](https://github.com/mycozycloud/cozy-controller-carapace).

## Features

* chdir - directory to change into 
* setuid - set the uid of the spawned process
* setgid - set the gid of the spawned process
* setgroups - set the groups of the spawned process
* net - automatically listen on a new port if `EADDRINUSE` is thrown

## Installation

In your project folder type:

``` bash
  $ npm install haibu-carapace --save
```

## Run Tests

All of the `carapace` tests are written in Vows.

``` bash
    git clone https://github.com/mycozycloud/cozy-controller-carapace.git
    cd cozy-controller-carapace
    npm test
```

## License

Cozy Home is developed by Cozy Cloud and distributed under the AGPL v3 license.
The previous version was written by Nodejitsu [https://www.nodejitsu.com/]

## What is Cozy?

![Cozy Logo](https://raw.github.com/mycozycloud/cozy-setup/gh-pages/assets/images/happycloud.png)

[Cozy](http://cozy.io) is a platform that brings all your web services in the
same private space.  With it, your web apps and your devices can share data
easily, providing you
with a new experience. You can install Cozy on your own hardware where no one
profiles you. 

## Community 

You can reach the Cozy Community by:

* Chatting with us on IRC #cozycloud on irc.freenode.net
* Posting on our [Forum](https://groups.google.com/forum/?fromgroups#!forum/cozy-cloud)
* Posting issues on the [Github repos](https://github.com/mycozycloud/)
* Mentioning us on [Twitter](http://twitter.com/mycozycloud)
