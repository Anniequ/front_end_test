if [ -d $1}; then
	echo "$1 is existed"
	exit
else
	mkdir $1
	cd $1
	mkdir css js
	touch index.html css/style.css js/main.js
	exit
fi
