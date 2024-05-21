#!/bin/bash

# Function to change port visibility
change_port_visibility() {
  local port=$1
  local visibility=$2
  gh codespace ports visibility $port:$visibility -c $CODESPACE_NAME
}

# Usage: change_port_visibility <port> <visibility>
change_port_visibility $1 $2
change_port_visibility $3 $4
