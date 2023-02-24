#!/bin/bash
echo "Stopping any existing node server"
{ # try

    pkill node &&
    #save your output

} || { # catch
    # save log for exception
    echo "something went wrong"
}