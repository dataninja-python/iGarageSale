#!/bin/bash

# bash script to simplify compiling all typescript files at once

#tsc config/passport.ts
#tsc models/user_model.ts
#tsc routes/main.ts
#tsc routes/user_model.ts
tsc server.ts
tsc models/fruits.ts
tsc models/user_model.ts
tsc controllers/fruits_controller.ts
tsc controllers/users_controller.ts
tsc controllers/sessions_controller.ts