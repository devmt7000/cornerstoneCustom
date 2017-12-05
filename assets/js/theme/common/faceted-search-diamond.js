import { hooks, api } from '@bigcommerce/stencil-utils';
import $ from 'jquery';
import _ from 'lodash';
import Url from 'url';
import urlUtils from './url-utils';
import modalFactory from '../global/modal';
import collapsibleFactory from './collapsible';
import nod from './nod';

/**
 * Faceted search view component
 */
class FacetedSearchDiamond {
    /**
     * @param {object} requestOptions - Object with options for the ajax requests
     * @param {function} callback - Function to execute after fetching templates
     * @param {object} options - Configurable options
     * @example
     *
     * let requestOptions = {
     *      templates: {
     *          productListing: 'category/product-listing',
     *          sidebar: 'category/sidebar'
     *     }
     * };
     *
     * let templatesDidLoad = function(content) {
     *     $productListingContainer.html(content.productListing);
     *     $facetedSearchContainer.html(content.sidebar);
     * };
     *
     * let facetedSearch = new FacetedSearch(requestOptions, templatesDidLoad);
     */
    constructor(requestOptions, callback, options) {
        this.ionSlider = window.__ionSlider__;
        this.ConfigDiamond = ({ config: window.__configDiamond__ }).config;

        const defaultOptions = {
            accordionToggleSelector: '#facetedSearchDiamond .accordion-navigation, #facetedSearchDiamond .facetedSearch-toggle',
            blockerSelector: '#facetedSearchDiamond .blocker',
            clearFacetSelector: '#facetedSearchDiamond .facetedSearch-clearLink',
            componentSelector: '#facetedSearch-navList',
            facetNavListSelector: '#facetedSearchDiamond .navList',
            priceRangeErrorSelector: '#facet-range-form .form-inlineMessage',
            priceRangeFieldsetSelector: '#facet-range-form .form-fieldset',
            priceRangeFormSelector: '#facet-range-form',
            priceRangeMaxPriceSelector: '#facet-range-form [name=max_price]',
            priceRangeMinPriceSelector: '#facet-range-form [name=min_price]',
            showMoreToggleSelector: '#facetedSearchDiamond .accordion-content .toggleLink',
            facetedSearchFilterItems: '#facetedSearch-filterItems .form-input',
            facetedRangeSlider: '#facetedSearchDiamond .range-slider',
            modal: modalFactory('#modal')[0],
            modalOpen: false,
        };

        // Private properties
        this.requestOptions = requestOptions;
        this.callback = callback;
        this.options = _.extend({}, defaultOptions, options);
        this.collapsedFacets = [];
        this.collapsedFacetItems = [];

        /* global angular:true*/
        /* slint no-undef: "error"*/

        this.diamondController = angular.element($('#bodyDiamondsController')).scope();
        // Init collapsibles
        collapsibleFactory();

        this.optionsRequest = [];
        this.initRangeSliders();


        // Show limited items by default
        $(this.options.facetNavListSelector).each((index, navList) => {
            this.collapseFacetItems($(navList));
        });

        // Mark initially collapsed accordions
        $(this.options.accordionToggleSelector).each((index, accordionToggle) => {
            const $accordionToggle = $(accordionToggle);
            const collapsible = $accordionToggle.data('collapsible-instance');

            if (collapsible.isCollapsed) {
                this.collapsedFacets.push(collapsible.targetId);
            }
        });

        // Collapse all facets if initially hidden
        // NOTE: Need to execute after Collapsible gets bootstrapped
        setTimeout(() => {
            if ($(this.options.componentSelector).is(':hidden')) {
                this.collapseAllFacets();
            }
        });

        // Observe user events
        this.onStateChange = this.onStateChange.bind(this);
        this.onToggleClick = this.onToggleClick.bind(this);
        this.onAccordionToggle = this.onAccordionToggle.bind(this);
        this.onClearFacet = this.onClearFacet.bind(this);
        this.onFacetClick = this.onFacetClick.bind(this);
        this.onRangeSubmit = this.onRangeSubmit.bind(this);
        this.onSortBySubmit = this.onSortBySubmit.bind(this);
        this.filterFacetItems = this.filterFacetItems.bind(this);

        this.bindEvents();
    }

    // Public methods
    refreshView(content) {
        if (content) {
            this.callback(content);
        }
    }

    updateView() {
        api.getPage(urlUtils.getUrl(), this.requestOptions, (err, content) => {
            $(this.options.blockerSelector).hide();

            if (err) {
                throw new Error(err);
            }
            // Refresh view with new content
            this.refreshView(content);
        });
    }

    expandFacetItems($navList) {
        const id = $navList.attr('id');

        // Remove
        this.collapsedFacetItems = _.without(this.collapsedFacetItems, id);
    }

    collapseFacetItems($navList) {
        const id = $navList.attr('id');
        const hasMoreResults = $navList.data('has-more-results');

        if (hasMoreResults) {
            this.collapsedFacetItems = _.union(this.collapsedFacetItems, [id]);
        } else {
            this.collapsedFacetItems = _.without(this.collapsedFacetItems, id);
        }
    }

    toggleFacetItems($navList) {
        const id = $navList.attr('id');
        // Toggle depending on `collapsed` flag
        if (_.includes(this.collapsedFacetItems, id)) {
            this.getMoreFacetResults($navList);
            return true;
        }
        this.collapseFacetItems($navList);

        return false;
    }

    getMoreFacetResults($navList) {
        const facet = $navList.data('facet');
        const facetUrl = urlUtils.getUrl();

        if (this.requestOptions.showMore) {
            api.getPage(facetUrl, {
                template: this.requestOptions.showMore,
                params: {
                    list_all: facet,
                },
            }, (err, response) => {
                if (err) {
                    throw new Error(err);
                }

                this.options.modal.open();
                this.options.modalOpen = true;
                this.options.modal.updateContent(response);
            });
        }

        this.collapseFacetItems($navList);

        return false;
    }

    filterFacetItems(event) {
        const $items = $('.navList-item');
        const query = $(event.currentTarget).val().toLowerCase();

        $items.each((index, element) => {
            const text = $(element).text().toLowerCase();
            if (text.indexOf(query) !== -1) {
                $(element).show();
            } else {
                $(element).hide();
            }
        });
    }

    expandFacet($accordionToggle) {
        const collapsible = $accordionToggle.data('collapsible-instance');

        collapsible.open();
    }

    collapseFacet($accordionToggle) {
        const collapsible = $accordionToggle.data('collapsible-instance');
        collapsible.close();
    }

    collapseAllFacets() {
        const $accordionToggles = $(this.options.accordionToggleSelector);

        $accordionToggles.each((index, accordionToggle) => {
            const $accordionToggle = $(accordionToggle);

            this.collapseFacet($accordionToggle);
        });
    }

    expandAllFacets() {
        const $accordionToggles = $(this.options.accordionToggleSelector);

        $accordionToggles.each((index, accordionToggle) => {
            const $accordionToggle = $(accordionToggle);

            this.expandFacet($accordionToggle);
        });
    }

    onlyNumbers(e, goods) {
        const key = this.getKey(e);
        if (key === null) {
            return true;
        }
        // get character
        let keychar = String.fromCharCode(key);
        keychar = keychar.toLowerCase();
        const goodsLower = goods.toLowerCase();
        // check goodkeys
        if (goodsLower.indexOf(keychar) !== -1) {
            return true;
        }
        // control keys
        if (key === null || key === 0 || key === 8 || key === 9 || key === 13 || key === 27) {
            return true;
        }
        // else return false
        return false;
    }

    getKey(e) {
        if (window.event) {
            return window.event.keyCode;
        } else if (e) {
            return e.which;
        }
        return null;
    }

    initRangeSliders() {
        if ($(this.options.facetedRangeSlider).length === 0) {
            return;
        }

        const $sliders = $(this.options.facetedRangeSlider);
        const parent = this;
        const urlObj = Url.parse(window.location.href, true);

        $sliders.each((index, slide) => {
            const $facet = $(slide);
            let $from = 0;
            let $to = 0;
            let idx = -1;
            const type = $facet.attr('facet');
            if (type === this.ConfigDiamond.types[this.ConfigDiamond.pos.PRICE].name ||
                    type === this.ConfigDiamond.types[this.ConfigDiamond.pos.CARAT].name) {
                idx = type === this.ConfigDiamond.types[this.ConfigDiamond.pos.PRICE].name ? this.ConfigDiamond.pos.PRICE : this.ConfigDiamond.pos.CARAT;
                const config = this.ConfigDiamond.types[idx];
                $from = config.range.min;
                $to = config.range.max;

                if (type === this.ConfigDiamond.types[this.ConfigDiamond.pos.PRICE].name) {
                    if (urlObj.query.min_price) {
                        $from = urlObj.query.min_price;
                    }
                    if (urlObj.query.min_price) {
                        $to = urlObj.query.max_price;
                    }
                } else if (type === this.ConfigDiamond.types[this.ConfigDiamond.pos.CARAT].name) {
                    if (urlObj.query[config.id] && urlObj.query[config.id].length > 0) {
                        if (Array.isArray(urlObj.query[config.id])) {
                            urlObj.query[config.id].sort(parent.orderValues);
                            $from = urlObj.query[config.id][0];
                            $to = urlObj.query[config.id][urlObj.query[config.id].length - 1];
                        } else {
                            $from = urlObj.query[config.id];
                            $to = $from;
                        }
                    }
                }

                this.ionSlider($facet).ionRangeSlider({
                    hide_min_max: true,
                    keyboard: true,
                    type: 'double',
                    min_interval: 0,
                    min: config.range.min,
                    max: config.range.max,
                    from: $from,
                    to: $to,
                    step: config.range.step,
                    onFinish: this.fireRequestFacetRange,
                });
            } else {
                switch (type) {
                case this.ConfigDiamond.types[this.ConfigDiamond.pos.COLOR].name :
                    idx = this.ConfigDiamond.pos.COLOR;
                    break;
                case this.ConfigDiamond.types[this.ConfigDiamond.pos.CLARITY].name :
                    idx = this.ConfigDiamond.pos.CLARITY;
                    break;
                case this.ConfigDiamond.types[this.ConfigDiamond.pos.CUT].name :
                    idx = this.ConfigDiamond.pos.CUT;
                    break;
                case this.ConfigDiamond.types[this.ConfigDiamond.pos.POLISH].name :
                    idx = this.ConfigDiamond.pos.POLISH;
                    break;
                case this.ConfigDiamond.types[this.ConfigDiamond.pos.SYMMETRY].name :
                    idx = this.ConfigDiamond.pos.SYMMETRY;
                    break;
                default:
                    idx = -1;
                    break;
                }

                if (idx > 0) {
                    $from = this.ConfigDiamond.types[idx].values.length - 1;
                    $to = 0;

                    if (urlObj.query[this.ConfigDiamond.types[idx].id] && urlObj.query[this.ConfigDiamond.types[idx].id].length > 0) {
                        if (Array.isArray(urlObj.query[this.ConfigDiamond.types[idx].id])) {
                            for (const value of urlObj.query[this.ConfigDiamond.types[idx].id]) {
                                const key = this.ConfigDiamond.types[idx].keys.indexOf(value);
                                if (key !== -1) {
                                    $from = (key < $from) ? key : $from;
                                    $to = (key > $to) ? key : $to;
                                }
                            }
                        } else {
                            $from = urlObj.query[this.ConfigDiamond.types[idx].id];
                            $to = $from;
                        }
                    }
                    if ($to === 0 && $from === this.ConfigDiamond.types[idx].values.length - 1) {
                        $to = $from;
                        $from = 0;
                    }

                    this.ionSlider($facet).ionRangeSlider({
                        hide_min_max: true,
                        keyboard: true,
                        type: 'double',
                        min_interval: 0,
                        values: this.ConfigDiamond.types[idx].values,
                        grid: true,
                        onFinish: this.fireRequestFacetRange,
                        from: $from,
                        to: $to,
                    });
                }
            }

            const inputs = $facet.parent().find('fieldset input');
            this.updateFacetRangeInputs($facet);
            inputs.each((___, input) => {
                $(input).attr('facet', $facet.attr('id'));

                $(input).on('keypress', (event) => {
                    if (event.which === 13) {
                        $(this).trigger('blur');
                        $(this).focus();
                    }
                    return parent.onlyNumbers(event, '1234567890.');
                });

                $(input).on('change', (event) => {
                    const inputSlider = $(event.currentTarget);
                    const slider = parent.ionSlider('#'.concat(inputSlider.attr('facet'))).data('ionRangeSlider');
                    if (parent.validateRangeField(event) === true) {
                        const range = String(inputSlider.attr('id')).split('_')[0];
                        if (range === 'min') {
                            slider.update({ from: inputSlider.val() });
                        } else {
                            slider.update({ to: inputSlider.val() });
                        }
                        parent.fireRequestFacetRange(slider.result);
                    } else {
                        parent.updateFacetRangeInputs($facet);
                    }
                });
            });

            $facet.on('change', (event) => {
                parent.updateRequestOptions(event);
            });

            parent.optionsRequest.push($facet);
        });
    }

    orderValues(a, b) {
        return a - b;
    }

    findProducts(urlParam) {
        let url = urlParam;
        if (url) {
            url = this.diamondController.getUrlSearch(Url.parse(url, true));
        } else {
            url = Url.parse(window.location.href, true);
            delete url.query.page;
            url = this.diamondController.getUrlSearch(url);
        }
        urlUtils.goToUrl(Url.format({ pathname: url.pathname, search: urlUtils.buildQueryString(url.query) }));
    }

    fireRequestFacetRange() {
        this.diamondController = angular.element($('#bodyDiamondsController')).scope();
        let url = Url.parse(window.location.href, true);
        delete url.query.page;
        url = this.diamondController.getUrlSearch(url);
        urlUtils.goToUrl(Url.format({ pathname: url.pathname, search: urlUtils.buildQueryString(url.query) }));
    }

    validateRangeField(event) {
        const $input = $(event.currentTarget);
        const parent = $input.parent();
        const ranges = String($input.attr('id')).split('_');
        const range = ranges[0];
        const slider = this.ionSlider('#'.concat($input.attr('facet'))).data('ionRangeSlider');
        const error = parent.find('#'.concat($input.attr('id'), '-error'));

        this.clearMessageError(parent);

        if (range === 'min') {
            if ($input.val() < slider.result.min) {
                parent.addClass('form-field--error');
                error.html('Min '.concat(ranges[1], ' is ', slider.result.min));
                $input.val(slider.result.min);
                return false;
            }
        } else if (range === 'max') {
            if ($input.val() > slider.result.max) {
                parent.addClass('form-field--error');
                error.html('Max '.concat(ranges[1], ' is ', slider.result.max));
                $input.val(slider.result.max);
                return false;
            }
        }
        return true;
    }

    updateFacetRangeInputs(facet) {
        const name = facet.attr('facet');

        let range = facet.parent().find('fieldset #min_'.concat(name));
        range.val(facet.data('from'));

        range = facet.parent().find('fieldset #max_'.concat(name));
        range.val(facet.data('to'));
    }

    clearMessageError(inputParent) {
        inputParent.find('.form-inlineMessage').html('');
        if (inputParent.hasClass('form-field--error')) {
            inputParent.removeClass('form-field--error');
        }
    }

    updateRequestOptions(event) {
        const $this = $(event.currentTarget);
        const name = $this.attr('facet');
        switch (name) {
        case this.ConfigDiamond.types[this.ConfigDiamond.pos.PRICE].name:
        case this.ConfigDiamond.types[this.ConfigDiamond.pos.CARAT].name :
            $this.parent().find('fieldset input').each((__, input) => {
                this.clearMessageError($(input).parent());
            });
            this.updateFacetRangeInputs($this);
            break;
        default:
            break;
        }
    }
    // Private methods

    restoreCollapsedFacetItems() {
        const $navLists = $(this.options.facetNavListSelector);

        // Restore collapsed state for each facet
        $navLists.each((index, navList) => {
            const $navList = $(navList);
            const id = $navList.attr('id');
            const shouldCollapse = _.includes(this.collapsedFacetItems, id);

            if (shouldCollapse) {
                this.collapseFacetItems($navList);
            } else {
                this.expandFacetItems($navList);
            }
        });
    }

    restoreCollapsedFacets() {
        const $accordionToggles = $(this.options.accordionToggleSelector);

        $accordionToggles.each((index, accordionToggle) => {
            const $accordionToggle = $(accordionToggle);
            const collapsible = $accordionToggle.data('collapsible-instance');
            const id = collapsible.targetId;
            const shouldCollapse = _.includes(this.collapsedFacets, id);

            if (shouldCollapse) {
                this.collapseFacet($accordionToggle);
            } else {
                this.expandFacet($accordionToggle);
            }
        });
    }

    bindEvents() {
        // Clean-up
        // this.unbindEvents();

        // DOM events
        $(window).on('statechange', this.onStateChange);
        $(document).on('click', this.options.showMoreToggleSelector, this.onToggleClick);
        $(document).on('toggle.collapsible', this.options.accordionToggleSelector, this.onAccordionToggle);
        $(document).on('keyup', this.options.facetedSearchFilterItems, this.filterFacetItems);
        $(this.options.clearFacetSelector).on('click', this.onClearFacet);

        // Hooks
        hooks.on('facetedSearch-facet-clicked', this.onFacetClick);
        hooks.on('facetedSearch-range-submitted', this.onRangeSubmit);
        hooks.on('sortBy-submitted', this.onSortBySubmit);
    }

    unbindEvents() {
        // DOM events
        $(window).off('statechange', this.onStateChange);
        $(document).off('click', this.options.showMoreToggleSelector, this.onToggleClick);
        $(document).off('toggle.collapsible', this.options.accordionToggleSelector, this.onAccordionToggle);
        $(document).off('keyup', this.options.facetedSearchFilterItems, this.filterFacetItems);
        $(this.options.clearFacetSelector).off('click', this.onClearFacet);

        // Hooks
        hooks.off('facetedSearch-facet-clicked', this.onFacetClick);
        hooks.off('facetedSearch-range-submitted', this.onRangeSubmit);
        hooks.off('sortBy-submitted', this.onSortBySubmit);
    }

    onClearFacet(event) {
        const $link = $(event.currentTarget);
        const url = $link.attr('href');

        event.preventDefault();
        event.stopPropagation();

        // Update URL
        urlUtils.goToUrl(url);
    }

    onToggleClick(event) {
        const $toggle = $(event.currentTarget);
        const $navList = $($toggle.attr('href'));

        // Prevent default
        event.preventDefault();

        // Toggle visible items
        this.toggleFacetItems($navList);
    }

    onFacetClick(event) {
        const $link = $(event.currentTarget);

        let url = null;
        if ($link.hasClass('pagination-link')) {
            url = $link.attr('href');
        }

        event.preventDefault();

        $link.toggleClass('is-selected');

        this.findProducts(url);
        // Update URL

        if (this.options.modalOpen) {
            this.options.modal.close();
        }
    }

    onSortBySubmit(event) {
        const url = Url.parse(window.location.href, true);
        const queryParams = $(event.currentTarget).serialize().split('=');

        url.query[queryParams[0]] = queryParams[1];
        delete url.query.page;

        event.preventDefault();

        urlUtils.goToUrl(Url.format({ pathname: url.pathname, search: urlUtils.buildQueryString(url.query) }));
    }

    onRangeSubmit(event) {
        event.preventDefault();

        if (!this.priceRangeValidator.areAll(nod.constants.VALID)) {
            return;
        }

        const url = Url.parse(window.location.href);
        const queryParams = decodeURI($(event.currentTarget).serialize());

        urlUtils.goToUrl(Url.format({ pathname: url.pathname, search: `?${queryParams}` }));
    }

    onStateChange() {
        this.updateView();
    }

    onAccordionToggle(event) {
        const $accordionToggle = $(event.currentTarget);
        const collapsible = $accordionToggle.data('collapsible-instance');
        const id = collapsible.targetId;

        if (collapsible.isCollapsed) {
            this.collapsedFacets = _.union(this.collapsedFacets, [id]);
        } else {
            this.collapsedFacets = _.without(this.collapsedFacets, id);
        }
    }
}

export default FacetedSearchDiamond;
