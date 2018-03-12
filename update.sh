#!/bin/bash

# git add *
# avoid file of size exceeding 100m

find * -size -100M -type f -print0 | xargs -0 git add
git commit -a
git push -u origin master
