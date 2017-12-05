import { hooks } from '@bigcommerce/stencil-utils';
import CatalogPage from './catalog';
import $ from 'jquery';
import FacetedSearch from './common/faceted-search';
import FacetedSearchDiamond from './common/faceted-search-diamond';
import 'jquery-ui';
import 'angular';


export default class Category extends CatalogPage {
    loaded() {
        if ($('#facetedSearchDiamond').length > 0) {
            this.initFacetedSearchDiamond();
        } else if ($('#facetedSearch').length > 0) {
            this.initFacetedSearch();
        } else {
            this.onSortBySubmit = this.onSortBySubmit.bind(this);
            hooks.on('sortBy-submitted', this.onSortBySubmit);
        }

        if ($('#diamond-shortlisted-tab').length > 0) {
            $('#diamond-shortlisted-tab').tabs();
        }
    }

    initFacetedSearch() {
        const $productListingContainer = $('#product-listing-container');
        const $facetedSearchContainer = $('#faceted-search-container');
        const productsPerPage = this.context.categoryProductsPerPage;
        const requestOptions = {
            config: {
                category: {
                    shop_by_price: true,
                    products: {
                        limit: productsPerPage,
                    },
                },
            },
            template: {
                productListing: 'category/product-listing',
                sidebar: 'category/sidebar',
            },
            showMore: 'category/show-more',
        };

        this.facetedSearch = new FacetedSearch(requestOptions, (content) => {
            $productListingContainer.html(content.productListing);
            $facetedSearchContainer.html(content.sidebar);

            $('html, body').animate({
                scrollTop: 0,
            }, 100);
        });
    }

    initFacetedSearchDiamond() {
        const $productListingContainer = $('#product-listing-container');
        const productsPerPage = this.context.categoryProductsPerPage;
        const requestOptions = {
            config: {
                category: {
                    shop_by_price: true,
                    products: {
                        limit: productsPerPage,
                    },
                },
            },
            template: {
                context: 'diamond/context',
                sidebar: 'diamond/context',
            },
            showMore: 'diamond/context',
        };

        this.setContextDiamonds();

        this.facetedSearch = new FacetedSearchDiamond(requestOptions, (content) => {
            $productListingContainer.html(content.context);
            this.setContextDiamonds();

            $('html, body').animate({
                scrollTop: 0,
            }, 100);
        });
    }

    setContextDiamonds() {
        /* global angular:true*/
        /* slint no-undef: "error"*/

        const $scope = angular.element($('#bodyDiamondsController')).scope();
        $scope.setContext(this.context);
    }
}
