
/**
 * User: nalinK
 */



var errorConstant = {

    ERROR_CONST: ''
};

var ErrorHandler = ( function () {

    return {

        init: function ()
        {
            errorConstant.ERROR_CONST = JSON.parse( " errorJson " ).Error;
        },
        getErrorMessage : function ( errorNumber )
        {
          
            for ( var i = 0 ; i < errorConstant.ERROR_CONST.length ; i++ ){

                if ( errorConstant.ERROR_CONST[ i ] == errorNumber)
                {
                    return errorConstant.ERROR_CONST[ i ].error_msg;
                }
            } 
        },
        getErrorDescription : function ( errorNumber )
        {

            for ( var i = 0 ; i < errorConstant.ERROR_CONST.length ; i++ )
            {

                if ( errorConstant.ERROR_CONST[ i ] == errorNumber )
                {
                    return errorConstant.ERROR_CONST[ i ].error_desc;
                }
            }
        }
    };
})().init();

