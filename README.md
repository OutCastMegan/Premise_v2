![Alt text](https://github-jobs.s3.amazonaws.com/31cc2b08-c74f-11e3-9ab7-b5c9e7ea2d74.png "Premise") 
===
Premise Data Corporation

### Requirements

* node.js v0.10.x+
  * npm (latest)
  * jade (latest)
  * stylus (latest)

### Installation

```bash
git clone git@github.com:outcastagency/premise.git
cd premise
npm install
```

### Monitored HTML/CSS generation 
(this will run nodemon and re-compile html/css based on changes)
```bash
scr/mon.sh
```

### Single-time HTML/CSS generation
```bash
node jst/render.js
```

### Deployment
(CDN Invalidation still under construction)
```bash
scr/deploy.sh
```


### Contributors
* Author: [Kevin Olson](https://github.com/acidjazz)
