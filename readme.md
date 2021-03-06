[![Build Status](https://travis-ci.org/webRunes/WRIO-InternetOS.svg?branch=master)](https://travis-ci.org/webRunes/WRIO-InternetOS)

# WRIO <sup>Internet OS</sup>
WRIO - webRunes Input/Output.
(coming soon)


## Official Hub
[wrioos.com](https://wrioos.com)

### Multilingual support
Esperanto and English are primary languages. Yet, since the project is developed by natives of the former USSR, the third language is Russian. To write issues you can choose any of them.
https://
[more coming soon]

# Description

![WRIOInternetOS frontend diagram](https://docs.google.com/drawings/d/1LsmOHmHESih1y6L1x9030c4yGsmS2WnG8aCkNPX6xLk/pub?w=595&h=469)

Main ReactJS front end repository, compiles main page script and iframe scripts.

Example html file, using start.js script:
```
<!DOCTYPE html>
<html>
    <head>
        <title>webRunes example</title>
        <script type="application/ld+json">....</script>
        <script type="application/ld+json">....</script>
        <script type="application/ld+json">....</script>
    </head>
    <body>
        <script type="text/javascript" src="https://wrioos.com/start.js"></script>
    </body>
</html>
```

start.js script link is located at the end of the .html file. It is responsible for loading JSON-LD description of the page from ```<script type="application/ld+json">``` section, 
for processing JSON-LD and dynamic generation of the page. Each .html file can contain up to 3 JSON-LD sections.

start.js is a loader. It checks browsers for compatibility, runs preliminary tests, and then loads main.js containing the main code.

commons.js - is commons chunk, shared between main.js bundle and iframes, used to reduce individual JS file size.

titter.js - titter iframe, responsible for commenting and donating

core.js WYSWYG editor, used for editing and creating new LD+JSON based pages
# Contributing

Useful links to start

[Local development of WRIO-InternetOS front end](https://github.com/webRunes/WRIO-InternetOS/wiki/Deploy-on-localhost)  
[How to setup development process on local machine] (https://github.com/webRunes/WRIO-local-dev)  
[WRIO OS Infrastructure](https://github.com/webRunes/WRIO-InternetOS/wiki/Infrastructure)  

Powered by [Open Copyright](https://opencopyright.wrioos.com)
