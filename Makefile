reset:
	-rm package.json
	-rm package-lock.json
	-rm -r node_modules

setup-base:
# Eslint & Prettier
	npm init -y
	npm i --save-dev eslint prettier
	npm i --save-dev eslint-plugin-prettier eslint-config-prettier eslint-plugin-no-autofix

setup-node:
	npm i --save-dev eslint-plugin-node eslint-config-node

setup-vanilla:
	make setup-base	
# Airbnb style without React
	npx install-peerdeps --dev eslint-config-airbnb-base

setup-react:
	make setup-base
# Airbnb style with React
	npm info "eslint-config-airbnb@latest" peerDependencies
	npx install-peerdeps --dev eslint-config-airbnb

setup-babel:
	npm install --save-dev @babel/core
	npm install --save-dev babel-preset-airbnb