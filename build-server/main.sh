#!/bin/bash

export GIT_REPOSITORY__URL="https://github.com/syedubaid11/test-project"

git clone "$GIT_REPOSITORY__URL" /home/app/output

exec node script.js