## Build an Angular Component on the Fly

This package was created to get rid of the creating of css, ts and html of angular components.

## Install to the Command line
```
$> npm i angular-helper -g
```

## Run Angular Helper

```
$> angular-helper c | compontent | create-component ClassName
or
$> nah c ClassName
or
$> ah c ClassName
```

## Commands
```
c | compontent | create-component <name> - creates an Angular Component
s | service <name> - creates an Angular Service
```

## Output
```
Create an Angular Component
-+ classname (directory)
-+-+ classname.css
-+-+ classname.component.html
-+-+ classname.component.ts

Create an Angular Service
-+ classname (directory)
-+-+ classname.service.ts
```

## Build 0.3

New Attribute "-t" available now, so:

```
ah c SuperClass -t
```

will add a jasmine/karma angular component test into your directory:
```
Create an Angular Component
-+ classname (directory)
-+-+ classname.css
-+-+ classname.component.html
-+-+ classname.component.ts
-+-+ classname.component.spec.ts
```

## Contact

Write me your thoughts to liebigsv@gmail.com
Github: https://github.com/Sly321/angular-helper
NPM: https://www.npmjs.com/package/angular-helper
