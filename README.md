# Cassamalattia

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.9.

npm v6.14.12

node v10.24.1

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


PER AVVIARE UNA SOLA LINGUA IN UN PROGETTO MULTILINGUA
ng serve --configuration=it


## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.


merge file xlf esistenti
ng xi18n --outputPath locale/  && xliffmerge --profile xliffmerge.json en de

PER COMPILARE UN PROGETTO
ng build --configuration=production

--configuration=production 
aggiungere la seguente riga nelle proprietà "production" nel file angular.json

"fileReplacements": [
                {
                  "replace": "src/environments/environment.ts",
                  "with": "src/environments/environment.prod.ts"
                }
              ],

quando si cambiano le tariffe aggiornare anche la variabile 

src/app/classes/Data.ts

anno_corrente

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
