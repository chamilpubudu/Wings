/**
 * User: nalinK
*/

var LocalisationHandler = (function ()
{
    this.languages = ['en-US', 'si-LK', 'ta-LK'];
    this.ext = 'js';
    var provider = this, localize = {

        language: '',
        dictionary: [],
        url: undefined
    }

    return {

        init: function ()
        {
            var url = localize.url || buildUrl();
            $http({
                method: "GET",
                url: url,
                cache: false
            }).success(successCallback).error(function ()
            {
                // when the request is failing
                var url = 'js/localisation/resources-locale_default' + '.' + provider.ext;
                $http({
                    method: "GET",
                    url: url,
                    cache: false
                }).success(successCallback);
            });
        },
        buildUrl: function ()
        {
            if (localize.language == "")
            {
                localize.language = provider.defaultLanguage;
                return 'js/localisation/resources-locale_' + localize.language + '.' + provider.ext;
            } else
                return 'js/localisation/resources-locale_' + localize.language + '.' + provider.ext;
        },
        getLocalizedString: function (value)
        {

            var result = '';

            if ((localize.dictionary !== []) && (localize.dictionary.length > 0))
            {
                // use the filter service to only return those entries which match the value
                // and only take the first result
                var entry = $filter('filter')(localize.dictionary, function (element)
                {
                    return element.key === value;
                });
                result = entry[0] ? entry[0].value : value;
            }
            return result;
        },
        successCallback: function (data)
        {
            // store the returned array in the dictionary
            localize.dictionary = data;
        },
        setLanguage: function (value)
        {
            $cookies.siteLanguage = value;
            localize.language = this.fallbackLanguage(value);
            initLocalizedResources();
        },
        fallbackLanguage: function (value)
        {

            value = String(value);

            if (provider.languages.indexOf(value) > -1)
            {
                return value;
            }

            value = value.split('-')[0];

            if (provider.languages.indexOf(value) > -1)
            {
                return value;
            }

            return provider.defaultLanguage;
        }

    };
})().init();