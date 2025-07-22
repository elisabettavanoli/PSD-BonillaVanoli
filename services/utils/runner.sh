#!/bin/bash

# This runner will launch:
# 1. All the workers in the /worker directory
# 2. The internal server
# 3. N collaborators passed as an argument

# Default number of collaborators
COLLABORATORS=0

# Parse command-line arguments
while [[ $# -gt 0 ]]; do
  key="$1"
  case $key in
    --collaborators)
      COLLABORATORS="$2"
      shift
      shift
      ;;
    *)
      echo "Usage: $0 --collaborators <number>"
      exit 1
      ;;
  esac
done

# Function to run npm install in a directory
run_npm_install() {
  DIR="$1"
  echo "Running npm install in $DIR"
  (cd "$DIR" && npm install)
}

echo "Installing dependencies..."
run_npm_install "../worker"
run_npm_install "../internal/src"
run_npm_install "../collaborator/src"

echo "Launching workers..."
node ../worker/elaborate-results-worker.js &
node ../worker/evaluate-answers-worker.js &
node ../worker/evaluate-results-worker.js &

echo "Launching internal server..."
(cd ../internal/src && npm start) &

echo "Launching $COLLABORATORS collaborators..."
for ((i=1; i<COLLABORATORS+1; i++)); do
  PORT=$((4000 + i))
  echo "Launching collaborator $i on port $PORT"
  (cd ../collaborator/src && npm start -- --port $PORT) &
done

# Wait for all background jobs
wait
