#!/bin/bash

# bash script to simplify compiling all typescript files at once

tsc config/passport.ts
tsc models/user.ts
tsc routes/main.ts
tsc routes/user.ts
tsc server.ts
