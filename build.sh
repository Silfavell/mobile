rm -rf android/app/src/main/res/drawable-* && \
npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/ && \
cd android && \
ENVFILE=.env.production ./gradlew assembleRelease -x bundleReleaseJsAndAssets && \
sleep 18000