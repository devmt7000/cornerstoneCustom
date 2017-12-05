(() => {
    'use strict';
    function DiamondController($scope, $filter) {
        /* global angular:true*/
        /* global ConfigDiamond:true*/
        /* global $:true*/
        /* eslint no-undef: "error"*/
        /* eslint no-param-reassign: ["error", {"props": false }]*/

        $scope.init = () => {
            $scope.diamonds = [];
            $scope.shape = $('#facetedSearch-content--shape');
            $scope.rangeSlider = $('#facetedSearchDiamond .range-slider');
            $scope.price = $filter('filter')($scope.rangeSlider, { id: 'range-'.concat(ConfigDiamond.types[ConfigDiamond.pos.PRICE].name) })[0];
            $scope.carat = $filter('filter')($scope.rangeSlider, { id: 'range-'.concat(ConfigDiamond.types[ConfigDiamond.pos.CARAT].name) })[0];
        };

        $scope.setContext = (context) => {
            $scope.context = context;
        };

        $scope.getUrlSearch = (urlObj) => {
            const query = {};
            angular.copy(urlObj.query, query);
            const shapes = $scope.shape.find('li a.is-selected');
            delete query[ConfigDiamond.types[ConfigDiamond.pos.SHAPE].id];
            if (shapes.length > 0) {
                query[ConfigDiamond.types[ConfigDiamond.pos.SHAPE].id] = [];
                shapes.each((__, el) => {
                    query[ConfigDiamond.types[ConfigDiamond.pos.SHAPE].id].push($(el).attr('data-shape'));
                });
            }

            let range = $($scope.price).data('ionRangeSlider');

            delete query.min_price;
            delete query.max_price;

            if (range.result.min !== range.result.from || range.result.max !== range.result.to) {
                query.min_price = range.result.from;
                query.max_price = range.result.to;
            }

            range = $($scope.carat).data('ionRangeSlider');
            delete query[ConfigDiamond.types[ConfigDiamond.pos.CARAT].id];
            if (range.result.min !== range.result.from || range.result.max !== range.result.to) {
                query[ConfigDiamond.types[ConfigDiamond.pos.CARAT].id] = [];
                let caratValue = '';
                const values = [];
                for (let ct = range.result.from; ct <= range.result.to; ct = ct + 0.01) {
                    caratValue = String(ct.toFixed(2)).replace(/(.*)(\.)(.*)/, '$3');
                    caratValue = parseInt(caratValue, 10);
                    if (caratValue % 10 === 0) {
                        if (caratValue > 0) {
                            caratValue = String(ct.toFixed(2)).replace(/(.*)(\.)(.*)/, '$1'.concat('.', caratValue / 10));
                        } else {
                            caratValue = String(ct.toFixed(2)).replace(/(.*)(\.)(.*)/, '$1');
                        }
                    } else {
                        caratValue = ct.toFixed(2);
                    }
                    values.push(caratValue);
                }
                query[ConfigDiamond.types[ConfigDiamond.pos.CARAT].id] = values;
            }

            $scope.rangeSlider.each((__, facet) => {
                const type = $(facet).attr('facet');
                if (type !== ConfigDiamond.types[ConfigDiamond.pos.CARAT].name &&
                        type !== ConfigDiamond.types[ConfigDiamond.pos.PRICE].name) {
                    const config = $filter('filter')(ConfigDiamond.types, { name: type })[0];
                    range = $(facet).data('ionRangeSlider');
                    delete query[config.id];
                    if (range.result.min !== range.result.from || range.result.max !== range.result.to) {
                        const values = [];
                        angular.forEach(config.keys, (value, idx) => {
                            if (idx >= range.result.from && idx <= range.result.to) {
                                values.push(value);
                            }
                        });
                        query[config.id] = values;
                    }
                }
            });
            angular.copy(query, urlObj.query);
            return urlObj;
        };

        $scope.order = (predicate, e) => {
            $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
            $scope.predicate = predicate;
            $(e.target).parents('tr').find('th a i.fa-chevron-down').removeClass('fa-chevron-down');
            $(e.target).parents('tr').find('th a i.fa-chevron-up').removeClass('fa-chevron-up');
            if ($scope.reverse) {
                if ($(e.target).is('i.fa')) {
                    $(e.target).addClass('fa-chevron-down');
                } else {
                    $(e.target).find('i.fa').addClass('fa-chevron-down');
                }
                $scope.orderByVal = 'desc';
            } else {
                if ($(e.target).is('i.fa')) {
                    $(e.target).addClass('fa-chevron-up');
                } else {
                    $(e.target).find('i.fa').addClass('fa-chevron-up');
                }
                $scope.orderByVal = 'asc';
            }
            $scope.getdata();
        };
    }

    angular.module('diamondsApp', ['ngCookies']).
            controller('diamondsController', ['$scope', '$filter', DiamondController]).
            config(($interpolateProvider) => {
                $interpolateProvider.startSymbol('{/');
                $interpolateProvider.startSymbol('/}');
            });
})();
