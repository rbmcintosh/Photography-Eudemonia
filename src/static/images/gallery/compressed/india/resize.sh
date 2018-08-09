#!/bin/bash
for f in `find . -regextype egrep -regex '.*[A-Z]+[0-9]+.jpg'`
do 
    for j in 200
    do
        convert $f -resize x$j  `echo $f | grep -oP '\w+\d+'`.$j.jpg &
    done
done
