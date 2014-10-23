# Installation #
First please create an application in your MarkLogic server and insert some JSON data

* Navigate to the desired installation location
* Issue this command: 
```
#!bash
git clone git@bitbucket.org:tamaspiros/mlu-worldleaders-ext.git
```
* Issue this command:
```
#!bash
cd mlu-worldleaders/;npm install; cd node-client-api; npm install;cd ..
```

If you haven't got bower installed:
#!bash
npm install bower; bower install
```

And finally:

#!bash
node app.js
```
* Launch browser - http://localhost:8080

# License #

The MIT License (MIT)

Copyright (c) 2014 Tamas Piros

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.