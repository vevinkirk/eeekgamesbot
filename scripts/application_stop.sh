#!/bin/bash
echo "Stopping any existing node server"
pkill node || echo "something went wrong trying again"