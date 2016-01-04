/*global
 define
 */
/*jslint
 browser: true,
 white: true
 */
define([
    'bluebird',
    'jquery',
    'kb_vis_scatterPlot'],
    function (Promise, $) {
        'use strict';
        function widget(config) {
            var mount, container, runtime = config.runtime;
            function render() {
                var dataset = [],
                    points = 200;

                function randomColor () {
                    var colors = ['red', 'green', 'blue', 'cyan', 'magenta', 'yellow', 'orange', 'black'];
                    return colors[Math.floor(Math.random() * colors.length)];
                };

                function randomShape () {
                    var shapes = ['circle', 'circle', 'circle', 'circle', 'circle', 'circle', 'square', 'triangle-up', 'triangle-down', 'diamond', 'cross'];
                    return shapes[Math.floor(Math.random() * shapes.length)];
                };

                for (var idx = 0; idx < points; idx++) {
                    dataset.push(
                        {
                            x: Math.random() * 500,
                            y: Math.random() * 500,
                            weight: Math.random() * 225,
                            color: randomColor(),
                            label: 'Data point ' + idx,
                            shape: randomShape()
                        }
                    );
                }

                var $scatter = $.jqElem('div')
                    .css({width: '800px', height: '500px'})
                    .kbaseScatterplot(
                        {
                            scaleAxes: true,
                            //xLabel      : 'Some useful experiment',
                            //yLabel      : 'Meaningful data',

                            dataset: dataset
                        }
                    );

                return {
                    title: 'Sample scatter plot',
                    content: $scatter.$elem
                };

            }
            function attach(node) {
                return new Promise(function (resolve) {
                    mount = node;
                    container = document.createElement('div');
                    mount.appendChild(container);
                    var rendered = render();

                    runtime.send('ui', 'setTitle', rendered.title);
                    $(container).append(rendered.content);

                    resolve();
                });
            }
            return {
                attach: attach
            };
        }
        return {
            make: function (config) {
                return widget(config);
            }
        };
    });