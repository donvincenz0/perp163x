// Load Modals on homepage
$(document).ready(function() {

    var obj = {
        _csrf: window.donvincenzo.csrf,
    };

    $("#customModals").append(JST['assets/templates/home/index_modal_askForSimulation.ejs'](obj));

    var obj = {
        _csrf: window.donvincenzo.csrf,
    };

    $("#customModals").append(JST['assets/templates/home/index_modal_subscription.ejs'](obj));

    $("#customModals").append(JST['assets/templates/home/index_modal_thanksForSimulation.ejs']);

    var obj = {
        modalID: "modal30yo",
        modalLabel: "modal30yoLabel",
        modalImage: "30yo",
        modalTitle: "30 ans",
        intialSavings: "91’200",
        totalTaxRebate: "37’392",
        ISFreduction: "23’388",
        totalSavings: "53’808",
        capitalGain: "49’374",
        lifeAnnualIncome: "6’213",
        guaranteedTotalIncome: "155'320",
        minimumReturnOnInvestment: "204’694"
    };

    $("#customModals").append(JST['assets/templates/home/index_modal_simulation.ejs'](obj));

    var obj = {
        modalID: "modal40yo",
        modalLabel: "modal40yoLabel",
        modalImage: "40yo",
        modalTitle: "40 ans",
        intialSavings: "67’200",
        totalTaxRebate: "27’552",
        ISFreduction: "10'308",
        totalSavings: "39'648",
        capitalGain: "26’772",
        lifeAnnualIncome: "3’535",
        guaranteedTotalIncome: "81’297",
        minimumReturnOnInvestment: "108’069"
    };

    $("#customModals").append(JST['assets/templates/home/index_modal_simulation.ejs'](obj));

    var obj = {
        modalID: "modal50yo",
        modalLabel: "modal50yoLabel",
        modalImage: "50yo",
        modalTitle: "50 ans",
        intialSavings: "43’200",
        totalTaxRebate: "17’712",
        ISFreduction: "3'518",
        totalSavings: "25’488",
        capitalGain: "12’896",
        lifeAnnualIncome: "1’779",
        guaranteedTotalIncome: "39’140",
        minimumReturnOnInvestment: "52’036"
    };

    $("#customModals").append(JST['assets/templates/home/index_modal_simulation.ejs'](obj));
});