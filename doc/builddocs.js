"use strict"

var fs = require('fs')
var rs = require('robotskirt')
var hljs = require('highlight.js')

var layout = fs.readFileSync(__dirname + '/layout.html').toString()

function unescape(str){
    return str
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
}

fs.readdir(__dirname, function(err, files){
    if (err) throw err

    files.forEach(function(file){
        if (file.slice(-3) != '.md') return

        var md = fs.readFileSync(__dirname + '/' + file).toString()
        var html = rs.toHtmlSync(md)

        html = html
            .replace(/<code class="(\w+)">([\s|\S]*?)<\/code>/gm, function(original, lang, source){
                if (lang == 'js') lang = 'javascript'
                else if (lang == 'html') lang = 'xml'
                else if (lang == 'shell') lang = 'bash'
                source = hljs.highlight(lang, unescape(source)).value.trim()
                return '<code class="' + lang + '">' + source + '</code>'
            })

        html = layout.replace('{content}', html)

        var sidebar = ''
        html = html.replace(/<h(\d)>([^<]*)<\/h(\d)>/g, function(original, heading, method){
            if (heading != 1 && heading != 2) return original
            sidebar += '<a href="#' + method + '"' + (heading == 1 ? ' class="top"' : '') + '>' + method + '</a>\n'
            return '<h' + heading + '><a href="#' + method + '" name="' + method + '">' + method + '</a></h' + heading + '>'
        })

        html = html.replace('{sidebar}', sidebar)

        fs.writeFileSync(__dirname + '/' + file.slice(0, -3) + '.html', html)

    })

})
