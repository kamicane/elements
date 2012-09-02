"use strict"

var fs = require('fs')
var markdown = require('github-flavored-markdown')
var hljs = require('highlight.js')

var layout = fs.readFileSync(__dirname + '/layout.html').toString()

fs.readdir(__dirname, function(err, files){
    if (err) throw err

    files.forEach(function(file){
        if (file.slice(-3) != '.md') return

        var md = fs.readFileSync(__dirname + '/' + file).toString()
        var html = markdown.parse(md)

        html = html
            .replace(/\n/g, '\uffff')
            .replace(/<code([^>]*)>(.*?)<\/code>/gm, function(original, attrs, source){
                source = source.replace(/\uffff/g, "\n")
                source = hljs.highlightAuto(source).value
                return '<code' + attrs + '>' + source + '</code>'
            })
            .replace(/<pre lang="(\w+)">(.*?)<\/pre>/gm, function(original, lang, source){
                if (lang == 'js') lang = 'javascript'
                else if (lang == 'html') lang = 'xml'
                source = source.replace(/\uffff/g, "\n")
                source = hljs.highlight(lang, source)
                return '<pre lang="' + lang + '"><code>' + source.value + '</code></pre>'
            })
            .replace(/\uffff/g, "\n")
        html = layout.replace('{content}', html)

        var sidebar = ''
        html = html.replace(/<h2>([^<]*)<\/h2>/g, function(original, method){
            sidebar += '<a href="#' + method + '">' + method + '</a>\n'
            return '<h2><a href="#' + method + '" name="' + method + '">' + method + '</a></h2>'
        })

        html = html.replace('{sidebar}', sidebar)

        fs.writeFileSync(__dirname + '/' + file.slice(0, -3) + '.html', html)


    })

})
