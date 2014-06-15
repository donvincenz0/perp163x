// Fix for jQuery validator dateISO
// source: http://vikaskanani.wordpress.com/2013/01/03/added-valid-date-validation-in-jquery-validator/
(function($) {
    /*
     * This is a date validation fix,
     * Because earlier it was validating invalid dates like '12//2/12' or '04/31/2012'
     */
    /*
     * Edit 1: Added year range: 1012 is invalid year, SQL datetime range is 1/1/1753 TO 12/31/9999
     */
     $.validator.addMethod("date", function(value, element) {
        return this.optional(element) || (/^\d{2}([\/])\d{2}\1\d{4}$/.test(value) && !/Invalid|NaN/.test(new Date(value)) && parseInt(value.match(/^\d{2}/)) == (new Date(value).getMonth()+1) && parseInt(value.match(/\d{4}/)) > 1752);
    });
})(jQuery);