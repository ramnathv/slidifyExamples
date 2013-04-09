publish:
	rm -rf .git && \
  git init && git add . && git commit -am 'update examples' && \
  git push git@github.com:ramnathv/slidifyExamples master:gh-pages --force