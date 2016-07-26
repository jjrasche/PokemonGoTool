#!/bin/bash
read -p "What do you want the folder prefix to be? " prefix

for filename in ./packages/*sb*; do
	mv $filename ${filename/sb/$prefix}
done
