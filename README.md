node-jsdiff
===========

harness json diffing powa in the terminal

The point
---------

Diff json objects in the terminal. 

What Works
----------
-f read from files and print entire datastructure.  
"-o -" print to stdout  


TODO:
- read from stdin
- write diff to file
- append diff to file
- ~~put diff on stdout (for use in pipes)~~
- connect jsdiff to couchdb. The idea would be to follow a document. Any changes are be diffed and written, appended, or piped somewhere.
- ~~maybe settle on a single api for difing. Right now there is jsondiffpatch and difflet~~
  - ~~difflet is for printing to terminal only. I like how it prints the whole doc and uses coloring to indicate changes. colors are baked into the returned string. I dont like how it returns string only.~~
  - jsondiffpatch is for providing diff object only. It can be pretty printed or sent staight to stdout.  
