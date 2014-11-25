/**
 * User: nalinK
*/

var ErrorHandler = ( function () {

    var provider = this;

    return {

        init: function ()
        {
        },
        getErrorMessage: function (errorCode)
        {
            var result = '';
            var localizationDictionary = LocalisationHandler.localize.dictionary;

            if ((localizationDictionary !== []) && (localizationDictionary.length > 0))
            {
                var entry = $filter('filter')(localizationDictionary, function (element)
                {
                    return element.key === errorCode;
                });
                result = entry[0] ? entry[0].value : errorCode;
            }
            return result;
        }
    };
})().init();