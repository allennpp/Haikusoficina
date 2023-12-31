/**
 * 
 * Complete code at: https://github.com/six519/vsc-figlet
 * 
 * To install:
 * Launch VS Code Quick Open (⌘+P in OSX), paste the following command, and press enter.
 * ext install vsc-figlet
 * 
**/
var vscode = require('vscode');
var http = require('http');
var FIGLET_FONTS = [
    "3-d",
    "3x5",
    "5lineoblique",
    "acrobatic",
    "alligator",
    "alligator2",
    "alphabet",
    "avatar",
    "banner",
    "banner3-D",
    "banner3",
    "banner4",
    "barbwire",
    "basic",
    "bell",
    "big",
    "bigchief",
    "binary",
    "block",
    "bubble",
    "bulbhead",
    "calgphy2",
    "caligraphy",
    "catwalk",
    "chunky",
    "coinstak",
    "colossal",
    "computer",
    "contessa",
    "contrast",
    "cosmic",
    "cosmike",
    "cricket",
    "cursive",
    "cyberlarge",
    "cybermedium",
    "cybersmall",
    "diamond",
    "digital",
    "doh",
    "doom",
    "dotmatrix",
    "drpepper",
    "eftichess",
    "eftifont",
    "eftipiti",
    "eftirobot",
    "eftitalic",
    "eftiwall",
    "eftiwater",
    "epic",
    "fender",
    "fourtops",
    "fuzzy",
    "goofy",
    "gothic",
    "graffiti"
];

function activate(context) {

    var disposable = vscode.commands.registerCommand('extension.figlet', function () {
        var vscFigletOutputChannel = vscode.window.createOutputChannel("VSC Figlet");
        
        vscode.window.showInputBox({prompt: "Please enter text to convert"}).then(function(txt){
            if(txt) {
                vscode.window.showQuickPick(FIGLET_FONTS).then(function(fnt){
                    if(fnt) {
                        var options = {
                            host: "ferdinandsilva.com",
                            path: `/figlet/?text=${escape(txt)}&font=${escape(fnt)}`
                        };

                        callback = function(response) {
                            var str = '';

                            response.on('data', function (chunk) {
                                str += chunk;
                            });

                            response.on('end', function () {
                                vscFigletOutputChannel.show();
                                vscFigletOutputChannel.append(str);
                            });
                        }
                        var req = http.request(options, callback);

                        req.on('error', function(e){
                            vscFigletOutputChannel.show();
                            vscFigletOutputChannel.append(`The following error occurred: ${e}`);
                        });

                        req.end();
                    }
                });
            }
        });

    });

    context.subscriptions.push(disposable);
}
exports.activate = activate;

function deactivate() {
}
exports.deactivate = deactivate;