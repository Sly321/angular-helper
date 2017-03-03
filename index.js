#! /usr/bin/env node

/**
 * Angular Helper 0.1.5
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Sven Liebig (0.1.4)      23.12.2016              Created
 * Sven Liebig (0.1.5)      31.01.2017              Fix console description
 *                                                  Fix CSS filename
 *                                                  Fix Class name
 * Sven Liebig (0.2.0)      31.01.2017              Add Service Creation
 * Sven Liebig (0.2.2)      31.01.2017              Fix Tabs and Lines
 * Sven Liebig (0.2.2)      31.01.2017              Fix \n Newline
 * Sven Liebig (0.2.3)      31.01.2017              Fix Service File Content
 * Sven Liebig (0.2.4)      01.02.2017              Fix point in CSS files
 *
 *
 * TODO
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Date if single number with 0 at start e.g. 1, 2 and 3 => 01, 02 and 03
 */


let fs = require('fs');
let build = process.argv[2];

function getCurrentDateAsString(sep = ".") {
    var today = new Date();
    return `${today.getDate()}${sep}${today.getMonth() + 1}${sep}${today.getFullYear()}`;
}

function getCommentString(title) {
    var date = getCurrentDateAsString();
    return `/**\n * ${title}\n * - - - - - - - - - - - - - - - - - - - - - - - ` +
           `- - - - - - - - - - - - - - - -\n * ...\t\t\t\t${date}\t\t\t\tCreated\n */\n\n`;
}

function writeDirectory(name) {
    fs.mkdir(name, function(err) {
        if(err) {
            return console.log(err);
        }
    });
}

function writeFile(name, type, content) {
    fs.writeFile(name + type, content, function(err) {
        if(err) {
            return console.log(err);
        }
    });
}

function writeTypescriptFile(name, content) {
    writeFile(name, ".ts", content);
}

function writeHtmlFile(name, content) {
    writeFile(name, ".html", content);
}

function writeCssFile(name, content) {
    writeFile(name, ".css", content);
}

function getAngularComponentTemplate(name, lowerCase) {
    var comment = getCommentString(`Class ${name}`);
    var content = `import { Component } from '@angular/core';\n\n@Component({\n` +
                  `\tselector: '${lowerCase}',\n\ttemplateUrl: 'app/components/` +
                  `${lowerCase}/${lowerCase}.component.html',\n\tstyleUrls: ['a` +
                  `pp/components/${lowerCase}/${lowerCase}.css']\n})\nexport cl` +
                  `ass ${name} {\n\theyhoworld: string = "heyho";\n\n\tconstructor(` +
                  `) {\n\t}\n\n\tngOnInit() {\n\t}\n}`;
    return comment + content;
}

function getAngularComponentTestTemplate(name, lowerCase) {
    var comment = getCommentString(`Test ${name}`);
    var content = `import { async, ComponentFixture, TestBed } from '@angular/core/testing';\n`;
	content += `import { By } from '@angular/platform-browser';\n`;
	content += `import { DebugElement } from '@angular/core';\n`;
	content += `import { } from 'jasmine';\n\n`;

	content += `import { ${name} } from './${lowerCase}.component';\n`;

	content += `\ndescribe('${name}', () => {\n`;
	content += `\tlet de: DebugElement;\n`;
	content += `\tlet comp: ${name};\n`;
	content += `\tlet fixture: ComponentFixture<${name}>;\n\n`;
	content += `\tbeforeEach(async(() => {\n`;
	content += `\t\tTestBed.configureTestingModule({\n\t\t\tdeclarations: [${name}]\n\t\t}).compileComponents();\n`;
	content += `\t}));\n\n`;
	content += `\tbeforeEach(() => {\n`;
	content += `\t\tfixture = TestBed.createComponent(${name});\n`;
	content += `\t\tcomp = fixture.componentInstance;\n`;
	content += `\t\tde = fixture.debugElement.query(By.css('h1'));\n`;
	content += `\t});\n\n`;
	content += `\tit('should create component', () => expect(comp).toBeDefined());\n\n`;
	content += `\tit('should have expected <h1> text', () => {\n`;
	content += `\t\tfixture.detectChanges();\n`;
	content += `\t\tconst h1 = de.nativeElement;\n`;
	content += `\t\texpect(h1.innerText).toMatch(/angular/i, '<h1> should say something about "Angular"');\n`;
	content += `\t});\n`;
	content += `});`;
    return comment + content;
}

function getAngularServiceTemplate(name) {
    var comment = getCommentString("Class ${name}");
    var content = `import { Injectable } from '@angular/core';\n\n@Injectable()\n` +
                `export class ${name} {\n\t\n\tconstructor() {\n\t}\n}`;
    return comment + content;
}

function writeAngularComponent(name, writeTest) {
    name = name.charAt(0).toUpperCase() + name.slice(1);
    var lowerCase = name.toLowerCase();
    writeDirectory(lowerCase);
    writeTypescriptFile(`${lowerCase}/${lowerCase}.component`, getAngularComponentTemplate(name, lowerCase));
    writeHtmlFile(`${lowerCase}/${lowerCase}.component`, `<div class="${lowerCase}-wrapper">\n\t<div class="${lowerCase}-container">\n\t\t{{ heyhoworld }}\n\t</div>\n</div>`);
    writeCssFile(`${lowerCase}/${lowerCase}`, `.${lowerCase}-wrapper {\n\t\n}\n\n.${lowerCase}-container {\n\t\n}`);
	if(writeTest) {
		writeTypescriptFile(`${lowerCase}/${lowerCase}.component.spec`, getAngularComponentTestTemplate(name, lowerCase));
	}
}

function writeAngularService(name) {
    name = name.charAt(0).toUpperCase() + name.slice(1);
    var lowerCase = name.toLowerCase();
    writeDirectory(lowerCase);
    writeTypescriptFile(`${lowerCase}/${lowerCase}.service`, getAngularServiceTemplate(name));
}

function buildAngularComponent(argv) {
	let name = argv[3];
	let test = argv[4];
	let writeTestFile = (test === "-t" ? true : false);
    if(!name) {
        console.log("Please choose a name for the Component. | node ... c 'name'");
    } else {
        console.log("Creating an Angular Component.");

        writeAngularComponent(name, writeTestFile);
        console.log("Done.");
    }
}

function buildAngularService(name) {
    if(!name) {
        console.log("Please choose a name for the Service. | node ... s 'name'");
    } else {
        console.log("Creating an Angular Service.");
        writeAngularService(name);
        console.log("Done.");
    }
}

function main() {
    switch(build) {
        case 'c':
        case 'component':
        case 'create-component':
            buildAngularComponent(process.argv);
            break;
        case 's':
        case 'service':
            buildAngularService(process.argv[3]);
            break;
        default:
            console.log("\nUsage: node index.js <command>\n");
            console.log(`where <command> ist one of:\n\tc, component, create-com` +
                `ponent\nangular-helper c | component | create-component <name>\t` +
                `Creates an Angular Component with the name as parameter\nangular` +
                `-helper s | service <name>\tCreates an Angular Service with th` +
                `e name as parameter`);
    }
}

main();
