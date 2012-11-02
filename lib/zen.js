/*
zen
*/"use strict"

var parse = require("slick/lib/parser"),
    array = require("prime/es5/array"),
    $     = require("./elements")

module.exports = function(expression, doc){

    return $(array.map(parse(expression), function(expression){

        var previous, result

        array.forEach(expression, function(part, i){

            var node = (doc || document).createElement(part.tag)

            if (part.id) node.id = part.id

            if (part.classList) node.className = part.classList.join(" ")

            if (part.attributes) array.forEach(part.attributes, function(attribute){
                node.setAttribute(attribute.name, attribute.value)
            })

            if (part.pseudos) array.forEach(part.pseudos, function(pseudo){
                var n = $(node), method = n[pseudo.name]
                if (method) method.call(n, pseudo.value)
            })

            if (i === 0){

                result = node

            } else if (part.combinator === " "){

                previous.appendChild(node)

            } else if (part.combinator === "+"){
                var parentNode = previous.parentNode
                if (parentNode) parentNode.appendChild(node)
            }

            previous = node

        })

        return result

    }))

}
