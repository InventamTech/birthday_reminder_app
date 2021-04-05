# If the directory, `dist`, doesn't exist, create `dist`
stat build || mkdir build
# Archive artifacts
# cd build
zip build/reminder-app-nodejs.zip -r .ebextensions build package.json package-lock.json config