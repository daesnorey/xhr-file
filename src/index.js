var xhrFileMethod = function( url, data, headers ) {
    let promiseToReturn = new Promise((resolve, reject) => {

        const xhr = new XMLHttpRequest();

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve(JSON.parse(xhr.response));    
                } else {
                    reject(xhr.response);
                }
            }
        };

        xhr.open( 'POST', url, true );
        for( const i in headers ) {
            xhr.setRequestHeader( i, headers[ i ] );
        }

        const formData = new FormData();
        const parameters = {};

        for ( const i in data ) {
            if ( data[ i ] instanceof File ) {
                formData.append( i, data[ i ], data[ i ].name );
            } else {
                formData.append( i , data[ i ] );
            }
        }

        formData.append( 'data', JSON.stringify( {fields: toPost} ) );

        xhr.send( formData );
    });

    return promiseToReturn;
};

module.exports = {
    send: xhrFileMethod
};